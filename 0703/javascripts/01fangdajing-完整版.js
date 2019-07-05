
function Magnifier(){
      // 属性获取; => 元素选择;
      // 小图部分;

      // wrapper => 外包围;
      // cube    => 方块;
      this.small_wrapper = $(".small-img");
      this.small_img     = $(".small-img img");
      this.small_cube    = $(".cube");
      // 大图部分;
      this.big_wrapper   = $(".big-img");
      this.big_img       = $(".big-img img");
      // 获取几个值;

      this.small_wrapper_position = getAbsPosition(this.small_wrapper);
      this.small_cube_size        = getSize(this.small_cube);
      this.small_wrapper_size     = getSize(this.small_wrapper);
      this.big_img_size           = getSize(this.big_img);
      this.big_wrapper_size       = getSize(this.big_wrapper);
      // 核心方法调用 ;
      this.init();
};
Magnifier.prototype.init = function(){
      this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
      this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));

      this.small_wrapper.addEventListener("mousemove" , this.hanlderMousemove.bind(this));
}
Magnifier.prototype.show = function(){
      this.small_cube.style.display  = "block";
      this.big_wrapper.style.display = "block";
      // 增加隐藏效果;

      this.small_img.style.opacity = 0.3;
}
Magnifier.prototype.hide = function(){
      this.small_cube.style.display  = "none";
      this.big_wrapper.style.display = "none";

      this.small_img.style.opacity = 1;
}
Magnifier.prototype.move = function(cube_position,big_img_position){
      this.small_cube.style.left = cube_position.x + "px";
      this.small_cube.style.top  = cube_position.y + "px";

      this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

      this.big_img.style.left = -big_img_position.x + "px";
      this.big_img.style.top  = -big_img_position.y + "px";
}
Magnifier.prototype.hanlderMousemove = function(evt){
      var e = evt || window.event;
      var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
      var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;


      var cube_position    = this.boundary(x,y);
      var big_img_position = this.getBigPosition(x,y);
      this.move(cube_position,big_img_position)
}
// 边界检测;
Magnifier.prototype.boundary = function(x,y){
      // 计算x,y的值;
      // x最小值
      x = x <= 0 ? 0 : x;
      // x最大值
      var maxX = this.small_wrapper_size.width - this.small_cube_size.width
      x = x >= maxX ? maxX : x;

      y = y <= 0 ? 0 : y;
      var maxY = this.small_wrapper_size.height - this.small_cube_size.height ;
      y = y >= maxY ? maxY : y;

      return {
            x : x,
            y : y
      }
}
// 根据比例计算大图位置;
Magnifier.prototype.getBigPosition = function(x,y){
      var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
      var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
      var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
      var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height));

      return {
            x : big_img_x,
            y : big_img_y
      }
}



function getAbsPosition(dom){
      var position = {
            left : dom.offsetLeft,
            top  : dom.offsetTop
      }
      if(dom.offsetParent === document.body){
            return position;
      }else{
            var pos = getAbsPosition(dom.offsetParent)
            return {
                  left : dom.offsetLeft + pos.left,
                  top  : dom.offsetTop  + pos.top
            }
      }
}

function getSize(dom){
      return {
            width : parseInt( getComputedStyle(dom)["width"] ),
            height : parseInt( getComputedStyle(dom)["height"] ) 
      }
}

function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}


new Magnifier();





