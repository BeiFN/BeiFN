/*
难点：1、界面布局   2、动画效果判断
*实现目的：1、点击翻页
            一、next按钮翻页
            二、prev按钮翻页
          2、点击分页器翻页
          3、多种动画效果
          4、自动播放          
*/
//动画效果依赖于元素，  元素  对象
function Banner(selector,options){
    //显示当前哪个图片
    this.now_index = 0;
    this.state     = "normal";//作为滑动时候的标记
    //根据外部元素，选择内部元素
    this.main     = document.querySelector(selector);//外包围
    this.sliders  = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper  = this.main.querySelector(".wrapper");
    //使用Object.assign方法将options拼接到自建对象中
    //为防止用户没有输入options
    this.options = Object.assign({
        effect : "slide",
        pagination : ".pagination"
    },options);

    this.init();
}
Banner.prototype.init = function(){
    //界面布局
    this.layoutAnimate();//动画效果
    this.layoutPagnination();//分页跳转
    //绑定事件
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    //动画
    this.main.addEventListener("click",this[this.options.effect].bind(this));
    //this[this.options.effect]相当于this.slide

    //判读是否存在分页元素
    this.pagination_ele === null ? "" :this.main.addEventListener("click",this.changePagination.bind(this));
    this.pagination_ele === null ? "" :this.pagination_ele.addEventListener("click",this.handlerPaginationClick.bind(this));
}
Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        for(var i = 0 ; i < target.parentNode.children.length ; i ++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}
//改变分页元素的背景颜色
Banner.prototype.changePagination = function(){
    //先清除每一个分页元素的背景颜色
    for(var i = 0 , bullet; bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet,"pagination-bullet-active");
    }
    var index = this.now_index;
    //解决分页元素下标不统一问题
    if(this.options.effect == "slide"){
        index = this.now_index === this.sliders.length - 1 ? 0 :this.now_index;
        if(this.now_index === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.now_index === 5 && this.state === "changeLast"){
            index = this.sliders.length - 2;
        }
    }
    this.pagination_ele.children[index].className +="pagination-bullet-active";
}
Banner.prototype.layoutPagnination = function(){
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null) return false;
    var html = "" ;
    for(var i = 0 ; i < pagination_count ; i++){
        if(i === this.now_index){
            html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        }
        else{
            html += "<div class='pagination-bullet'></div>"
        }
    }
    this.pagination_ele.innerHTML = html;
}
//动画布局
Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide" : 
            this.main.className += " container-slide";
            //console.log(this.sliders[0]);
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild( cloneSlide );
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade" : 
            this.main.className += " container-fade";
            break;
    }
}
Banner.prototype.nextIndex = function(){
    //最后一张的时候，改变标记状态
    if(this.now_index === this.sliders.length - 1){
        this.now_index = 0;

    }
    else{
        this.now_index ++;
        this.state = "normal";
    }
}
Banner.prototype.prevIndex = function(){
    //第一张的时候，改变标记状态
    if(this.now_index === 0){
        this.now_index = this.sliders.length - 1;
        this.state = "changeLast";
    }
    else{
        this.now_index --;
        this.state = "normal";
    }
}
//动画效果：淡化淡出
Banner.prototype.fade = function(){
    for(var i = 0 , slide ; slide = this.sliders[i++] ;){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.sliders[this.now_index].style.opacity = 1;
}
//动画效果:滑动
Banner.prototype.slide = function(){
    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.now_index * this.main.offsetWidth + "px";
            
            }.bind(this),0);
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
function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className), "");
}