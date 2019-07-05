/**
 * 1. 元素显示隐藏;
 * 2. 元素移动 
 *  */ 


function Magnifier(){
      this.smallImgWrap = document.querySelector(".small-img");
      this.smallCube    = document.querySelector(".cube");
      this.bigImgWrap   = document.querySelector(".big-img");
      this.bigImg       = document.querySelector(".big-img img");
      this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);
      this.smallCubeSize = {
            width  : parseInt(getComputedStyle(this.smallCube)["width"]),
            height : parseInt(getComputedStyle(this.smallCube)["height"])
      }
      this.smallImageWrapSize = {
            width  : parseInt(getComputedStyle(this.smallImgWrap)["width"]),
            height : parseInt(getComputedStyle(this.smallImgWrap)["height"])
      }
      this.bigImgSize = {
            width  : parseInt(getComputedStyle(this.bigImg)["width"]),
            height : parseInt(getComputedStyle(this.bigImg)["height"])
      }
      this.bigImgWrapSize = {
            width  : parseInt(getComputedStyle(this.bigImgWrap)["width"]),
            height : parseInt(getComputedStyle(this.bigImgWrap)["height"])
      }
      // 1. 小图元素;
      // 2. cube;
      // 3. 大图包围;
      // 5. 大图
     this.init();
}

Magnifier.prototype.init = function(){
      this.smallImgWrap.addEventListener( "mouseenter" , this.showEle.bind(this) );
      this.smallImgWrap.addEventListener( "mouseleave" , this.hideEle.bind(this) );
      this.smallImgWrap.addEventListener( "mousemove"  , this.handlerSmallMove.bind(this) );
}

Magnifier.prototype.handlerSmallMove = function(evt){
      var e = evt || window.event;
      var x = e.pageX - this.smallImgWrapPosition.left - this.smallCubeSize.width / 2;
      var y = e.pageY - this.smallImgWrapPosition.top - this.smallCubeSize.height / 2 ;
      // console.log(this.smallCubeSize.height)

      var small_position = this.boundary(x,y)
      var big_position = this.getBigPosition(small_position);

      this.moveEle(small_position , big_position);
}

Magnifier.prototype.getBigPosition = function(position){
      // 比例;
      var total_width  = this.smallImageWrapSize.width - this.smallCubeSize.width;
      var total_height = this.smallImageWrapSize.height - this.smallCubeSize.height;
      
      var big_total_width = this.bigImgSize.width - this.bigImgWrapSize.width;
      var big_total_height = this.bigImgSize.height - this.bigImgWrapSize.height;

      return {
            x : parseInt(position.x / total_width * big_total_width) ,
            y : parseInt(position.y  / total_height * big_total_height)
      }
}
// 边界检测;
Magnifier.prototype.boundary = function(x,y){
      if(x <= 0){
            x = 0;
      }
      if(x > (this.smallImageWrapSize.width - this.smallCubeSize.width)){
            x = this.smallImageWrapSize.width - this.smallCubeSize.width
      }
      if(y <= 0){
            y = 0;
      }
      if( y > this.smallImageWrapSize.height - this.smallCubeSize.height){
            y = this.smallImageWrapSize.height - this.smallCubeSize.height;
      }
      return {
            x : x,
            y : y
      }
}

Magnifier.prototype.showEle = function(){
      this.smallCube.style.display  = "block";
      this.bigImgWrap.style.display = "block";
}
Magnifier.prototype.hideEle = function(){
      this.smallCube.style.display  = "none";
      this.bigImgWrap.style.display = "none";
}
Magnifier.prototype.moveEle = function(small,big){
      this.smallCube.style.left = small.x + "px";
      this.smallCube.style.top  = small.y + "px";

      this.bigImg.style.left = -big.x + "px";
      this.bigImg.style.top  = -big.y + "px";
}


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
// offset 测量标准 : 会查找一直到body的所有祖先及元素 , 如果这些元素之中有存在position:relative 属性的元素,那么我们会返回这个元素到父级元素之间的距离;


// var position = {
//       left : dom.offsetLeft,
//       top  : dom.offsetTop
// }
// var ele = null;
// ele = dom.offsetParent;
// while( ele !== document.body){
//       ele = dom.offsetParent;
//       position.left += ele.offsetLeft;
//       position.top  += ele.offsetTop;
// }


new Magnifier();


// -init
// - mouseenter => showEle 
// - mouseleave => hideEle
// - mousemove  => handlerSmallMove; **

// handlerSmallMove => 
// 1. 获取事件对象属性;
// 2. 计算;
//    * => 边界计算;
//    * => 比例及大图计算;
// 3. 赋值;
