
// 1. 渲染页面;
// - 获取数据
// - 拼接页面;


// jQuery 改写ES6瀑布流

function WaterFall() {
      this.init();
}

$.extend(WaterFall.prototype, {
      init: function () {
            this.template = $("#template")[0];
            this.wrapper = $(".wrapper")[0];
            this.container = $(".container")[0];
            console.log(this.template);

            // 无限加载
            this.cHeight = document.documentElement.clientHeight;
            this.loading = false;
            this.next_start = 0;


            // 第一排能放下多少个元素;
            this.count = 0;
            this.heightArray = [];
            this.changeContainerWidth();
            let timer = null;

            $(window).on("resize", $.proxy(function () {//jquery使用proxy方法改变指向
                  clearTimeout(timer);
                  timer = setTimeout($.proxy(function () {
                        this.changeContainerWidth();
                        this.sort();
                        timer = null;
                        this.cHeight = document.documentElement.clientHeight;
                  }, this), 500)
            }, this));


            $(window).on("scroll", $.proxy(function () {
                  var scrollTop = $("body,html").scrollTop();
                  if (!this.loading && scrollTop + this.cHeight >= this.containerHeight - 300) {
                        this.loading = true;
                        // 加载;
                        var rest = new Load().init(this.next_start)
                              .done($.proxy(function (res) {
                                    Load.nextStart = res.data.next_start;
                                    this.next_start = Load.nextStart;
                                    res = res.data.object_list;
                                    this.render(res);
                                    this.sort();
                                    // 加载结束要归零;
                                    this.loading = false;
                              }, this))
                  }
            }, this));

            var rest = new Load().init(0).then($.proxy(function (res) {
                  console.log(res);
                  Load.nextStart = res.data.next_start;
                  this.next_start = Load.nextStart;
                  res = res.data.object_list;
                  this.render(res);
                  this.sort();
            }, this));

      },
            //宽度改变
      changeContainerWidth : function() {
            var cWidth = document.documentElement.clientWidth;
            this.count = parseInt(cWidth / 250);//每行显示图片数
            console.log(this.count);
            //     图片父视图宽度改变
            this.container.style.width = this.count * 250 + "px";
            this.sort();
      },
      
      render : function(list) {
            let html = "";
            for (var i = 0; i < list.length; i++) {
                  //图片显示高度计算
                  let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
                  html += `<div class="box">
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
      },
      
      sort : function() {
            let children = this.wrapper.children;
            console.log(children, this.count);
            this.heightArray = [];
            Array.from(children).forEach((box, index) => {

                  if (index < this.count) {
                        // console.log(box,index);
                        // console.log("第一排" , box);
                        box.style.position = "static";
                        // box.style.top      = 0;
                        this.heightArray.push(box.offsetHeight);
                        // console.log(this.heightArray);
                  } else {
                        // 找到数组之中最小的那一个;
                        let min = Math.min.apply(false, this.heightArray);
                        let minIndex = this.heightArray.indexOf(min);
                        // console.log(min , minIndex)
                        box.style.position = "absolute";
                        box.style.left = minIndex * 250 + "px";
                        box.style.top = min + 20 + "px";

                        this.heightArray[minIndex] += box.offsetHeight + 20;
                  }
            })

            var maxHeight = Math.max.apply(false, this.heightArray);
            var minHeight = Math.min.apply(false, this.heightArray);

            this.container.style.height = maxHeight + "px";
            // console.log(this.heightArray);

            this.containerHeight = minHeight;

            this.heightArray.length = 0;//高度数组
      }
});





//数据请求

function Load(){
      // this.init();
};

$.extend(Load.prototype,{
      init : function(start){
            var url = "http://localhost/dt";
            var data = {//接口参数
                  include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  // filter_id: "美食菜谱",
                  filter_id: "手工DIY",
                  start: start
            };

            // var res =$.ajax(url, { data: data, dataType: "json" }).then($.proxy(function(res){
            //       console.log(res);
            //       Load.nextStart = res.data.next_start;
            //       // 返回图片数据数组
            //       return res.data.object_list;
            // },this));
            return $.ajax(url, { data: data, dataType: "json" });
       
      },
      nextStart : 0,
});

new WaterFall();



