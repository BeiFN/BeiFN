/**
 * 1、点击按钮翻页
 * 2、点击分页器翻页
 * 3、动画效果（slide，fade)
 * 
 * 
 */

 function Banner(selector,options){
     this.showIndex = 0;
     
        this.options = {
            effect : "slide"
        }
     this.state = "normal";
     this.main = document.querySelector(selector);
     this.wrapper = document.querySelector(".wrapper");
     this.slides = document.querySelectorAll(".slide");
     this.button_next = document.querySelector(".button-next");
     this.button_prev = document.querySelector(".button-prev");
     this.init();
 }

 //实例化，绑定事件
 Banner.prototype.init = function(){
    this.layoutAnimate();
    this.button_next.addEventListener("click" , this.next.bind(this));
    this.button_prev.addEventListener("click" , this.prev.bind(this));
    this.main.addEventListener("click" , this[this.options.effect].bind(this));
 }
 //动画布局
 Banner.prototype.layoutAnimate = function(){
     switch(this.options.effect){
         case "slide"://slide效果动画
             this.main.className += " container-slide";
             var cloneSlide = this.slides[0].cloneNode(true);
             this.wrapper.appendChild(cloneSlide);
             this.slides = [].slice.call(this.slides);
             this.slides.push(cloneSlide);
            //  console.log(this.slides.length);
            //  this.wrapper.appendChild(cloneSlide);
             this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px";

             break;
         case "fade" :
             this.main.className += " container-fade";
             break;
     }
 }

 //点击prev翻页
 Banner.prototype.prev = function(){
    if(this.showIndex === 0){
        this.showIndex = this.slides.length - 1;
        this.state = "changeLast";
    }else{
        this.showIndex -- ;
        this.state = "normal";
    }
 }

 //点击next翻页
 Banner.prototype.next = function(){
    if(this.showIndex === this.slides.length - 1){
        this.showIndex = 0;
        this.state = "changeFirst";
    }else{
        this.showIndex ++ ;
        this.state = "normal";
    }
 }

 //动画效果
 //slide效果
 Banner.prototype.slide = function(){
     if(this.showIndex === 0){
         this.wrapper.style.transition = "top 1s";
         this.wrapper.style.left = 0;
         this.showIndex ++ ;
     }
    this.wrapper.style.left = 0;
    this.wrapper.style.left = - this.main.offsetWidth * (this.showIndex) + "px";
    this.wrapper.style.transition = "left 1s";

    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.showIndex * this.main.offsetWidth + "px"
            }.bind(this) , 0) 
            break;
        case "changeFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                  this.showIndex ++;
                  this.state = "normal";
                  this.slide();
            }.bind(this),0);
            break;
        case "changeLast" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
            setTimeout(function(){
                  this.nowIndex --;
                  this.state = "normal";
                  this.slide();
            }.bind(this),0)

    }

 }

 //fade效果
 Banner.prototype.fade = function(){
    for(var i = 0,slide;slide = this.slides[i ++ ];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.slides[this.showIndex].style.opacity = 1;
 }