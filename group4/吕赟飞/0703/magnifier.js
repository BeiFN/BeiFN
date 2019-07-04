function Magnifier() {
    this.small_wrapper = $(".small-img");
    this.small_img = $(".small-img img");
    this.cube = $(".cube");
    this.big_wrapper = $(".big-img");
    this.big_img = $(".big-img img");
    this.img_btn_wrapper = $(".img-btn");
    this.img_btns = this.img_btn_wrapper.children;
    this.img_btn_list = Array.from(this.img_btns);

    this.small_wrapper_pos = getAbsPosition(this.small_wrapper);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.cube_size = getSize(this.cube);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.big_img_size = getSize(this.big_img);

    this.list = [{
            ssrc: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bsrc: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
            ssrc: "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bsrc: "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
    ]

    this.init();
}

Magnifier.prototype.init = function () {
    this.small_wrapper.addEventListener("mouseenter", this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove", this.moveHandler.bind(this));
    this.img_btn_wrapper.addEventListener("click", delegation(this.changeImg.bind(this), ".img-box"));
}

Magnifier.prototype.changeImg = function (evt, ele) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    for (var i = 0, btn; btn = this.img_btns[i++];) {
        removeClassName(btn, "active");
    }
    ele.className += " active";

    var index = this.img_btn_list.indexOf(target.parentNode);
    this.small_img.src = this.list[index].ssrc;
    this.cube.style.backgroundImage = "url(" + this.list[index].ssrc + ")";
    this.big_img.src = this.list[index].bsrc;

}

// 显示
Magnifier.prototype.show = function () {
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";
    this.small_img.style.opacity = 0.5;
}
// 隐藏
Magnifier.prototype.hide = function () {
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";
    this.small_img.style.opacity = 1;

}

Magnifier.prototype.moveHandler = function (evt) {
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_pos.left - this.cube_size.width / 2;
    var y = e.pageY - this.small_wrapper_pos.top - this.cube_size.height / 2;

    var cube_pos = this.boundary(x, y);
    var big_img_pos = this.getBigPositon(x, y);
    this.move(cube_pos, big_img_pos);
}
// 根据比例计算大图位置
Magnifier.prototype.getBigPositon = function (x, y) {
    var propx = x / (this.small_wrapper_size.width - this.cube_size.width);
    var propy = y / (this.small_wrapper_size.height - this.cube_size.height);
    var big_img_x = propx * (this.big_img_size.width - this.big_wrapper_size.width);
    var big_img_y = propy * (this.big_img_size.height - this.big_wrapper_size.height);
    return {
        x: big_img_x,
        y: big_img_y
    }
}
// 边界检测
Magnifier.prototype.boundary = function (x, y) {
    x = x <= 0 ? 0 : x;
    var maxx = this.small_wrapper_size.width - this.cube_size.width;
    x = x > maxx ? maxx : x;
    y = y <= 0 ? 0 : y;
    var maxy = this.small_wrapper_size.height - this.cube_size.height;
    y = y > maxy ? maxy : y;
    return {
        x: x,
        y: y
    }
}
// 运动
Magnifier.prototype.move = function (cube_pos, big_img_pos) {
    this.cube.style.left = cube_pos.x + "px";
    this.cube.style.top = cube_pos.y + "px";
    this.big_img.style.left = -big_img_pos.x + "px";
    this.big_img.style.top = -big_img_pos.y + "px";
    this.cube.style.backgroundPosition = -cube_pos.x + "px " + -cube_pos.y + "px";
}

function $(selector) {
    var ele = null;
    return (ele = document.body.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function getAbsPosition(dom) {
    var position = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    }
    if (dom.offsetParent === document.body) {
        return position;
    } else {
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left: dom.offsetLeft + pos.left,
            top: dom.offsetTop + pos.top
        }
    }
}

function getSize(dom) {
    return {
        width: parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"])
    }
}

function delegation(handlerClick, selector) {
    return function (evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var _tempTarget = target;
        var count = 0;
        while (true && count++ < 100) {
            if (_tempTarget === this || _tempTarget === null) {
                break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }
        for (var i = 0, ele; ele = eleList[i++];) {
            if (targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1) {
                handlerClick.call(ele, e, ele);
                break;
            }
        }
    }
}

function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\s?" + className), "");
}


new Magnifier();