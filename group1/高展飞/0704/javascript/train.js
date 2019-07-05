/***
 * 
 * 1.元素显示隐藏
 * 2.元素移动
 */

 function  Magnifier(){
     this.smallImgWrap = document.querySelector(".small-img");
     this.smallImg   = document.querySelector(".small-img img")
     this.smallCube = document.querySelector(".cube");
     this.bigImgWrap  = document.querySelector(".big-img");
     this.bigImg  = document.querySelector(".big-img  img");
     
     this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);

     this.smallCubeWidth = parseInt( getComputedStyle(this.smallCube)["width"]);
     this.smallCubeHeight = parseInt(getComputedStyle(this.smallCube)["height"]);

     this.smallImgWrapWidth =parseInt( getComputedStyle(this.smallImgWrap)["width"]);
     this.smallImgWrapHeight = parseInt(getComputedStyle(this.smallImgWrap)["height"]);

     this.bigImgWrapWidth =parseInt( getComputedStyle(this.bigImgWrap)["width"]);
     this.bigImgWrapHeight = parseInt(getComputedStyle(this.bigImgWrap)["height"]);
     this.bigImgWidth =parseInt( getComputedStyle(this.bigImg )["width"]);
     this.bigImgHeight = parseInt(getComputedStyle(this.bigImg )["height"]);


     this.init();
     
 }

 Magnifier.prototype.init = function(){
     //s三个事件   鼠标划入小图，小方块，大图包围出现

     this.smallImgWrap.addEventListener("mouseenter",this.handlerEnter.bind(this));
     //划出，消失隐藏
     this.smallImgWrap.addEventListener("mouseleave",this.handlerLeave.bind(this));
     //滑动，小方块跟随
     this.smallImgWrap.addEventListener("mousemove",this.handlerMove.bind(this));
 }
 
 Magnifier.prototype.cubeMove = function(cube_position){
    this.smallCube.style.left =cube_position.x+ "px";
    this.smallCube.style.top = cube_position.y+ "px";
    this.smallCube.style.backgroundPosition = -cube_position.x +"px " +  -cube_position.y + "px";
    
 }
 Magnifier.prototype.bigMove = function(position){
    this.bigImg.style.left = -position.x + "px";
    this.bigImg.style.top = -position.y + "px";
 }
 Magnifier.prototype.getBigPosition = function (x,y){
     //先求比例
    var cha_smallWidth =this.smallImgWrapWidth - this.smallCubeWidth;
    var cha_smallHeight= this.smallImgWrapHeight- this.smallCubeHeight;

    var cha_bigWidth = this.bigImgWidth- this.bigImgWrapWidth;
    var cha_bigHeight = this.bigImgHeight - this.bigImgWrapHeight;
    return {
        x : x/cha_smallWidth *cha_bigWidth,
        y : y/cha_smallHeight * cha_bigHeight
    }
 }
 

 Magnifier.prototype.handlerEnter = function(){
    this.smallImg.style.opacity = 0.3;
    this.smallCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
 }
 Magnifier.prototype.handlerLeave = function(){
    this.smallImgWrap.style.opacity = 1;
    this.smallCube.style.display = "none";
    this.bigImgWrap.style.display = "none";
}
Magnifier.prototype.handlerMove = function(){
    
    var position = this.getPosition();
    var x=position.x;
    var y =position.y;
    this.smallCube.style.left =x+ "px";
    this.smallCube.style.top = y+ "px";
    var cube_position = this.boundary(x,y);
    var big_position = this.getBigPosition(x,y);
    this.cubeMove(cube_position);
    this.bigMove(big_position);
    

}
//获取当前位置
Magnifier.prototype.getPosition = function(evt){
     var e= evt || event ;
     var x = e.pageX-this.smallImgWrapPosition.offsetL-this.smallCubeWidth/2;
     console.log(this.smallImgWrapPosition.offsetL)
     var y = e.pageY-this.smallImgWrapPosition.offsetT-this.smallCubeHeight/2;
     console.log(this.smallImgWrapPosition.offsetT)
     return {
         x :x
        ,y:y};
}

Magnifier.prototype.boundary = function(x,y){
    if(x<=0){
        x=0;
    }
    if(x>=this.smallImgWrapWidth-this.smallCubeWidth){
        x= this.smallImgWrapWidth-this.smallCubeWidth;
    }
    if(y<=0){
        y = 0;
    }
    if(y>=this.smallImgWrapHeight-this.smallCubeHeight){
        y = this.smallImgWrapHeight-this.smallCubeHeight;
    }
    return{
        x:x,
        y:y
    }
}



function getAbsPosition (dom){
    var pos = {
        offsetL  : dom.offsetLeft,
        offsetT : dom.offsetTop
    }//////parentNode
    if(dom.offsetParent === document.body){
        return pos;
    }else{
        var  poo = getAbsPosition(dom.offsetParent);
        return pos ={
            offsetL : dom.offsetLeft + poo.offsetL,
            offsetT : dom.offsetTop + poo.offsetT
        }
       
    }
}
new Magnifier(".container");