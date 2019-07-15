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

let { ajax , $ , on , ejs} = Utils;

class Pagination{
      constructor(
            {
                  url,
                  template,
                  image_list,
                  pagination,
                  data = {},
                  showon = 5,
                  pageon = 1
            }={}
      ){

            this.template   = template;
            this.image_list = image_list;
            this.showon     = showon;
            this.pageon     = pageon;
            this.pagination = pagination;
            this.data       = data;
            this.url        = url;
            console.log(this.image_list);
            console.log(this.pagination);
            this.init();
      }
      async init(){
            
            // console.log(this.template.innerHTML);

            this.res = await this.loadDate();
            this.tatol  =  this.res.data.contents.length;
            // console.log(this.tatol);
            // console.log(this.res);
            this.render();
            this.renderBtn();
            on(this.pagination,"click",(evt)=>{
                 
                  this.toIndex(evt.target.index()+1);
                  this.render();
                  this.renderBtn();
            },"span")
      }
      // 加载数据
      async loadDate(){
            let url = this.url;
            let data = this.data;
            // let data = {
            //       pageSize : 40,
            //       contentId: (""+Date.now()).slice(6) + "_1",
            //       day : new Date().toISOString().slice(0,10) 
            // }
            let res = await ajax(url,{data:data,dataType:"json"});
            console.log(res);
            return res;
      }
      // 渲染页面
      render(){
            let data = this.res.data.contents;
            data = this.cutData(data);
            console.log(data);
            // console.log(this.template.innerHTML);
            console.log(this.template.innerHTML);
            let html = ejs.render(this.template.innerHTML,{data:data});
            console.log(html);
            this.image_list.innerHTML = html;
            
      }
      cutData(data){
            // 5 * (n-1) ~ 5n - 1
            let min = this.showon *(this.pageon-1);
            let max = this.showon*this.pageon -1;
            // let dataArray =[];
            data = data.filter((item,index) => {
                  return index >= min && index <= max;
            })
            // data = data.map((item,index) =>{
            //       if(index >= min && index <= max){
            //             dataArray.push(item);
            //       }
            //       return dataArray;
            // })
            return data;
            // console.log(data);
      }
      renderBtn(){
      //      console.log(this.tatol);
      //      console.log(this.showon);
      //      console.log(this.tatol/this.showon);
      //      console.log(Math.ceil(this.tatol/this.showon));
           let total = Math.ceil(this.tatol/this.showon)
           let btns  = this.pagination.children;
      //      console.log(btns);  
          if(btns.length == total){
                Array.from(btns).forEach((btn,index) => {
                  if(index + 1 == this.pageon){
                        btn.className = "active";
                  }
                  else{
                        btn.className = " ";
                  }
                })
                return false;
          }
          
           
            let html = "";
            for(var i = 0 ;i < total;i++){
                  if(i + 1 == this.pageon){
                        html += `<span class = "active">${i+1}</span>`;
                  }
                  else{
                        html += `<span>${i+1}</span>`;
                  }
            }

            this.pagination.innerHTML = html;
      }

      toIndex(index){
            this.pageon = index;
      }
}







// class Pagination{
//       constructor() {
            
//       }
//       async init({
//             list = "",
//             page = "",
//             getData = {
//                   url  : "",
//                   data : {}
//             },
//             template = "",
//             pageNo = 1,
//             showNo = 5
//       } = {}){
//             this.list_wrapper = $(list);
//             this.page_wrapper = $(page);
//             this.pageNo       = pageNo;
//             this.showNo       = showNo;
//             this.url          = getData.url;
//             this.data         = getData.data;
//             this.template     = template;
//             // 1. 以数据加载开始;
//             // 2. 事件委托;
//             on(this.page_wrapper , "click" , (evt)=>{
//                   this.toIndex(evt.target.index());
//                   this.render();
//                   this.renderBtn();
//             }, "span")
//             this.res = await this.loadData();
//             // console.log(res);
//             this.total = this.res.data.contents.length;
//             this.render();
//             this.renderBtn();
//       }     
//       // 加载数据;
//       async loadData(){
//             // let url  = "http://localhost/zc";
//             // let data = {
//             //       pageSize : 100,
//             //       contentId: (""+Date.now()).slice(6) + "_3",
//             //       day : new Date().toISOString().slice(0,10)                  
//             // }     
//             // await 
//             let res = await ajax( this.url , { data : this.data , dataType : "json" });
//             return res;
//       }
//       // 渲染页面;
//       render(){
//             let data = this.res.data.contents;
//             // 处理data;
//             data = this.interceptData(data);
//             console.log(data);
//             console.log(this.template);
//             // let template = `
//             //             <%  for(var i = 0 , item ; item = data[i]; i++) {%>
//             //                   <div class="box">
//             //                         <div class="box-img">
//             //                               <img src="<%= item.cover %>" alt="">
//             //                         </div>
//             //                         <div class="box-title">
//             //                               <a href="">
//             //                                     <%= item.title %>
//             //                               </a>
//             //                               <span class="fire"></span>
//             //                         </div>
//             //                   </div>
//             //             <% } %>
//             //             `;
//             var html = ejs.render(this.template , {data : data})
//             this.list_wrapper.innerHTML = html;
//       }
//       //裁剪数据的;
//       interceptData(data){
//             // 裁剪;
//             let min = this.showNo * ( this.pageNo - 1);
//             let max = this.showNo *  this.pageNo - 1
//             data = data.filter( (item , index) => {
//                   return  index >= min && index <= max;
//             })
//             return data;
//       }
//       // 渲染按钮;
//       renderBtn(){
//             let total = Math.ceil(this.total / this.showNo); 
//             // total 是页数

//             let btns = this.page_wrapper.children;
//             console.log(btns);
//             // 不用重新渲染按钮，只需要切换active就可以了;
//             if(btns.length === total){
//                   Array.from(btns).forEach( ( btn , index) => {
//                         if(index + 1 === this.pageNo){
//                               btn.className = "active"
//                         }else{
//                               btn.className = "";
//                         }
//                   })
//                   return false;
//             }
//             // 渲染按钮;
//             let html = "";
//             for(var i = 0 ; i < total ; i ++){
//                   if(i + 1 === this.pageNo) {
//                         html += `<span class=active>${i+1}</span>`;
//                   }else{
//                         html += `<span>${i+1}</span>`;
//                   }
//             }
//             this.page_wrapper.innerHTML = html;
//       }
//       // 切换页码;
//       toIndex(index){
//             // console.log(index);
//             this.pageNo = index + 1;
//       }
// }

