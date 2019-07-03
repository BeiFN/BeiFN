/**
 * 
 * 实现的目标：
 * 1.点击按钮翻页；
 * 2.点击分页器翻页；
 * 3.多中动画效果
 * 4.自动播放；
 */

 //程序之中必须要有主要元素
 //构造函数之中(获取元素，属性)
 function Banner (selector){
    this.nowIndex = 0;//图片下标

    this.main  = document.querySelector(selector);//主体元素
    this.sliders = this.main.querySelectorAll(".slide");//图片
    this.btn_prev = this.main.querySelector(".button-prev");//上一张
    this.btn_next = this.main.querySelector(".button-next");//下一张

    this.init();
 }
 Banner.prototype.init = function(){
     this.main.className += " container-fade"; //添加一个class名
     this.btn_prev.addEventListener("click",this.prevIndex.bind(this));//绑定下一张按钮事件，并改变this指向
     this.btn_next.addEventListener("click",this.nextIndex.bind(this));
     this.main.addEventListener("click",this.animate.bind(this));//绑定动画事件
 }
 //上一张按钮点击事件
 Banner.prototype.prevIndex = function(){
     if(this.nowIndex === 0){
         this.nowIndex = this.sliders.length - 1;
     }else{
         this.nowIndex --;
     }
 }
 Banner.prototype.nextIndex =function(){
    if(this.nowIndex === this.sliders.length - 1){
        this.nowIndex = 0;
    }else{
        this.nowIndex ++ ;
    }
 }
 Banner.prototype.animate = function(){
     for(var i =0,slide;slide = this.sliders[i++];){
         slide.style.opacity = 0;
         slide.style.transition = " all  1s";
     }
     this.sliders[this.nowIndex].style.opacity = 1;
 }