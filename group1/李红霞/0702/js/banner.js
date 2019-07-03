//仿swiper创建轮播结构的框架，用面向对象的方法实现
//首先应该创建构造函数
function Banner(selector, options){
    //首先处理用户传入的参数
    if(!selector){
        throw new Error("请传入要操作的选择器！")
    }
    this.options = options ? Object.assign({
        "efect":"slide"
    }) : {
        "efect":"slide"
    };
    console.log(this.options)
    //获取实现轮播图要用到的元素作为构造函数的属性
    this.main = document.querySelector(selector);
    // console.log(this.main)
    this.wrapper = this.main.querySelector(".wrapper");
    this.slides = this.main.querySelectorAll(".slide");
    this.button_next = this.main.querySelector(".button-next");
    this.button_prev = this.main.querySelector(".button-prev");
    //标记轮播当前界面的变量  nowIndex
    this.nowIndex = 0;

    //调用初始化函数
    this.init(); 
}

//首先实现淡入淡出的效果 

//创建init函数，在init函数中初始化变量的值
Banner.prototype.init = function(){
    //在init函数中绑定事件
    this.button_next.addEventListener("click", this.handlerNextClick.bind(this));
    this.button_prev.addEventListener("click", this.handlerPreClick.bind(this))
    this.main.addEventListener("click", this.pageChange.bind(this))

    //滑动效果
    this.main.className += " container-slide";
    this.wrapper.style.width = (this.slides.length+1)*this.main.offsetWidth + "px";
    var cloneNode = this.slides[0].cloneNode(true);
    this.wrapper.appendChild(cloneNode);
    this.wrapper.style.left = 0;
    
}

//监听main，实现页面的切换，滑动效果的实现
Banner.prototype.pageChange = function(evt){
    this.main.className += " container-slide";
    this.wrapper.style.width = (this.slides.length+1)*this.main.offsetWidth + "px";
    //当需要切换页面时，滑动效果需要增加第一个页面放在最后，可以将第一个页面克隆出来添加到后面
    //当点击按钮时改变wraper的left属性
    var e = evt ||window.event;
    var target = e.target || e.srcElement;
    console.log(this.nowIndex)

    if(this.nowIndex == 4 && target.className == "button-prev"){
        // console.log("hello")
        this.wrapper.style.left = -this.main.offsetWidth * (this.slides.length) + "px";
        setTimeout(() => {
            this.wrapper.style.transition = "all 1s";
            this.wrapper.style.left =  -this.nowIndex * this.main.offsetWidth + "px"     
        }, 0);
    }else if(target.className == "button-prev"){
        setTimeout(() => {
            this.wrapper.style.transition = "all 1s";
            this.wrapper.style.left =  -this.nowIndex * this.main.offsetWidth + "px"     
        }, 0);
    }

    if(target.className == "button-next"){
        setTimeout(() => {
            this.wrapper.style.transition = "all 1s";
            this.wrapper.style.left =  -this.nowIndex * this.main.offsetWidth + "px"     
        }, 0);
   
    }

}

// //监听main，实现页面的切换, 淡入淡出效果的实现
// Banner.prototype.pageChange = function(){
//     this.main.className += " container-fade";
//     for(var i = 0; i < this.slides.length; i++){
//         this.slides[i].style.opacity = 0;
//         this.slides[i].style.transition = "all 1s";
//         this.slides[i].className = "slide";
//     }
//         this.slides[this.nowIndex].style.opacity = 1;
//         this.slides[this.nowIndex].className += " slide-active";        
// }
Banner.prototype.handlerNextClick = function(){
    if(this.nowIndex == this.slides.length - 1){
        this.nowIndex = 0;
    }else{
        this.nowIndex++;
    }
}
Banner.prototype.handlerPreClick = function(){
    if(this.nowIndex == 0){
        this.nowIndex = this.slides.length - 1;
    }else{
        this.nowIndex--;
    }
}

//构造函数创建实例
new Banner(".container");