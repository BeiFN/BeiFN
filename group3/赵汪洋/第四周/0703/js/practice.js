function Magnifier() {
    this.small_wrapper = $(".small-img");
    this.small_img = $(".samll-img img");
    this.small_cube = $(".cube");
    this.img_btn_wrapper = $(".img-btn");
    this.img_btns = this.img_btn_wrapper.children;
    this.big_wrapper = $(".big-img");
    this.big_img = $(".big-img img");
    this.list = [{
        src: ""
    }]
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.small_cube_size = getSize(this.small_cube);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.big_img_size = getSize(this.big_img);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.init();
}

Magnifier.prototype.init = function () {
    this.small_wrapper.addEventListener("mouseenter", this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove", this.hanlderMousemove.bind(this));
    this.img_btn_wrapper.addEventListener("click", delegation(this.changeImg.bind(this), ".img-box"))
}

Magnifier.prototype.changeImg = function (evt, ele) {
    // console.log(ele);
    for (var i = 0, btn; btn = this.img_btns[i++];) {
        removeClassName(btn, "active");
    }
    ele.className += " active";
}

Magnifier.prototype.show = function () {
    this.small_cube.style.display = "block";
    this.big_wrapper.style.display = "block";
    // 增加隐藏效果;

    this.small_img.style.opacity = 0.3;
}

Magnifier.prototype.hide = function () {
    this.small_cube.style.display = "none";
    this.big_wrapper.style.display = "none";

    this.small_img.style.opacity = 1;
}

Magnifier.prototype.move = function (cube_position, big_img_position) {
    this.small_cube.style.left = cube_position.x + "px";
    this.small_cube.style.top = cube_position.y + "px";

    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

    this.big_img.style.left = -big_img_position.x + "px";
    this.big_img.style.top = -big_img_position.y + "px";
}

Magnifier.prototype.hanlderMousemove = function (evt) {
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
    var y = e.pageY - this.small_wrapper_position.top - this.small_cube_size.height / 2;
    var cube_position = this.boundary(x, y);
    var big_img_position = this.getBigPosition(x, y);
    this.move(cube_position, big_img_position)
}

function $(selector){
    var ele = document.querySelectorAll(selector);
    return ele.length === 1 ? ele[0] : ele;
}