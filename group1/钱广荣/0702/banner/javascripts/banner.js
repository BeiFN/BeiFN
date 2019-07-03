function banner(selector,options){
    this.nowIndex = 0;
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
}
banner.prototype.prev = function(){
    if(this.nowIndex === 0 ){
        this.nowIndex = this.sliders.length - 1;
    }else{
        this.nowIndex --;
    }
    layoutAnimate("prev")
}
banner.prototype.next = function(){
    if(this.nowIndex = this.sliders.length - 1){
        this.nowIndex = 0;
    }else{
        this.nowIndex ++
    }
    layoutAnimate("next")
}
banner.prototype.layoutAnimate = function(arg){
        if(index === 0 && arg === "next"){
              bannerContainer.style.left = 0;
              index ++;
        }
        if(index === length - 1 && arg === "prev"){
              bannerContainer.style.left = -(length - 1) * 1200 + "px";
              index --;
        }
        move(bannerContainer,-1200 * index,"left");
}
  function move(eleNode,target,attr){
        var g = getComputedStyle;
        clearInterval(eleNode.timer);
        eleNode.timer = setInterval(function(){
              var iNow = attr === "opacity" ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
              var speed = (target - iNow) / 8;
              speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
              iNow += speed;
              eleNode.style[attr] = attr === "opacity" ?  iNow / 100 : iNow + "px";
              iNow === target ? clearInterval(eleNode.timer) : "";
        },50)
  }
        
    }

    console.log(this.state);
}