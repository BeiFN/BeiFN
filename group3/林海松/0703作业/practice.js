/*

*1、鼠标划入，小框出现
 2、鼠标划出，小框消失
 3、鼠标移动，小框随着鼠标移动(中心)

*/

function Magnifier(){
    this.small_img   = document.querySelector(".small-img");
    this.small_show  = document.querySelector(".small-img img")
    this.cube        = document.querySelector(".cube");
    this.big_img     = document.querySelector(".big-img");
    this.bigImg_show = document.querySelector(".big-img img");

    this.img_botton  = document.querySelector(".img-btn");
    this.img_btns    = this.img_botton.children;
    this.list = [
        {
              small_pic : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
              cube_pic  : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
              big_pic   : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
              small_pic : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
              cube_pic  : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
              big_pic   : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
        
  ]
    // this.cube.sizeW = this.cube.offsetWidth;
    // this.cube.sizeH = this.cube.offsetHeight;
    this.init();
}
Magnifier.prototype.init = function(){
    this.small_img.addEventListener("mouseenter" , this.show.bind(this));
    this.small_img.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_img.addEventListener("mousemove"  , this.hanlderMousemove.bind(this));//计算
    this.img_botton.addEventListener("click",delegation(this.changeImg.bind(this),".img-box"));
}
Magnifier.prototype.changeImg = function(evt,ele){
    var e = evt || window.event;
    var index = 0;
    for(var i = 0 , item ; item = this.img_btns[i++] ; ){
        removeClassName(ele,"active");
        if(ele == this.img_btns[i]){
            index = i ;
        }
    }
    ele.className += "active";
    this.small_show.src = this.list[index].small_pic; 
    this.cube.style.backgroundImage = "url("+this.list[index].cube_pic+")";
    this.bigImg_show.src = "url("+this.list[index].big_pic+")";
}
Magnifier.prototype.show = function(){
    this.cube.style.display    = "block";
    this.big_img.style.display = "block";
    this.small_show.style.opacity = "0.3";
}
Magnifier.prototype.hide = function(){
    this.cube.style.display    = "none";
    this.big_img.style.display = "none";
    this.small_show.style.opacity = "1";
}
Magnifier.prototype.move = function(cube_position){
    this.cube.style.left = cube_position.x + "px";
    this.cube.style.top  = cube_position.y + "px";
    this.cube.style.backgroundPosition = -cube_position.x +"px"+" "+ -cube_position.y + "px";//需要加空格，不加没有像素
    // console.log(this.cube.style.backgroundPosition);
}
Magnifier.prototype.hanlderMousemove = function(evt){//使用offset会导致在移动的过程中出现bug(碰到cube的身上而发生的)
    var e = evt || window.event;
    // var x = e.offsetX - this.cube.offsetWidth  / 2;
    // var y = e.offsetY - this.cube.offsetHeight / 2;//不行，有bug。解决方法是使用遮罩层或换一种位置获取
    var x = e.clientX - this.cube.offsetWidth  ;
    var y = e.clientY - this.cube.offsetHeight / 2;
    var cube_position = this.boundary(x,y);
    var img_position  = this.proportion(x,y);
    this.move(cube_position);
    this.BigShow(img_position);
}
//边界检测
Magnifier.prototype.boundary = function(position_x,position_y){
    if(position_x <= 0){
        position_x = 0;
    }
    if(position_x >= (this.small_img.offsetWidth - this.cube.offsetWidth)){
        position_x = this.small_img.offsetWidth - this.cube.offsetWidth;
    }
    if(position_y <= 0){
        position_y = 0;
    }
    if(position_y >= (this.small_img.offsetHeight - this.cube.offsetHeight)){
        position_y = this.small_img.offsetHeight - this.cube.offsetHeight;
    }
    return {
        x : position_x ,
        y : position_y
    }
}
//根据比例算大img的相对距离
Magnifier.prototype.proportion = function(x,y){
    var propX = x / (this.small_img.offsetWidth  - this.cube.offsetWidth);
    var big_img_x = parseInt(propX * (this.bigImg_show.offsetWidth - this.big_img.offsetWidth));
    var propY = y / (this.small_img.offsetHeight - this.cube.offsetHeight);
    var big_img_y = parseInt(propY * (this.bigImg_show.offsetHeight - this.big_img.offsetHeight));
    return {
        X : big_img_x,
        Y : big_img_y
    }
}
//大图显示
Magnifier.prototype.BigShow = function(position){
    this.bigImg_show.style.left = - position.X + "px";
    this.bigImg_show.style.top  = - position.Y + "px";
}
function delegation(handlerClick , selector ){
    return function(evt){
          var eleList = this.querySelectorAll(selector);
          // console.log(eleList);
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var targetFamily = [];
          var _temp = target;
          var count = 0;
          while(true && count++ < 100){
                if(_temp === this){
                      break;
                }
                targetFamily.push(_temp)
                _temp = _temp.parentNode
          }
          for(var i = 0 , ele ; ele = eleList[i++]; ){
                if( targetFamily.length === 1 ? (target === ele) : (targetFamily.indexOf(ele) !== -1) ){
                      handlerClick.call(ele,e,ele);
                      break;
                }
          }
    }
}

function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className), "");
}
new Magnifier();

