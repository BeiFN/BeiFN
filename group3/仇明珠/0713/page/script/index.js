let {ajax,$,on}=Utils;
class Pagination{
    constructor(){
        this.init();
    }
    async init(){
        this.imgList=$(".img-list");
        this.pagination=$(".pagination");
        this.showNum=5;
        this.pageNum=1;
        this.res=await this.loadDate();
        this.data=this.res.data.contents
        this.count=this.data.length;
        this.renderImg();
        this.renderBtn();
        on(this.pagination,"click",(evt)=>{
            this.changeIndex(evt.target.index());
            this.renderBtn();
            this.renderImg();
        },"span") 
    }
    async loadDate(){
        let url="http://localhost/zc";
        let data={
            pageSize : 100,
            contentId: (""+Date.now()).slice(6) + "_3",
            day : new Date().toISOString().slice(0,10)  
        };
        let res = await ajax( url , { data : data , dataType : "json" });
        return res;
    }
    renderImg(){
        let data=this.cutData(this.data);
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
        `
        let res=ejs.render(template,{data:data});
        this.imgList.innerHTML=res;
    }
    cutData(){
        let min=(this.pageNum-1)*this.showNum;
        let max=(this.pageNum)*this.showNum-1;
        let data=this.data.filter((item,index)=>{
            return index>=min&&index<=max;
        });
        return data;
    }
    renderBtn(){
        let btnCount=Math.ceil(this.count/this.showNum);
        let btns=this.pagination.children;
        if(btns.length==btnCount){
            for(let i=0;i<btnCount;i++){
                if((i+1)==this.pageNum){
                    btns[i].className="active";
                }else{
                    btns[i].className="";
                }
            }
            return false;
        }
        let html='';
        for(var i=0;i<Math.ceil(this.count/this.showNum);i++){
            if((i+1)=== this.pageNum){
                html+='<span class="active">'+(i+1)+'</span>';
            }else{
                html+='<span>'+(i+1)+'</span>';
            }
        }
        this.pagination.innerHTML=html;
    }
    changeIndex(index){
        this.pageNum=index+1;
    }
}
new Pagination();
