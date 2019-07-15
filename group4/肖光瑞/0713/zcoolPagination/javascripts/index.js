// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  1 ~ 6 
// 2.  7 ~ 12
// 3. 13 ~ 18
// 4. 19 ~ 24 
// n. 6(n - 1) + 1 ~ 6n


// 渲染 ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件 ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染 ; 
// ejs.render( template , data);
// 页码 ; 
let { ajax, $, on } = Utils;
class Pagination {
    constructor() {
        
    }
    //获取元素绑定事件
    async init({
        list = "",
        page = "",
        getData = {
            url: "",
            data: {}
        },
        template = ""
    }) {
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.pageNo = 1;
        this.showNo = 5;
        this.url = getData.url;
        this.data = getData.data;
        this.template = template;

        on(this.page_wrapper, "click", (evt) => {
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        }, "span")

        this.res = await this.loadData();
        this.total = this.res.data.contents.length;
        this.render()
        this.renderBtn();
    }
    //加载数据
    async loadData() {
        // let url = "http://localhost/zc";
        // let data = {
        //     pageSize: 100,
        //     contentId: ("" + Date.now()).slice(6) + "_3",
        //     day: new Date().toISOString().slice(0, 10),
        // };
        let res = await ajax(this.url, { data: this.data, dataType: "json" });
        return res;
    }
    //渲染页面
    render() {
        let data = this.res.data.contents;
        data = this.interceptData(data);
        // let template = ` 
        //             <%for(var i=0,item;item = data[i];i++){%>
        //                 <div class="box">
        //                     <div class="box-img">
        //                         <img src="<%=item.cover%>" alt="">
        //                     </div>
        //                     <div class="box-title">
        //                         <a href="">
        //                             <%=item.title%>
        //                         </a>
        //                         <span class="fire"></span>
        //                     </div>
        //                 </div>
        //             <%}%>`;
        var html = ejs.render(this.template, { data: data });
        this.list_wrapper.innerHTML = html;
        // console.log(html)
    }
    //裁剪数据
    interceptData(data) {
        let min = this.showNo * (this.pageNo - 1),
            max = this.showNo * this.pageNo - 1;
        data = data.filter((item, index) => {
            return index >= min && index <= max;
        })
        // console.log(data)
        return data;
    }
    //渲染按钮 
    renderBtn() {
        let total = Math.ceil(this.total / this.showNo);
        // console.log(total)
        let btns = this.page_wrapper.children;
        if (btns.length === total) {
            Array.from(btns).forEach((btn, index) => {
                if (index + 1 === this.pageNo) {
                    btn.className = "active";
                } else {
                    btn.className = "";
                }
            })
            return false;
        }
        let html = "";
        for (let i = 0; i < total; i++) {
            if (i + 1 === this.pageNo) {
                html += `<span class='active'>${i + 1}</span>`;
            } else {
                html += `<span>${i + 1}</span>`;
            }
        }
        this.page_wrapper.innerHTML = html;
    }

    //切换页码
    prevIndex() {

    }
    nextIndex() {

    }
    toIndex(index) {
        this.pageNo = index + 1;
    }
}
new Pagination().init({
    list: ".image-list",
    page: ".pagination ",
    getData: {
        url: "http://localhost/zc",
        data: {
            pageSize: 100,
            contentId: ("" + Date.now()).slice(6) + "_3",
            day: new Date().toISOString().slice(0, 10),
        }
    },
    template: `<%for(var i=0,item;item = data[i];i++){%>
                    <div class="box">
                        <div class="box-img">
                            <img src="<%=item.cover%>" alt="">
                        </div>
                        <div class="box-title">
                            <a href="">
                                <%=item.title%>
                            </a>
                            <span class="fire"></span>
                        </div>
                    </div>
                <%}%>`
});