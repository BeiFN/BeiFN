// let { ajax: myAJAX, $: $$, on } = Utils;
// class Pagination {
//       constructor() {
//       }
//       async init({
//             list = "",
//             page = "",
//             getData = {
//                   url: "",
//                   data: {}
//             },
//             template = "",
//             pageNo = 1,
//             showNo = 5
//       } = {}) {
//             this.list_wrapper = $$(list);
//             this.page_wrapper = $$(page);
//             this.pageNo = pageNo;
//             this.showNo = showNo;
//             this.url = getData.url;
//             this.data = getData.data;
//             this.template = template;
//             // 1. 以数据加载开始;
//             // 2. 事件委托;
//             on(this.page_wrapper, "click", (evt) => {
//                   this.toIndex(evt.target.index());
//                   this.render();
//                   this.renderBtn();
//             }, "span");
//             this.res = await this.loadData();
//             // console.log(this.res);
//             this.total = this.res.data.contents.length;
//             this.render();
//             this.renderBtn();
//       }
//       // 加载数据;
//       async loadData() {
//             // let res = await myAJAX({ url: this.url, data: this.data, data_type: "json" });
//             let res = await $.ajax({ url: this.url, data: this.data, dataType: "json" });
//             // console.log(res);
//             return res;
//       }
//       // 渲染页面;
//       render() {
//             let data = this.res.data.contents;
//             // 处理data;
//             data = this.interceptData(data);
//             // console.log(data);
//             console.log(this.template);
//             var html = ejs.render(this.template, { data: data });
//             console.log(html);
//             this.list_wrapper.innerHTML = html;
//       }
//       //裁剪数据;
//       interceptData(data) {
//             // 裁剪;
//             let min = this.showNo * (this.pageNo - 1);
//             let max = this.showNo * this.pageNo - 1;
//             data = data.filter((_item, index) => {
//                   return index >= min && index <= max;
//             })
//             return data;
//       }
//       // 渲染按钮;
//       renderBtn() {
//             let total = Math.ceil(this.total / this.showNo);
//             let btns = this.page_wrapper.children;
//             // 不用重新渲染按钮，只需要切换active就可以了;
//             if (btns.length === total) {
//                   Array.from(btns).forEach((btn, index) => {
//                         if (index + 1 === this.pageNo) {
//                               btn.className = "active";
//                         } else {
//                               btn.className = "";
//                         }
//                   });
//                   return false;
//             }
//             // 渲染按钮;
//             let html = "";
//             for (var i = 0; i < total; i++) {
//                   if (i + 1 === this.pageNo) {
//                         html += `<span class=active>${i + 1}</span>`;
//                   } else {
//                         html += `<span>${i + 1}</span>`;
//                   }
//             }
//             this.page_wrapper.innerHTML = html;
//       }
//       // 切换页码;
//       toIndex(index) {
//             // console.log(index);
//             this.pageNo = index + 1;
//       }
// }

function Pagination() {

}
$.extend(Pagination.prototype, {
      init: function (
            list = "",
            page = "",
            getData = {
                  url: "",
                  data: {}
            },
            template = "",
            pageNo = 1,
            showNo = 5
      ) {
            this.list_wrapper = $(list);
            this.page_wrapper = $(page);
            this.pageNo = pageNo;
            this.showNo = showNo;
            this.url = getData.url;
            this.data = getData.data;
            this.template = template;
            // console.log(list,page,getData,template,pageNo,showNo);
            // 1. 以数据加载开始;
            // 2. 事件委托;
            $(this.page_wrapper).on("click", "span", $.proxy(function (evt) {
                  var e=evt||window.event;
                  this.toIndex(Array.from(e.target.parentNode.children).indexOf(e.target));
                  this.render();
                  this.renderBtn();
            }, this));
            this.loadData().then($.proxy(function (res) {
                  // console.log(res);
                  this.res=res;
                  this.total = res.data.contents.length;
                  this.render();
                  this.renderBtn();
            }, this));
      },
      loadData: function () {
            return $.ajax({ url: this.url, data: this.data, dataType: "json" });
      },
      render: function () {
            var data = this.res.data.contents;
            // 处理data;
            data = this.interceptData(data);
            // console.log(data);
            // console.log(2,0,this.template);
            var html = ejs.render(this.template, { data: data });
            // console.log(html);
            this.list_wrapper.html(html);
      },
      interceptData: function (data) {
            // 裁剪;
            var min = this.showNo * (this.pageNo - 1);
            var max = this.showNo * this.pageNo - 1;
            data = data.filter(function(_item, index) {
                  return index >= min && index <= max;
            })
            return data;
      },
      renderBtn: function () {
            var total = Math.ceil(this.total / this.showNo);
            var btns = this.page_wrapper.children();
            // 不用重新渲染按钮，只需要切换active就可以了;
            if (btns.length === total) {
                  Array.from(btns).forEach((btn, index) => {
                        if (index + 1 === this.pageNo) {
                              // btn.className = "active";
                              $(btn).attr("class","active");
                        } else {
                              // btn.className = "";
                              $(btn).attr("class","");
                        }
                  });
                  return false;
            }
            // 渲染按钮;
            var html = "";
            for (var i = 0; i < total; i++) {
                  if (i + 1 === this.pageNo) {
                        html += `<span class=active>${i + 1}</span>`;
                  } else {
                        html += `<span>${i + 1}</span>`;
                  }
            }
            this.page_wrapper.html(html);
      },
      toIndex: function (index) {
            // console.log(index);
            this.pageNo = index + 1;
      }
});