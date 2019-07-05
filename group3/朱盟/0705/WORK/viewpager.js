function ViewPager(selector, option) {
    this.modeList = [
        "slide", "fade"
    ]
    // 轮播域
    this.domain = $(selector);
    // 轮播项配置
    this.config = Object.assign({
            mode: "fade",
            pagination: true
        },
        option
    )
    // 轮播视图组
    this.pager = $(".pager");
    this.views = $(".view");
    // 前进后退的按钮
    this.bt_next = $(".button-next");
    this.bt_prev = $(".button-prev");
    //页码容器
    this.pagination = $(".pagination");
    // 公共变量 轮播视图标识
    this.INDEX = 0;
    this.ini();
}
ViewPager.prototype.ini = function () {
    //  初始化 轮播域 配置、环境 预处理 
    this.ConfigProcess.call(this);
    // 轮播域 事件绑定
    this.domain.addEventListener("click", this.domainClickHandler.bind(this));
    // 前进后退的按钮   事件绑定
    this.bt_prev.addEventListener("click", this.prevClickHandler.bind(this));
    this.bt_next.addEventListener("click", this.nextClickHandler.bind(this));
    console.log("ViewPager loading !!");
}
ViewPager.prototype.ConfigProcess = function () {
    var mode = this.config.mode;
    switch (mode) {
        case "fade":
            this.styleProcess.call(this, mode);
            break;
        case "slide":
            this.slideCloneView = this.views[0].cloneNode(true);
            this.pager.appendChild(this.slideCloneView);
            this.views = [].slice.call(this.views);
            this.views.push(this.slideCloneView);
            this.styleProcess.call(this, mode);
            break;

        default:

            break;
    }
    if (this.config.pagination) {
        var onClass = "pagination-vein-active"
        var html = "";
        for (var i = 0; i < this.views.length; i++) {
            var pagiVien = `<div class="pagination-vein" pg-index=${i}></div>`
            var pagiVienOn = `<div class="pagination-vein ${onClass}" pg-index=${i}></div>`
            var pagiVienHide = `<div class="pagination-vein hide" pg-index=${i}></div>`
            if (i === 0) {
                html += pagiVienOn;
            } else if (mode === "slide" && i === this.views.length - 1) {
                html += pagiVienHide;
            } else {
                html += pagiVien;
            }

        }
        this.pagination.html(html);
        this.paginationViens = this.pagination.$(".pagination-vein");
    }

}

ViewPager.prototype.fadeHandler = function () {
    [].slice.call(this.views).forEach(element => {
        element.style.opacity = 0;
        element.style.transition = "all 1s";
    });
    this.views[this.INDEX].style.opacity = 1;
}

ViewPager.prototype.slideHandler = function () {

    if (this.INDEX === 0 && this.isNext) {
        this.pager.style.transition = "top 0.1s";
        this.pager.style.left = "0px";
        setTimeout(function () {
            this.pager.style.transition = "left 1s";
            var event = new Event("click", {
                bubbles: true,
                cancelable: true
            });
            this.bt_next.dispatchEvent(event);
        }.bind(this), 0);
    } else if (this.INDEX === this.views.length - 1 && !this.isNext) {
        this.pager.style.transition = "top 0.1s";
        this.pager.style.left = -(this.INDEX) * this.domain.offsetWidth + "px"

        setTimeout(function () {
            this.pager.style.transition = "left 1s";
            var event = new Event("click", {
                bubbles: true,
                cancelable: true
            });
            this.bt_prev.dispatchEvent(event);
        }.bind(this), 0);
    } else {
        this.pager.style.transition = "left 1s";
        this.pager.style.left = "0px";
        setTimeout(function () {
            this.pager.style.left = -this.INDEX * this.domain.offsetWidth + "px"
        }.bind(this), 0);
    }

}

ViewPager.prototype.styleProcess = function (mode) {

    this.modeList.forEach(element => {
        this.domain.classRemove(element + "-mode");
    });
    switch (mode) {
        case "fade":
            this.domain.classAdd(mode + "-mode");
            this.views[this.INDEX].classAdd(" view-on ");
            break;
        case "slide":
            this.slideCount = this.views.length;
            this.pager.style.width = this.domain.offsetWidth * this.slideCount + "px";
            [].slice.call(this.views).forEach(element => {
                element.style.width = this.domain.offsetWidth + "px";
            });
            this.domain.classAdd(mode + "-mode");
            this.views[this.INDEX].classAdd(" view-on ");
            break;
        default:

            break;
    }

}

ViewPager.prototype.domainClickHandler = function (ev) {
    var e = ev || window.event;
    var capture = e.target || e.srcElement;
    if (capture.className.indexOf("pagination-vein") !== -1) {
        [].slice.call(this.paginationViens).forEach((element, index) => {
            element.classRemove("pagination-vein-active");
            if (capture === element) {
                this.INDEX = element.attr("pg-index");
            }
        });
    }
    [].slice.call(this.paginationViens).forEach((element, index) => {
        element.classRemove("pagination-vein-active");
        if (element.attr("pg-index") === this.INDEX + "") {
            element.classAdd("pagination-vein-active");
            if (element.attr("pg-index") === this.views.length - 1 + "") {
                console.log(this.INDEX);
                this.paginationViens[0].classAdd("pagination-vein-active");
            }
        }
    });
    this[this.config.mode + "Handler"].call(this);
}
ViewPager.prototype.prevClickHandler = function () {
    this.isNext = false;
    this.INDEX <= 0 ? this.INDEX = this.views.length - 1 : this.INDEX--;
}
ViewPager.prototype.nextClickHandler = function () {
    this.isNext = true;
    this.INDEX >= this.views.length - 1 ? this.INDEX = 0 : this.INDEX++;
}