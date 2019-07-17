// 本地 模拟数据
locationData = zcData.data.contents;
// console.log(locationData);

/*** 分页器实现原理
 * 首先是数据驱动
 * 我们把数据传入,让插件自动实现分页
 *  其中几个核心的逻辑我们要考虑道
 *  1. 数据会改变，数据的改变使我们必须要动态的渲染数据
 *  2. 样式可定制，分页插件发要尽量的提高可复用性
 *  3. 根据数据驱动模板优于定义在JS中的不可定义
 *  4. bug* 我们还要找到一种方法既可以让用户定义 而不用复杂的与渲染模板语法
 * ！！！ 待更新 ！
 */

// locationData =

let $$ = $.noConflict();


class Paginator {
    constructor({
        data = {},
        pageSize = 5,
    } = {}) {
        this.data = data;
        this.pageSize = pageSize;
        this.pageIndex = 0;
        this.imgList = $(".image-list");
        this.template = $("#template").html();
        this.btTemplate = $("#buttontemplate").html();
        this.paginWrapper = $(".pagination");
        this.btnCount = Math.ceil(data.length / pageSize);
        this.initialize();
    }
    initialize() {
        this.page(this.pageIndex);
        this.paginWrapper.on("click", (ev) => {

            let e = ev || window.event;

            let captureE = e.target || e.srcElement;
            console.log(captureE);
            let childrens = Array.from(captureE.parentNode.children);
            let index = captureE.attr("data-pg");
            this.pageIndex = index;
            childrens.forEach(e => {
                e.classRemove("active");
            });
            captureE.classAdd("active");
            this.page(index);
        }, "span");
        this.renderPagination();
    }

    page(number) {
        number++;
        let min = this.pageSize * (number - 1);
        let max = this.pageSize * number - 1;
        let res = this.data.filter((item, index) => {
            return index >= min && index <= max;
        })
        //视图渲染
        let html = Parser(this.template, res);
        this.imgList.html(html);
        return res;
    }




    //渲染按钮
    renderPagination() {
        // console.log(this.btnCount);
        // 生成渲染数据
        let bts = [];
        for (let i = 0; i < this.btnCount; i++) {
            this.pageIndex === i ? bts.push({
                class: "active",
                pg: i
            }) : bts.push({
                class: "",
                pg: i
            });
        }
        // // 渲染按钮;
        //    console.log( Parser(this.btTemplate, bts)) ;
        this.paginWrapper.html(Parser(this.btTemplate, bts));
    }


}


new Paginator({
    data: locationData
})


$$(document).ready(function () {
    let url = "http://localhost/zc";
    let data = {
        pageSize: 100,
        contentId: ("" + Date.now()).slice(6) + "_3",
        day: new Date().toISOString().slice(0, 10)
    }

    let remoteData = $$.ajax(url, {
        data: data,
        success: function (response) {
            new Paginator({
                data: response.data.contents
            })

        }
    }).then((res) => {
        console.log(res)
    }, (xhr, res, ms) => {
        console.log(res, ms);
    });
});