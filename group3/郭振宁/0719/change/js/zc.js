/* 
*
* 
*/
import loadData from "./loaddata.js";
let { ajax , $ , on , ejs} = Utils;

var s = jQuery;

class Pagination {
    constructor() {
    }
    init({
        list = "",
        page = "",
        getData = {
            url : "",
            data : {}
        },
        template = "",
        pageNo = 1,
        showNo = 5
    } = {}) {
        this.list_warpper = $(list);
        this.page_warpper = $(page);
        this.pageNo       = pageNo;
        this.showNo       = showNo;
        this.template     = template;
        //事件委托改变页码和图片
        on(this.page_warpper , "click" , (evt) => {
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtns();
        } , "span")

        // this.res = await this.loadData();
        loadData(s)
        .then(s.proxy(function(res) {
            this.total = res.data.contents.length;
            this.res = res;
            this.render();
            this.renderBtns();
        },this))
    }
    //加载数据
    // loadData() {
    //     // let res = await ajax( this.url , {data : this.data , dataType : "json"});
    //     return s.ajax( this.url , {data : this.data , dataType : "json"});
    //     // return res;
    // }
    //渲染图片
    // render() {
    //     let data = this.res.data.contents;
    //     data = this.interceptData(data);
    //     console.log(data);


    //     let html = ejs.render(this.template , {data : data});
    //     // console.log(html);
    //     this.list_warpper.innerHTML = html;
    // }
    // //裁剪数据
    // // 1  0  4
    // // 2  5  9
    // // 3  10 14
    // // 4  15 19
    // //    5*(n-1) 5n-1
    // interceptData(data) {
    //     let min = this.showNo * ( this.pageNo - 1);
    //     let max = this.showNo * this.pageNo - 1;
    //     data = data.filter(function(item , index) {
    //         return index >= min && index <= max;
    //     })

    //     return data;
    // }
    // renderBtns() {
    //     let total = Math.ceil(this.total / this.showNo);
    //     let btns = this.page_warpper.children;
    //     //如果不是第一次渲染，那么只需要改变classname来只指定按钮变色
    //     if(btns.length === total) {
    //         Array.from(btns).forEach((item , index) => {
    //             if(index + 1 === this.pageNo) {
    //                 item.className = "active";
    //             }else {
    //                 item.className = "";
    //             }
    //         })
    //         return false;
    //     }
    //     let html = "";
    //     for(var i=0; i<total; i++) {
    //         if(i+1 === this.pageNo) {
    //             html += `<span class="active">${i+1}</span>`;
    //         }else {
    //             html += `<span>${i+1}</span>`;
    //         }
    //     }
    //     this.page_warpper.innerHTML = html;
    // }
    // toIndex(index) {
    //     this.pageNo = index + 1;
    // }
}
export default new Pagination();
