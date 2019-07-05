 
 function Banner(selector){
     this.nowIndex  = 0;
     this.container = document.querySelector(selector);
     this.bWitch    = this.container.offsetWidth;
     this.wrapper   = this.container.querySelector(".wrapper");
     this.slides    = this.wrapper.querySelectorAll(".slide");
     this.btnNext   = this.container.querySelector(".button-next");
     this.btnPrev   = this.container.querySelector(".button-prev");
     this.init();
 }

 Banner.prototype.init = function(){
     //布局
     this.layoutAnimate();
     //按钮翻页
     this.btnNext.addEventListener("click" , this.handlerClickNext.bind(this));
     this.btnPrev.addEventListener("click" , this.handlerClickPrev.bind(this));
     //添加动画
    //  this.container.addEventListener("")
 }

 //长条布局
 Banner.prototype.layoutAnimate = function(){
    //  console.log(this.bWitch); 
    var slideClone = this.slides[0].cloneNode(true);
    this.wrapper.appendChild(slideClone); 
    this.slides = [].slice.call(this.slides);
    this.slides.push(slideClone);
    this.container.className += " container-slide";
    this.wrapper.style.width = this.bWitch * this.slides.length+ "px"; 
    for(var i = 0 ,slide ;slide =  this.slides[i++];){
        slide.style.width = this.bWitch + "px";
    }
    
 }
 //滑块滑动
 Banner.prototype.bannerMove = function(){
     this.wrapper.style.left = 0;
     this.wrapper.style.transition = "all 1s";
     setTimeout(function(){
        this.wrapper.style.left = -this.nowIndex * this.bWitch +"px";
     }.bind(this),0)
     console.log(this.nowIndex)
 }
 //向前滑动
 Banner.prototype.handlerClickNext = function(){
     if(this.nowIndex === this.slides.length - 1){
         this.nowIndex = 0;      
     }else{
         this.nowIndex ++ ;
     }
     this.bannerMove();
 }
//向后滑动
 Banner.prototype.handlerClickPrev = function(){
     if(this.nowIndex === 0){
         this.nowIndex = this.slides.length - 1;       
     }else{
         this.nowIndex -- ;
     }
     this.bannerMove();
    //  console.log(this.nowIndex)
 }