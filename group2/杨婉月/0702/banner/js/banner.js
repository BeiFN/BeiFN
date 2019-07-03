function Banner(selector, options){
    //获取元素
    //获取轮播图中最重要的一个变量===>current_index
    this.current_index = 0;
    //设置一个变量用来记录三种状态：运动到第一张/运动到最后一张/其他
    this.state;
    //获取最大结构container
    this.ele_container = document.querySelector(selector);
    //获取每张图
    this.ele_slides = this.ele_container.querySelectorAll(".slide");
    //获取右按钮
    this.next_btn = this.ele_container.querySelector(".button-next");
    //获取左按钮
    this.prev_btn = this.ele_container.querySelector(".button-prev");
    //获取wrapper
    this.wrapper = this.ele_container.querySelector(".wrapper");

    //如果没有options，要有默认值
    // if(arguments.length == 1){
    //     options = {
    //         effect:"slide"
    //     }
    // }
    this.options = Object.assign({
        effect: "slide"
    }, options)

    this.init();
}
Banner.prototype.init = function(){

    //初始化轮播图布局
    this.bannerLayout();

    //绑定事件
    //左按钮绑定点击事件，获取上一张图片的index
    this.prev_btn.addEventListener("click", this.prevIndex.bind(this));
    //右按钮绑定点击事件，获取下一张图片的index
    this.next_btn.addEventListener("click", this.nextIndex.bind(this));
    //动画(绑定在container上) 根据传的参数来决定调用哪一个函数，显示哪一个动画
    this.ele_container.addEventListener("click", this[this.options.effect].bind(this));
}

//轮播图布局
Banner.prototype.bannerLayout = function(){
    //分情况考虑
    switch(this.options.effect) {
        case "slide": //滑动
            //container变为弹性盒
            this.ele_container.className += " container-slide";
            //将第一张图片克隆，添加在sliders中
            var firstClone = this.ele_slides[0].cloneNode(true);
            //添加到wrapper中
            this.wrapper.appendChild(firstClone);
            //将slides(伪数组)转为数组
            this.ele_slides = Array.from(this.ele_slides);
            //添加到数组中
            this.ele_slides.push(this.firstClone);
            //将wrapper变为长条
            this.wrapper.style.width = this.ele_container.offsetWidth*this.ele_slides.length + "px";
            break;
        case "fade": //淡入淡出
            this.ele_container.className += " container-fade";
            break;
    }
}

//淡入淡出
Banner.prototype.fade = function(){
    //将所有slide透明度都变为0
    for(var i = 0, slide; slide = this.ele_slides[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    //当前的图片显示
    this.ele_slides[this.current_index].style.opacity = 1;
}

Banner.prototype.slide = function(){
    switch(this.state){
        case "normal":
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.current_index*this.ele_container.offsetWidth+"px";
            }.bind(this),0)
            break;
        case "first":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -this.ele_container.offsetWidth*(this.ele_slides.length-1) + "px";
            setTimeout(function(){
                this.current_index--;
                this.state="normal";
                this.slide();
            }.bind(this), 0)
        case "last":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.current_index++;
                this.state = "normal";
                this.slide();
            }.bind(this), 0)
    }
    
}

//获取上张图片index
Banner.prototype.prevIndex = function(){
    if(this.current_index == 0){
        this.current_index = this.ele_slides.length-1;
        this.state = "first";
    }
    else{
        this.current_index--;
        this.state = "normal";
    }
    // console.log(this.current_index);
}

//获取下张图片index
Banner.prototype.nextIndex = function(){
    if(this.current_index == this.ele_slides.length-1){
        this.current_index = 0;
        this.state = "last";
    }
    else{
        this.current_index++;
        this.state = "normal";
    }
    // console.log(this.current_index);
}