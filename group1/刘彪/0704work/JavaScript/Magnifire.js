/**
 * 1.元素的隐藏
 * 2.元素的移动
 */

 function Magnifire(){
     //存储小图外围
     this.smallImgWrap = document.querySelector(".small-img");
     //存储cube;
     this.smallCube    = document.querySelector(".cube");
    //存储大图外围
    this.bigImgWrap    = document.querySelector(".big-img");
    //存储大图
    this.bigImg        = document.querySelector(".big-img img");

    //存储小图外围相对于body的位置
    this.smallImgWrapPos = getAbsPosition(this.smallImgWrap);
    //cube的宽高
    this.smallCubeW = parseInt(getComputedStyle(this.smallCube)["width"]);
    this.smallCubeH = parseInt(getComputedStyle(this.smallCube)["height"]);
    //小图外围的宽高
    this.smallImgWrapSize = {
        width : this.smallImgWrap.offsetWidth,
        height: this.smallImgWrap.offsetHeight
    }
    //大图的宽高
    this.bigImgSize = {
        width  :parseInt(getComputedStyle(this.bigImg)["width"]),
        height :parseInt(getComputedStyle(this.bigImg)["height"]),
    }
    //大图外围的宽高
    this.bigImgWrapSize = {
        width :parseInt(getComputedStyle(this.bigImgWrap)["width"]),
        height:parseInt(getComputedStyle(this.bigImgWrap)["height"])
    }

    //调用初始化函数
    this.inite();
     
 }


 //初始化函数
 Magnifire.prototype.inite = function (){
    this.smallImgWrap.addEventListener("mouseenter",this.showEle.bind(this));
    this.smallImgWrap.addEventListener("mouseleave",this.hideEle.bind(this));
    this.smallImgWrap.addEventListener("mousemove",this.handlerMouseMove.bind(this));
 }

 //鼠标移动处理函数,解决耦合
 Magnifire.prototype.handlerMouseMove = function(evt){
    var e = evt || window.event;
   
    var difX = this.smallImgWrapPos.left + this.smallCubeW/2;
    var difY = this.smallImgWrapPos.top + this.smallCubeH/2;
    var x = e.clientX - difX ;
    var y = e.clientY - difY;
    
    //边界检测之后鼠标的位置
    var mousePositon = this.boundary(x,y);
    //根据鼠标位置确定大图的移动距离
    var bigPosition = this.getBigPosition(mousePositon);
    // console.log(bigPosition);
    //调用移动函数,控制cube和大图的移动
    this.moveEle(mousePositon,bigPosition);

 }



 //计算大图的移动距离
Magnifire.prototype.getBigPosition = function (position){
    var ratioX = position.x/(this.smallImgWrapSize.width - this.smallCubeW);
    var ratioY = position.y/(this.smallImgWrapSize.height -this.smallCubeH);
    // console.log(ratioX,ratioY)
    return{
        x: parseInt( ratioX*(this.bigImgSize.width - this.bigImgWrapSize.width)),
        y: parseInt( ratioY*(this.bigImgSize.height - this.bigImgWrapSize.height)),
    }
}
 //边界检测
 Magnifire.prototype.boundary = function(x,y){
     var borderX = this.smallImgWrapSize.width - this.smallCubeW;
     var borderY = this.smallImgWrapSize.height -this.smallCubeH;
     x <= 0 ? x= 0 : x;
     x > borderX ? x= borderX:x;
     y <= 0 ? y= 0 : y;
     y > borderY ? y = borderY:y;
     return {
         x : x,
         y : y
     }
 }
 //显示
 Magnifire.prototype.showEle = function(){
     this.smallCube.style.display = "block";
     this.bigImgWrap.style.display = "block";
 }
 //隐藏
 Magnifire.prototype.hideEle = function(){
     this.smallCube.style.display = "none";
     this.bigImgWrap.style.display = "none";
 }

 //元素的移动
 Magnifire.prototype.moveEle = function (mousePositon,bigPosition){

     this.smallCube.style.left = mousePositon.x + "px";
     this.smallCube.style.top  = mousePositon.y + "px";

     this.bigImg.style.left = -bigPosition.x + "px";
     this.bigImg.style.top  = -bigPosition.y + "px";

 }


 //获取元素相对于body的绝对位置
 function getAbsPosition (dom){

    var position = {
        left : dom.offsetLeft,
        top : dom.offsetTop,
    }

    if(dom.offsetParent === document.body){
        return position;
    }else{
        var ps = getAbsPosition(dom.offsetParent);

        return {
            left: dom.offsetLeft + ps.left,
            top : dom.offsetTop + ps.top,
        }
    }
 }


 new Magnifire();