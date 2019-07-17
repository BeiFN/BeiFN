// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  0 ~ 4 
// 2.  5 ~ 9
// 3. 10 ~ 14
// 4. 15 ~ 19 
// n.  5 * (n-1) ~ 5n - 1;

// 渲染         ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件      ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染  ; 
// ejs.render( template , data);
// 页码         ; 

let {  ejs} = Utils;


class Pagination{
      constructor() {
            
      }
       init({
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
            this.list_wrapper = $(list);
            console.log(this.list_wrapper)
            this.page_wrapper = $(page);
            this.pageNo       = pageNo;
            this.showNo       = showNo;
            this.url          = getData.url;
            this.data         = getData.data;
            this.template     = template;
            // 1. 以数据加载开始;
            // 2. 事件委托;
            $("this.page_wrapper").on("click" ,"span",function (evt){
                  this.toIndex(evt.target.index());
                  this.render();
                  this.renderBtn();
            })
            this.res = $.ajax( {url :this.url ,  data : this.data , dataType : "json",async : true} );
            // console.log(res);
            console.log(this.res)
            console.log(this.res.responseJSON)
            $.ajax( {url :this.url ,  data : this.data , dataType : "json",async : true} )
                        .then(function(){
                              this.total = this.res.responseJSON.data.contents.length;
                              this.render();
                              this.renderBtn();
                        })
            
      }     
      // 加载数据;
      // async loadData(){
      //       // let url  = "http://localhost/zc";
      //       // let data = {
      //       //       pageSize : 100,
      //       //       contentId: (""+Date.now()).slice(6) + "_3",
      //       //       day : new Date().toISOString().slice(0,10)                  
      //       // }     
      //       // await 
      //     // var res =await   $.ajax({url : this.url ,data : this.data,dataType :"json",async : true})
      //      let res = await ajax( this.url , { data : this.data , dataType : "json" });
      //       return res;
      // }
      // 渲染页面;
      render(){
            let data = this.res.data.contents;
            // 处理data;
            data = this.interceptData(data);
            // let template = `
            //             <%  for(var i = 0 , item ; item = data[i]; i++) {%>
            //                   <div class="box">
            //                         <div class="box-img">
            //                               <img src="<%= item.cover %>" alt="">
            //                         </div>
            //                         <div class="box-title">
            //                               <a href="">
            //                                     <%= item.title %>
            //                               </a>
            //                               <span class="fire"></span>
            //                         </div>
            //                   </div>
            //             <% } %>
            //             `;
            var html = ejs.render(this.template , {data : data})
            this.list_wrapper.innerHTML = html;
      }
      //裁剪数据的;
      interceptData(data){
            // 裁剪;
            let min = this.showNo * ( this.pageNo - 1);
            let max = this.showNo *  this.pageNo - 1
            data = data.filter( (item , index) => {
                  return  index >= min && index <= max;
            })
            return data;
      }
      // 渲染按钮;
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
      // 切换页码;
      toIndex(index){
            // console.log(index);
            this.pageNo = index + 1;
      }
}

