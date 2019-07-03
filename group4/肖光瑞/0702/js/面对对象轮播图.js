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
    this.autoPlay()
}


//绑定事件设置初始变量
Banner.prototype.init = function () {
    //根据选择的动画进行相应的布局
    this.layoutAnimate();
    //根据轮播图的图片多少而制定的分页器布局
    this.layoutPagination();
    this.nextBtn.addEventListener("click", this.next.bind(this))
    this.prevBtn.addEventListener("click", this.prev.bind(this))
    //通过传入的options来选择动画执行函数
    this.main.addEventListener("click", this[this.options.effect].bind(this))
    //轮播图改变分页器
    this.pagEle === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
    //分页器改变轮播图
    this.pagEle === null ? "" : this.pagEle.addEventListener("click", this.paginationClick.bind(this));

}

//上一张
Banner.prototype.prev = function () {
    if (this.index === 0) {
        this.index = this.sliders.length - 1;
        this.state = "changeLast"
    } else {
        this.index--;
        this.state = "normal"
    }
    console.log(this.index)
}
//下一张
Banner.prototype.next = function () {
    if (this.index === this.sliders.length - 1) {
        this.index = 0;
        this.state = "changeFirst"
    } else {
        this.index++
    }
    console.log(this.index)
}


//动画布局：通过传入的值不同改变布局
Banner.prototype.layoutAnimate = function () {
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
}
//滑动轮播图
Banner.prototype.slide = function () {
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
    // console.log(this.state)
}
//淡入淡出
Banner.prototype.fade = function () {
    for (var i = 0, slide; slide = this.sliders[i++];) {
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.sliders[this.index].style.opacity = 1;
}

Banner.prototype.cubeAnimate = function () {

}

//根据轮播图的图片多少而制定的分页器布局
Banner.prototype.layoutPagination = function () {
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
}

//轮播图改变分页器
Banner.prototype.changePagination = function () {
    for (var i = 0, ele; ele = this.pagEle.children[i++];) {
        removeClassName(ele, "pagination-bullet-active")
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
}
// //分页器改变轮播图
Banner.prototype.paginationClick = function (evt) {
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
}

//自动播放
Banner.prototype.autoPlay = function () {
    // var evt = new Event("click");
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent("click", true, true)
    setInterval(function () {
        this.nextBtn.dispatchEvent(evt);
    }.bind(this), 3000)
}

function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\s?" + className), "");
}