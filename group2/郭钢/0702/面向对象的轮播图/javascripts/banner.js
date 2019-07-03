function Banner(selector, options) {
    this.nowIndex = 0;
    this.state = "normal";
    this.main = document.querySelector(selector);
    this.btn_next = document.querySelector(".button-next");
    this.btn_prev = document.querySelector(".button-prev");
    this.slides = document.querySelectorAll(".slide");
    this.wrapper = document.querySelector(".wrapper")
    this.options = options;

    this.init();
}


// 初始化
Banner.prototype.init = function () {


    this.layoutAnimate(); //动画布局
    this.btn_next.addEventListener("click", this.nextIndex.bind(this));
    this.btn_prev.addEventListener("click", this.prevIndex.bind(this));
    this.main.addEventListener("click", this[this.options.effect].bind(this));
}

// 点击下一页按钮
Banner.prototype.nextIndex = function () {
    if (this.nowIndex === this.slides.length - 1) {
        this.nowIndex = 0;
        this.state = "tofirstImg";
    } else {
        this.nowIndex++;
        this.state = "normall";
    }
}

// 点击上一页按钮
Banner.prototype.prevIndex = function () {
    if (this.nowIndex === 0) {
        this.nowIndex = this.slides.length - 1;
        this.state = "toLastImg";
    } else {
        this.nowIndex--;
        this.state = "normal";
    }
}


// 动画布局
Banner.prototype.layoutAnimate = function () {
    this.wrapper.style.left = 0;
    this.main.className += " container-slide";
    var slide = this.slides[0].cloneNode(true);
    this.wrapper.appendChild(slide);
    this.slides = [].slice.call(this.slides);
    this.slides.push(slide);
    this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";
}

// 动画布局
// Banner.prototype.layoutAnimate = function(){
//     this.main.className += " container-fade";
// }


// 滑动效果
Banner.prototype.slide = function () {

    switch (this.state) {
        case "normal":
            // this.wrapper.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function () {
                this.wrapper.style.left = -this.main.offsetWidth * this.nowIndex + "px";
            }.bind(this), 10)
            break;
        case "tofirstImg":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function () {
                this.nowIndex++;
                this.state = "normal";
                this.slide();
            }.bind(this), 10)
            break;
        case "toLastImg":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -this.main.offsetWidth * (this.slides.length - 1) + "px";
            setTimeout(function () {
                this.nowIndex--;
                this.state = "normal";
                this.slide();
            }.bind(this), 10)
            break;
    }

}


// 淡入淡出效果
Banner.prototype.fade = function () {
    for (var i = 0, slide; slide = this.slides[i++];) {
        slide.style.opacity = "0";
        slide.style.transition = "all 1s";
    }
    this.slides[this.nowIndex].style.opacity = "1"
}