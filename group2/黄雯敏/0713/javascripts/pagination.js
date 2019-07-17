let {ajax} = Utils;
class Pagination{
    construction(){
        this.init();
    }
    //初始化：以数据加载开始；事件委托
    //Init方法的返回值是promise
    async init(){
        this.res = await this.loadData();
        //console.log(res);
        this.render(res);
    }
    //加载数据

    //把所有配置放在loaddata里
    async loadData(){
        let url = "http://localhost/zc";
        let data = {
            pageSize : 100,
            //contendId : "8410753_3",
            contendId : ("" + Date.now().slice(6) + "_3"),
            day : new Date().toISOString().slice(0,10)
        }
        // ajax(url,{data})
        // .then()
        //await等待前面的程序执行完再执行之后的
        let res = await ajax(url,{data : data , dataType : "json"});
        return res;

    }
    //渲染页面
    render(){
        let data = this.res.data.contents;
        //
        let template = `
                        <% for(var i = 0 , item ; item = data[i] ; i++){ %> 
                                    <div class="box">
                                        <div class="box-img">
                                            <img src="<%=item.cover%>" alt="">
                                        </div>
                                        <div class="box-title">
                                            <a href="">
                                                <% = item.title %>
                                            </a>
                                            <span class="fire"></span>
                                        </div>
                                    </div>
                            <% } %> `;
        var html = ejs.render(template , {data : data});
        console.log(html);
    }
    toIndex(){

    }
}