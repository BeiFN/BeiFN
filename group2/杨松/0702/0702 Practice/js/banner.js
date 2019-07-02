/*
* 实现 点击按钮分页
* 实现 点击分页器分页
*
* */

function Banner(selector,options){
    this.nowIndex =0;
    this.main = document.querySelector(selector);
    this.sliders =this.main.querySelectorAll('.slide');
    this.prev = this.main.querySelector('.button-prev');
    this.next = this.main.querySelector('.button-next');
    this.wrapper = this.main.querySelector('.wrapper');
    this.options = Object.assign({
        effect:"slide",
        pagination:".pagination"
    },options);
    this.init();
}
Banner.prototype.init=function(){
    this.layoutAnimate();
    this.layoutPageAnimate();
    this.prev.addEventListener("click",this.prevBtn.bind(this));
    this.next.addEventListener('click',this.nextBtn.bind(this));
    this.main.addEventListener('click',this[this.options.effect].bind(this)); //动画

    this.main.addEventListener('click',this.changePage.bind(this));
    this.main.addEventListener('click',this.handlerPageClick.bind(this));

};
//下一站
Banner.prototype.nextBtn =function(){
    if(this.nowIndex === this.sliders.length-1){
        this.nowIndex = 0;
        this.state = "normal"
    }else {
        this.nowIndex ++;
        this.state = "normal"
    }
    // console.log(this.nowIndex)
};
//上一站
Banner.prototype.prevBtn =function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length -1;
        this.state = "changeLast"

    }else {
        this.nowIndex --;
        this.state = "normal"
    }
    // console.log(this.nowIndex)
};
//动画布局
Banner.prototype.layoutAnimate=function(){
    switch(this.options.effect){
        case "slide" :
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild( cloneSlide );
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
        case "cube":
            this.main.className += "container-cube";
            break;
    }
};

//点击分页器分页
Banner.prototype.layoutPageAnimate=function(){

};
Banner.prototype.changePage=function(){

};
Banner.prototype.handlerPageClick=function(){

};
//淡入淡出
Banner.prototype.fade = function(){
    for(var i = 0 , slide ; slide = this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    // console.log("动画");
    this.sliders[this.nowIndex].style.opacity = 1;
};
//滑动
// Banner.prototype.slide = function(){
//     switch(this.state){
//         case "normal" :
//             this.wrapper.style.left = 0;
//             this.wrapper.style.transition = "left 1s";
//             setTimeout(function(){
//                 this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
//             }.bind(this) , 0)
//             break;
//         case "changeFirst":
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = 0;
//             setTimeout(function(){
//                 this.nowIndex ++;
//                 this.state = "normal";
//                 this.slide();
//             }.bind(this),0);
//             break;
//         case "changeLast" :
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
//             setTimeout(function(){
//                 this.nowIndex --;
//                 this.state = "normal";
//                 this.slide();
//             }.bind(this),0)
//     }
// }

Banner.prototype.slide = function (){
  switch(this.state){
      case "normal":
          this.wrapper.style.left = 0;
          this.wrapper.style.transition= "left 2s";
          setTimeout(function(){
              this.wrapper.style.left = -this.nowIndex *this.main.offsetWidth +'px';
          }.bind(this),0);
          break;
      case "changeFirst":
          this.wrapper.style.transition = 'left 2s';
          this.wrapper.style.left =0;
          setTimeout(function(){
              this.nowIndex ++;
              this.state ='normal';
              this.slide();
          }.bind(this),0);
          break;
      case "changeLast":
          this.wrapper.style.left =0;
          this.wrapper.style.transition ='left 2s';
          this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth +'px';
          setTimeout(function(){
            this.nowIndex --;
            this.state = 'normal';
            this.slide()
    }.bind(this),0);
  }
};