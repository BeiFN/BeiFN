// 　　　┏┓　　　┏┓
// 　　┏┛┻━━━┛┻┓
// 　　┃　　　　　　　 ┃
// 　　┃　　　━　　　 ┃
// 　　┃　┳┛　┗┳　┃
// 　　┃　　　　　　　 ┃
// 　　┃　　　┻　　　 ┃
// 　　┃　　　　　　　 ┃
// 　　┗━┓　　　┏━┛Codes are far away from bugs with the animal protecting
// 　　　　┃　　　┃    神兽保佑,代码无bug
// 　　　　┃　　　┃
// 　　　　┃　　　┗━━━┓
// 　　　　┃　　　　　 ┣┓
// 　　　　┃　　　　 ┏┛
// 　　　　┗┓┓┏━┳┓┏┛
// 　　　　　┃┫┫　┃┫┫
// 　　　　　┗┻┛　┗┻┛

/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

// 构造函数
function Banner(selector,options){
    this.showPic    = 0;                                             //当前显示哪一张图片
    this.main       = document.querySelector(selector);              //获取主程序
    this.slides     = document.querySelectorAll(".slide");           //获取图片
    this.wrapper    = document.querySelector(".wrapper");            //获取容器
    this.btn_prev   = document.querySelector(".button-prev");        //上一张
    this.btn_next   = document.querySelector(".button-next");        //下一张
    // 判断用户传入的参数
    if(arguments.length === 1){
        this.options = {
            effect : "slide",
        }
    }
    this.init();
}
// 添加事件
Banner.prototype.init = function (){

    // this.main.className += " container-fade";
    this.layoutAnimate();

    this.btn_next.addEventListener("click",this.handlerNext.bind(this));
    this.btn_prev.addEventListener("click",this.handlerPrev.bind(this));
    this.main.addEventListener("click",this[this.options.effect].bind(this));       //判断用户传入的参数类型
}
// 判断动画类型
Banner.prototype.layoutAnimate = function (){
    // console.log(this.options.effect);
    switch(this.options.effect){
        case "slide":           //滑动动画
            this.main.className += " container-slide";
            var clone_slide = this.slides[0].cloneNode(true);           //将第一个克隆出来
            this.wrapper.appendChild(clone_slide);                      //添加到wrapper中
            this.slides = [].slice.call(this.slides);
            this.slides.push(clone_slide);
            this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";
            break;
        case "fade":            //淡入淡出动画
            this.main.className += " container-fade";
            break;
    }
}
// 下一张
Banner.prototype.handlerNext = function (){
    // 判断边界
    if(this.showPic === this.slides.length - 1){
        this.showPic = 0;
        // console.log(this.showPic);
    }else{
        this.showPic ++;
        //console.log(this.showPic)
    }
}
// 上一张
Banner.prototype.handlerPrev = function (){
    // 判断边界
    if(this.showPic === 0 ){
        this.showPic = this.slides.length - 1;
        // console.log(this.showPic);
    }else{
        this.showPic --;
        //console.log(this.showPic)
    }
}
// fade动画
Banner.prototype.animate = function(){
    // 循环遍历图片,让图片隐藏
    for(var i=0;i<this.slides.length;i++){
        // console.log(this.slides.length)
        // console.log(this.slides[i])
        this.slides[i].style.opacity    = 0;
        this.slides[i].style.transition = " all 1s ";
        // this.slides[i].style.display    = "none";
    }
    // this.slides[this.showPic].style.display = "block" ;
    this.slides[this.showPic].style.opacity = 1 ;
}
