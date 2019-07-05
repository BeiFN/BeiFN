function Banner(selector,options){
    this.nowIndex = 0;//当前显示某个图片
    this.state = "normal";
    this.main = document.querySelector(selector);
    this.wrapper = this.main.querySelector(".wrapper");
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_next = this.main.querySelector(".button-next");
    this.btn_prev = this.main.querySelector(".button-prev");

    this.options = Object.assign({
        effect : "silde",
        pagination : ".pagination"
    },options)

    this.init();
}

Banner.prototype.init = function(){
    // this.layoutAnimate();
    this.btn_next.addEventListener("click",this.next.bind(this));
    this.btn_prev.addEventListener("click",this.prev.bind(this));
    // this.main.addEventListener("click",this.layoutAnimate.bind(this));
}
//上一张
Banner.prototype.prev = function(){
    if(this.nowIndex === 0 ){
        this.nowIndex = this.sliders.length - 1;
        this.state = "toLast"
    }else{
        this.nowIndex --;
        this.state = "normal"
    }

}
//下一张
Banner.prototype.next = function(){
    if(this.nowIndex = this.sliders.length - 1){
        this.nowIndex = 0;
        this.state = "toFirst"
    }else{
        this.nowIndex ++;
        this.state = "normal"
    }
   
}
//某一张
Banner.prototype.toIndex =function(index){
    this.nowIndex = index
}
//动画
Banner.prototype.animate = function(){
    for(var i = 0;slide = this.sliders[i];i++ ){
        slide.style.display = "none"
    }
    this.sliders[this.nowIndex].style.display = "block";
}
//淡入淡出
Banner.prototype.fade = function(){

}
//滑动
Banner.prototype.slide = function(){
    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
            }.bind(this) , 0) 
            break;
        case "changeFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
            this.nowIndex ++;
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

// new Banner();