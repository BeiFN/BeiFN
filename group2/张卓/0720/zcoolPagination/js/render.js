 // 渲染页面
 import {pagination} from "./construct.js"
function  render(res) {
    //
    var data = res.data.contents;
    data = interceptData(data);
    var html = ejs.render(pagination.template, { data: pagination.data })
    imgList.html(html) 
}
function renderBtn(total) {
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
}
//截取
function interceptData() {
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
}
function toIndex(index) {
    //页数是索引加1
    pagination.pageNow = index + 1
}
export {render,renderBtn,toIndex}