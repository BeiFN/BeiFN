//分组
//1.  0 ~ 4
//2.  5 ~ 9
//3. 10 ~ 14
//4. 15 ~ 19
//n. 5 * (n-1) ~ 5n - 1

//渲染  ejs.render(template , data)
//事件 ，事件委托
//切换页码，重新渲染

let{ ajax , $ , on , ejs} = Utils;
class Pagination{
    constructor(){

    }
    async init({
        list = "",
        page = "",
        getDate = {
            url : "",
            data : {}
        },
        template = "",
        pageNo = 1,
        showNo = 5
    } = {}){
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo = pageNo;
        this.showNo = showNo;
        this.url = getDate.url;
        this.data = getDate.data;
        this.template = template;
        //1. 以数据加载开始
        //2. 事件委托
        on(this.page_wrapper, "click", (evt)=> {
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        },"span");
        this.res = await this.loadDate();
        console.log(this.res);
        this.total = this.res.data.contents.length;
        this.render();
        this.renderBtn();
    }
    //加载数据
    async loadDate(){
        let res = await ajax(this.url , {data : this.data, dataType : "json"});
        return res;
    }

    //渲染页面
    render(){
        let data = this.res.data.contents;
        data = this.interceptDate(data);
        var html = ejs.render(this.template,{data : data});
        this.list_wrapper.innerHTML = html;
    }



    //渲染按钮
    renderBtn(){
        console.log(1);
        let total = Math.ceil(this.total / this.showNo);
        let btns = this.page_wrapper.children;
        //不用重新渲染按钮
        if(btns.length === total){
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1 === this.pageNo){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            })
            return false;
        }
        //渲染按钮
        let html = "";
        for(var i = 0; i < total ; i++){
            if(i + 1 ===this.pageNo){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.page_wrapper.innerHTML = html;
    }

    //切换页码
    toIndex(index){
        this.pageNo = index + 1;
    }

    //裁剪数据
    interceptDate(data){
        let min = this.showNo * (this.pageNo -1);
        let max = this.showNo * this.pageNo -1;
        data = data.filter((item,index) =>{
            return index >= min && index <= max;
        })
        return data
    }
}