class Magnifier {
    constructor() {
        this.small_wrapper = Magnifier.$(".small-img");
        this.small_wrapper_position = Magnifier.getAbsPosition(this.small_wrapper);
        this.small_wrapper_size = Magnifier.getSize(this.small_wrapper);
        this.small_img = Magnifier.$(".small-img img");
        this.small_cube = Magnifier.$(".cube");
        this.small_cube_size = Magnifier.getSize(this.small_cube);
        this.big_wrapper = Magnifier.$(".big-img");
        this.big_wrapper_size = Magnifier.getSize(this.big_wrapper);
        this.big_img = Magnifier.$(".big-img img");
        this.big_img_size = Magnifier.getSize(this.big_img);
        this.img_btn_wrapper = Magnifier.$(".img-btn");
        this.img_btns = this.img_btn_wrapper.children;
        this.small_wrapper.addEventListener("mouseenter", this.show.bind(this));
        this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this));
        this.small_wrapper.addEventListener("mousemove", this.hanlderMousemove.bind(this));
    }
    show() {
        this.small_img.style.opacity = 0.3;
        this.small_cube.style.display = "block";
        this.big_wrapper.style.display = "block";
    }

    hide() {
        this.small_img.style.opacity = 1;
        this.small_cube.style.display = "none";
        this.big_wrapper.style.display = "none";
    }

    hanlderMousemove(evt) {
        var e = evt || event;
        var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
        var y = e.pageY - this.small_wrapper_position.top - this.small_cube_size.height / 2;
        var cube_position = this.boundary(x, y);
        var big_img_position = this.getBigPosition(x, y);
        this.move(cube_position, big_img_position);
    }

    move(cube_position, big_img_position) {
        this.small_cube.style.left = cube_position.x + "px";
        this.small_cube.style.top = cube_position.y + "px";
        this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px"; // 里面图片疯狂抖动bug，怎么解决？
        this.big_img.style.left = big_img_position.x + "px";
        this.big_img.style.top = big_img_position.y + "px";
    }

    boundary(x, y) {
        x = x < 0 ? 0 : x;
        var maxX = this.small_wrapper_size.width - this.small_cube_size.width;
        x = x > maxX ? maxX : x;
        y = y < 0 ? 0 : y;
        var maxY = this.small_wrapper_size.height - this.small_cube_size.height;
        y = y > maxY ? maxY : y;
        return {
            x: x,
            y: y
        }
    }

    getBigPosition(x, y) {
        var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
        var big_img_x = parseInt(propx * (this.big_wrapper_size.width - this.big_img_size.width));
        var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
        var big_img_y = parseInt(propy * (this.big_wrapper_size.height - this.big_img_size.height));
        return {
            x: big_img_x,
            y: big_img_y
        }
    }

    changeImg(evt, ele) {
        for (var i = 0, btn; btn = this.img_btns[i++];) {
            removeClassName(btn, "active");
        }
        ele.classname += " active";
    }

    static $(selector) {
        var ele = document.querySelectorAll(selector);
        return ele.length === 1 ? ele[0] : ele;
    }

    static getAbsPosition(dom) { // 已验证，逻辑正确，offsetLeft,clientLeft,scrollLeft,pageLeft的区别是啥？
        if (dom.offsetParent === document.body) {
            return {
                left: dom.offsetLeft,
                top: dom.offsetTop
            };
        } else {
            var pos = Magnifier.getAbsPosition(dom.offsetParent);
            return {
                left: dom.offsetLeft + pos.left,
                top: dom.offsetTop + pos.top
            }
        }
    }

    static getSize(dom) {
        return {
            width: parseInt(getComputedStyle(dom)["width"]),
            height: parseInt(getComputedStyle(dom)["height"])
        }
    }
}

new Magnifier();