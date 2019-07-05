function banner(selector,options){
    this.nowIndex = 0;//当前显示某个图片
    this.main = document.querySelector(selector);
    this.wrapper = this.main.querySelector(".wrapper");
    this.sliders = this.main.queryselectorAll(".slide");
    this.btn_next = this.main.querySelector(".button-next");
    this.btn_prev = this.main.querySelector(".button-prev")
    this.init();
}
banner.prototype.init = function(){
    this.layoutAnimate();
    this.btn_next.addEventListener("click",this.next.bind(this));
    this.btn_prev.addEventListener("click",this.prev.bind(this));
    this.main.addEventListener("click",this.layoutAnimate.bind(this));
}
banner.prototype.prev = function(){
    if(this.nowIndex === 0 ){
        this.nowIndex = this.sliders.length - 1;
    }else{
        this.nowIndex --;
    }

}
banner.prototype.next = function(){
    if(this.nowIndex = this.sliders.length - 1){
        this.nowIndex = 0;
    }else{
        this.nowIndex ++;
    }
   
}
banner.prototype.animate = function(){
    for(var i = 0;slide = this.sliders[i];i++ ){
        slide.style.display = "none"
    }
    this.sliders[this.nowIndex].style.display = "block";
}