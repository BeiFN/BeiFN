
let {ajax , on ,$ ,delegation} = Utils


class Pagination{
    constructor(){
        this.init();
    }
    async init(){
        this.container = $(".container");
        this.res = await this.loadData();
            console.log(this.res);  

        //获取数据后 => 渲染页面
        this.render();

    }
    //加载数据
    async loadData(){
        let url = "http://localhost/zc";
        let data = {
            pageSize : 21,//这里的数据最多就20条
            // contentId : 9197857_3,//T猜是时间戳
            contentId :( "" + Date.now()).slice(6) +"_3",
            day : new Date().toJSON().slice(0,10)
        }
        // ajax(url , {data}) //{"code":0,"msg":"success","data":{"contents":[],"day":"2019-07-13"}}
        let res = await ajax(url , {data , dataType : "json"})
        return res;
    }

    // // // 渲染页面   需要用到模板
    render(){
        let data = this.res.data.contents;
        let template = `
                    <% for (let i = 0 ,item; item = data[i];i++) %>
                        <div class="bigwrapper">
                            <div class="imgbox">
                                <img src="<%= item.cover %>" alt="">
                            </div>
                            <div class="titlebox">
                                <a href=""><%= item.title %> </a>
                                <span class="fire"></span>
                            </div>
                        </div>
                    <% } %>`;       
        ejs.render(template , {data : data}); // 问题 ： 为什么不能是data；******************************************
        this.container.innerHTML = html;
    }
    //切换页面
    nextPage(){

    }
    precPage(){

    }
    toPage(){

    }
}
new Pagination();





/**
 * 获取数据 =>  渲染页面 =>（一个页面有20个，只要5个）所以要 裁剪页面
 * 
 */