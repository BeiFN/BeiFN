import  Pagination  from "./index.js"
import Render from "./render.js"
export default function (){
      var pagination = new Pagination();
      // console.log(this.imgList)
      //  事件委托;给页码的盒子添加事件委托 改变索引 渲染图片 渲染按钮
      //绑定on事件只能是实例么
      var r;
      var total;
      pagination.page_wrapper.on("click", "span", function (evt) {
            var e = evt || event
            var target = e.target || e.srcElement
            //改变下标
            Render.toIndex($(target).index())
            // console.log(this)指向的是pagination实例
            Render.render(r)
            Render.renderBtn(total);
      })
      function loadData() {
            //通过jQuery的ajax方式请求数据
            return $.ajax({
                  url: pagination.url,
                  data: pagination.data
            })
      }
      //加载图片数据比较慢 我们放到异步的程序中执行 他之后的程序都成为异步 但是仅限于当前的{}中
      loadData().done(function (res) {
            // console.log(res)
            // console.log(this)
            r = res
            //获取数据中所有数组的长度
            total = Array.from(res.data.contents).length
            //渲染页面
            Render.render(res);
            //渲染按钮
            Render.renderBtn(total);
      })
}