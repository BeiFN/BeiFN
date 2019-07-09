function  Magnifier(){
    // 属性获取; => 元素选择
    this.smallImgWrap = document.querySelector(".smallImg");
    this.smallimg = document.querySelector(".smallImg img");
    this.smallCube = document.querySelector(".cube")
    this.bigImgWrap = document.querySelector(".bigImg")
    this.bigImg = document.querySelector(".bigImg img")

 
    
    //获取值
    this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);
    this.smallImageWrapSize = getSize(this.smallImgWrap);
    this.smallCubeSize = getSize(this.smallCube);
    this.bigImgWrapSize = getSize(this.bigImgWrap);
    this.bigImgSize = getSize(this.bigImg);
    this.smallImgSize = getSize(this.smallimg);

    this.init()
}
Magnifier.prototype.init = function(){
    this.smallImgWrap.addEventListener("mouseenter" , this.show.bind(this));
    this.smallImgWrap.addEventListener("mouseleave" , this.hidden.bind(this));
    this.smallImgWrap.addEventListener("mousemove"  , this.hadderMove.bind(this));


}

Magnifier.prototype.show = function(){
    this.smallCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
    this.smallimg.style.opacity = 0.3;
}
Magnifier.prototype.hidden = function(){
    this.smallCube.style.display = "none";
    this.bigImgWrap.style.display = "none";
    this.smallimg.style.opacity = 1;
}

Magnifier.prototype.hadderMove =function(evt){
    var e = evt || window.event;
    var x = e.clientX - this.smallImgWrapPosition.left - this.smallCubeSize.width / 2;
    var y = e.clientY - this.smallImgWrapPosition.top - this.smallCubeSize.height / 2;
    // this.small_cube.style.left = x -70 + "px";
    // this.small_cube.style.top = y - 70 + "px";
    
    var small_position = this.boundary(x,y);
    var big_position = this.getBigPosition(x,y)
    this.moveCube(small_position,big_position)

}

//边界检测
Magnifier.prototype.boundary = function(x,y){
    var smallMin = this.smallImageWrapSize.width - this.smallCubeSize.width
    var smallMax = this.smallImageWrapSize.height - this.smallCubeSize.height;
    x = x <= 0 ? 0 :x;
    x = x >= smallMin ? smallMin : x;
    y = y <= 0 ? 0 :y;
    y = y >= smallMax ? smallMax : y;
    return{
        x : x,
        y : y
    }
}

//大图位置
Magnifier.prototype.getBigPosition = function(x,y){
    var big_img_x = - x * (this.bigImgSize.width / this.smallImgSize.width);
    var big_img_y = - y * (this.bigImgSize.height / this.smallImgSize.height);
    return{
        x : big_img_x,
        y : big_img_y
    }
}

Magnifier.prototype.moveCube = function(small,big){
    this.smallCube.style.left = small.x +"px";
    this.smallCube.style.top = small.y + "px";

    this.smallCube.style.backgroundPosition = -small.x + "px " + -small.y + "px";


    this.bigImg.style.left = big.x + "px";
    this.bigImg.style.top = big.y + "px"; 
}

//获取位置
function getAbsPosition(dom){
    var position = {
          left : dom.offsetLeft,
          top  : dom.offsetTop
    }
    // offsetParent => 返回当前元素根据谁去定位;
    if(dom.offsetParent === document.body){
          return position;
    }else{
          var pos = getAbsPosition(dom.offsetParent);
          return  {
                left : dom.offsetLeft + pos.left,
                top  : dom.offsetTop + pos.top
          }
    }
}
function getSize(dom){
    return {
          width : parseInt( getComputedStyle(dom)["width"] ),
          height : parseInt( getComputedStyle(dom)["height"] ) 
    }
}


new Magnifier();