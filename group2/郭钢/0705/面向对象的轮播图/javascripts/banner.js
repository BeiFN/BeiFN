class Banner {

    constructor({
        selector = ".container",
        options = {
            effect: "slide",
            pagination: ".pagination",
        }
    } = {}) {
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
    init() {

        this.layoutAnimate(); //动画布局，根据传入的哪种动画，渲染页面
        this.layoutPagination(); //分页器布局，根据内容，穿件分页个数

        //左右点击按钮控制下标变化
        this.btn_next.addEventListener("click", this.nextIndex.bind(this));
        this.btn_prev.addEventListener("click", this.prevIndex.bind(this));

        //根据传入的动画，选择调用哪种动画效果
        this.main.addEventListener("click", this[this.options.effect].bind(this));


        // 如果传入了分页器属性，给分页器添加事件
        this.pagination === null ? "" : this.main.addEventListener("click", this.changePagination.bind(this));
        this.pagination === null ? "" : this.pagination.addEventListener("click", this.paginationIndex.bind(this));
    }

    // 点击右边按钮时，下标的变化
    nextIndex() {
        if (this.nowIndex === this.slides.length - 1) {
            this.nowIndex = 0;
            this.state = "tofirstImg"; //给最后一个从右向左的图片添加标记
        } else {
            this.nowIndex++;
            this.state = "normal";
        }
    }

    // 点击左边按钮时，下标的变化
    prevIndex() {
        if (this.nowIndex === 0) {
            this.nowIndex = this.slides.length - 1;
            this.state = "toLastImg"; //给最后一个从左向右的图片添加标记
        } else {
            this.nowIndex--;
            this.state = "normal";
        }
    }

    // 点击换页时的下标
    paginationIndex(evt) {
        var e = evt || event;
        var target = e.target || e.srcElement;
        for (var i = 0, ele; ele = this.pagination.children[i++];) {
            if (target === ele) {
                this.toIndex(i); //如果当前点击的是分页器的话，对下标变化
                break
            }
        }
    }

    toIndex(i) {
        if (this.nowIndex === this.slides.length - 1 && i - 1 === 0) {
            return false; //如果点击的是假的最后一页的话，同时点击第一页的分页器，不发生变化
        }
        this.nowIndex = i - 1; //其他的让下标与当前点击的第几页相同
    }



    //点击换页
    changePagination() {

        //先把之前所有的active属性清空
        for (var j = 0, nowBullet; nowBullet = this.pagination.children[j++];) {
            removeClassName(nowBullet, "pagination-bullet-active");
        }
        var pagination_index = this.nowIndex;

        // 如果传入的是滑动属性
        if (this.options.effect === "slide") {
            // 如果到了最后一页，分页器下标置零
            pagination_index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex;

            // 如果从最后一页跳转，下标置1
            if (this.nowIndex === 0 && this.state === "tofirstImg") {
                pagination_index = 1;
            }
            // 从第一页跳转最后一页，下标置为长度减2
            if (this.nowIndex === this.slides.length - 1 && this.state === "toLastImg") {
                pagination_index = this.slides.length - 2;
            }
        }
        // 给当前的分页添加active属性值
        this.pagination.children[pagination_index].className += " pagination-bullet-active";
    }



    // 动画布局
    layoutAnimate() {
        // 滑动效果
        if (this.options.effect === "slide") {
            this.wrapper.style.left = 0;
            this.main.className += " container-slide";
            var slide = this.slides[0].cloneNode(true);
            this.wrapper.appendChild(slide);
            this.slides = [].slice.call(this.slides);
            this.slides.push(slide);
            this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";
        }
        // 淡入淡出效果
        if (this.options.effect === "fade") {
            this.main.className += " container-fade";
        }
    }



    // 分页器布局
    layoutPagination() {
        var bullet_num = this.options.effect === "slide" ? this.slides.length - 1 : this.slides.length;
        this.pagination = document.querySelector(this.options.pagination);
        if (this.pagination === null) {
            return false;
        }
        var html = "";
        if (!this.options.pagination) {
            return false;
        }
        for (var i = 0; i < bullet_num; i++) {
            if (i === 0) {
                html = "<div class='pagination-bullet pagination-bullet-active'></div>"
            } else {
                html += "<div class='pagination-bullet'></div>";
            }
        }
        this.pagination.innerHTML = html;
    }

    // 滑动效果
    slide() {

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
    fade() {
        for (var i = 0, slide; slide = this.slides[i++];) {
            slide.style.opacity = "0";
            slide.style.transition = "all 1s";
        }
        this.slides[this.nowIndex].style.opacity = "1"
    }



    static removeClassName(ele, ele_className) {
        ele.className = ele.className.replace(new RegExp("\S?" + ele_className), "");
    }
}