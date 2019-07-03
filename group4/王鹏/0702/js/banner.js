/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */


/**
 * 
 * @param {String} selector 选择器
 * @param {Obj} options 动画
 */


function Banner(selector, options){
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");

    if(this.main === null || this.sliders.length === 0){
        throw new Error("Parameter error 参数错误");
    }
    // 给出默认动画
    this.options = Object.assign({
        effect : "slide",
        pagination : ".pagination"
    });
    // 是否有左右按钮
    
    this.init();
}



// 初始化  绑定事件，设置初识变量
// 左右按钮事件
Banner.prototype.init = function(){
    // 依据动画类型进行初始布局
    this.layoutAnimate();
    this.state = "normal";
    this.nowIndex = 0;
    this.btn_prev.addEventListener("click", this.prev.bind(this));
    this.btn_next.addEventListener("click", this.next.bind(this));

    // 动画
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    
}



// 点击按钮切换元素下标
Banner.prototype.prev = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length - 1;
        this.state = "changeLast"
    } else {
        this.nowIndex--;
        this.state = "normal";
    }
    console.log(this.nowIndex);
}
Banner.prototype.next = function(){
    if(this.nowIndex === this.sliders.length - 1){
        this.nowIndex = 0;
        this.state = "changeFirst";
    } else {
        this.nowIndex++;
        this.state = "normal";
    }
    console.log(this.nowIndex);
}




// 根据动画类型布局
Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide" :
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders); // 转真数组
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
    }
}

// 滑动动画
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



// 自动播放
Banner.prototype.autoPlay = function(){

}




// 调用形式  选择banner区域，是否加入动画效果（有默认动画）
// new Banner(".container" , {
//     effect : "slide"
// });