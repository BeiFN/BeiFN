
let {ejs} = Utils;

function Pagination(){
    this.init();     
}
$.extend(Pagination.prototype,{


     init : async function ({
            list = "",
            page = "",
            getData = {
                  url  : "",
                  data : {}
            },
            template = "",
            pageNo = 1,
            showNo = 5
      } = {}){
            this.list_wrapper = $("list");
            this.page_wrapper = $("page");
            this.pageNo       = pageNo;
            this.showNo       = showNo;
            this.url          = getData.url;
            this.data         = getData.data;
            this.template     = template;
            // 1. 以数据加载开始;
            // 2. 事件委托;
            $(".page").on( "click"  ,"span", function(evt){
                let target = evt.target;
                  this.toIndex($(target).index());
                  this.render();
                  this.renderBtn();
            })
            this.res = await this.loadData();
            //console.log(this.res);
            this.total = this.res.data.contents.length;
            this.render();
            this.renderBtn();
      },    
      // 加载数据;
      loadData : async function(){
        let url  = "http://localhost/zc";
        let data = {
            pageSize  : 20,
            contentId : ((""+Date.now()).slice(6)+"_3"),
            day       : new Date().toISOString().slice(0,10),
        }
            let res = await $.ajax( this.url , { data : this.data , dataType : "json" });
            return res;
      },
      // 渲染页面;
      render : function(){
            let data = this.res.data.contents;
            // 处理data;
            data = this.interceptData(data);
        //     let template = `
        //     <% for (let i = 0;i<list.length;i++) {%>
        //         <div class="box">
        //             <div class="box-img">
        //                 <img src="<%= list[i].cover %>" alt="">
        //             </div>
        //             <div class="box-title">
        //                 <a href="">
        //                         <%= list[i].title %>
        //                 </a>
        //                 <span class="fire"></span>
        //             </div>
        //         </div>
        //     <% } %>
        // `;
            
            var html = ejs.render(template , {data : data})
            this.list_wrapper[0].innerHTML = html;
      },
      //裁剪数据的;
      interceptData : function(data){
            // 裁剪;
            let min = this.showNo * ( this.pageNo - 1);
            let max = this.showNo *  this.pageNo - 1
            data = data.filter( (item , index) => {
                  return  index >= min && index <= max;
            })
            return data;
      },
      // 渲染按钮;
      renderBtn : function(){
            let total = Math.ceil(this.total / this.showNo); 
            let btns = this.page_wrapper[0].children;
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
            this.page_wrapper[0].innerHTML = html;
      },
      // 切换页码;
      toIndex : function(index){
            // console.log(index);
            this.pageNo = index + 1;
      }
})
new Pagination();




new Pagination();
