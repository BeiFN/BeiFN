function Magnifier() {
    //选择需要用到的元素
    this.smallWrapper = $(".small-img");
    this.smallImg = $(".small-img img");
    this.smallCube = $(".cube")
    this.bigWrapper = $(".big-img")
    this.bigImg = $(".big-img img");

    this.imgBtnWrapper = $(".img-btn");
    this.imgBtns = Array.from(this.imgBtnWrapper.children);

    //获取元素的部分属性值
    //获取
    this.smallWrapperPosition = getAbsPosition(this.smallWrapper);
    this.smallWrapperSize = getSize(this.smallWrapper);
    this.smallCubeSize = getSize(this.smallCube);
    this.bigWrapperSize = getSize(this.bigWrapper);
    this.bigImgSize = getSize(this.bigImg)

    //获取差值
    this.maxSmallX = this.smallWrapperSize.width - this.smallCubeSize.width;
    this.maxSmallY = this.smallWrapperSize.height - this.smallCubeSize.height;

    this.maxBigX = this.bigWrapperSize.width - this.bigImgSize.width;
    this.maxBigY = this.bigWrapperSize.height - this.bigImgSize.height;

    //定义图片列表
    this.imgList = [
        {
            smallImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-d6ba13be1374bd9a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`,
            bigImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-6406652529dc4b3f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`
        },
        {
            smallImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-73271fa7f52f741d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`,
            bigImgSrc: `https://upload-images.jianshu.io/upload_images/18597145-9600502dc6a9b5ec.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240`
        }
    ]
    this.init();
};

//初始化绑定事件
Magnifier.prototype.init = function () {
    on(this.smallWrapper, "mouseenter", this.show.bind(this));
    on(this.smallWrapper, "mouseleave", this.hide.bind(this));
    on(this.smallWrapper, "mousemove", this.hanlderMousemove.bind(this));

    for (var i = 0, ele; ele = this.imgBtns[i]; i++) {
        on(ele, "click", this.changeImg.bind(this, ele, i))
    }
}

Magnifier.prototype.show = function () {
    this.smallCube.style.display = "block";
    this.bigWrapper.style.display = "block";
    this.smallImg.style.opacity = 0.3;
}
Magnifier.prototype.hide = function () {
    this.smallCube.style.display = "none";
    this.bigWrapper.style.display = "none";
    this.smallImg.style.opacity = 1;

}

//移动
Magnifier.prototype.move = function (cubePosition, bigImgPosition) {
    this.smallCube.style.left = cubePosition.x + "px";
    this.smallCube.style.top = cubePosition.y + "px";
    this.smallCube.style.backgroundPosition = -cubePosition.x + "px " + -cubePosition.y + "px";

    this.bigImg.style.left = bigImgPosition.x + "px";
    this.bigImg.style.top = bigImgPosition.y + "px";

}

//
Magnifier.prototype.hanlderMousemove = function (evt) {
    var e = evt || window.event;
    var x = e.pageX - this.smallWrapperPosition.left - this.smallCubeSize.width / 2;
    var y = e.pageY - this.smallWrapperPosition.top - this.smallCubeSize.height / 2;
    var cubePosition = this.boundary(x, y);
    var bigImgPosition = this.getBigPosition(cubePosition.x, cubePosition.y)
    this.move(cubePosition, bigImgPosition)
}

//边界检测
Magnifier.prototype.boundary = function (x, y) {
    x = x <= 0 ? 0 : x;
    y = y <= 0 ? 0 : y;
    x = x >= this.maxSmallX ? this.maxSmallX : x;
    y = y >= this.maxSmallY ? this.maxSmallY : y;
    return {
        x: x,
        y: y
    }
}
//根据比例算出大图位置
Magnifier.prototype.getBigPosition = function (x, y) {
    var propx = x / this.maxSmallX;
    var propy = y / this.maxSmallY;
    var bigImgX = parseInt(propx * this.maxBigX);
    var bigImgY = parseInt(propy * this.maxBigY);
    return {
        x: bigImgX,
        y: bigImgY
    }
}

//改变图片
Magnifier.prototype.changeImg = function (ele, index) {
    for (var i = 0, btn; btn = this.imgBtns[i++];) {
        removeClassName(btn, " active");
    }
    ele.className += " active";
    this.smallImg.src = this.imgList[index].smallImgSrc;
    this.bigImg.src = this.imgList[index].bigImgSrc;
    this.smallCube.style.backgroundImage = `url(${this.imgList[index].smallImgSrc})`;
}

//封装事件监听函数
function on(ele, event_type, event_callback) {
    return ele.addEventListener(event_type, event_callback);
}
//封装元素选择器
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
//封装获得物体尺寸函数
function getSize(dom) {
    return {
        width: parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"])
    }
}
//封装获得元素距离html的offsetxx的距离
function getAbsPosition(dom) {
    var position = {
        left: 0,
        top: 0
    }
    while (dom) {
        position.left += dom.offsetLeft;
        position.top += dom.offsetTop;
        dom = dom.offsetParent;
    }
    return position;
}
//封装移除class名方法
function removeClassName(dom, className) {
    return dom.className = dom.className.replace(new RegExp("\s?" + className), "")
}

new Magnifier()