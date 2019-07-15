let {ajax , $ , on , ejs } = Utils;

// class Pagination{
//     constructor(){

//     }

//     async init({
//         list = "",
//         page = "",
//         getData = {
//             url : "",
//             data : {}
//         },
//         template = "",
//         pageNo   = "",
//         showNo   = ""
//     } = {}){
//         this.list_wrapper = $(list);
//         this.page_wrapper = $(page);

//         this.pageNo       = pageNo;
//         this.showNo       = showNo;
//         this.template     = template;
//         this.url          = getData.url;
//         this.data         = getData.data;

//         on(this.page_wrapper , "click" , (evt)=>{
//             this.toIndex(evt.target.index());
//             this.render();
//             this.renderBtn();
//         } , "span");

//         this.res = await this.loadDate();
//         this.total = this.res.data.contents.length;
//         this.render();
//         this.renderBtn();

//     }

//     async loadDate(){
//         let res = await ajax(this.url , {data : this.data , dataType : "json"});
//         return res;
//     }

//     interceptDate(data){
//         let min = this.showNo * (this.pageNo - 1);        
//         let max = this.showNo * this.pageNo - 1;


//         data = data.filter((item , index) => {
//             return index >= min && index <= max;
//         })

        
//         return data;
//     }

//     render(){
//         let data = this.res.data.contents;
//         // console.log(data);
//         data = this.interceptDate(data);
        

//         var html = ejs.render(this.template , {data : data});
//         this.list_wrapper.innerHTML = html;
//     }

//     renderBtn(){
//         let total = Math.ceil(this.total / this.showNo);
//         let btns  = this.page_wrapper.children;

//         if(btns.length === total){
//             Array.from(btns).forEach((btn , index)=>{
//                 if(index + 1 === this.pageNo){
//                     btn.className = "active";
//                 }else{
//                     btn.className = "";
//                 }
//             })
//             return false;
//         }

//         let html ="";
//         for(var i = 0;i < total; i++){
//             if(i + 1 === this.pageNo){
//                 html += `<span class='active'>${i+1}</span>`;
//             }else{
//                 html += `<span>${i+1}</span>`;
//             }
//         }
//         this.page_wrapper.innerHTML = html;
//     }

//     toIndex(index){
//         this.pageNo = index + 1;
//     }
// }

//1.获取数据;
//2.截取数据;
//3.渲染页面;
//4.渲染分页按钮;

// class Pagination{
//     constructor(){

//     }
    
//     init({
//         list = "",
//         page = "",
//         getData = {
//             url = "",
//             data = {}
//         },
//         pageNo = "4",
//         showNo = "5",
//         template = ""
//     } = {}){
//         this.wrapper    = list;
//         this.pagination = page;

//         this.data       = getData.data;
//         this.url        = getData.url;
//         this.showNo     = showNo;
//         this.pageNo     = pageNo;
//         this.template   = template;

//         on(this.pagination , "click" , (evt)=>{
//             this.toIndex(evt.target.index());
//             this.render();
//             this.renderBtn();
//         })
//         this.res        = await this.loadData();
//         this.total      = this.res.data.contents.length;
//     }

//     //获取数据;
//     async loadData(){
//         //通过封装的ajax进行服务器取值;
//         let res = await ajax(this.url , {data:this.data , dataType : "json"} , "span");
//         return res;
//     }

//     //截取数据;
//     interceptDate(data){
//         //获取当页最小数据量;
//         let min = this.pageNo * (this.showNo - 1);
//         //获取当页最大数据量
//         let max = this.pageNo * this.showNo - 1;

//         data = data.filter((item , index)=>{
//             return index >=min && index <=max;
//         })

//         return data;
//     }

//     //渲染页面
//     render(){
//         //获取数据
//         let data = this.res.data.contents;
//         //处理数据
//         data     = this.interceptDate(data);

//         //处理模板引擎;
//         let html = ejs.render(this.template , {data : data});
//         //渲染页面;
//         this.wrapper.innerHTML = html;
//     }

//     //渲染分页按钮;
//     renderBtn(){
//         let total = Math.ceil(this.total / this.showNo);
//         let btns  = this.pagination.children;
//         if(btns.length === total){
//             Array.from(btns).forEach((btn , index)=>{
//                 if(index + 1 === this.pageNo){
//                     btn.className = "active";
//                 }else{
//                     btn.className = "";
//                 }
//             })
//             return false;
//         }

//         let html = "";
//         for(var i = 0 ; i<total ; i++){
//             if(i + 1 === this.pageNo){
//                 html += `<span class = active>${i+1}</span>`;
//             }else{
//                 html += `<span>${i+1}</span>`;
//             }
//         }
//         this.pagination.innerHTML = html;
//     }
//     toIndex(index){
//         this.pageNo = index + 1;
//     }
// }

class Pagination{
    constructor(){

    }

    async init({
        list        = "",
        page        = "",
        getDate     = {
            url     = "",
            data    = ""
        },
        pageNo      = 4,
        showNo      = 5,
        template    = ""
    }){
        this.list_wrapper   = $(list);
        this.page_wrapper   = $(page);

        this.list           = list;
        this.page           = page;
        this.url            = getDate.url;
        this.data           = getDate.data;
        this.pageNo         = pageNo;
        this.showNo         = showNo;
        this.template       = template;

        //添加事件
        on(this.page_wrapper , "click" , (evt)=>{
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        } , "span");
        //调用函数
        let res    = await this.loadData();
        this.total = res.data.contents.length;

    }

    async loadData(){
        let res = await ajax(this.url , {data : this.data , dataType : "json"});
        return res;
    }

    interceptData(data){
        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter((item , index)=>{
            return index >= min && index <= max;
        })

        return data;
    }

    render(){
        let data = this.res.data.contents;
        data     = this.interceptData(data);

        //编辑页面;
        let html = ejs.render(this.template , {data : data})
        this.list_wrapper.innerHTML = html;
    }

    renderBtn(){
        let total = Math.ceil(this.total / this.showNo);
        let btns  = this.page_wrapper.children;
        
        //如果按钮数量到达标准，则只改变对应按钮的样式，阻止页面的回流
        if(btns.length === total){
            Array.from(btns).forEach((btn , index)=>{
                if(index + 1 === this.pageNo){
                    btn.className = "active"
                }else{
                    btn.className = "";
                }
            })
            return false;
        }

        let html = "";
        for(var i = 0; i < total ; i++){
            if(i + 1 === this.pageNo){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html +=`<span>${i+1}</span>`
            }

            this.page_wrapper.innerHTML = html;
        }
    }

    toIndex(index){
        this.pageNo = index +1;
    }
}