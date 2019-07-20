import {init} from "./init.js"
function Pagination() {
      this.constructor();
}
$.extend(Pagination.prototype, {
      constructor: function ({
            //图片列表
            imgList = ".image-list",
            //分页栏
            page_wrapper = ".pagination",
            //通过ajax访问获取数据 有路径和data需要拼接的参数
            bigData = {
                  url: "http://localhost/zc",
                  data: {
                        pageSize: 100,
                        contentId: ("" + Date.now()).slice(6) + "_3",
                        day: new Date().toISOString().slice(0, 10)
                  }
            },
            //模板引擎 通过ejs.render(tamplate,data)
            template = $("#template")[0].innerHTML,
            //设置当前页
            pageNow = 1,
            //设置一页显示几个
            pageSize = 5
      } = {}) {
            this.imgList = $(imgList);
            this.page_wrapper = $(page_wrapper);
            this.url = bigData.url
            this.data = bigData.data;
            this.template = template;
            this.pageNow = pageNow
            this.pageSize = pageSize;
            init();
      },
      loadData: function () {
            //通过jQuery的ajax方式请求数据
            return $.ajax({
                  url: this.url,
                  data: this.data
            })
      }
})
var pagination = new Pagination();
// console.log(pagination)
export {pagination};