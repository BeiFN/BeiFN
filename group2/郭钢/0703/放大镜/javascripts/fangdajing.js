function Magnify(url) {

    // 获取各个元素
    this.smallCube = $("#smallCube");
    this.wrapperSmall = $("#wrapperSmall");
    this.wrapperBig = $("#wrapperBig");
    this.smallImg = $("#wrapperSmall img");
    this.bigImg = $("#wrapperBig img");
    this.btn = $("#imgBtn");
    this.btn1 = $("#btn1");
    this.btn2 = $("#btn2");
    this.url = url;

    // 获取所需元素的大小
    this.bigImgSize = getSize(this.bigImg);
    this.smallCubeSize = getSize(this.smallCube);
    this.smallImgSize = getSize(this.smallImg);
    console.log(this.smallImgSize);
    this.wrapperBigSize = getSize(this.wrapperBig);
    this.wrapperSmallAbsPos = absPosition(this.wrapperSmall);

    this.init();
}

// 初始化
Magnify.prototype.init = function () {
    // 添加事件
    this.wrapperSmall.addEventListener("mouseenter", this.eleShow.bind(this));
    this.wrapperSmall.addEventListener("mouseleave", this.eleHid.bind(this));
    this.wrapperSmall.addEventListener("mousemove", this.handlerMove.bind(this));
    this.btn.addEventListener("click",this.changeBtn.bind(this));
    this.btns = this.btn.children;
    // this.btn1.addEventListener("click",changBtn1.bind(this));
    // this.btn2.addEventListener("click",changBtn2.bind(this));
}

// 鼠标进入，元素显示
Magnify.prototype.eleShow = function () {
    this.smallImg.style.opacity = 0.3;

    this.smallCube.style.display = "block";

    this.wrapperBig.style.display = "block";
}

// 输出离开，元素隐藏
Magnify.prototype.eleHid = function () {
    this.smallCube.style.display = "none";
    this.wrapperBig.style.display = "none";
    this.smallImg.style.opacity = 1;
}

// 移入时的各个位置
Magnify.prototype.handlerMove = function (evt) {
    var e = evt || window.event;


    // 计算鼠标相对小方块中间的位置
    var X = e.pageX - this.wrapperSmallAbsPos.X - this.smallCubeSize.width / 2;
    var Y = e.pageY - this.wrapperSmallAbsPos.Y - this.smallCubeSize.height / 2;

    // 边界检测
    this.pos = this.boundary(X, Y);
    // 调用计算大图位置的方法
    this.bigPos = this.bigPosition();


    // 调用运动方法
    this.move();
}

// 小方块及大图片移动
Magnify.prototype.move = function () {
    this.smallCube.style.left = this.pos.left + "px";
    this.smallCube.style.top = this.pos.top + "px";

    // 小方块背景图的移动
    this.smallCube.style.backgroundPosition = -this.pos.left + "px " + -this.pos.top + "px";

    // 大图的左、上移动 距离
    this.bigImg.style.left = this.bigPos.left + "px";
    this.bigImg.style.top = this.bigPos.top + "px";
}

// 边界检测
Magnify.prototype.boundary = function (X, Y) {
    X = X < 0 ? 0 : X;
    X = X > (this.smallImgSize.width - this.smallCubeSize.width) ? (this.smallImgSize.width - this.smallCubeSize.width) : X;

    Y = Y < 0 ? 0 : Y;
    Y = Y > (this.smallImgSize.height - this.smallCubeSize.height) ? (this.smallImgSize.height - this.smallCubeSize.height) : Y;
    return {
        left: X,
        top: Y,
    }
}

// 比例计算
Magnify.prototype.bigPosition = function () {
    var X = -(this.bigImgSize.width - this.wrapperBigSize.width) * (this.pos.left / (this.smallImgSize.width - this.smallCubeSize.width));
    var Y = -(this.bigImgSize.height - this.wrapperBigSize.height) * (this.pos.top / (this.smallImgSize.height - this.smallCubeSize.height));
    return {
        left: X,
        top: Y,
    }
}

Magnify.prototype.changeBtn = function(evt){
    var e = evt || window .event;
    var target = e.target || e.srcElement;
    for(var i = 0,ele;ele = this.btns[i++];){
        ele.style.border = "none";
        if(target.parentNode === ele){
            ele.style.border = "1px solid red";
            this.smallImg.src = this.url["img" + i].middle;
            this.bigImg.src = this.url["img" + i].large;
            this.smallCube.style.backgroundImage ='url("' + this.url["img" + i].middle + '")';
        }
    }
}









// 选择器
function $(selector) {
    var sele = null;
    return (sele = document.querySelectorAll(selector)).length === 1 ? sele[0] : sele;
}

// 绝对值
function absPosition(dom) {
    var position = {
        X: dom.offsetLeft,
        Y: dom.offsetTop,
    };
    if (dom.offsetParent === document.body) {
        return position;
    } else {
        var pos = absPosition(dom.offsetParent);
        return {
            X: dom.offsetLeft + pos.X,
            Y: dom.offsetTop + pos.Y,
        }
    }
}

// 求元素大小
function getSize(dom) {

    return {
        width: parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"]),
    }
}