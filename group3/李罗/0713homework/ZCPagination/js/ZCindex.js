//一张显示几张，假设显示五张
// 1. 0-4
// 2. 5-9
// 3. 10-14
// 4. 15-19
// n. 5*(n-1)~5n-1

//渲染页面  ；box 按钮 
//事件   ；事件委托
//重新渲染
//页码

let {ajax,$,on,ejs}=Utils;

class Pagination{
    constructor(){

    }
    //初始化
    async init({
        list ="",
        page ="",
        getData={
            url : "",
            data : {}
        },
        template="",
        pageNo=1,
        showNo = 5
    }={}){
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo       = pageNo;
        this.showNo       = showNo;
        this.url          = getData.url;
        this.data         = getData.data;
        this.template     = template;

        //1.以数据加载开始
        //2.事件委托
        on(this.page_wrapper,"click",(evt)=>{
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        },"span")
        this.res = await this.loadData();
        this.total = this.res.data.contents.length;
        this.render();
        this.renderBtn();
    }

    //加载数据
    async loadData(){
        // let res= await ajax(this.url,
        //     {
        //     data: this.data,
        //     dataType:"jsonp"
        // })
        // // console.log(res);
        // return res;

        let res = await ajax( this.url , { data : this.data , dataType : "json" });
        return res;
      

        // let url="http://localhost/zc";
        // let data ={
        //     pageSize: 100,
        //     contentId:(""+Date.now()).slice(6)+"_3",
        //     day :new Date().toISOString().slice(0,10)
        // }
    }

    //渲染页面
    render(){
        let data = this.res.data.contents;
        data = this.interceptData(data);
        var html = ejs.render(this.template,{data : data})
        this.list_wrapper.innerHTML =html;
    }

    //裁剪数据
    interceptData(data){
        let min =this.showNo * (this.pageNo-1);
        let max =this.showNo * this.pageNo -1;
        data = data.filter((item,index)=>{
            return  index >= min && index <= max;
            // return index >= min && index <= max;
        })
        return data;

    }

    //渲染按钮；
    renderBtn(){
        let total = Math.ceil(this.total/this.showNo);
        let btns =this.page_wrapper.children;
        //不用重新渲染按钮，只要切换active就可以了
        if(btns.length === total){
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1  === this.pageNo){
                    btn.className="active";
                }else{
                    btn.className="";
                }
            })
            return false;
        }

        //渲染按钮上面的数字
        let html="";
        for(var i=0 ; i<total ;i++){
            if(i+1 ===this.pageNo){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`
            }
        }
        // console.log(html);
        this.page_wrapper.innerHTML=html;
    }


    //切换页码
    toIndex(index){
        this.pageNo=index+1;
    }
}