function Magnifier(){
    this.smallImgWrapper = $(".small-img")
    this.smallImg = $(".small-img img")
    this.smallcube = $(".cube")
    this.bigImgWrapper = $(".big-img")
    this.bigImg = $(".big-img img")
    this.imgBtn = $(".img-btn")
    this.imgBtns = $(".img-box")

    this.smallImgWrapper.size = getSize(this.smallImgWrapper)
    this.smallcube.size = getSize(this.smallcube)
    this.bigImg.size = getSize(this.bigImg)
    this.bigImgWrapper.size = getSize(this.bigImgWrapper)

    this.index = 0;
    this.imgList = [
        {
            smallimg: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigimg: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
        , {
            smallimg: "https://img14.360buyimg.com/n1/s450x450_jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg",
            bigimg: "https://img14.360buyimg.com/n0/jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg"
        }]

    this.init();
}

Magnifier.prototype.init = function(){
    this.smallImgWrapper.addEventListener("mouseenter", this.show.bind(this))
    this.smallImgWrapper.addEventListener ("mouseleave",this.hide.bind(this))
    this.smallImgWrapper.addEventListener("mousemove",this.handlerMove.bind(this))

    this.imgBtn.addEventListener("click",delegation(this.handlerImgBtnClick.bind(this),".img-box"))
    this.imgBtn.addEventListener("click",this.imageChange.bind(this))
}
Magnifier.prototype.handlerImgBtnClick = function(evt){
    var target = evt.target||evt.srcElement;
    //ele是符合条件的点击的ele
    for(var i = 0,imgbtn;imgbtn = this.imgBtns[i];i++){
        //清除每一个的class active
        removeClassName(imgbtn,"active")
        if(imgbtn==target.parentNode){
            this.index = i;
            imgbtn.className +=" active"
        }
    }
    
}
//改变图片
Magnifier.prototype.imageChange = function(){
    this.smallImg.src = this.imgList[this.index].smallimg
    this.smallcube.style.backgroundImage = "url("+this.imgList[this.index].smallimg+")"
    this.bigImg.src =  this.imgList[this.index].bigimg
}

Magnifier.prototype.show= function(){
    this.smallcube.style.display = "block"
    this.bigImgWrapper.style.display = "block"
    this.smallImg.style.opacity = "0.3"
    this.smallcube.style.opacity = "1"
}

Magnifier.prototype.hide = function(){
    this.smallcube.style.display = "none"
    this.bigImgWrapper.style.display = "none"
    this.smallImg.style.opacity = "1"
}
Magnifier.prototype.handlerMove = function(evt){
    var e = evt||event;
    var x = e.pageX-this.smallcube.offsetWidth/2-getAbsPosition(this.smallImgWrapper).width
    var y = e.pageY-this.smallcube.offsetHeight/2-getAbsPosition(this.smallImgWrapper).height
    var boundary = this.boundary(x,y)
    //改变大图的位置
    var bigImgPosition = this.getBigImgPosition(boundary)

    //这个不是由事件触发的  所以可以不用bind
    this.move(boundary,bigImgPosition)
}

Magnifier.prototype.move = function(boundary,bigImgPosition){
    this.smallcube.style.left = boundary.x+"px";
    this.smallcube.style.top = boundary.y+"px";
    //改变cube的背景图的位置
    this.smallcube.style.backgroundPosition = -boundary.x+"px "+-boundary.y+"px"

    //改变大图的位置
    this.bigImg.style.left = -bigImgPosition.x+"px"
    this.bigImg.style.top = -bigImgPosition.y+"px"
}

Magnifier.prototype.getBigImgPosition = function(boundary){
    var x = (boundary.x/(this.smallImgWrapper.size.width-this.smallcube.size.width)*(this.bigImg.size.width-this.bigImgWrapper.size.width))
    var y = (boundary.y/(this.smallImgWrapper.size.height-this.smallcube.size.height)*(this.bigImg.size.height-this.bigImgWrapper.size.height))
    return {
        x:x,
        y:y
    }
}
//边界检测的函数
Magnifier.prototype.boundary =function(x,y){
    x = x<=0?0:x
    //这种测量的操作会多次执行 非常的消耗性能 所以我们可以写一个函数将这些操作放到里面
    var maxX = this.smallImgWrapper.size.width - this.smallcube.size.width;
    x = x>=maxX?maxX:x;
    y = y<=0?0:y
    var maxY = this.smallImgWrapper.size.height-this.smallcube.size.height;
    y = y>=maxY?maxY:y
    return {
        x:x,
        y:y
    }
}
function removeClassName(dom,className){
    console.log(dom.className)
    return dom.className = dom.className.replace(new RegExp("\s?"+className,"g"),"")


}

//获取绝对的位置
function getAbsPosition (dom){
    var position = {
        width:dom.offsetLeft,
        height:dom.offsetTop
    }
    var ele = dom.offsetParent
    while(ele!=document.body){
        position.width += ele.offsetLeft,
        position.height += ele.offsetTop
        ele = ele.offsetParent
    }
    return position
}

function getSize(dom){
    var size = {
        width:parseInt(getComputedStyle(dom)["width"]),
        height:parseInt(getComputedStyle(dom)["height"])
    }
    return size;
}

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ==1?ele[0]:ele
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
                handlEvt.call(ele, e)
            }
        }
    }
}


new Magnifier();