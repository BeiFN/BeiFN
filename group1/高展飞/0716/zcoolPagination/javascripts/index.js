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
           
            this.page_wrapper = $(page);
            this.pageNo       = pageNo;
            this.showNo       = showNo;
            this.url          = getData.url;
            this.data         = getData.data;
            this.template     = template;
            // 1. 以数据加载开始;
            // 2. 事件委托;
            this.page_wrapper.on("click" ,"span",$.proxy(function (evt){
                  this.toIndex(evt.target.index());
                  this.render();
                  this.renderBtn();
            },this))
            $.ajax( {url :this.url ,  data : this.data , dataType : "json",async : true} )
            .then($.proxy(function(res){
                  console.log(res);
                  this.total = res.data.contents.length;
                  
                  this.render(res);
                  this.renderBtn();
                 
      },this))       
            
      }     
    
      // 渲染页面;
      render(res){
            console.log(res);
            let data = res.data.contents;
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
            console.log(html)
            this.list_wrapper.html( html);
      }     
      //裁剪数据的;
      interceptData(data){
            // 裁剪;
            var min = this.showNo * ( this.pageNo - 1);
            var max = this.showNo *  this.pageNo - 1
            data = data.filter( (item , index) => {
                  return  index >= min && index <= max;
            })
            
            return data;
      }
      // 渲染按钮;
      renderBtn(){
            var total = Math.ceil(this.total / this.showNo); 
            //console.log(this.page_wrapper.children())
            var btns =Array.from( this.page_wrapper.children());
            //console.log(btns)
            // 不用重新渲染按钮，只需要切换active就可以了;
            if(btns.length === total){
                  $.each(btns, $.proxy(function( btn ,index) {
                        console.log(btn)
                        if(index + 1 === this.pageNo){
                              btn.className = "active"
                        }else{
                              btn.className = "";
                        }
                  },this))
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
            console.log(html)
            this.page_wrapper.innerHTML = html;
      }
      // 切换页码;
      toIndex(index){
            // console.log(index);
            this.pageNo = index + 1;
      }
}

