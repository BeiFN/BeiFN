function Banner() {
    this.init(".container" , {
        effect : "slide"
  });
}
$.extend(Banner.prototype, {
    init: function (selector, options) {
        // 当前显示哪个图片;
        this.nowIndex = 0;
        //
        this.state = "normal";

        this.main = $(selector);
        this.sliders = $(".slide");
        console.log(this.sliders);
        console.log(this.sliders.eq(0));
        this.btn_next = $(".button-next");
        this.btn_prev = $(".button-prev");
        this.wrapper = $(".wrapper");

        this.options = $.extend({
            effect: "slide",
            pagination: ".pagination"
        },options)

        // 布局;
        // this.main.className += " container-fade";
        // 先布局;
        this.layoutAnimate();
        this.layoutPagnination();

        this.btn_prev.on("click", $.proxy(this.prevIndex,this));
        this.btn_next.on("click", $.proxy(this.nextIndex.bind,this));
        // 动画;
        this.main.on("click",$.proxy(this[this.options.effect],this));
        this.pagination_ele === null ? "" : this.main.on("click", $.proxy(this.changePagination,this));
        this.pagination_ele === null ? "" : this.pagination_ele.on("click",$.proxy(this.handlerPaginationClick,this))


    },
    //分页器
    changePagination: function () {

        for (var i = 0, bullet; bullet = this.pagination_ele.eq(i++);) {
          bullet.removeClass("pagination-bullet-active");
        }
        var index = this.nowIndex;
        if (this.options.effect == "slide") {
            index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex;

            if (this.nowIndex === 0 && this.state === "changeFirst") {
                index = 1;
            }
            if (this.nowIndex === 5 && this.state === "changeLast") {
                index = this.sliders.length - 2;
            }
        }

        this.pagination_ele.eq(index).addClass(" pagination-bullet-active");
        // console.log(this.nowIndex,this.state);
    },
    //分页器布局
    layoutPagnination: function () {
        var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
        this.pagination_ele = $(this.options.pagination);
        if (this.pagination_ele === null) return false;
        var html = "";
        for (var i = 0; i < pagination_count; i++) {
            if (i === this.nowIndex) {
                html += "<div class='pagination-bullet pagination-bullet-active'></div>"
            } else {
                html += "<div class='pagination-bullet'></div>"
            }
        }
        this.pagination_ele.html = html;
    },
    //动画布局
    layoutAnimate: function () {
        switch (this.options.effect) {
            case "slide":
                this.main.addClass(" container-slide");
                var cloneSlide = $(this.sliders.eq(0)).clone(true);
                this.wrapper.append(cloneSlide);
                this.sliders = Array.from(this.sliders);
                this.sliders.push(cloneSlide);
                this.wrapper.css({
                    width : this.main.width() * this.sliders.length,
                }) 
                break;
            case "fade":
                this.main.addClass(" container-fade");
                break;
        }
    },
    //向前一页;
    prevIndex: function () {
        if (this.nowIndex === 0) {
            this.nowIndex = this.sliders.length - 1;
            // alert("最后一张");
            this.state = "changeLast"
        } else {
            this.nowIndex--;
            this.state = "normal"
        }
    },
    //向后一页
    nextIndex: function () {
        if (this.nowIndex === this.sliders.length - 1) {
            this.nowIndex = 0;
            // alert("第一张");
            this.state = "changeFirst"
        } else {
            this.nowIndex++;
            this.state = "normal"
        }
    },
    //
    toIndex: function (index) {
        this.nowIndex = index;
    },
    //淡进淡出;
    fade: function () {
        for (var i = 0, slide; slide = this.sliders[i++];) {
            slide.style.opacity = 0;
            slide.style.transition = "all 1s";
        }
        // console.log("动画");
        this.sliders[this.nowIndex].style.opacity = 1;
    },
    slide: function () {

        switch (this.state) {
            case "normal":
                this.wrapper.css({
                    left :0,
                    transition : "left 1s",

                })
                setTimeout($.proxy (function () {
                    this.wrapper.css({
                        left : -this.nowIndex * this.main.offsetWidth,
                    }) 
                },this), 0)
                break;
            case "changeFirst":
                this.wrapper.css({
                    transition : "top 1s",
                    left : 0,
                })
                setTimeout($.proxy(function () {
                    this.nowIndex++;
                    this.state = "normal";
                    this.slide();
                },this), 0);
                break;
            case "changeLast":
                this.wrapper.css({
                    transition : "top 1s",
                    left : -(this.sliders.length - 1) * this.main.offsetWidth,
                })
                setTimeout($.proxy(function () {
                    this.nowIndex--;
                    this.state = "normal";
                    this.slide();
                },this), 0)
        }

    },
})

new Banner();



