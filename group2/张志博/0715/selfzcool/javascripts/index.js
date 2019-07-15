


let { ajax ,$ ,on ,ejs} = Utils;

class Pagination{
    constructor(){
        
    }
    async init({
        list = "",
        page = "",
        getData = {
            url : "",
            data : {}
        },
        template = "",
        pageNo   = 1,
        showNo   = 5
    } = {}){

        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo       = pageNo;
        this.showNo       = showNo;
        this.url          = getData.url;
        this.data         = getData.data;
        this.template     = template;

        on(this.page_wrapper , "click" , (evt)=>{
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        },"span")
        this.res = await this.loadData();
        this.total = this.res.data.contents.length;
        this.render();
        this.renderBtn();

        // this.list_wrapper = $(".image-list"); 
        // this.pageNo = 1;
        // this.showNo = 5;



        // this.res = await this.loadData();
        // // console.log(res);
        // this.render();



    }
    //加载数据
    async loadData(){
        // let url = "http://localhost/zc";
        // let data = {
        //     pageSize : 100,
        //     contentId:("" + Date.now()).slice(6) + "_3",
        //     day      : new Date().toISOString().slice(0,10)

        // }
        let res = await ajax( this.url , {data : this.data , dataType : "json"});
        return res;
    }

    //渲染页面
    render(){
        let data = this.res.data.contents;
        data = this.interceptData(data);
        // let template =  `
        //                 <% for(var i = 0 ,item; item = data[i] ; i++) {%>
        //                  <div class="box">
        //                     <div class="box-img">
        //                         <img src="<%= item.cover %>
        //                             alt="">
        //                     </div>
        //                     <div class="box-title">
        //                         <a href="">
        //                             <%= item.title %>
        //                         </a>
        //                         <span class="fire"></span>
        //                     </div>
        //                 </div>
        //                 <% } %?>
        //                 `;
                var html = ejs.render(template , {data : data});
                // console.log(html);
                this.list_wrapper.innerHTML = html;

        // ejs.render(template , {data : data})
    }

    interceptData(data){

        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1
        data = data.filter( (item , index) => {
            return  index >= min && index <= max;
      })
      return data;
    }
    renderBtn(){
        let total = Math.ceil(this.total / this.showNo); 
        let btns = this.page_wrapper.children;
        // 不用重新渲染按钮，只需要切换active就可以了;
        if(btns.length === total){
              Array.from(btns).forEach( ( btn , index) => {
                    if(index + 1 === this.pageNo){
                          btn.className = "active"
                    }else{
                          btn.className = "";
                    }
              })
              return false;
        }
        // 渲染按钮;
        let html = "";
        for(var i = 0 ; i < total ; i ++){
              if(i + 1 === this.pageNo) {
                    html += `<span class=active>${i+1}</span>`;
              }else{
                    html += `<span>${i+1}</span>`;
              }
        }
        this.page_wrapper.innerHTML = html;
  }


  //切换页码
  toIndex(index){
    // console.log(index);
    this.pageNo = index + 1;
}

}

new Pagination(); 