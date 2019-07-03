function Banner(selector, options) {
    this.nowIndex = 0;//当前显示页索引
    this.state = "normal";
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");
    this.options = Object.assign({//将输入的选项与默认选项合并
        effect: "slide",
        pagination: ".pagination"
    }, options);
    this.cWidth = this.main.offsetWidth;
    this.init();
}
Banner.prototype.init = function () {
    this.layoutAnimate();//布局动画所需样式
    this.layoutPagination();//布局分页器样式
    this.btn_next.addEventListener("click", this.nextIndex.bind(this));
    this.btn_prev.addEventListener("click", this.prevIndex.bind(this));
    //点击添加动画
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    this.pagination_ele === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click", this.handlerPaginationClick.bind(this));
}
Banner.prototype.layoutAnimate = function () {
    switch (this.options.effect) {
        case "slide":
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.cWidth * this.sliders.length + "px";
            break;
        case "fade":
            this.main.className += " container-fade";
            break;
    }
}
Banner.prototype.layoutPagination = function () {
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if (this.pagination_ele === null) return false;
    var inner_html = "";
    for (var i = 0; i < pagination_count; i++) {
        if (i === this.nowIndex) {
            inner_html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        }
        else {
            inner_html += "<div class='pagination-bullet'></div>";
        }
    }
    this.pagination_ele.innerHTML = inner_html;
}
Banner.prototype.nextIndex = function () {
    if (this.nowIndex === this.sliders.length - 1) {
        this.nowIndex = 1;
        this.state = "tofirst";
    }
    else {
        this.nowIndex++;
        this.state = "normal";
    }
    // console.log(this.nowIndex);
}
Banner.prototype.prevIndex = function () {
    if (this.nowIndex === 0) {
        this.nowIndex = this.sliders.length - 2;
        this.state = "tofifth";
    }
    else {
        this.nowIndex--;
        this.state = "normal";
    }
    // console.log(this.nowIndex);
}
Banner.prototype.slide = function () {
    // console.log(this.nowIndex);
    // console.log(this.wrapper.style.left);
    if (this.state === "tofirst") {
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = 0;
        setTimeout(function () {
            this.state = "normal";
            this.slide();
        }.bind(this), 0);
    }
    if (this.state === "tofifth") {
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = -this.cWidth * (this.sliders.length - 1) + "px";
        setTimeout(function () {
            this.state = "normal";
            this.slide();
        }.bind(this), 0);
    }
    if (this.state === "normal") {
        this.wrapper.style.left = 0;
        this.wrapper.style.transition = "left 1s";
        setTimeout(function () {
            // console.log(this);
            this.wrapper.style.left = -this.nowIndex * this.cWidth + "px";
        }.bind(this), 0);
    }
    if(this.state==="special"){
        this.wrapper.style.left = 0;
        this.wrapper.style.transition = "top 1s";
        setTimeout(function () {
            // console.log(this);
            this.wrapper.style.left = -this.nowIndex * this.cWidth + "px";
        }.bind(this), 0);
    }
}
Banner.prototype.fade = function () {
    for (var i = 0, slide; slide = this.sliders[i++];) {
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.state === "tofirst" ? this.nowIndex-- : "";
    this.state === "tofifth" ? this.nowIndex++ : "";
    this.sliders[this.nowIndex].style.opacity = 1;
}
Banner.prototype.changePagination = function () {
    for (var i = 0, bullet; bullet = this.pagination_ele.children[i++];) {
        removeClassName(bullet, "pagination-bullet-active")
    }
    this.pagination_ele.children[this.nowIndex % 5].className += " pagination-bullet-active";
}
Banner.prototype.handlerPaginationClick = function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if (target !== this.pagination_ele) {
        for (var i = 0; i < target.parentNode.children.length; i++) {
            if (target === target.parentNode.children[i]) {
                // console.log(this.nowIndex);
                if (this.nowIndex === 5) {
                    console.log(1);
                    this.nowIndex=0;
                    this.state="special";
                    if(i===0)   break;
                }
                // else if(this.nowIndex===5&&i===1){
                //     console.log(2);
                //     this.nowIndex = 1;
                //     this.state = "tofirst";
                //     // this.slide();
                //     break;
                // }
                // else if(this.nowIndex===5&&i===4){
                //     console.log(3);
                //     this.wrapper.style.left=0+"px";
                //     this.nowIndex = this.sliders.length - 2;
                //     this.state = "tofifth";
                //     // this.slide();
                //     break;
                // }
                //else{
                    // console.log(4);
                    this.nowIndex=i;
                    this.state="normal";
                    break;
                //}
            }
        }
    }
}
function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
}