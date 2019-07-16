// 1、渲染 按钮 box
// 2、按钮绑定事件（事件委托），点击按钮分页，获取数据，

let {$ , ajax , on , ejs} = Utils;
class Pagination{
    constructor(){

        this.init();
    }
    async init(){
        this.page_wrapper = $(".pagination");
        this.list_wrapper = $(".img-list");
        this.page_No = 1;
        this.show_No = 5;

        on(this.page_wrapper,"click",evt => {
            this.toIndex(evt.target.index());
            this.renderBtn();
            this.renderPage();
        },"span")

        this.res = await this.loadData();
        this.total = this.res.data.contents.length;
        this.renderPage();
        this.renderBtn();
        // console.log(this.res);
    }
    //加载数据
    async loadData(){
        let url = "http://localhost/zc";
        let data = {
            pageSize : 20,
            contentId : (""+new Date().getTime()).slice(6) ,
            day : new Date().toISOString().slice(0,10)
        }
        let res = await ajax(url,{
            data : data,
            dataType : "json"
        })
        return res;
    }    
    //渲染页面
    renderPage(){
        let data = this.res.data.contents;
        data = this.cutPage(data);
         
        let template = `<%for(let i = 0 ,item ; item = data[i] ; i ++){%>
                            <div class="box">
                                <div class="box-img">
                                    <img src="<%=item.cover%>" alt="">
                                </div>
                                <div class="box-title">
                                    <a href=""><%=item.title%></a>
                                    <span class="fire"></span>
                                </div>
                            </div>
                        <%}%>`
        var html = ejs.render(template,{data : data});
        this.list_wrapper.innerHTML = html;
    }
    //剪裁数据
    cutPage(cut_data){
        // 0~4
        // 5~9
        // 10~14
        // 15~19
        // 5(n-1)~5n-1
        // let n = this.total / this.show_No;
        let min = this.show_No * (this.page_No - 1);
        let max = this.show_No * this.page_No - 1;
        //两个参数，当前正在处理的元素，当前正在处理元素的下标
        cut_data = cut_data.filter((item,index) => {
            if(index >= min && index <= max){
                return item;
            }
        })
        return cut_data;
    }
    //渲染按钮
    renderBtn(){
        let count = Math.ceil(this.total / this.show_No);
        //改变按钮类名，换颜色
        let btns = this.page_wrapper.children;
        // console.log(btns); 
        if(btns.length === count){
            // console.log(typeof btns);
            Array.from(btns).forEach((item , index) => {
                if(index + 1 === this.page_No){
                    item.className = "active";
                }else{
                    item.className = "";
                }
            });
            return false;
        }

        let html = "";
        for(let i = 0 ; i < count ; i ++){
            if( i + 1 === this.page_No){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
            this.page_wrapper.innerHTML = html;
        }    
    }
    //分页
    toIndex(index){
        this.page_No = index + 1;
    }  
}

new Pagination();