

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

// options  effect : fade|slide布局，
// 1.影响基础布局
// 2.影响动画效果
function Banner(selector,options){
    this.nowIndex = 0;
    //页面跳转状态
    this.state = "normal";
    // 选择器
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");

    // 策略模式，选择动画效果和下标
    this.options = Object.assign({
        effect: "slide",
        // effect: "fade",

        pagination :".pagination"
    },options);

    // 初始化
    this.init();
}
Banner.prototype.init = function(){

    // 先布局
    // 动画效果
    this.layoutAnimate();
    // this.layout();

    // 页码显示效果
    this.options.pagination ? this.layoutPagination():"";
    // 布局
    // this.main.className  += " container-fade";

    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    // 动画
    this.main.addEventListener("click",this[this.options.effect].bind(this));
    // this.main.addEventListener("click",this.slide.bind(this));
    // this.main.addEventListener("click",this.fade.bind(this));
    if(this.pagination_ele === null){
        // 页码不存在
    }else{
        this.main.addEventListener("click",this.changePagination.bind(this));       
        this.pagination_ele.addEventListener("click",this.handlerPaginationClick.bind(this));
    }
}

// 
Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt ||window.event;
    var target = e.target || e.srcElement;

    //
    if(target !== this.pagination_ele){
        console.log( target.parentNode);
        console.log(target.parentNode.children);

        for(var i=0; i<target.parentNode.children.length; i++){
            console.log(33,target,target.parentNode.children[i]);
            if(target === target.parentNode.children[i]){
                console.log(222);
                this.toIndex(i);
                break;
            }
        }

    }
  

}
//改变页码显示
Banner.prototype.changePagination = function(){

    console.log("xx");
    for(var i=0,bullet;bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet,"pagination-bullet-active");
    }
    var index = this.nowIndex;
    if(this.options.effect == "slide"){
        index = this.nowIndex === this.sliders.length-1?0:this.nowIndex;
        if(this.nowIndex === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.nowIndex === 5 && this.state === "changeLast"){
            index = this.sliders.length -2;
        }
        console.log(this.nowIndex);
    }
    console.log(this.nowIndex);
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}

function removeClassName(dom,className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?" +className);
    // classString.replace(classReg,"");
    // dom.className = classString;

    return dom.className = dom.className.replace(new RegExp("\S?" +className),"");
}
// 页码样式
Banner.prototype.layoutPagination = function(){
    console.log (this.options.pagination);
// 页码父元素
    this.pagination_ele = document.querySelector(this.options.pagination);
    console.log(this.sliders.length);
    if(this.pagination_ele === null){
        console.log(false);
        return false;
    }

    var pagination_count = this.sliders.length - (this.options.effect ==="slide"? 1 : 0);
    console.log(pagination_count);

    var html = "";//字符串创建子节点显示页码
    for(var i =0; i<pagination_count; i++){
        if(i === this.nowIndex){
            html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        }else{
            html += "<div class='pagination-bullet'></div>";

        }
    }
    this.pagination_ele.innerHTML = html;

}
Banner.prototype.layoutAnimate = function(){
// Banner.prototype.layout = function(){
    switch(this.options.effect){
        case "slide":
                this.main.className += " container-slide";
                // 复制第一个轮播图，true子节点全部复制，false只复制当前节点
                var cloneSlide= this.sliders[0].cloneNode(true);
                // 添加
                this.wrapper.appendChild(cloneSlide);
                this.sliders = [].slice.call(this.sliders);
                // 添加
                this.sliders.push(cloneSlide);
                this.wrapper.style.width = this.main.offsetWidth *this.sliders.length+"px";
                break;
        case "fade":
            this.main.className += " container-fade";
            break;
            default:break;
    }
};




Banner.prototype.fade = function(){
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



Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length -1;
        this.state = "changeLast";
    }else{
        this.nowIndex --;
        this.state = "normal";

    }
    console.log(this.nowIndex);
}
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length -1){
        this.nowIndex = 0;
        this.state = "changeFirst";

    }else{
        this.nowIndex ++;
        this.state = "normal";

    }
    console.log(this.nowIndex);

}

Banner.prototype.slide = function(){
    console.log("“slide”");
    console.log(this.nowIndex,this.state);
    switch(this.state){
        case "normal" :
            console.log("normal");
                this.wrapper.style.left = 0;
                this.wrapper.style.transition = "left 1s";
                // 下一帧渲染
                setTimeout(function(){
                    this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px";
                }.bind(this),0);
                break;
        case "changeFirst" :
            console.log("第一张");
                
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = 0;
                
                // 下一帧渲染
                setTimeout(function(){
                    this.nowIndex ++;
                    this.state = "normal";
                    this.slide();
                }.bind(this),0);
                break;
        case "changeLast" :
                console.log("最后");
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = -(this.sliders.length -1)*this.main.offsetWidth + "px";
                // 下一帧渲染
                setTimeout(function(){
                    this.nowIndex --;
                    this.state = "normal";
                    this.slide();
                }.bind(this),0);
                break;
    }
}

Banner.prototype.toIndex = function(index){
    console.log(this.nowIndex,index,this.state);
    if(this.nowIndex === 5){
        this.wrapper.style.left = 0;
        console.log("XX");
        
    }
    this.nowIndex = index;
}
















