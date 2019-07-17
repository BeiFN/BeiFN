
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;

let { ajax, $, on } = Utils;
class WaterFall {
      constructor() {
            this.init();
      }
      async init() {
            this.template = $("#template");
            this.wrapper = $(".wrapper");
            this.container = $(".container");

            this.cHeight = document.documentElement.clientHeight;
            //标志变量判断是否在加载
            this.loading = false;
            //第一排放入图片数
            this.count = 0;
            this.heightArray = [];
            this.changeContainerWidth();
            let timer = null;

            on(window, "resize", () => {
                  clearTimeout(timer);
                  timer = setTimeout(() => {
                        this.changeContainerWidth();
                        this.sort();
                        timer = null;
                        this.cHeight = document.documentElement.clientHeight;
                  }, 500)

            })

            on(window, "scroll", async () => {
                  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                  if (!this.loading && scrollTop + this.cHeight >= this.minHeight - 300) {
                        this.loading = true;
                        let res = await new Load().init(this.next_start);
                        this.next_start = Load.nextStart;
                        this.render(res);
                        this.sort();
                        // 加载结束要归零;
                        this.loading = false;
                  }

            })

            let res = await new Load().init(0);
            // console.log(res)
            this.next_start = Load.nextStart;
            this.render(res);
            this.sort();

      }

      changeContainerWidth() {
            this.cWidth = document.documentElement.clientWidth;
            this.count = parseInt(this.cWidth / 250);
            this.container.style.width = this.count * 250 + "px";
      }


      render(list) {
            // let html = ejs.render(this.template.innerHTML, { data: list });

            let html = "";
            for (var i = 0; i < list.length; i++) {
                  let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
                  html += ` <div class="box">
                                    <div class="box-img" style="height:${scaleHeight}px">
                                          <img src="${list[i].photo.path}" alt="">
                                          <u style="height:${scaleHeight}px"></u>
                                    </div>
                                    <div class="box-detail">
                                          <div class="title">
                                          ${list[i].msg}
                                          </div>
                                    </div>
                              </div>`
            }
            this.wrapper.innerHTML += html;
      }

      sort() {
            let children = this.wrapper.children;
            Array.from(children).forEach((box, index) => {
                  if (index < this.count) {
                        box.style.position = "static";
                        this.heightArray.push(box.offsetHeight);
                  } else {
                        //找数组中最小的高度
                        let min = Math.min.apply(false, this.heightArray);
                        let minIndex = this.heightArray.indexOf(min);
                        box.style.position = "absolute";
                        box.style.left = minIndex * 250 + "px";
                        box.style.top = min + 20 + "px";
                        this.heightArray[minIndex] += box.offsetHeight + 20;
                  }
            })
            let maxHeight = Math.max.apply(false, this.heightArray);
            this.container.style.height = maxHeight + "px";
            this.minHeight = Math.min.apply(false, this.heightArray);
            // console.log(this.heightArray);
            this.heightArray.length = 0;
      }

}

class Load {
      constructor() {

      }
      async init(start) {
            let url = "http://localhost/dt";
            let data = {
                  include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "古风",
                  start: start,

            };
            let res = await ajax(url, { data: data, dataType: "json" });
            Load.nextStart = res.data.next_start;
            // console.log(Load.nextStart)
            return res.data.object_list;
      }
      static nextStart = 0;
}

new WaterFall();