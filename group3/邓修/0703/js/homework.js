function Magnifier() {
    //小图部分
    this.small_img_wrapper = $(".small-img");
    this.small_img = $(".small-img img");
    this.cube = $(".cube");
    this.img_btn_wrapper = $(".img-btn");
    this.img_btns = this.img_btn_wrapper.children;
    //大图部分
    this.big_img_wrapper = $(".big-img");
    this.big_img = $(".big-img img");
    //切换图片链接
    this.list = [
        {
            src_small: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src_big: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
            src_small: "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src_big: "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
    ];
    this.small_wrapper_position = getAbsPosition(this.small_img_wrapper);
    this.small_wrapper_size = getSize(this.small_img_wrapper);
    this.cube_size = getSize(this.cube);
    this.big_wrapper_size = getSize(this.big_img_wrapper);
    this.big_img_size = getSize(this.big_img);
    //核心方法调用
    this.init();
}

Magnifier.prototype.init = function () {
    this.small_img_wrapper.addEventListener("mouseenter", this.show.bind(this));
    this.small_img_wrapper.addEventListener("mouseleave", this.hide.bind(this));
    this.small_img_wrapper.addEventListener("mousemove", this.handlerMousemove.bind(this));
    this.img_btn_wrapper.addEventListener("click", delegation(this.changeImg.bind(this), ".img-box"));
}

Magnifier.prototype.show = function () {
    this.cube.style.display = "block";
    this.big_img_wrapper.style.display = "block";
    //移入小图变透明
    this.small_img.style.opacity = 0.3;
}

Magnifier.prototype.hide = function () {
    this.cube.style.display = "none";
    this.big_img_wrapper.style.display = "none";
    //移出小图还原
    this.small_img.style.opacity = 1;
}
//处理鼠标移动
Magnifier.prototype.handlerMousemove = function (evt) {
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.cube_size.width / 2;
    var y = e.pageY - this.small_wrapper_position.top - this.cube_size.height / 2;
    var cube_position = this.boundary(x, y);        //this直接调用不需要用bind改变this指向，只有在事件监听或绑定时需要使用bind
    var big_img_position = this.getBigPosition(cube_position.x, cube_position.y);
    this.move(cube_position, big_img_position);
}
//边界检测
Magnifier.prototype.boundary = function (x, y) {
    //x最小值为0,y最小值为0
    x = x <= 0 ? 0 : x;
    y = y <= 0 ? 0 : y;
    //x最大值为图片外包围宽度减去小方块宽度,y最大值为图片外包围高度减去小方块高度
    var maxX = this.small_wrapper_size.width - this.cube_size.width;
    var maxY = this.small_wrapper_size.height - this.cube_size.height;
    x = x >= maxX ? maxX : x;
    y = y >= maxY ? maxY : y;
    return {
        x: x,
        y: y
    };
}

Magnifier.prototype.move = function (cube_position, big_img_position) {
    this.cube.style.left = cube_position.x + "px";
    this.cube.style.top = cube_position.y + "px";
    this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
    this.big_img.style.left = -big_img_position.x + "px";
    this.big_img.style.top = -big_img_position.y + "px";
}

//根据比例计算大图位置
Magnifier.prototype.getBigPosition = function (x, y) {
    var percentX = x / (this.small_wrapper_size.width - this.cube_size.width);
    var percentY = y / (this.small_wrapper_size.height - this.cube_size.height);
    var big_positionX = parseInt(percentX * (this.big_img_size.width - this.big_wrapper_size.width));
    var big_positionY = parseInt(percentY * (this.big_img_size.height - this.big_wrapper_size.height));
    return {
        x: big_positionX,
        y: big_positionY
    };
}

Magnifier.prototype.changeImg = function (evt) {
    for (let i = 0, btn; btn = this.img_btns[i++];) {
        removeClassName(btn, "active");
        // console.log(btn,i);
        btn.index = i-1;
    }
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    // ele.className += " active";
    target.parentNode.className += " active";
    // console.log(target.parentNode.index);
    this.cube.style.backgroundImage = "url(" + this.list[target.parentNode.index].src_small + ")";
    this.small_img.src = this.list[target.parentNode.index].src_small;
    this.big_img.src = this.list[target.parentNode.index].src_big;
}


function getAbsPosition(dom) {
    var position = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    };
    if (dom.offsetParent === document.body) {
        return position;
    } else {
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left: dom.offsetLeft + pos.left,
            top: dom.offsetTop + pos.top
        };
    }
}

function getSize(dom) {
    return {
        width: parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"])
    };
}

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
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
                handlerClick.call(ele, e);
                break;
            }
        }
    }
}

function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\\s\?" + className), "");
}
new Magnifier();