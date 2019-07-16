// // 初版
// let { ajax , $ ,on } = Utils;
// // 分页类
// class Pagination{
//     constructor(){

//         this.init();
//     }
//     async init(){
//         this.list_wrapper = $(".image-list");
//         // 开始分页的起始页码
//         this.page_now = 1;
//         // 每页展示的页数
//         this.page_show = 5;
//         this.page_wrapper = $(".pagination");

//         // 加载数据 以数据加载开始
//         this.res = await this.loadData();
//             // 事件委托，给页码按钮绑定事件
//             on(this.page_wrapper,"click",(evt) => {   // callback
//                 this.toPage(evt.target.index());  // 
//                 this.render();
//                 this.renderBtn();
//             },"span")
//           // 根据加载出的数据寻找并定义出页码总数
//          this.total = this.res.data.contents.length; 
//         // 渲染页面
//         this.render();
//           // 渲染按钮
//          this.renderBtn();
//     }

//     // 加载数据
//     async loadData(){
//         let url  = "http://localhost/zc";
//         let data = {
//             pageSize:20,
//             contentId : (""+Date.now()).slice(6) + "_3",
//             day : new Date().toISOString().slice(0,10)
//         }
//         let res = await ajax(url, {data:data,dataType:"json"});
//         return res;
//     }
    
//     // 渲染页面
//     render(){
//         // 得到数据
//         let data = this.res.data.contents;
//           // 数据处理
//          data = this.interceptData(data);
//         // 字符串模板引擎处理，渲染页面
//         let template = `
//             <% for(var i=0,item; item = data[i]; i++){ %>
//                 <div class="box">
//                     <div class="box-img">
//                         <img src="<%= item.cover %>" alt="">
//                     </div>
//                     <div class="box-title">
//                         <a href="">
//                             <%= item.cover %>    
//                         </a>
//                         <span class="fire"></span>
//                     </div>
//                 </div>
//             <% } %>`
//         let html = ejs.render(template,{data:data});
//         this.list_wrapper.innerHTML = html;    
//     }

//     // 数据裁剪
//     interceptData(data){
//         let min = this.page_show *(this.page_now - 1);
//         let max = this.page_show * this.page_now - 1;
//         data = date.filter( (item,index) => {
//             return index >= min && index <= max; 
//         })
//         return data;
//     }

//     // 渲染按钮
//     renderBtn(){
//         // 页面所需的按钮的总数
//         let total = Math.ceil(this.total/this.page_show);
//         // 按钮总数
//         let btns = this.page_wrapper.children;
//         // 遍历按钮，当按钮和当前的页面一致时，样式为active
//         if (btns.length === total) {        // ????? if it does't have this,can't it?
//             Array.from(btns).forEach( (btn,index) => {
//                 if(index + 1 === this.page_now){
//                     btn.className = "active";
//                 }else{
//                     btn.className = "";
//                 }
//             })
//             return false;  // 
//         }
//         // 页面渲染按钮
//         let html = ""
//         for (var i = 0; i < total; i++) {
//             if (i+1 === page_now) {
//                 html += `<span class = active>${i+1}</span>`;
//             }else{
//                 html += `<span>${i+1}</span>`;
//             }   
//         }
//         this.page_wrapper.innerHTML = html;
//     }
//     // 切换页码
//     toPage(index){
//         this.page_now = index + 1;
//     }
// }

// new Pagination();




// 优化，提取参数版
let { ajax , $ ,on } = Utils;
// 分页类
class Pagination{
    constructor(){

        // this.init();  //init调用放在HTML里的script部分
    }
    
    // 结构化参数赋值,设置默认参数   
    async init({
        list = "",
        page = "",
        template = "",
        // 开始分页的起始页码
        page_now = 1,
        // 每页展示的页数
        page_show = 5,
        getDate = {
            url : "",
            data : {}
        }
    }={}){
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.page_now = page_now;
        this.page_show = page_show;
        this.url = getDate.url;
        this.data = getDate.data;
        this.template = template;

        // 加载数据 以数据加载开始
        this.res = await this.loadData();
            // 事件委托，给页码按钮绑定事件
            on(this.page_wrapper,"click",(evt) => {   // callback
                this.toPage(evt.target.index());  // 
                this.render();
                this.renderBtn();
            },"span")
          // 根据加载出的数据寻找并定义出页码总数
         this.total = this.res.data.contents.length; 
        // 渲染页面
        this.render();
          // 渲染按钮
         this.renderBtn();
    }

    // 加载数据
    async loadData(){
        // 可以根据需要变更的部分，可以封装为对象getData,放在init之中
        // let url  = "http://localhost/zc";
        // let data = {
        //     pageSize:20,
        //     contentId : (""+Date.now()).slice(6) + "_3",
        //     day : new Date().toISOString().slice(0,10)
        // }
        let res = await ajax(this.url, {data:this.data,dataType:"json"});
        return res;
    }
    
    // 渲染页面
    render(){
        // 得到数据
        let data = this.res.data.contents;
          // 数据处理
         data = this.interceptData(data);
        // 字符串模板引擎处理，渲染页面
        // 这是根据需要可定制的部分，可以放在 text/html 中，字符串模板引擎
        // let template = `
        //     <% for(var i=0,item; item = data[i]; i++){ %>
        //         <div class="box">
        //             <div class="box-img">
        //                 <img src="<%= item.cover %>" alt="">
        //             </div>
        //             <div class="box-title">
        //                 <a href="">
        //                     <%= item.cover %>    
        //                 </a>
        //                 <span class="fire"></span>
        //             </div>
        //         </div>
        //     <% } %>`
        let html = ejs.render(this.template,{data:data});
        this.list_wrapper.innerHTML = html;    
    }

    // 数据裁剪
    interceptData(data){
        let min = this.page_show *(this.page_now - 1);
        let max = this.page_show * this.page_now - 1;
        data = date.filter( (item,index) => {
            return index >= min && index <= max; 
        })
        return data;
    }

    // 渲染按钮
    renderBtn(){
        // 页面所需的按钮的总数
        let total = Math.ceil(this.total/this.page_show);
        // 按钮总数
        let btns = this.page_wrapper.children;
        // 遍历按钮，当按钮和当前的页面一致时，样式为active
        if (btns.length === total) {        // ????? if it does't have this,can't it?
            Array.from(btns).forEach( (btn,index) => {
                if(index + 1 === this.page_now){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            })
            return false;  // 
        }
        // 页面渲染按钮
        let html = ""
        for (var i = 0; i < total; i++) {
            if (i+1 === page_now) {
                html += `<span class = active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }   
        }
        this.page_wrapper.innerHTML = html;
    }
    // 切换页码
    toPage(index){
        this.page_now = index + 1;
    }
}

new Pagination();