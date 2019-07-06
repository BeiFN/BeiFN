/**
 * 1.鼠标移入，cube显示，small-img透明度变暗，big-img显示
 * 2.鼠标移出，cube消失，small-img透明度正常，big-img消失
 * 3.鼠标移动，cube 的背景图片随之移动， big—img图片相应位置移动
 * 
 */
//一.构建构造函数
//1.元素选择器
function $(selecter){
    var ele =null;
    return (ele = document.querySelectorAll(selecter)).length===1? ele[0]:ele;
}
//2.选择元素，存属性
function Magnifier(){
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.small_cube    = $(".cube");
    this.big_wrapper   = $(".big-img");
    this.big_img       = $(".big-img img")
    this.img_btn_wrapper = $(".img-btn");
    this.img_btns       = this.img_btn_wrapper.children;
    this.list = [
        {
            bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src    : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
            bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src    : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
    ]
    this.small_wrapper_position = getAbsPostion(this.small_wrapper);
    this.small_cube_size        = getSize(this.small_cube);
    this.small_wrapper_size     = getSize(this.small_wrapper);
    this.big_img_size           = getSize(this.big_img);
    this.big_wrapper_size       = getSize(this.big_wrapper);
    this.init();   //调用核心函数
}
//二、初始化，绑定事件，鼠标移入，鼠标移出，鼠标移动，图片选择点击
Magnifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hidden.bind(this));
    this.small_wrapper.addEventListener("mousemove",this.handlerMousemove.bind(this));
    this.img_btn_wrapper.addEventListener("click",delegation(this.changeImg.bind(this),".img-box"));

}
//三、事件处理函数
//1.show
Magnifier.prototype.show = function(){
    //鼠标移入，cube出现；大图片盒子出现；
    this.small_cube.style.display  = "block";
    this.big_wrapper.style.display = "block";
    //小图片透明度变小，模糊效果
    this.small_img.style.opacity = 0.3;
}
//2.hidden
Magnifier.prototype.hidden = function(){
    //鼠标移出，cube消失；大图片盒子出现；
    this.small_cube.style.display  = "none";
    this.big_wrapper.style.display = "none";
    //小图片透明度变为1
    this.small_img.style.opacity = 1;
    
}
//3.move
//处理耦合
Magnifier.prototype.handlerMousemove = function(evt){
    var e = evt || event;
    //根据鼠标位置确定，cube在small-img-wrapper中的位置
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width /2;
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height /2;
    
    var cube_postion = this.boundary(x,y);
    //计算大图片的位置
    var big_img_position = this.getBigPosition(x,y);
    this.move(cube_postion,big_img_position);
}
//移动
Magnifier.prototype.move = function(cube_postion,big_img_position){
   this.small_cube.style.left = cube_postion.x + "px";
   this.small_cube.style.top = cube_postion.y + "px";
   this.small_cube.style.backgroundPosition = -cube_postion.x+"px " +-cube_postion.y+"px";
   this.big_img.style.left = -big_img_position.x +"px";
   this.big_img.style.top  = -big_img_position.y +"px";
}
//移动边界
Magnifier.prototype.boundary = function(x,y){
    x = x<= 0? 0:x;
    var maxX = this.small_wrapper_size.width-this.small_cube_size.width;
    x = x>=maxX? maxX : x;
    y = y<= 0? 0:y;
    var maxY = this.small_wrapper_size.height-this.small_cube_size.height;
    y = y>=maxY? maxY : y;
    return {
        x :x,
        y :y
    }
}

//大图移动
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = x/(this.small_wrapper_size.width - this.small_cube_size.width);
    var big_img_x = parseInt(propx*(this.big_img_size.width-this.big_wrapper_size.width));
    var propy = y/(this.small_wrapper_size.height - this.small_cube_size.height);
    var big_img_y = parseInt(propy*(this.big_img_size.height-this.big_wrapper_size.height));
    return {
        x : big_img_x,
        y : big_img_y,
    }
}
//4.变换图片
Magnifier.prototype.changeImg = function(evt,ele){
    console.log(this.img_btns,ele);
    for(var i = 0,btn;btn = this.img_btns[i++];){
        removeClassName(btn,"active");
    }
    ele.className += " active";
    var temp = 0;
    for(var i= 0 ;i<this.img_btns.length;i++){
        if(this.img_btns[i] === ele){
            temp = i;
            break;
        }
    }
    console.log(temp);
    this.big_img.src = this.list[temp].bigsrc;
    this.small_img.src = this.list[temp].src;
    this.small_cube.style.backgroundImage = "url("+this.list[temp].src+")";
}
//四、通用的封装函数
function getAbsPostion(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPostion(dom.offsetParent)
        return{
            left : dom.offsetLeft + pos.left,
            top  : dom.offsetTop  + pos.top
        }
    }
}
function getSize(dom){
    return {
        width :parseInt( getComputedStyle(dom)["width"]),
        height :parseInt( getComputedStyle(dom)["height"])
    }
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


//五、创建实例
new Magnifier();