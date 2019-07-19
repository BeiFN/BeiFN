function Banner(selector, options) {
    this.index = 0;
    this.state = "normal";
    //必选元素
    this.main = document.querySelector(selector);
    this.sliders = this.main ? this.main.querySelectorAll(".slide") : "";
    // console.log( this.sliders)
    this.nextBtn = this.main.querySelector(".button-next");
    this.prevBtn = this.main.querySelector(".button-prev")
    this.wrapper = this.main.querySelector(".wrapper");

    //对用户的输入options进行处理
    this.options = Object.assign({
        effect: "slide",
        pagination: ".pagination"
    }, options)
    this.pagEle = document.querySelector(this.options.pagination);
    this.init()
    this.autoPlay();
}

$.extend(Banner.prototype, {
    init: function () {
        this.layoutAnimate();
        //根据轮播图的图片多少而制定的分页器布局
        this.layoutPagination();
        $(this.nextBtn).on("click", this.next.bind(this))
        $(this.prevBtn).on("click", this.prev.bind(this))
        $(this.main).on("click", this[this.options.effect].bind(this))
        // this.nextBtn.addEventListener("click", this.next.bind(this))
        // this.prevBtn.addEventListener("click", this.prev.bind(this))
        //通过传入的options来选择动画执行函数
        // addEventListener("click", this[this.options.effect].bind(this))
        //轮播图改变分页器
        this.pagEle === null ? "" : $(this.main).on("click", this.changePagination.bind(this));
        this.pagEle === null ? "" : $(this.pagEle).on("click", this.paginationClick.bind(this));
        // this.pagEle === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
        //分页器改变轮播图
        // this.pagEle === null ? "" : this.pagEle.addEventListener("click", this.paginationClick.bind(this));

    },
    prev: function () {
        if (this.index === 0) {
            this.index = this.sliders.length - 1;
            this.state = "changeLast"
        } else {
            this.index--;
            this.state = "normal"
        }
    },
    next: function () {
        if (this.index === this.sliders.length - 1) {
            this.index = 0;
            this.state = "changeFirst"
        } else {
            this.index++
        }
    },
    layoutAnimate: function () {
        switch (this.options.effect) {
            case "slide":
                this.main.className += " container-slide";
                var cloneSlide = this.sliders[0].cloneNode(true);
                this.wrapper.appendChild(cloneSlide);
                this.sliders = [].slice.call(this.sliders);
                this.sliders.push(cloneSlide);
                this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
                break;
            case "fade":
                this.main.className += " container-fade";
                break;
        }
    },
    slide: function () {
        switch (this.state) {
            case "normal":
                this.wrapper.style.left = 0;
                this.wrapper.style.transition = "left 1s";
                setTimeout(function () {
                    this.wrapper.style.left = -this.index * this.main.offsetWidth + "px";
                }.bind(this), 0)
                break;
            case "changeFirst":
                this.wrapper.style.left = 0;
                this.wrapper.style.transition = "top 1s";
                setTimeout(function () {
                    this.index++;
                    this.state = "normal";
                    this.slide();
                }.bind(this), 0)
                break;
            case "changeLast":
                this.wrapper.style.left = -(this.sliders.length - 1) * this.main.offsetWidth + "px";
                this.wrapper.style.transition = "top 1s";
                setTimeout(function () {
                    this.index--
                    this.state = "normal"
                    this.slide();
                }.bind(this), 0)
                break;
        }
    },
    fade: function () {
        for (var i = 0, slide; slide = this.sliders[i++];) {
            slide.style.opacity = 0;
            slide.style.transition = "all 1s";
        }
        this.sliders[this.index].style.opacity = 1;
    },
    layoutPagination: function () {
        this.pagCount = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
        if (this.pagEle === null) return false;
        var html = "";
        for (var i = 0; i < this.pagCount; i++) {
            if (i === this.index) {
                html += `<div class='pagination-bullet pagination-bullet-active'></div>`
            } else {
                html += `<div class='pagination-bullet'></div>`
            }
        }
        this.pagEle.innerHTML = html;
    },
    changePagination: function () {
        for (var i = 0, ele; ele = this.pagEle.children[i++];) {
            $(ele).removeClass("pagination-bullet-active")
        }
        var _index = this.index;
        if (this.options.effect == "slide") {
            _index = (this.index === this.sliders.length - 1 ? 0 : this.index);
            if (this.index === 0 && this.state === "changeFirst") {
                _index = 1;
            }
            if (this.nowIndex === 5 && this.state === "changeLast") {
                _index = this.sliders.length - 2;
            }
        }
        this.pagEle.children[_index].className += " pagination-bullet-active";
    },
    paginationClick: function (evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        if (target != this.pagEle) {
            for (var i = 0; i < this.pagCount; i++) {
                if (target === this.pagEle.children[i]) {
                    this.index = i;
                    break;
                }
            }
        }
    },
    autoPlay: function () {
        // var evt = new Event("click");
        var evt = document.createEvent('HTMLEvents');
        // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent("click", true, true)
        setInterval(function () {
            this.nextBtn.dispatchEvent(evt);
        }.bind(this), 3000)
    }
})

new Banner(".container", {
    effect: "slide"
});