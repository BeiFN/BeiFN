let { ajax , $ , on} = Utils;
class Pagination{
    constructor(){
        this.init();
    }
    async init(){
        this.res       = await new GetData().init();
        // console.log(this.res);
        this.template  = `<%  for(var i = 0 , item ; item = data[i]; i++) {%>
            <div class="box">
                  <div class="box-img">
                        <img src="<%= item.cover %>" alt="">
                  </div>
                  <div class="box-title">
                        <a href="">
                              <%= item.title %>
                        </a>
                        <span class="fire"></span>
                  </div>
            </div>
      <% } %>`;
        this.pagination = $(".pagination");
        // console.log(this.res);//没有await 返回的是promise对象
        this.img_list= $(".img-list");
        this.pageNo    = 1;
        this.showNo    = 5; 
        this.total     = this.res.length ;
        this.render();
        this.renderBtn();
        on(this.pagination , "click" , (evt)=>{
            this.toIndex(evt.target.index());//e.target.index() ??? 见JS 获取下标
            this.render();
            this.renderBtn();
        },"span");      
    }
    //页面渲染
    render(){
        let data = this.cutting(this.res);
        // console.log(data);
        let html = ejs.render(this.template ,{data : data});
        // console.log(html);
        this.img_list.innerHTML = html ;
    }
    //数据选择
    cutting(data){
        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1 ;
        data = data.filter((item,index)=>{
            return index >= min && index <=max ; //返回下标在该区间内的新数组
        }) 
        return data ;
    }
    //渲染按钮
    renderBtn(){
        let group = Math.ceil( this.total / this.showNo );
        let btns  = this.pagination.children;
        // console.log(1);
        if(btns.length === group){
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1 === this.pageNo){
                    btn.className = "active";
                }
                else{
                    btn.className = "";
                }
            })
            return false;
        }
        let html = "" ;
        for(var i = 0 ; i < group ; i++){//动态添加span标签
            if( i+1 === this.pageNo ){
                html += `<span class="active">${i+1}</span>`;
            }
            else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.pagination.innerHTML = html  ;
    }
    toIndex(index){
        // console.log(index);
        this.pageNo = index + 1; //通过下标，渲染按钮
    }
}
class GetData{
    constructor(){
        this.init();
    }
    async init(){
        let url  = "http://localhost/zc" ;
        let data = {
                pageSize    : 20,
                contentId   : (""+Date.now()).slice(6) + "_3",
                day         : new Date().toISOString().slice(0,10) , 
            }
        let res = await ajax(url , {data : data , dataType : "json"});
        return res.data.contents;
        // console.log(res);
    }
}
new Pagination();
// new GetData();
// https://www.zcool.com.cn/recommend/contentRecommend?pageSize=5&contentId=9356514_3&day=2018-12-04