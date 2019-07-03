function Banner(selector, options) {
    this.main = document.querySelector(selector);
    this.wrapper = this.main.querySelector(".wrapper"); // 不用wrapper行不行？不行，slide需要让wrapper来做运动，蠢货
    this.wrapper.style.left = 0;
    this.slides = [].slice.call(this.wrapper.querySelectorAll(".slide"));
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.nowIndex = 0;
    this.state = "normal";
    this.options = Object.assign({
        effect: "slide",
        pagination: ".pagination"
    }, options);
    this.init();
}

Banner.prototype.init = function () {
    this.layoutAnimate();
    this.layoutPagnination();
    this.btn_prev.addEventListener("click", this.prevIndex.bind(this));
    this.btn_next.addEventListener("click", this.nextIndex.bind(this));
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    this.pagination_ele === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click", this.handlerPaginationClick.bind(this));
}

Banner.prototype.layoutAnimate = function () {
    switch (this.options.effect) {
        case "fade":
            this.main.className += " container-fade";
            break;
        case "slide":
            this.main.className += " container-slide";
            var cloneSlide = this.slides[0].cloneNode(true); // 不加true没数字。加true是克隆所有子元素，不加true是只克隆该元素，相当于只复制一个外壳。
            this.wrapper.appendChild(cloneSlide);
            this.slides.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";
            break;
    }
}

Banner.prototype.layoutPagnination = function () {
    var pagination_count = this.slides.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if (this.pagination_ele === null) {
        return false;
    }
    var html = "";
    for (var i = 0; i < pagination_count; i++) {
        if (i === this.nowIndex) {
            html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        } else {
            html += "<div class='pagination-bullet'></div>";
        }
    }
    this.pagination_ele.innerHTML = html;
}

Banner.prototype.prevIndex = function () {
    this.nowIndex--;
    this.state = "normal";
    if (this.nowIndex === 0) {
        this.nowIndex = this.slides.length - 1;
        this.state = "changeLast";
    }
    // console.log(this.nowIndex);
}

Banner.prototype.nextIndex = function () {
    this.nowIndex++;
    this.state = "normal";
    if (this.nowIndex === this.slides.length - 1) {
        this.state = "changeFirst";
    }
    // console.log(this.nowIndex);
    // console.log(this.slides.length); // 6
}

Banner.prototype.fade = function () {
    for (var i = 0, slide; slide = this.slides[i++];) {
        slide.style.opacity = 0; // 有bug
        slide.style.transition = "all 1s";
    }
    this.slides[this.nowIndex].style.opacity = 1;
}

Banner.prototype.slide = function () { // 给俩按钮添加俩点击事件效果好像一样
    switch (this.state) {
        case "changeLast":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.slides.length - 1) * this.main.offsetWidth + "px";
            setTimeout(function () {
                this.nowIndex--;
                this.state = "normal";
                this.slide();
            }.bind(this), 0);
            break;
        case "normal":
            this.wrapper.style.transition = "left 1s";
            setTimeout(function () {
                this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px";
                if (this.nowIndex === this.slides.length - 1) {
                    this.nowIndex = 0;
                }
                console.log(this.nowIndex);
            }.bind(this), 0);
            
            break;
        case "changeFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function () {
                this.nowIndex++;
                this.state = "normal";
                this.slide();
            }.bind(this), 0);
            break;
    }
}

Banner.prototype.changePagination = function () {
    // for (var i = 0, bullet; bullet = this.pagination_ele.children[i++];) {
    //     removeClassName(bullet, "pagination-bullet-active");
    // }
    // var index = this.nowIndex; // index值为啥会这样子算？
    // if (this.options.effect == "slide") { // 是否可以考虑获取元素的值来确定哪个
    //     index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex;
    //     if (this.nowIndex === 0 && this.state === "changeFirst") {
    //         index = 1;
    //     }
    //     if (this.nowIndex === 5 && this.state === "changeLast") {
    //         index = this.slides.length - 2;
    //     }
    // }
    // this.pagination_ele.children[index].className += " pagination-bullet-active";
}

function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
}

Banner.prototype.handlerPaginationClick = function (evt) {
    var e = evt || event;
    var target = e.target || e.srcElement;
    if (target !== this.pagination_ele) {
        for (var i = 0, ele; ele = target.parentNode.children[i++];) {
            if (ele === target) {
                this.toIndex(i - 1);
                break;
            }
        }
    }
}

Banner.prototype.toIndex = function (index) { // 点右到1然后点3会有bug
    this.nowIndex = index;
}