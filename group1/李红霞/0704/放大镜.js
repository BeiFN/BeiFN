//面向对象 实现放大镜效果
function Magnifier(){
    //构造函数，在构造函数中初始化变量,实现放大镜的效果在small_wrap中触发事件
    this.small_wrap = document.querySelector(".small_wrap");
    this.small_wrap_cube = document.querySelector(".small_wrap_cube");
    this.big_wrap = document.querySelector(".big_wrap");
    this.big_wrap_img = document.querySelector(".big_wrap_img");
    this.small_wrap_img = document.querySelector(".small_wrap_img");
    this.img1 = document.querySelector(".img1");
    this.img2 = document.querySelector(".img2");
    this.img_list = {
        imgSrc1:{
            smallSrc:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigSrc:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        },
        imgSrc2:{
            smallSrc:"https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigSrc:"https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        }
    }
    
    this.init();
}
Magnifier.prototype.init = function(){
    //实现放大镜效果从绑定事件开始
    this.small_wrap.addEventListener("mouseenter",this.handlerMouseEnter.bind(this));
    this.small_wrap.addEventListener("mouseleave", this.handlerMouseLeave.bind(this));
    this.small_wrap.addEventListener("mousemove", this.handlerMouseMove.bind(this));
    this.img1.addEventListener("click", this.handlerImg1Click.bind(this));
    this.img2.addEventListener("click", this.handlerImg2Click.bind(this))
}
Magnifier.prototype.handlerImg1Click = function(){
    //点击时更改按钮的样式
    removeClass(this.img2, "addBorder");
    this.img1.className += " addBorder";
    //点击时更换三张图片
    this.small_wrap_img.src = this.img_list.imgSrc1.smallSrc; 
    this.small_wrap_cube.style.backgroundImage = "url("+this.img_list.imgSrc1.smallSrc+")";
    this.big_wrap_img.src = this.img_list.imgSrc1.smallSrc;
}
Magnifier.prototype.handlerImg2Click = function(){
    removeClass(this.img1, "addborder")
    this.img2.className += " addBorder";
    this.small_wrap_img.src = this.img_list.imgSrc2.smallSrc; 
    this.small_wrap_cube.style.backgroundImage = "url("+this.img_list.imgSrc2.smallSrc+")";
    this.big_wrap_img.src = this.img_list.imgSrc2.smallSrc;
}
Magnifier.prototype.handlerMouseMove = function(evt){
    //当鼠标移动时，small_wrap_cube会根据鼠标进行移动，改变small_wrap_cube的left和top值实现跟随鼠标移动
    var e = evt||window.event;
    this.clientX = e.clientX - this.small_wrap.offsetLeft - this.small_wrap_cube.offsetWidth/2 ;
    this.clientY = e.clientY  - this.small_wrap_cube.offsetHeight/2;
    this.boundary();
    this.small_wrap_cube.style.left = this.clientX + "px";
    this.small_wrap_cube.style.top = this.clientY  + "px";
    //当鼠标移动时，会根据比例移动大图的位置
    var pro = this.bigWrapImgPosition();
    this.big_wrap_img.style.left = pro.x + "px";
    this.big_wrap_img.style.top = pro.y + "px";
    //当鼠标滑动改变small_wrap_cube的背景的位置
    this.small_wrap_cube.style.backgroundPosition = -this.clientX  + "px " + -this.clientY + "px";
}
Magnifier.prototype.bigWrapImgPosition  = function(){
    var pro = {}
    var pro_x = this.clientX /(this.small_wrap.offsetWidth - this.small_wrap_cube.offsetWidth) * (this.big_wrap.offsetWidth - this.big_wrap_img.offsetWidth)
    var pro_y = this.clientY/(this.small_wrap.offsetHeight - this.small_wrap_cube.offsetHeight) * (this.big_wrap.offsetHeight - this.big_wrap_img.offsetHeight)
    pro.x = pro_x;
    pro.y = pro_y;
    return pro;
}
Magnifier.prototype.boundary = function(){
    if(this.clientX < 0){
        this.clientX = 0;
    }else if(this.clientX >this.small_wrap.offsetWidth  - this.small_wrap_cube.offsetWidth){
        this.clientX = this.small_wrap.offsetWidth  - this.small_wrap_cube.offsetWidth
    }
    if(this.clientY < this.small_wrap.offsetTop){
        this.clientY = this.small_wrap.offsetTop;
    }else if(this.clientY >this.small_wrap.offsetHeight  - this.small_wrap_cube.offsetWidth){
        this.clientY = this.small_wrap.offsetHeight  - this.small_wrap_cube.offsetHeight;
    }
}
Magnifier.prototype.handlerMouseEnter = function(){
    this.small_wrap_cube.style.display = "block";
    this.big_wrap.style.display = "block";
    //当鼠标划过时，small_wrap变透明
    this.small_wrap_img.style.opacity = "0.5"
    //当鼠标进入的时候给small_wrap_cube添加背景
    this.small_wrap_cube.className += " add_img"
}
Magnifier.prototype.handlerMouseLeave = function(){
    this.small_wrap_cube.style.display = "none";
    this.big_wrap.style.display = "none";
    //当鼠标划过时，small_wrap变透明
    this.small_wrap_img.style.opacity = "1"
    removeClass(this.small_wrap_cube, "add_img");
}
//处理类名的添加与删除的函数
function removeClass(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className), "")    
}
new Magnifier();
