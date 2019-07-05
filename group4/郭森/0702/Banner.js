function Banner(select, options) {
    // 参数接收判断
    if (!(this.box = document.querySelector(select))) {
        alert("请传入正确容器");
        return false;
    };
    this.options = Object.assign({
        "effect": "fade",
        "pagination": ".pagination",
        "paginationEvent": "mouseover",
        "autoPlay": "2s",
    }, options);
    this.init();
}
// 初始化参数设置
Banner.prototype.init = function () {
    this.wrapper = this.box.querySelector(".wrapper");      // 图片盒子
    this.slides = this.box.querySelectorAll(".slide");      // 图片列表
    this.btn_prev = this.box.querySelector(".button-prev"); // 上一页按钮
    this.btn_next = this.box.querySelector(".button-next"); // 下一页按钮
    this.boxWidth = this.box.offsetWidth;                   // 盒子尺寸
    this.prevIndex = 0;                                     // 上一页下标
    this.nowIndex = 0;                                      // 当前下标
    // 分页
    if (this.options.pagination && (this.paginationBox = this.box.querySelector(this.options.pagination))) {// 分页盒子
        this.paginationLayout();                            // 分页布局
        this.paginations = this.paginationBox.children;     // 分页按钮
        this.paginationIndex = this.nowIndex;               // 分页活跃坐标
        this.paginationBindEvent();                         // 分页绑定事件
    }
    // 自动轮播
    if (this.autoPlayTime = this.options.autoPlay.match(/^([\d\.]+)s?$/)[1]) { // 自动轮播间隔时间
        this.timer = null;                                  // 定时器
        this.autoPlay();                                    // 自动轮播
        this.autoPlayBindEvent();                           // 自动轮播事件监听
    }
    this[this.options.effect + "Layout"]();                 // 页面布局    
    this.bindEvent();                                       // 事件绑定
}
// 分页布局
Banner.prototype.paginationLayout = function () {
    var html = "";
    for (var i = 0; i < this.slides.length; i++) {
        if (i === this.nowIndex) {
            html += "<div class='pagination-bullet pagination-bullet-active'></div>"
        } else {
            html += "<div class='pagination-bullet'></div>"
        }
    }
    this.paginationBox.innerHTML = html;
}
// 分页绑定事件
Banner.prototype.paginationBindEvent = function () {
    this.paginationBox.addEventListener(this.options.paginationEvent, this.getIndex.bind(this));// 获取分页坐标
    this.paginationBox.addEventListener(this.options.paginationEvent, this[this.options.effect + "Animate"].bind(this));// 分页换页动画
    this.paginationBox.addEventListener(this.options.paginationEvent, this.changePagination.bind(this)); // 改变活跃页码
    this.box.addEventListener("click", this.changePagination.bind(this)); // 改变活跃页码
}
// 自动轮播绑定事件
Banner.prototype.autoPlayBindEvent = function () {
    this.box.addEventListener("mouseenter", this.autoPlayStop.bind(this));  // 停止轮播
    this.box.addEventListener("mouseleave", this.autoPlay.bind(this));      // 自动轮播
}
// 事件绑定
Banner.prototype.bindEvent = function () {
    this.btn_prev.addEventListener("click", this.prevClick.bind(this));                     // 上一页
    this.btn_next.addEventListener("click", this.nextClick.bind(this));                     // 下一页操作
    this.box.addEventListener("click", this[this.options.effect + "Animate"].bind(this));  // 翻页操作
}
// 自动轮播
Banner.prototype.autoPlay = function () {
    this.timer = setInterval(() => {
        this.btn_next.dispatchEvent(new Event("click"));
        this.box.dispatchEvent(new Event("click"));
    }, this.autoPlayTime * 1000);
}
// 停止轮播
Banner.prototype.autoPlayStop = function () {
    clearInterval(this.timer);
}
// 上一页
Banner.prototype.prevClick = function () {
    this.prevIndex = this.nowIndex--;
    if (this.nowIndex === -1) {
        this.nowIndex = this.slides.length - 1;
    }
}
// 下一页
Banner.prototype.nextClick = function () {
    this.prevIndex = this.nowIndex++;
    if (this.nowIndex === this.slides.length) {
        this.nowIndex = 0;
    }
}
// 获取分页坐标
Banner.prototype.getIndex = function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if (target !== this.paginationBox) {
        this.prevIndex=this.nowIndex;
        for (var i = 0; i < target.parentNode.children.length; i++) {
            if (target === target.parentNode.children[i]) {
                this.nowIndex = i;
                break;
            }
        }
    }
}
// 改变分页活跃页码
Banner.prototype.changePagination = function () {
    if (this.options.effect === "slide" && this.nowIndex === this.slides.length - 1) {
        this.paginationIndex = 0;
    } else {
        this.paginationIndex = this.nowIndex;
    }
    for (var i = 0, page; page = this.paginations[i++];) {
        removeClassName(page, " pagination-bullet-active");
    }
    this.paginations[this.paginationIndex].className += " pagination-bullet-active";
}
/**
 * 动画效果
 */
// 滑动页面布局
Banner.prototype.slideLayout = function () {
    this.box.className += " container-slide";
    var cloneNode = this.slides[0].cloneNode(true);
    this.wrapper.appendChild(cloneNode);
    this.slides = [].slice.call(this.slides);
    this.slides.push(cloneNode);
    this.wrapper.style.width = this.slides.length * this.boxWidth + "px";
    this.wrapper.style.transition = "left 1s";
}
// 滑动动画
Banner.prototype.slideAnimate = function () {
    if (this.nowIndex === 0 && this.prevIndex === this.slides.length - 1 || this.nowIndex === this.slides.length - 1 && this.prevIndex === 0) {
        
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = -(this.nowIndex) * this.boxWidth + "px";
        this.nowIndex === 0 ? this.nextClick() : this.prevClick();
        setTimeout(() => {
            this.wrapper.style.transition = "left 1s";
            this.box.dispatchEvent(new Event("click"));
        }, 0)
        return false;
    }
    this.wrapper.style.left = - this.nowIndex * this.boxWidth + "px";
}
// 淡入淡出布局
Banner.prototype.fadeLayout = function () {
    this.box.className += " container-fade";
    this.slides[this.nowIndex].style.opacity = 1;
    setTimeout(() => {
        for (var i = 0, slide; slide = this.slides[i++];) {
            slide.style.transition = "all 1s";
        }
    }, 0)
}
// 淡入淡出动画
Banner.prototype.fadeAnimate = function () {
    this.slides[this.nowIndex].style.opacity = 1;
    this.slides[this.prevIndex].style.opacity = 0;
}

// 删除class名
function removeClassName(dom, name) {
    return dom.className = dom.className.replace(new RegExp("\S?" + name), "");
}
