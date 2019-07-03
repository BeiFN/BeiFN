function Banner(selector, options) {
    this.main = document.querySelector(selector);     // container元素
    this.sliders = this.main.querySelectorAll(".slide");    // 图片元素伪数组
    this.btn_prev = this.main.querySelector(".button-prev");  // prev按钮
    this.btn_next = this.main.querySelector(".button-next");  // next按钮
    this.wrapper = this.main.querySelector(".wrapper");   // 放图片的大盒子

    this.options = Object.assign({   //添加默认选项与用户选择   
        effect: "slide",   //效果
        pagination: ".pagination",    //是否添加分页
        animation : "true"
    }, options)

    this.nowIndex = 0   //当前图片索引
    this.status = "normal";   //当前图片状态
    this.timer = null;  //定时器清空

    this.init();   //初始化添加侦听事件，布局

    //是否需要执行轮播
    this.options.animation === "true" ? this.animation() : "";
}

Banner.prototype.init = function () {
    // 左右按钮添加侦听事件
    this.btn_prev.addEventListener("click", this.prevIndex.bind(this));
    this.btn_next.addEventListener("click", this.nextIndex.bind(this));

    //轮播图slide/fade布局
    this.layoutAnimate();

    //为fade/slide添加动画
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    
    //为分页功能添加布局
    this.layoutPagnination();

    //添加分页功能动画
    this.pagination_ele === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click", this.handlerPaginationClick.bind(this))

    //添加自动轮播  并且设置鼠标移到轮播图自动停播，移开自动轮播
    this.options.animation === "true" ? this.main.addEventListener("mouseenter", this.stopInterval.bind(this)) : "";
    this.options.animation === "true" ? this.main.addEventListener("mouseleave", this.startInterval.bind(this)) : "";
}

// 下一张
Banner.prototype.nextIndex = function () {
    if (this.nowIndex === this.sliders.length - 1) {
        this.nowIndex = 0;
        this.status = "changeFirst";
    }
    else {
        this.nowIndex++;
        this.status = "normal";
    }
}

// 上一张
Banner.prototype.prevIndex = function () {
    if (this.nowIndex === 0) {
        this.nowIndex = this.sliders.length - 1;
        this.status = "changeLast";
    }
    else {
        this.nowIndex--;
        this.status = "normal";
    }
}

// 效果预处理
Banner.prototype.layoutAnimate = function () {
    switch (this.options.effect) {
        case "slide":
            this.main.className += " container-slide";  //为container添加slide标签
            //在末尾添加第一张图片
            this.cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(this.cloneSlide);
            //将这个元素添加到sliders数组里
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(this.cloneSlide);
            //改变wrapper的宽度
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade":
            this.main.className += " container-fade";  //为container添加fade标签
            break;
    }
}

// fade效果
Banner.prototype.fade = function () {
    //思路：将图片透明度全部设置全透明，然后将当前nowIndex元素透明度为1
    for (var i = 0, slide; slide = this.sliders[i++];) {
        Object.assign(slide.style, {
            opacity: 0,
            transition: "all 1s ease-in-out"
        })
    }
    this.sliders[this.nowIndex].style.opacity = 1;

}

// slide效果
Banner.prototype.slide = function () {
    switch (this.status) {
        case "normal":   //正常情况下执行nowIndex++
            // this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function () {
                this.wrapper.style.left = -this.main.offsetWidth * this.nowIndex + "px";
            }.bind(this), 0)
            break;
        case "changeFirst":    //最后一张图片，先将left移动到第一张，然后再次执行slide动画
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function () {
                this.nowIndex ++;
                this.status = "normal";
                this.slide();
            }.bind(this), 0)
            break;
        case "changeLast":    //第一张图片，先将left移动到最后一张，然后再次执行slide动画
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -this.main.offsetWidth * (this.sliders.length - 1) + "px";
            setTimeout(function () {
                this.nowIndex --;
                this.status = "normal";
                this.slide();
            }.bind(this), 0)
            break;
    }
}

// 改变Pagination按钮的颜色/className
Banner.prototype.changePagination = function () {
    //移出pagination-bullet-active的类名
    for (var i = 0, bullet; bullet = this.pagination_ele.children[i++];)
        removeClassName(bullet, "pagination-bullet-active")
    var index = this.nowIndex;
    if(this.options.effect == "slide"){
        // 如果nowIndex是最后一个，那个就让他的index为0，否则为nowIndex
        index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex;
        if(this.nowIndex === 0 && this.status === "changeFirst")
            index = 1;
        if(this.nowIndex === (this.sliders.length - 1) && this.status === "changeLast") 
            index = this.sliders.length - 2;
    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}

// 移除指定元素的classname
function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\s*" + className), "");
}

// 创建pagination按钮
Banner.prototype.layoutPagnination = function () {
    //思路，想搞清楚是什么效果，如果是slide则length-1  如果是fade  则不变
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    //获取当前页面上的按钮的数量
    this.pagination_ele = document.querySelector(this.options.pagination);
    if (this.pagination_ele === null) return false;
    var html = "";
    for(var i = 0; i < pagination_count; i++){
        if(i === this.nowIndex)
            html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        else
            html += "<div class='pagination-bullet'></div>";
        //插入this.pagination_ele，即使存在元素，也会被清除
        this.pagination_ele.innerHTML = html;
    }
}

// toIndex
Banner.prototype.toIndex = function (index) {
    this.nowIndex = index;
}

// goto Index
Banner.prototype.handlerPaginationClick = function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    console.log(target)
    if(target !== this.pagination_ele){   //如果点击元素不是pagination_ele本身
        //遍历子元素数组，如果匹配，记下下标，然后执行toIndex
        for(var i = 0; i < target.parentNode.children.length; i ++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

// 轮播图
Banner.prototype.animation = function () {
    clearInterval(this.timer);
    this.timer = setInterval(function() {
        this.clickEvent(this.btn_next).bind(this);
    }.bind(this), 3000)
}

//轮播
Banner.prototype.clickEvent = function (dom) {
    this.event = document.createEvent("HTMLEvents");
    // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
    this.event.initEvent("click", true, true);
    dom.dispatchEvent(this.event);
}

//停止轮播
Banner.prototype.stopInterval = function () {
    clearInterval(this.timer);
}

//开始轮播
Banner.prototype.startInterval = function (evt) {
    var e = evt || window.event;
    e.stopPropagation();
    this.animation();
}