let {$:$$,on}=Utils;
let {ajax}=Self;
class Pagination{
    constructor(){
        this.pageNum=1;
        this.showNum=5;
        this.imgList=$$(".img-list");
        this.pagination=$$(".pagination");
        this.init();
    }
    async init(){
        this.data=await new Load().init();
        this.count=parseInt(this.data.length/this.showNum)
        this.changeContainerWidth();
        on(this.pagination,"click",(evt)=>{
           this.pageNum=evt.target.index()+1;
           this.changeContainerWidth(); 
        },"span")
    }
    changeContainerWidth(){
        this.renderBtn();
        this.renderImg();
    }
    renderBtn(){
        if(this.pagination.children.length===this.count){
            for(let i=0;i<this.count;i++){
                if((i+1)===this.pageNum){
                    this.pagination.children[i].className="active";
                }else{
                    this.pagination.children[i].className="";
                }
            }
        }else{
            let html=``;
            for(let i=0;i<this.count;i++){
                if((i+1)===this.pageNum){
                    html+=`<span class="active">${i+1}</span>`
                }else{
                    html+=`<span>${i+1}</span>`
                }
            }
            this.pagination.innerHTML=html;
        }
    }
    renderImg(){
        let showArr=this.cutData();
        let template=`
        <%  for(let i = 0 , item ; item = data[i]; i++) {%>
            <div class="box">
                  <div class="img-box">
                        <img src="<%= item.cover %>" alt="">
                  </div>
                  <div class="title-box">
                        <a href="">
                              <%= item.title %>
                        </a>
                        <span class="fire"></span>
                  </div>
            </div>
      <% } %>
       `;
        let res=ejs.render(template,{data:showArr});
        this.imgList.innerHTML=res;
    }
    cutData(){
        let min=(this.pageNum-1)*5;
        let max=this.pageNum*5-1;
        // let data= this.data.filter((item,index)=>{
        //     return index>=min&&index<=max;
        // })
        let data=[];
        for(var i=0;i<this.data.length;i++){
            if(i>=min&&i<=max){
                data.push(this.data[i]) ;
            }
        }
        return data;
    }
}
class Load {
    constructor() {
    }
    async init() {
        let url = "http://localhost/zc";
        let data = {
            pageSize: 100,
            contentId: ("" + Date.now()).slice(6) + "_3",
            day: new Date().toISOString().slice(0, 10)
        };
        let res = await ajax(url, { data: data, dataType: "json" });
        return res.data.contents;
        // return res
    }
}
new Pagination();
