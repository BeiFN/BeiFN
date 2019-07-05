function Magnifier()
    {
        this.small_wrapper = $(".small-img")
        this.small_img     = $(".small-img img")
        this.small_cube    = $(".cube");

        this.img_btn_wrapper = $(".img-btn");
        this.img_btns        = this.img_btn_wrapper.children;

        this.big_wrapper   = $(".big-img")
        this.big_img       = $(".big-img img")

        this.small_wrapper_position = getAbsPosition(this.small_wrapper)
        this.small_cube_size = getSize(this.small_cube);
        this.small_wrapper_size = getSize(this.small_wrapper);
        this.big_img_size = getSize(this.big_img);
        this.big_wrapper_size = getSize(this.big_wrapper);
        this.init();
        this.list = [
            {
                  src_small_img : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                  src_small_cube_img : "url(" + "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" + ")",
                  src_big_img : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            },
            {
                  src_small_img : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                  src_small_cube_img:  "url(" +"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" + ")",
                  src_big_img : "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            }
            
      ]

    }
Magnifier.prototype.init = function()
    {
        this.small_wrapper.addEventListener("mouseenter", this.show.bind(this))//mouseover鼠标进入h时会冒泡所以不适合
        this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this))
        this.small_wrapper.addEventListener("mousemove", this.hanlderMouseMove.bind(this))
        this.img_btn_wrapper.addEventListener("click",delegation(this.changeImg.bind(this), ".img-box") )
    }
Magnifier.prototype.changeImg = function(evt,ele)
{

    
    for(var i = 0 , btn ; btn = this.img_btns[i++];)
    {
        btn.index = i-1;
        removeClassName(btn,"active");

    }
    
    ele.className += " active";

    
    if(ele.index == 0)
        {this.small_img.src = this.list[ele.index].src_small_img;
        this.small_cube.style.backgroundImage = this.list[ele.index].src_small_cube_img;
        this.big_img.src = this.list[ele.index].src_big_img;}
    if(ele.index ==1)
        {this.small_img.src = this.list[ele.index].src_small_img;
        this.small_cube.style.backgroundImage = this.list[ele.index].src_small_cube_img;
        this.big_img.src = this.list[ele.index].src_big_img;}
 
}
Magnifier.prototype.show = function()
    {
        this.small_cube.style.display = "block";
        this.big_wrapper.style.display = "block";
        
        this.small_img.style.opacity = 0.3;

    }
Magnifier.prototype.hide = function()
    {
        this.small_cube.style.display = "none";
        this.big_wrapper.style.display = "none";
        this.small_img.style.opacity = 1;
    }
Magnifier.prototype.move = function(cube_position,big_img_position)
    {
        this.small_cube.style.left = cube_position.x+"px";
        this.small_cube.style.top = cube_position.y+"px"
        this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
        this.big_img.style.left = -big_img_position.x + "px";
        this.big_img.style.top  = -big_img_position.y + "px";
    }
Magnifier.prototype.hanlderMouseMove = function (evt)
    {
        var e = evt || event;
        var x =  e.pageX-this.small_wrapper_position.left-this.small_cube_size.width/2;
        var y =  e.pageY-this.small_wrapper_position.top-this.small_cube_size.height/2;
        
        var cube_position = this.boundery(x,y)
        var big_img_position = this.getBigPosition(x,y);
        this.move(cube_position,big_img_position)
    }
//边界检测
Magnifier.prototype.boundery = function (x,y)
    {
        x= x<=0? 0 : x;
        var maxX = this.small_wrapper_size.width - this.small_cube_size.width
        x=x>=maxX ? maxX :x ;
        
        y = y<=0 ? 0: y;
        var maxY = this.small_wrapper_size.height - this.small_cube_size.height
        y = y>= maxY ? maxY : y;
        return {
            x:x,
            y:y
        }
    }
//根据比例计算大图位置
Magnifier.prototype.getBigPosition = function(x,y)
    {
        var propX = x/(this.small_wrapper_size.width - this.small_cube_size.width)
        var big_img_X = parseInt(propX * (this.big_img_size.width - this.big_wrapper_size.width))

        var propY = y/(this.big_img_size.height - this.big_wrapper_size.height)
        var big_img_Y = parseInt(propY * (this.big_img_size.height - this.big_wrapper_size.height))

        return {
            x: big_img_X,
            y : big_img_Y
        }
    }

function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top : dom.offsetTop
    }
    if(dom.offsetParent == document.dody) ///offsetParent返回一个指向最近的（包含该元素的定位元素。
        {
            return position
        }
    else
        {
            var pos = getAbsPosition(dom.offsetParent)
            return {
                left : pos.left + dom.offsetLeft,
                top : pos.top + dom.offsetTop
                    }
        }
}

function getSize(dom)
    {
        return {
            width : parseInt( getComputedStyle(dom)["width"]) ,
            height : parseInt(getComputedStyle(dom)["height"])
        } 
    }

function $(selector)
    {
        var ele = null;
        return (ele = document.querySelector(selector)).length == 1? ele[0] : ele;
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
  function removeClassName(dom,className)
  {
      return dom.className = dom.className.replace(new RegExp("\s?" + className), "")
  }
    new Magnifier()