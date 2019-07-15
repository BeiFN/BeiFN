let {
      ajax,
      $,
      on
} = Utils;
class waterFall {
      constructor() {
            this.init();
      }

      async init() {
            this.container = $(".container")
            this.imageList = $(".wrapper")
            this.url = "http://localhost/dt";
            this.data = {
                  include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "人物明星",
                  // start : start
            }
            this.res = await this.loadData();
            this.render();
            let timer = null;
            on(window, "resize", () => {
                  clearTimeout(timer)
                  timer = setTimeout(() => {
                        this.changeWidth();
                        timer = null;
                  }, 500)
            });

      }
      //获取数据
      async loadData() {
            let res = await ajax(this.url, {
                  data: this.data,
                  dataType: "json"
            })
            console.log(res.data.object_list);
            return res.data.object_list;
      }
      //  渲染图
      render() {
            let html = "";
            for (let i = 0; i < this.res.length; i++) {
                  html +=
                        `<div class="box">

                  <div class="box-img">
                        <img src="${this.res[i].photo.path}" alt="">
                  </div>

                  <div class="box-detail">
                        <div class="title">
                              ${this.res[i].msg}
                        </div>
                  </div>
            </div>`;
            }
            html = ejs.render(html, {
                  data: this.data
            });
            this.imageList.innerHTML = html;
      }
      changeWidth() {
            let count;
            let C_width = document.documentElement.clientWidth;
            count = parseInt(C_width / 250);
            this.container.style.width = count * 250 + "px";
      }

}

new waterFall();