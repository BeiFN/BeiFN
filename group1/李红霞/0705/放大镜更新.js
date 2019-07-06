//利用面向对象中的类实现放大镜效果
class Magnifier{
    constructor(){
        let {$} = Utils;
        let{removeClassName}= Utils;
        this.removeClassName = removeClassName;
        this.small_wrap = $(".small_wrap");
        this.small_wrap_cube = $(".small_wrap_cube");
        this.big_wrap = $(".big_wrap");
        this.big_wrap_img = $(".big_wrap_img");
        this.small_wrap_img = $(".small_wrap_img");
        this.img1 = $(".img1");
        this.img2 = $(".img2");
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
    init(){
        //init（）函数中绑定事件
        this.small_wrap.addEventListener("mouseenter",this.handlerMouseEnter.bind(this));
        this.small_wrap.addEventListener("mouseleave", this.handlerMouseLeave.bind(this));
        this.small_wrap.addEventListener("mousemove", this.handlerMouseMove.bind(this));
        this.img1.addEventListener("click", this.handlerImgClick.bind(this, this.img2, this.img_list.imgSrc1));
        this.img2.addEventListener("click", this.handlerImgClick.bind(this,this.img1,this.img_list.imgSrc2))
    }
    //处理修改第一张图片的点击事件
    handlerImgClick(img, imgSrc){
        //点击时更改按钮的样式
        this.removeClassName(img, "addBorder");
        this.img1.className += " addBorder";
        //点击时更换三张图片
        this.small_wrap_img.src = imgSrc.smallSrc; 
        this.small_wrap_cube.style.backgroundImage = "url("+imgSrc.smallSrc+")";
        this.big_wrap_img.src = imgSrc.smallSrc;
    }
    //处理鼠标移动耦合的函数
    handlerMouseMove(evt){
        //当鼠标移动时，small_wrap_cube会根据鼠标进行移动，改变small_wrap_cube的left和top值实现跟随鼠标移动
        let e = evt||window.event;
        this.clientX = e.clientX - this.small_wrap.offsetLeft - this.small_wrap_cube.offsetWidth/2 ;
        this.clientY = e.clientY  - this.small_wrap_cube.offsetHeight/2;
        this.boundary();
        this.small_wrap_cube.style.left = this.clientX + "px";
        this.small_wrap_cube.style.top = this.clientY  + "px";
        //当鼠标移动时，会根据比例移动大图的位置
        let pro = this.bigWrapImgPosition();
        this.big_wrap_img.style.left = pro.x + "px";
        this.big_wrap_img.style.top = pro.y + "px";
        //当鼠标滑动改变small_wrap_cube的背景的位置
        this.small_wrap_cube.style.backgroundPosition = -this.clientX  + "px " + -this.clientY + "px";
    }
    //获得big_wrap的中的图片的位置移动的函数
    bigWrapImgPosition(){
        let pro_x = this.clientX /(this.small_wrap.offsetWidth - this.small_wrap_cube.offsetWidth) * (this.big_wrap.offsetWidth - this.big_wrap_img.offsetWidth)
        let pro_y = this.clientY/(this.small_wrap.offsetHeight - this.small_wrap_cube.offsetHeight) * (this.big_wrap.offsetHeight - this.big_wrap_img.offsetHeight)
        let pro = {
            x:pro_x,
            y:pro_y
        }
        return pro;
    }
    //small_wrpa_cube的边界检测函数
    boundary(){
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
    //处理鼠标移入的事件函数
    handlerMouseEnter (){
        this.small_wrap_cube.style.display = "block";
        this.big_wrap.style.display = "block";
        //当鼠标划过时，small_wrap变透明
        this.small_wrap_img.style.opacity = "0.5"
        //当鼠标进入的时候给small_wrap_cube添加背景
        this.small_wrap_cube.className += " add_img"
    }
    //处理鼠标移出small_wrap的函数
    handlerMouseLeave(){
        this.small_wrap_cube.style.display = "none";
        this.big_wrap.style.display = "none";
        //当鼠标划过时，small_wrap变透明
        this.small_wrap_img.style.opacity = "1"
        this.removeClassName(this.small_wrap_cube, "add_img");
    }
}
new Magnifier();
