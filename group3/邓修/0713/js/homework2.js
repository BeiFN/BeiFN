// let { ajax: myAJAX, $: $$, on } = Utils;
// console.log(ajax,$,on);
// class WaterFall {
//     constructor() {
//         this.init();
//     }
//     async init() {
//         this.load_url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";//加载中图片
//         this.container = $$(".container");
//         this.wrapper = $$(".wrapper");
//         //屏幕高度
//         this.cHeight = document.documentElement.clientHeight;
//         //是否正在加载
//         this.loading = false;
//         //第一排能放下几个元素
//         this.count = 0;
//         //存放每列的高度数组
//         this.heightArray = [];
//         //获取容器宽度并计算count
//         this.changeContainerWidth();
//         let timer = null;
//         this.timer = null;
//         on(window, "resize", () => {
//             clearTimeout(timer);
//             timer = setTimeout(() => {
//                 this.changeContainerWidth();
//                 this.sort();
//                 this.getAllImgTop();
//                 timer = null;
//                 this.cHeight = document.documentElement.clientHeight;
//             }, 500);
//         });
//         on(window, "scroll", async () => {
//             let res = null;
//             let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//             if (!this.loading && scrollTop + this.cHeight >= this.minContainerHeight - 500) {
//                 this.loading = true;
//                 //加载
//                 res = await new Load().init(Load.next_start);
//                 this.render(res);
//                 this.sort();
//                 this.getAllImgTop();
//                 //加载结束将加载标志变量复原
//                 this.loading = false;
//             }
//             if (this.timer != null) return false;
//             this.timer = setTimeout(() => {
//                 // console.log(1);
//                 this.imgShow();
//                 this.timer = null;
//             }, 100);
//         });
//         let res = await new Load().init(0);
//         this.render(res);
//         this.sort();
//         this.getAllImgTop();
//         this.imgShow();
//         // let res=new Load().init(0);
//         // console.log(res,Load.next_start);
//     }
//     changeContainerWidth() {
//         let cWidth = document.documentElement.clientWidth;
//         this.count = parseInt(cWidth / 250);
//         this.container.style.width = this.count * 250 + "px";
//     }
//     //渲染页面
//     render(list) {
//         let html = "";
//         for (var i = 0; i < list.length; i++) {
//             let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
//             html += `<div class="box" data-img=${list[i].photo.path}>
//                         <div class="box-img" style="height:${scaleHeight}px">
//                             <img src="${this.load_url}" alt="">
//                             <u style="height:${scaleHeight}px"></u>
//                         </div>
//                         <div class="box-detail">
//                             <div class="title">
//                                 ${list[i].msg}
//                             </div>
//                         </div>
//                     </div>`
//         }
//         this.wrapper.innerHTML += html;
//     }
//     //对图片进行排序
//     sort() {
//         let children = this.wrapper.children;
//         Array.from(children).forEach((box, index) => {
//             if (index < this.count) {
//                 box.style.position = "static";
//                 this.heightArray.push(box.offsetHeight);
//             }
//             else {
//                 let min = Math.min.apply(false, this.heightArray);
//                 let minIndex = this.heightArray.indexOf(min);
//                 box.style.position = "absolute";
//                 box.style.left = minIndex * 250 + "px";
//                 box.style.top = min + 20 + "px";
//                 this.heightArray[minIndex] += box.offsetHeight + 20;
//             }
//         });
//         let maxHeight = Math.max.apply(false, this.heightArray);
//         let minHeight = Math.min.apply(false, this.heightArray);
//         this.container.style.height = maxHeight + "px";
//         this.minContainerHeight = minHeight;
//         this.heightArray.length = 0;
//     }
//     //获取所有图片相对于文档顶部的Top值
//     getAllImgTop() {
//         this.boxs = Array.from(this.wrapper.children);
//         // console.log(boxs);
//         this.boxs.forEach(box => {
//             box.setAttribute("data-top", box.offsetTop);
//         });
//     }
//     //根据滚动条件显示图片
//     imgShow() {
//         let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
//         this.boxs.forEach(box => {
//             let box_top = box.getAttribute("data-top");
//             if (scrollTop + this.cHeight >= box_top - 500) {
//                 // console.log(img);
//                 let src = box.getAttribute("data-img");
//                 box.children[0].children[0].src = src;
//             }
//         });
//     }
// }
// class Load {
//     constructor() {
//     }
//     async init(start) {
//         let url = "http://localhost/dt";
//         let data = {
//             include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
//             filter_id: "美食菜谱",
//             start: start
//         };
//         // let res = await myAJAX({
//         //     url: url,
//         //     data: data,
//         //     data_type: "json"
//         // });
//         let res = await $.ajax({
//             url: url,
//             data: data,
//             data_type: "json"
//         });
//         // console.log(res);
//         Load.next_start = res.data.next_start;
//         return res.data.object_list;
//     }
//     static next_start = 0;
// }
// new WaterFall();




