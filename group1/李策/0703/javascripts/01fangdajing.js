
function Magnifier(){
      // 属性获取; => 元素选择;
      // 小图部分;

      // wrapper => 外包围;
      // cube    => 方块;
      this.small_wrapper   = $(".small-img");
      this.small_img       = $(".small-img img");
      this.small_cube      = $(".cube");
      this.img_btn_wrapper = $(".img-btn");
      this.img_btns        = this.img_btn_wrapper.children;
      // 大图部分;
      this.big_wrapper   = $(".big-img");
      this.big_img       = $(".big-img img");
      // 获取几个值;
      this.list = [
            {
                  src : ""
            }
      ]

      this.small_wrapper_position = getAbsPosition(this.small_wrapper);
      this.small_cube_size        = getSize(this.small_cube);
      this.small_wrapper_size     = getSize(this.small_wrapper);
      this.big_img_size           = getSize(this.big_img);
      this.prop = {
            x : this.big_img_size.width / this.small_wrapper_size.width,
            y : this.big_img_size.height / this.small_wrapper_size.height
      }
      // 核心方法调用 ;
      this.init();
};
Magnifier.prototype.init = function(){
      this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
      this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));

      this.small_wrapper.addEventListener("mousemove" , this.hanlderMousemove.bind(this));

      this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"))
}


Magnifier.prototype.changeImg = function(evt,ele){
      // console.log(ele);
      for(var i = 0 , btn ; btn = this.img_btns[i++];){
            removeClassName(btn,"active");
      }

      ele.className += " active";
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
Magnifier.prototype.move = function(x,y){
      this.small_cube.style.left = x + "px";
      this.small_cube.style.top  = y + "px";
      this.big_img.style.left    = - x * this.prop.x + "px";
      this.big_img.style.top     = - y * this.prop.y + "px";
      this.small_cube.style.backgroundPosition = - x + "px " + - y +"px"
}
Magnifier.prototype.hanlderMousemove = function(evt){
      var e = evt || window.event;
      var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
      var y = e.pageY - this.small_wrapper_position.top - this.small_cube_size.height / 2;
      var position = this.boundary(x,y)
      this.move(position.x,position.y)
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
            width  : parseInt( getComputedStyle(dom)["width"]  ),
            height : parseInt( getComputedStyle(dom)["height"] ) 
      }
}

function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function delegation( handlerClick , selector ){
      return function(evt){
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var eleList = this.querySelectorAll(selector);
            var targetFamily = [];
            var _tempTarget = target;
            var count = 0;
            while(true && count ++ < 100){
                  if(_tempTarget === this || _tempTarget === null){
                        break;
                  }
                  targetFamily.push(_tempTarget);
                  _tempTarget = _tempTarget.parentNode;
            }
            for(var i = 0 , ele ; ele = eleList[i++]; ){
                  if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                        handlerClick.call(ele , e , ele);
                        break;
                  }
            }
      }
}

function removeClassName(dom , className){
      return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
 }


new Magnifier();





