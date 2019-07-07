class Magnifier {
    constructor() {
        this.smallBox = $(".small-img");
        this.cube = $(".cube");
        this.bigBox = $(".big-img");
        this.smallImg = $(".small-img img");
        this.bigImg = $(".big-img img");
        this.imgBtn = $(".img-btn");

        this.small_box_position = getAbsPosition(this.smallBox);
        this.cube_size = getSize(this.cube);
        this.smallBox_size = getSize(this.smallBox);
        this.bigBox_size = getSize(this.bigBox);
        this.bigImg_size = getSize(this.bigImg);

        this.imgList = [{
                small_src: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                big_src: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            {
                small_src: "https://img14.360buyimg.com/n1/s450x450_jfs/t1/4835/4/3495/116479/5b997c00Ee1997ea4/4454a4fb41feeda3.jpg",
                big_src: "https://img14.360buyimg.com/n0/jfs/t1/4835/4/3495/116479/5b997c00Ee1997ea4/4454a4fb41feeda3.jpg"
            }
        ];

        this.init();
    }

    init() {
        this.smallBox.addEventListener("mouseenter", this.mouseEnterHandler.bind(this));
        this.smallBox.addEventListener("mouseleave", this.mouseLeaveHandler.bind(this));
        this.smallBox.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        this.imgBtn.addEventListener("click", this.changePic.bind(this));
    }

    changePic(evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        for (var i = 0; i < this.imgBtn.children.length; i++) {
            this.imgBtn.children[i].className = "img-box";
        }
        target.parentNode.className += " active";

        var imgBox = Array.prototype.slice.call(this.imgBtn.children);
        var index = imgBox.indexOf(target.parentNode);

        this.smallBox.children[0].src = this.imgList[index].small_src;
        this.smallBox.children[1].style.backgroundImage = "url(" + this.imgList[index].small_src + ")";
        this.bigBox.children[0].src = this.imgList[index].big_src;
    }

    mouseEnterHandler() {
        this.cube.style.display = "block";
        this.bigBox.style.display = "block";
        this.smallImg.style.opacity = "0.3";
    }

    mouseLeaveHandler() {
        this.cube.style.display = "none";
        this.bigBox.style.display = "none";
        this.smallImg.style.opacity = "1";
    }

    mouseMoveHandler(evt) {
        var e = evt || window.event;
        var x = e.pageX - this.small_box_position.left - this.cube_size.width / 2;
        var y = e.pageY - this.small_box_position.top - this.cube_size.height / 2;

        var cube_position = this.boundary(x, y);
        var big_box_position = this.getBigImgPosition(x, y);

        this.move(cube_position, big_box_position);
    }

    move(cube_position, big_box_position) {
        this.cube.style.left = cube_position.x + "px";
        this.cube.style.top = cube_position.y + "px";

        this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

        this.bigImg.style.left = big_box_position.x + "px";
        this.bigImg.style.top = big_box_position.y + "px";
    }

    getBigImgPosition(x, y) {
        var propX = -parseInt((x / (this.smallBox_size.width - this.cube_size.width)) * (this.bigImg_size.width - this.bigBox_size.width));
        var propY = -parseInt((y / (this.smallBox_size.height - this.cube_size.height)) * (this.bigImg_size.height - this.bigBox_size.height));
        return {
            x: propX,
            y: propY
        }
    }

    boundary(x, y) {
        x <= 0 ? x = 0 : x;
        var maxX = this.smallBox_size.width - this.cube_size.width;
        x >= maxX ? x = maxX : x;

        y <= 0 ? y = 0 : y;
        var maxY = this.smallBox_size.height - this.cube_size.height;
        y >= maxY ? y = maxY : y;
        return {
            x: x,
            y: y
        }
    }
}

function getAbsPosition(dom) {
    var position = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    }
    if (dom.offsetParent === document.body) return position;
    else {
        var _pos = getAbsPosition(dom.offsetParent);
        return {
            left: dom.offsetLeft + _pos.left,
            top: dom.offsetTop + _pos.top
        }
    }
}

function getSize(dom) {
    return {
        width: parseInt(getComputedStyle(dom).width),
        height: parseInt(getComputedStyle(dom).height)
    }
}

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

new Magnifier();