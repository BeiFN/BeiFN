/**
 * 实现的目标：
 *  1.点击按钮翻页；
 *  2.点击分页器翻页；
 *  3.多种动画效果；
 *  4.自动播放；
 * 
 */
//获取必要元素， 绑定事件
//  存在问在第一个和最后一个的过渡问题
//options => effect :  fade | slide
//    1.影响动画布局
//    2.影响动画效果

function Banner (selector,options){
    this.nowIndex = 0;

    this.main  = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");

    if(arguments.length === 1){
        this.options = {
            effect : "slide"
        }
    }
    this.init();
}
Banner.prototype.init = function(){
    //布局
    this.layout();

    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));

    //动画
    this.main.addEventListener("click",this[this.options.effect].bind(this));
}
Banner.prototype.layout = function(){
    switch(this.options.effect){
        case "slide" :
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth* this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
    }
}

Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length - 1;
    }else{
        this.nowIndex --;
    }
}
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length - 1){
        this.nowIndex = 0;
    }else{
        this.nowIndex ++;
    }
}
Banner.prototype.fade = function(){
    for(var i =0,slide ;slide = this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.sliders[this.nowIndex].style.opacity = 1;
}
Banner.prototype.slide =function(){
    if(this.nowIndex === 0){
        this.wrapper.style.transition = " top  1s";
        this.wrapper.style.left = 0 ;
        this.nowIndex ++ ;
        setTimeout(function(){
            this.slide();
        }.bind(this),10)
    }else{
        this.wrapper.style.left = 0;
        this.wrapper.style.transition = "left 1s";
        setTimeout(function(){
            this.wrapper.style.left = -this.nowIndex*this.main.offsetWidth + "px";

        }.bind(this),0)
    }
}