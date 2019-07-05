//放大镜
function Magnifier() {
    //小图的wrapper
    this.smallImgWrapper = $(".small-img");
    this.smallImg = $(".small-img img")
    this.smallcube = $(".cube")
    this.bigImgWrapper = $(".big-img")
    this.bigImg = $(".big-img img")
    this.imgBtn = $(".img-btn")
    this.imgBtns = $(".img-box")
    //获取绝对定位的位置
    this.abs = getAbsPosition(this.smallImgWrapper)
    //图片列表
    this.imgList = [
        {
            smallimg: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigimg: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
        , {
            smallimg: "https://img14.360buyimg.com/n1/s450x450_jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg",
            bigimg: "https://img14.360buyimg.com/n0/jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg"
        }]

    //获取物体的size大小
    this.smallImgWrapper.size = getSize(this.smallImgWrapper)
    this.smallcube.size = getSize(this.smallcube)
    this.bigImg.size = getSize(this.bigImg)
    this.bigImgWrapper.size = getSize(this.bigImgWrapper)

    this.init();
}
//初始化
Magnifier.prototype.init = function () {
    //绑定显示和消失的原型的属性的函数
    this.smallImgWrapper.addEventListener("mouseenter", this.see.bind(this))
    this.smallImgWrapper.addEventListener("mouseleave", this.hide.bind(this))
    this.smallImgWrapper.addEventListener("mousemove", this.handlerMove.bind(this))

    //下面小图标点击切换的事件
    this.imgBtn.addEventListener("click", delegation(this.handlerImgBtnClick.bind(this), ".img-box"))
    this.imgBtn.addEventListener("click", this.imageChange.bind(this))
}
//鼠标点击图标按钮触发的事件处理函数              这两个参数是在事件委托进行调用的时候传递的
Magnifier.prototype.handlerImgBtnClick = function (evt, ele) {
    //ele
    var target = evt.target || evt.srcElement
    for (var i = 0, btn; btn = this.imgBtns[i]; i++) {
        btn.className = removeClassName(btn, "active")
        if (btn == target.parentNode) {
            this.index = i;
            btn.className += " active"
        }
    }
}
Magnifier.prototype.imageChange = function () {
    // console.log(this.index)
    this.smallImg.src = this.imgList[this.index].smallimg
    this.smallcube.style.backgroundImage = "url("+this.imgList[this.index].smallimg+")"
    this.bigImg.src = this.imgList[this.index].bigimg
}

//可见
Magnifier.prototype.see = function () {
    this.smallcube.style.display = "block"
    this.bigImgWrapper.style.display = "block"
    this.smallImg.style.opacity = "0.3"
}
//隐藏
Magnifier.prototype.hide = function () {
    this.smallcube.style.display = "none"
    this.bigImgWrapper.style.display = "none"
    this.smallImg.style.opacity = "1"
}
//cube移动
Magnifier.prototype.handlerMove = function (evt) {
    var e = evt || event;
    var x = e.pageX - this.smallcube.offsetWidth / 2 - this.abs.width;
    var y = e.pageY - this.smallcube.offsetHeight / 2 - this.abs.height;
    //卡住边界的函数  将传入的x和y的值进行改变 在给下面的物体进行运动
    var smallBoundary = this.boundary(x, y)
    var bigPosition = this.bigImgPosition(smallBoundary, e)
    this.move(smallBoundary, bigPosition);
}
//边界检测
Magnifier.prototype.boundary = function (x, y) {
    //最小x
    x = (x <= 0 ? 0 : x)
    this.maxX = this.smallImgWrapper.size.width - this.smallcube.size.width
    x = (x >= this.maxX ? this.maxX : x)
    y = (y <= 0 ? 0 : y)
    this.maxY = this.smallImgWrapper.size.height - this.smallcube.size.height;
    y = (y >= this.maxY ? this.maxY : y)
    return {
        x: x,
        y: y
    }
}
//大图的位置
Magnifier.prototype.bigImgPosition = function (smallBoundary, e) {
    var x = (smallBoundary.x / (this.smallImgWrapper.size.width - this.smallcube.size.width) * (this.bigImg.size.width - this.bigImgWrapper.size.width))
    var y = (smallBoundary.y / (this.smallImgWrapper.size.height - this.smallcube.size.height) * (this.bigImg.size.height - this.bigImgWrapper.size.height))
    // console.log(x,y)
    return {
        x: x,
        y: y
    }
}

//移动
Magnifier.prototype.move = function (smallBoundary, bigPosition) {
    //方块移动
    this.smallcube.style.left = smallBoundary.x + "px"
    this.smallcube.style.top = smallBoundary.y + "px"

    //cube背景图移动
    this.smallcube.style.backgroundPosition = -smallBoundary.x + "px " + -smallBoundary.y + "px"

    //大图移动
    // console.log(bigPosition)
    this.bigImg.style.left = -bigPosition.x + "px"
    this.bigImg.style.top = -bigPosition.y + "px"

}
//获取当前元素距离边界的位置
function getAbsPosition(ele) {
    //先获取当前元素的距离
    var position = {
        width: ele.offsetLeft,
        height: ele.offsetTop
    }
    var dom = ele;
    //如果不等于
    while (dom.offsetParent != document.body) {
        dom = dom.offsetParent;
        position.width += dom.offsetLeft;
        position.height += dom.offsetTop;
    }
    return position;
}
//获取大小的函数
function getSize(ele) {
    var size = {
        //getComputedStyle测量出来的宽高有px 所以我们要进行parseInt
        width: parseInt(getComputedStyle(ele)["width"]),
        height: parseInt(getComputedStyle(ele)["height"])
    }
    return size
}
//去掉className
function removeClassName(dom, className) {
    //去掉类名的函数
    dom.className = dom.className.replace(new RegExp("\s?" + className, "g"), "")
    return dom.className;
}
//事件委托函数
function delegation(handlEvt, selector) {

    return function (evt) {
        var e = evt || event;
        var target = e.target || e.srcElement
        var _tampTarget = target
        //添加家族
        var targetFamily = [];
        var selectList = this.querySelectorAll(selector)
        //添加家族元素
        while (true) {
            if (_tampTarget == this) break;
            //获取点击元素直到最终ul元素之间的所有父元素
            targetFamily.push(_tampTarget);
            _tampTarget = _tampTarget.parentNode;
        }
        for (var i = 0, ele; ele = selectList[i++];) {
            if (targetFamily.length == 1 ? target == ele : targetFamily.indexOf(ele)) {
                //这里传递的ele是满足条件的元素
                //因为在这里的回调函数中的this指向的是实例，所以这个要把ele再当作参数传递一次
                handlEvt.call(ele, e, ele)
            }
        }
    }
}


//选择函数
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length == 1 ? ele[0] : ele;
}
new Magnifier();



//         ┏┓　　　┏┓+ +
// #　　　┏┛┻━━━┛┻┓ + +
// #　　　┃　　　　　　　┃ 　
// #　　　┃　　　━　　　┃ ++ + + +
// #　　     ████━████ ┃+
// #　　　┃　　　　　　　┃ +
// #　　　┃　　　┻　　　┃
// #　　　┃　　　　　　　┃ + +
// #　　　┗━┓　　　┏━┛
// #　　　　　┃　　　┃　　　　　　　　　　　
// #　　　　　┃　　　┃ + + + +
// #　　　　　┃　　　┃　　　　Codes are far away from bugs with the animal protecting　　　
// #　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
// #　　　　　┃　　　┃
// #　　　　　┃　　　┃　　+　　　　　　　　　
// #　　　　　┃　 　　┗━━━┓ + +
// #　　　　　┃ 　　　　　　　┣┓
// #　　　　　┃ 　　　　　　　┏┛
// #　　　　　┗┓┓┏━┳┓┏┛ + + + +
// #　　　　　　┃┫┫　┃┫┫
// #　　　　　　┗┻┛　┗┻┛+ + + +
