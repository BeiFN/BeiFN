/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

function Banner(selector, options) {
    this.index = 0;
    this.state = "normal";

    this.main = document.querySelector(selector);
    this.wrapper = this.main.querySelector(".wrapper");
    this.slides = this.main.querySelectorAll(".slide");
    this.btn_next = this.main.querySelector(".button-next");
    this.btn_prev = this.main.querySelector(".button-prev");

    this.oWidth = this.main.offsetWidth;
    this.timer = null;

    this.options = Object.assign({
        effect: "slide",
        pagination: ".pagination"
    }, options)

    this.init();
}
// 元素绑定事件
Banner.prototype.init = function () {
    // 布局
    this.layoutAnimate();
    this.layoutPagnination();
    // 自动轮播
    this.autoPlay();
    this.main.addEventListener("mouseenter", this.stopAutoPlay.bind(this));
    this.main.addEventListener("mouseleave", this.autoPlay.bind(this));
    // 左右按钮
    this.btn_next.addEventListener("click", this.next.bind(this));
    this.btn_prev.addEventListener("click", this.prev.bind(this));
    // 动画效果
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    // 分页
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click", this.toIndex.bind(this));
    this.pagination_ele === null ? "" : this.main.addEventListener("click", this.changeBG.bind(this));
}
// 开启自动轮播
Banner.prototype.autoPlay = function () {
    this.timer = setInterval(function () {
        this.dispatch();
    }.bind(this), 2000)
}
// 事件派发
Banner.prototype.dispatch = function () {
    var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    var clicked = !this.btn_next.dispatchEvent(evt);
    if (clicked) {
        this.next();
    } else {
        return;
    }
}
// 关闭自动轮播
Banner.prototype.stopAutoPlay = function () {
    clearInterval(this.timer);
}

// 分页跟随
Banner.prototype.changeBG = function () {
    for (var i = 0, bullet; bullet = this.pagination_ele.children[i++];) {
        removeClassName(bullet, "pagination-bullet-active")
    }
    var index = this.index;

    if (this.options.effect = "slide") {
        index = this.index === this.slides.length - 1 ? 0 : this.index;

        if (this.index === 0 && this.state === "toFirst") {
            index = 1;
        }
        if (this.index === 5 && this.state === "toLast") {
            index = this.slides.length - 2;
        }
    }

    this.pagination_ele.children[index].className += " pagination-bullet-active";
}
// 分页切换
Banner.prototype.toIndex = function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if (target !== this.pagination_ele) {
        for (var i = 0; i < target.parentNode.children.length; i++) {
            if (target === target.parentNode.children[i]) {
                this.index = i;
                break;
            }
        }
    }
}

// 分页布局
Banner.prototype.layoutPagnination = function () {
    var count = this.slides.length - (this.options.effect === "slide" ? 1 : 0);

    this.pagination_ele = document.querySelector(this.options.pagination);
    if (this.pagination_ele === null) return;

    var html = "";
    for (var i = 0; i < count; i++) {
        if (i === this.index) {
            html += '<li class="pagination-bullet pagination-bullet-active"></li> ';
        } else {
            html += '<li class="pagination-bullet"></li> '
        }
    }
    this.pagination_ele.innerHTML = html;

}
// 去下一个
Banner.prototype.next = function () {
    if (this.index === this.slides.length - 1) {
        this.index = 0;
        this.state = "toFirst";
    } else {
        this.index++;
        this.state = "normal";
    }
}
// 去上一个
Banner.prototype.prev = function () {
    if (this.index === 0) {
        this.index = this.slides.length - 1;
        this.state = "toLast";
    } else {
        this.index--;
        this.state = "normal";
    }
}
// 动画布局
Banner.prototype.layoutAnimate = function () {
    switch (this.options.effect) {
        case "slide":
            this.main.className += " container-slide";
            var cloneSlide = this.slides[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.slides = Array.from(this.slides);
            this.slides.push(cloneSlide);
            // console.log(this.slides);
            this.wrapper.style.width = this.oWidth * this.slides.length + "px";
            break;
        case "fade":
            this.main.className += " container-fade";
            break;
        default:
            break;
    }

}
// slide效果
Banner.prototype.slide = function () {
    this.wrapper.style.left = 0;
    switch (this.state) {
        case "normal":
            this.wrapper.style.transition = "left 1s";
            setTimeout(function () {
                this.wrapper.style.left = -this.index * this.oWidth + "px";
            }.bind(this), 0);
            break;
        case "toFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function () {
                this.index++;
                this.state = "normal";
                this.slide();
            }.bind(this), 0);
            break;
        case "toLast":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.slides.length - 1) * this.oWidth + "px";
            setTimeout(function () {
                this.index--;
                this.state = "normal";
                this.slide();
            }.bind(this), 0);
            break;
    }

}
// fade效果
Banner.prototype.fade = function () {
    for (var i = 0, slide; slide = this.slides[i++];) {
        slide.style.opacity = 0;
        slide.style.transition = "all 1s ease-in-out";
    }
    this.slides[this.index].style.opacity = 1;
}

function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\s?" + className), "");
}

//        ┏┓　　　┏┓+ +
//　　　┏┛┻━━━┛┻┓ + +
//　　　┃　　　　　　　┃ 　
//　　　┃　　　━　　　┃ ++ + + +
//　　 ████━████ ┃+
//　　　┃　　　　　　　┃ +
//　　　┃　　　┻　　　┃
//　　　┃　　　　　　　┃ + +
//　　　┗━┓　　　┏━┛
//　　　　　┃　　　┃　　　　　　　　　　　
//　　　　　┃　　　┃ + + + +
//　　　　　┃　　　┃　　　　Codes are far away from bugs with the animal protecting　　　
//　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
//　　　　　┃　　　┃
//　　　　　┃　　　┃　　+　　　　　　　　　
//　　　　　┃　 　　┗━━━┓ + +
//　　　　　┃ 　　　　　　　┣┓
//　　　　　┃ 　　　　　　　┏┛
//　　　　　┗┓┓┏━┳┓┏┛ + + + +
//　　　　　　┃┫┫　┃┫┫
//　　　　　　┗┻┛　┗┻┛+ + + +