
/*
* 实现的目标 :
*    1. 点击按钮翻页;
*    2. 点击分页器翻页;
*    3. 多种动画效果;
*    4. 自动播放;
*  */
// 下标
// 上下页，点击到达页
// 1.元素绑定事件

// 构造函数，获取元素，绑定元素
function Banner(selector){
    this.nowIndex = 0;

    this.main = document.querySelector(selector);

    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.init();

}
Banner.prototype.init = function(){
    this.main.className  += " container-fade";
    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    this.main.addEventListener("click",this.animate.bind(this));

    
}




Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length -1;
    }else{
        this.nowIndex --;
    }
    console.log(this.nowIndex);
}
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length -1){
        this.nowIndex = 0;
    }else{
        this.nowIndex ++;
    }
    console.log(this.nowIndex);

}



Banner.prototype.animate = function(){
    // console.log("animate");
    for(var i = 0,slide; slide=this.sliders[i++];){
    
        slide.style.opacity= 0;
        slide.style.transition= 'all 1s';       
    }
    this.sliders[this.nowIndex].style.opacity = 1;


    // for(var i = 0; i<this.sliders.length;i++){
    //     console.log(i);
    //     this.sliders[i].style.display = "none";
    // }
    // this.sliders[this.nowIndex].style.display = "block";
    
}
















