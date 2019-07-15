let { ajax , $ , on ,ejs} = Utils;
class Pagination{
    constructor(){
        this.init();//加载数据
    }
    async init({
            list = "",
            page = "",
            getData = {
                url = "",
                data : {}
            },
            template = "",
            pageNo = 1,
            showNo = 5
        } = {}

    ){
        this.list_wrapper = $("list");
        this.page_wrapper = $("page");

        this.pageNo = pageNo;
        this.showNo = showNo;
        this.url    = getData.url;
        this.data   = getData.data;
        this.template = template; 
        //1.数据加载 用到ajax
        //2.事件处理
        on(this.page_wrapper,"click",(evt)=>{
            this.toIndex(evt.target.toIndex());
            this.render();
            this.renderBtn();
        },"span")

       this.res = await this.loadData();//获取到数据
       this.total = this.res.data.contends.length;
       //渲染页面
       this.render();
       this.renderBtn();
        
    }
    //加载数据
    async loadData(){
        //配置数据参数
        // let url ="http://localhost/GP12/zcool";//本地的代理服务器
        // let data = {  //从页面从服务器返回的数据所得的键值对
        //     pageSize = 5,
        //     contentId =  (""+Date.now()).slice(6) + "_3",  //8375943_3,
        //     day = new Date().toISOString().slice(0,10)
        // }
        let res =  await ajax( url , {data,datatype:"json"});
        return res;

    }
    render(){
        let data = this.res.data.contents;
        data = this.InterceptData(data); // 处理得到的数据，解决每页显示几个
        // let template = `
        //     <% for(var i = 0 , item ; item = data[i] ; i++ ) {%>
        //         <div class="box">
        //             <div class="box-img">
        //                 <img src="<%= item.cover %>" alt="">
        //             </div>
        //             <div class="box-title">
        //                 <a href="">
        //                     <%= item.title %>
        //                 </a>
        //                 <span class="fire"></span>
        //             </div>
        //         </div>
        //     <% } %>
        // `
        let html = ejs.render(this.template,({data:data}))//根据服务器返回来的数据，利用ejs进行页面渲染
        this.list_wrapper.innerHTML = html;
    }
    // 裁剪数据,每页显示几个
    InterceptData(data){
        let min = this.showNo *(this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter((item,index)=>{
            return index >= min && index <= max;
        })
        return data;
    }
    //渲染按钮
    renderBtn(){
        let total = Math.ceil(this.total/this.showNo);//总页数
        let btns  = this.page_wrapper.children;
        //不用重新渲染按钮，只需要切换active就可以了
        if(btns.length === total ){
            Array.from(btns).forEach( (btn,index)=>{
                if(index+1 === this.pageNo){
                    btn.className = "active"
                }else{
                    btn.className = ""
                }
            })
            return false;
        }
        //写入页面
        let html = "";
        for(var i = 0; i < toatal ; i++){
            if(i+1 === this.pageNo){
                html += `<span class = active>${i+1}</span>`
            }else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.page_wrapper.innerHTML = html;
    }
    toIndex(){
        this.pageNo = index + 1;
    }
}