// 渲染页面
import Pagination from "./index.js"
var pagination = new Pagination();
function Render() {}
$.extend(Render.prototype, {
      render: function (res) {
            var data = res.data.contents;
            data = this.interceptData(data);
            var html = ejs.render(pagination.template, { data: data })
            pagination.imgList.html(html)
      },
      renderBtn: function (total) {
            var num = Math.ceil(total / pagination.pageSize)
            var html = ""
            for (var i = 0; i < num; i++) {
                  if (i == (pagination.pageNow - 1)) {
                        html += `<span class=active>${i + 1}</span>`
                  } else {
                        html += `<span>${i + 1}</span>`
                  }
            }
            pagination.page_wrapper.html(html)
      },
      interceptData: function (data) {
            //计算最小值和最大索引  1   0  4      2   5  9    3 10
            var min = (pagination.pageNow - 1) * pagination.pageSize
            var max = pagination.pageNow * pagination.pageSize - 1
            //卡住 如何返回完整的data
            var arr = []
            $.each(data, function (index, item) {
                  if (index >= min && index <= max) {
                        arr.push(item)
                  }
            })
            return arr;
      },
      toIndex: function (index) {
            //页数是索引加1
            pagination.pageNow = index + 1
      }

})
export default new Render();