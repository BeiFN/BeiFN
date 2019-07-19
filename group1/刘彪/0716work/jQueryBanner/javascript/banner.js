function Banner() {
    
}
$.extend(Banner.prototype, {
    init: function (selector,options) {
        // 当前显示哪个图片;
        this.nowIndex = 0;

        this.state = "normal";
        this.main = $(selector);
        this.sliders = $(".slide");
        // console.log(this.sliders);
        // console.log(this.sliders.eq(0));
        this.btn_next = $(".button-next");
        this.btn_prev = $(".button-prev");
        this.wrapper = $(".wrapper");
        
        this.options = $.extend(options,{
            effect : "fade",
        })
    
        // 布局;
        // this.main.className += " container-fade";
        // 先布局;
        this.layoutAnimate();
        this.main.on("click",$.proxy(this[this.options.effect],this))
        this.btn_prev.on("click", $.proxy(this.prevIndex,this));
        this.btn_next.on("click", $.proxy(this.nextIndex,this));


    },

  
    //动画布局
    layoutAnimate: function () {
        switch (this.options.effect) {
            case "slide":
                this.main.addClass("container-slide");
                var cloneSlide = $(this.sliders.eq(0)).clone(true);
                this.wrapper.append(cloneSlide);
                // console.log(this.sliders);  
                this.sliders = this.wrapper.children();
                // this.sliders = Array.from(this.sliders);
                this.wrapper.css({
                    width : this.main.width() * this.sliders.length,
                }) 
                break;
            case "fade":
                this.main.addClass("container-fade");
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
        console.log(this.nowIndex);
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
        // console.log(this.nowIndex);
    },

    //淡进淡出;
    fade: function () {
        console.log("fade");
        for (var i = 0; i<this.sliders.length; i++) {
            // var slide = this.sliders.eq(i);
            console.log(slide);
            slide.css({
                opacity :  0,
                transition : "all 1s",
            })
        }
        // console.log("动画");
        this.sliders.eq(this.nowIndex).css({
            opacity : 1,
        })
        
    },


    slide: function () {
        // console.log("滑动");

        switch (this.state) {
            case "normal":
                this.wrapper.css({
                    left :0,
                    transition : "left 1s",

                })
                setTimeout($.proxy (function () {
                    this.wrapper.css({
                        left : -this.nowIndex * this.main.width(),
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
                    left : -(this.sliders.length - 1) * this.main.width(),
                })
                setTimeout($.proxy(function () {
                    this.nowIndex--;
                    this.state = "normal";
                    this.slide();
                },this), 0)
        }

    },
})

var banner = new Banner();

banner.init(".container",{
    effect : "fade",
});


