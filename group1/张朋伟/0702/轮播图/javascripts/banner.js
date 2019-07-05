/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

 // 程序之中必须要有 ,表示当前显示图片的坐标;  nowIndex;
 // 下一页 上一页 到达某页;

 // 1. 得有元素绑定事件 ;

 // 2. options => effect : fade | slide 
 //    1. 影响基础布局;
 //    2. 影响动画效果;


 function Banner(selector,options){
    // 当前显示哪个图片;
    this.nowIndex = 0;
    this.state = "normal";

    this.main     = document.querySelector(selector);
    this.sliders  = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper  = this.main.querySelector(".wrapper");

    if(arguments.length === 1){
          this.options = {
                effect : "slide"
          }
    }

    this.init();
}
Banner.prototype.init = function(){
    // 布局;
    // this.main.className += " container-fade";
    // 先布局;
    this.layout();

    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    // 动画;
    this.main.addEventListener("click",this[this.options.effect].bind(this));
}

Banner.prototype.layout = function(){
    switch(this.options.effect){
          case "slide" : 
                this.main.className += " container-slide";
                //克隆节点
                var cloneSlide = this.sliders[0].cloneNode(true);
                // 节点加入集体
                this.wrapper.appendChild( cloneSlide );   
                //集体变数组
                this.sliders = [].slice.call(this.sliders);
                this.sliders.push(cloneSlide);
                this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
                break;
          case "fade" : 
                this.main.className += " container-fade";
                break;
    }
}

Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
          this.nowIndex = this.sliders.length - 1;
          // alert("最后一张");
          this.state = "changeLast"
    }else{
          this.nowIndex --;
          this.state = "normal"
    }
}
Banner.prototype.nextIndex = function(){
     if(this.nowIndex === this.sliders.length - 1){
          this.nowIndex = 0;
          // alert("第一张");
          this.state = "changeFirst"
     }else{
           this.nowIndex ++;
           this.state = "normal"
     }
}
// 淡入淡出
Banner.prototype.fade = function(){
    for(var i = 0 , slide ; slide = this.sliders[i++];){
          slide.style.opacity = 0; 
          slide.style.transition = "all 1s";
    }
    // console.log("动画");
    this.sliders[this.nowIndex].style.opacity = 1;
}
// 滑动;
Banner.prototype.slide = function(){
    // if(this.nowIndex === 0){
    //       this.wrapper.style.transition = "top 1s";
    //       this.wrapper.style.left = 0;
    //       this.nowIndex ++;
    //       setTimeout(function(){
    //             this.slide();
    //       }.bind(this),10)
    // }else{
          
    // }

    // console.log(this.state);

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