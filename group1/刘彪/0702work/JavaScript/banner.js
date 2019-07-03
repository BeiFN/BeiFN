/**
 * 实现的目标:
 * 1.点击按钮翻页;
 * 2.点击分页器翻页;
 * 3.多种动画效果;
 * 4.自动播放;
 */

//构造函数
function Banner(selector , options){
    //当前图片下标
    this.nowIndex = 0;
    //轮播的状态
    this.state = "nomal";

    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper   = this.main.querySelector(".wrapper");

    this.options = Object.assign(
        {
            effect : "slide",
            pagination : ".pagination"
        },options
    )
    this.init();
}

//初始化
Banner.prototype.init = function(){
    //布局;
    this.layoutAnimate();
    this.layoutPagnination();

    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));

    //动画;
    this.main.addEventListener("click",this[this.options.effect].bind(this));
    this.pagination_ele === null ? "" : this.main.addEventListener("click",this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click",this.handlerPaginationClick.bind(this));

}
//处理点击
Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        for(var i  = 0;i < target.parentNode.children.length ;i ++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}
//切换下标
Banner.prototype.changePagination = function(){
    for(var i = 0,bullet ; bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet,"pagination-bullet-active");
    }
    var index = this.nowIndex;
    if(this.options.effect === "slide"){
        index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex;
        if(this.nowIndex === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.nowIndex === 5 && this.state ==="changeLast"){
            index = this.sliders.length - 2;
        }
    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}

//分页布局
Banner.prototype.layoutPagnination = function(){
    var pagination_count = this.sliders.length - (this.options.effect==="slide" ? 1:0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    var html = "";
    for(var i= 0;i<pagination_count;i++){
        if(i===this.nowIndex){
            html += "<div class = 'pagination-bullet pagination-bullet-active'></div>"
        }else{
            html +="<div class = 'pagination-bullet'></div>"
        }
    }
    this.pagination_ele.innerHTML = html;
}
//动画布局

Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide" :
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth*this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
    }
}
//向前切换
Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length -1;
        this.state = "changeLast"
    }else{
        this.nowIndex --;
        this.state = "normal";
    }
}
//向后切换
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length-1){
        this.nowIndex =0;
        this.state = "changeFirst"
    }else{
        this.nowIndex ++;
        this.state = "normal"
    }
}

Banner.prototype.toIndex = function(index){
    this.nowIndex = index;
}

//淡入淡出
Banner.prototype.fade = function(){
    for(var i = 0,slide;slide =this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition ="all 1s";
    }
    this.sliders[this.nowIndex].style.opacity = 1;
}
//滑动;
Banner.prototype.slide = function(){
    switch(this.state){
        case "normal":
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.nowIndex*this.main.offsetWidth +"px";
            }.bind(this),0)
            break;
        case "changeFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.nextIndex ++;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
        case "changeLast":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left -=(this.sliders.length-1)*this.main.offsetWidth + "px";
            setTimeout(function(){
                this.nowIndex--;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
}
}

function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}