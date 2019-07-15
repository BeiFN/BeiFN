let {
      ajax,
      $,
      on
} = Utils;
class Pagination {
      constructor() {
            this.init();
      }

      async init() {
            // 页面中的按钮数量
            this.page_btn = $(".pagination");
            // console.log(this.page_btn);
            this.page_Size = 5; //一页有多少
            this.page_Number = 3; //第几页
            this.imageList = $(".image-list")
            this.url = "http://localhost/zc";
            this.data = {
                  pageSize: 100,
                  contentId: ("" + Date.now()).slice(6) + "_3",
                  day: new Date().toISOString().slice(0, 10)
            }
            this.res = await this.loadData();
            this.total = this.res.length;
            // console.log(this.total);
            
            this.render();
            this.renderBtn();
            on(this.page_btn, "click", (evt) => {
                  this.toIndex(evt.target.index());
                  this.render();
                  this.renderBtn();
            }, "span")

      //      this.last= $("#last");
      
      }
      //获取数据
      async loadData() {
            let res = await ajax(this.url, {
                  data: this.data,
                  dataType: "json"
            })
            // console.log(1111111);
            return res.data.contents;
      }
      //  渲染图
      render() {
            let data = this.cut(this.res);
            let template =
                  `<% for(let i = 0,item; item=data[i]; i++){ %> 
                  <div class="box">
                  <div class="box-img">
                        <img src= "<%= item.cover %>" >
                  </div>
                  <div class="box-title">
                        <a href="">
                              <%= item.title %>                              
                        </a>
                        <span class="fire"></span>
                  </div>
            </div>
            <%}%>`;
            let html = ejs.render(template, {
                  data: data
            });
            this.imageList.innerHTML = html;
      }

      // 数据裁切
      cut(data) {
            let min = this.page_Size * (this.page_Number - 1);
            let max = this.page_Size * this.page_Number - 1;
            data = data.filter((data, index) => {
                  return index >= min && index <= max;
            });
            // console.log(data);
            return data;
      }
      //  渲染按钮
      renderBtn() {
            let n1 = Math.ceil(this.total / this.page_Size);
            if (this.page_btn.children.length === n1) {
                  Array.from(this.page_btn.children).forEach((btn, index) => {
                        if (index + 1 === this.page_Number) {
                              btn.class = active;
                        } else {
                              btn.class = "";
                        }
                  })
                  return false;
            }
            let html1 = "";
            for (let i = 0; i < n1; i++) {
                  if (i + 1 === this.page_Number) {
                        html1 += ` <span class=active>${i+1}</span>`;
                  } else {
                        html1 += `<span>${i+1}</span>`;
                  }
            }
            let html = "<i>上一页</i>" + html1 + "<i>下一页</i>";
            this.page_btn.innerHTML = html;
      }
      toIndex(index) {
            this.page_Number = index;
      }
      // last(index) {
      //      index>0?index--:0;
      // }
}

new Pagination();