function WaterFall() {
    this.init();
}
$.extend(WaterFall.prototype, {
    init: function () {
        this.load_url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";//加载中图片
        this.container = $(".container");
        this.wrapper = $(".wrapper");
        //屏幕高度
        this.cHeight = document.documentElement.clientHeight;
        //是否正在加载
        this.loading = false;
        //第一排能放下几个元素
        this.count = 0;
        //存放每列的高度数组
        this.heightArray = [];
        //获取容器宽度并计算count
        this.next_start = 0;
        this.changeContainerWidth();
        var timer = null;
        this.timer = null;
        $(window).on("resize", $.proxy(function () {
            clearTimeout(timer);
            timer = setTimeout($.proxy(function () {
                this.changeContainerWidth();
                this.sort();
                this.getAllImgTop();
                timer = null;
                this.cHeight = document.documentElement.clientHeight;
            }, this), 500);
        }, this));
        $(window).on("scroll", $.proxy(function () {
            var res = null;
            var scrollTop = $("html,body").scrollTop();
            if (!this.loading && scrollTop + this.cHeight >= this.minContainerHeight - 500) {
                this.loading = true;
                // console.log(3);
                //加载
                new Load().init(this.next_start).then($.proxy(function (res) {
                    // console.log(2,res);
                    this.render(res.data.object_list);
                    this.sort();
                    this.getAllImgTop();
                    //加载结束将加载标志变量复原
                    this.loading = false;
                    //下一次数据开始获取的地方
                    this.next_start = res.data.next_start;
                }, this));
            }
            if (this.timer != null) return false;
            this.timer = setTimeout($.proxy(function () {
                // console.log(1);
                this.imgShow();
                this.timer = null;
            }, this), 100);
        }, this));
        new Load().init(0).then($.proxy(function (res) {
            this.render(res.data.object_list);
            this.sort();
            this.getAllImgTop();
            this.imgShow();
            // var res=new Load().init(0);
            // console.log(res,Load.next_start);
            //下一次数据开始获取的地方
            this.next_start = res.data.next_start;
        }, this));
    },
    changeContainerWidth: function () {
        var cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth / 250);
        this.container.css("width", this.count * 250 + "px");
    },
    //渲染页面
    render: function (list) {
        var html = "";
        for (var i = 0; i < list.length; i++) {
            var scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box" data-img=${list[i].photo.path}>
                        <div class="box-img" style="height:${scaleHeight}px">
                            <img src="${this.load_url}" alt="">
                            <u style="height:${scaleHeight}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${list[i].msg}
                            </div>
                        </div>
                    </div>`
        }
        this.wrapper.html(this.wrapper.html() + html);
    },
    //对图片进行排序
    sort: function () {
        var children = this.wrapper.children();
        // console.log(Array.from(children),this.count);
        Array.from(children).forEach($.proxy(function (box, index) {
            if (index < this.count) {
                $(box).css("position", "static");
                // console.log(4,$(box).outerHeight());
                this.heightArray.push($(box).outerHeight());
            }
            else {
                var min = Math.min.apply(false, this.heightArray);
                // console.log(this.heightArray);
                var minIndex = this.heightArray.indexOf(min);
                $(box).css({
                    "position": "absolute",
                    "left": minIndex * 250 + "px",
                    "top": min + 20 + "px"
                });
                this.heightArray[minIndex] += $(box).outerHeight() + 20;
            }
        },this));
        var maxHeight = Math.max.apply(false, this.heightArray);
        var minHeight = Math.min.apply(false, this.heightArray);
        this.container.css("height", maxHeight + "px");
        this.minContainerHeight = minHeight;
        this.heightArray.length = 0;
    },
    //获取所有图片相对于文档顶部的Top值
    getAllImgTop: function () {
        this.boxs = Array.from(this.wrapper.children());
        // console.log(boxs,1);
        this.boxs.forEach(box => {
            $(box).attr("data-top", $(box).offset().top);
        });
    },
    //根据滚动条件显示图片
    imgShow: function () {
        var scrollTop = $("html,body").scrollTop();
        this.boxs.forEach($.proxy(function (box) {
            var box_top = $(box).attr("data-top");
            if (scrollTop + this.cHeight >= box_top - 500) {
                // console.log(img);
                var src = $(box).attr("data-img");
                box.children[0].children[0].src = src;
            }
        },this));
    }
});
function Load() {
}
$.extend(Load.prototype, {
    init: function (start) {
        var url = "http://localhost/dt";
        var data = {
            include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id: "美食菜谱",
            start: start
        };
        // var res = await myAJAX({
        //     url: url,
        //     data: data,
        //     data_type: "json"
        // });
        // console.log(res);
        return $.ajax({ url: url, data: data, data_type: "json" });
    }
});
new WaterFall();