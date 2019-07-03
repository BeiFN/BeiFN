function Magnifier() {
    this.small_wrapper = $(".small-img");
    this.small_img = $(".small-img img");
    this.cube = $(".cube");
    this.big_wrapper = $(".big-img");
    this.big_img = $(".big-img img");

    this.small_wrapper_pos = getAbsPosition(this.small_wrapper);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.cube_size = getSize(this.cube);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.big_img_size = getSize(this.big_img);

    this.init();
}

Magnifier.prototype.init = function () {
    this.small_wrapper.addEventListener("mouseenter", this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove", this.moveHandler.bind(this));
}

Magnifier.prototype.show = function () {
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";
}

Magnifier.prototype.hide = function () {
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";
}


Magnifier.prototype.moveHandler = function (evt) {
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_pos.left - this.cube_size.width / 2;
    var y = e.pageY - this.small_wrapper_pos.top - this.cube_size.height / 2;

    var cube_pos = this.boundary(x, y);
    var big_img_pos = this.getBigPositon(x, y);
    this.move(cube_pos, big_img_pos);
}

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

Magnifier.prototype.boundary = function (x, y) {
    x = x <= 0 ? 0 : x;
    x = x > this.small_wrapper_size.width - this.cube_size.width ? this.small_wrapper_size.width - this.cube_size.width : x;
    y = y <= 0 ? 0 : y;
    y = y > this.small_wrapper_size.height - this.cube_size.height ? this.small_wrapper_size.height - this.cube_size.height : y;
    return {
        x: x,
        y: y
    }
}

Magnifier.prototype.move = function (cube_pos, big_img_pos) {
    this.cube.style.left = cube_pos.x + "px";
    this.cube.style.top = cube_pos.y + "px";
    this.big_img.style.left = -big_img_pos.x + "px";
    this.big_img.style.top = -big_img_pos.y + "px";

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

new Magnifier();