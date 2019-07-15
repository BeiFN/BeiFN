//2、元素显示与隐藏
//1、元素移动




function Magnifier(){
    //小图元素  cube   大图  大图wrapper
    var smallImgWrap = document.querySelector(".small-img");
    var smallCube    = document.querySelector(".cube");
    var bigImgWrap   = document.querySelector(".big-img");
    var bigImg       = document.querySelector(".big-img img");
    //放在var里，不用放在this里，后面用了再加
    
    this.smallImgWrap.addEventListener("mouseenter",this.showEle.bind(this));
    this.smallImgWrap.addEventListener("mouseleave",this.hideEle.bind(this));
    this.smallImgWrap.addEventListener("mousemove",this.handlerSmallMoveEle.bind(this));
}
Magnifier.prototype.handlerSmallMoveEle = function(evt){
    var e = evt || window.event;
    var x = e.clientX - this.smallImgWrap.offsetLeft;
    var y = e.clientY - this.smallImgWrap.offsetTop;

    this.moveEle(x,y);
}
Magnifier.prototype.showEle = function(){
    this.smallCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
}

Magnifier.prototype.hideEle = function(){
    this.smallCube.style.display = "none";
    this.bigImgWrap.style.display = "none"
}

Magnifier.prototype.moveEle = function(x,y){
    this.smallCube.style.left = x +"px";
    this.smallCube.style.top  = y +"px";
}
function getAbsPosition(dom){
    var position = {
        left:0,
        top:0
    }
}