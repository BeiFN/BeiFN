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
    this.ele_container = document.querySelector(selector);
    this.sliders = this.ele_container ? this.ele_container.querySelectorAll(".slide") : "";
    if(this.ele_container === null || this.sliders.length === 0){
        throw new Error("Parameter error 参数错误");
    }
    // 给出默认动画
    if(arguments.length === 1){
        this.options = {
            effect : "slideAnimate"
        }
    }
    // 是否有左右按钮
    this.btn_prev = this.ele_container.querySelector(".button-prev");
    this.btn_next = this.ele_container.querySelector(".button-next");
    this.init();
}



// 初始化  绑定事件，设置初识变量
// 左右按钮事件
Banner.prototype.init = function(){
    this.page_now_index = 0;
    this.btn_prev.addEventListener("click", this.prev.bind(this));
    this.btn_next.addEventListener("click", this.next.bind(this));

    // 依据动画类型进行初始布局
    this.layoutAnimate();
}



// 点击按钮切换元素下标
Banner.prototype.prev = function(){
    if(this.page_now_index === 0){
        this.page_now_index = this.sliders.length - 1;
    } else {
        this.page_now_index--;
    }
    console.log(this.page_now_index);
}
Banner.prototype.next = function(){
    if(this.page_now_index === this.sliders.length - 1){
        this.page_now_index = 0;
    } else {
        this.page_now_index++;
    }
    console.log(this.page_now_index);
}




// 根据动画类型布局
Banner.prototype.layoutAnimate = function(){
    
}





// 自动播放
Banner.prototype.autoPlay = function(){

}




// 调用形式  选择banner区域，是否加入动画效果（有默认动画）
new Banner(".container" , {
    effect : "slide"
});