let { ajax , $ , on , ejs} = Utils;

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
        showNO = 5
    } = {}){
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo       = pageNO;
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
    }
    async loadData(){
        let res = await ajax(this.url , {data : this.data,dataType : "json"});
        return res;
    }
    render(){
        let data = this.res.data.contents;
        data = this.interceptData(data);
        var html = ejs.render(this.template , {data : data})
        this.list_wrapper.innerHTML = html;
    }
    interceptData(data){
        let min = this.showNo * ( this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter((item , index) =>{
            return index >= min && index <= max;
        })
        return data;
    }
    renderBtn(){
        let total = Math.ceil(this.total / this.showNo);
        let btns = this.page_wrapper.children;
        if(btns.length === total){
            Array.from(btns).forEach(( btn , index) => {
                if(index + 1 === this.pageNo){
                    btn.className = "active"
                }else{
                    btn.className = "";
                }
            })
            return false;
        }
        let html = "";
        for(var i = 0 ; i < total ; i++){
            if(i + 1 === this.pageNo){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.page_wrapper.innerHTML = html;
    }
    toIndex(index){
        this.pageNo = index + 1;
    }
}