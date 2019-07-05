/**
 * 目标：
 *   1.点击实现button滚动
 *   2.点击pagination实现滚动
 *   3.多种滚动效果
 *   4.autoplay
 */

 //options => effect : slideAnimate / fadeAnimate / cubeAnimate
 //          1.影响基础布局
 //          2.影响动画效果
function Banner(selector,options){ 
    this.ele_container = document.querySelector(selector);   //必备的元素
    this.sliders = this.ele_container?this.ele_container.querySelectorAll(".slide"):""; 
    this.paginations = document.querySelector(".pagination");
    console.log(this.paginations.children);
    this.state = "normal"
    //如果跨越函数要多次使用某个变量，建议将这个变量放入this之中
    this.btn_prev = this.ele_container.querySelector(".button-prev");   //获取按钮
    this.btn_next = this.ele_container.querySelector(".button-next");
    if(arguments.length === 1){
        this.options = { effect : "slideAnimate", pagination : ".pagination" }
    }else if(arguments.length === 2 && typeof arguments[1] === "object"){
        //合并用户参数
        this.options = Object.assign({effect : "slideAnimate",pagination: ".pagination"},options);
    }
    //设置默认的动画效果
    if(this.ele_container === null || this.sliders.length === 0) throw new Error("参数不对");   //参数判断
    this.init();
}
//初始化
Banner.prototype.init=function(){
    this.page_now_index = 0;
    //按钮点击改变下标
    this.btn_prev == null ? "":this.btn_prev.addEventListener("click",this.toPrev.bind(this));
    this.btn_next == null ? "":this.btn_next.addEventListener("click",this.toNext.bind(this));
    //切换动画效果
    //this[this.options.effect] => this["slideAnimate"] => this.slideAnimate
    this.ele_container.addEventListener("click",this[this.options.effect].bind(this));
    this.ele_container.addEventListener("click",this.changePagination.bind(this));
    this.paginations === this.paginations.addEventListener("click",this.handlerPaginationToClick.bind(this));
    // this.layoutPagination();
    //初始化必要的布局
    switch(this.options.effect){
        case "slideAnimate" : this.slideAnimateLayout(); break;
        case "fadeAnimate" : this.fadeAnimateLayout(); break;
    }
}
//分页
Banner.prototype.toPrev=function(){
   if( this.page_now_index === 0){
       this.page_now_index = this.sliders.length-1;
       this.state = "changeLast";
    }else{
        this.page_now_index--;
        this.state = "normal";
    }
}
Banner.prototype.toNext=function(){
    if( this.page_now_index === this.sliders.length - 1){
        this.page_now_index = 0;
        this.state = "changeFirst";
     }else{
         this.page_now_index++;
         this.state = "normal";
     }
}
Banner.prototype.toIndex=function(index){
    this.page_now_index = index;
}
Banner.prototype.handlerPaginationToClick=function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target.nodeName !== this.paginations){
        //console.log(target.parentNode);
        //console.log(target.parentNode.children);
        for(var i=0;i<target.parentNode.children.length;i++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

//动画效果
Banner.prototype.slideAnimate=function(){
    switch(this.state){
        case "normal" : this.wrapper.style.transition = "left 2s";
                        this.wrapper.style.left = 0;
                        setTimeout(function(){
                            this.wrapper.style.left = -this.page_now_index*this.ele_container.offsetWidth + "px";
                        }.bind(this),0); 
                        break;
        case "changeFirst" : this.wrapper.style.transition = "top 2s";
                            this.wrapper.style.left = 0;
                            setTimeout(function(){
                                this.page_now_index++;
                                this.state = "normal";
                                this.slideAnimate();
                            }.bind(this), 10); 
                            break;
        case "changeLast" : this.wrapper.style.transition = "top 2s";
                            this.wrapper.style.left = -(this.sliders.length - 1)*this.ele_container.offsetWidth + "px";
                            setTimeout(function(){
                                this.page_now_index--;
                                this.state = "normal";
                                this.slideAnimate();
                            }.bind(this), 10);
    }
}
Banner.prototype.fadeAnimate=function(){
    for(var i=0,slide;slide=this.sliders[i++];) {
        slide.style.opacity = 0;
        slide.style.transition = "left 2s";
    }
    this.sliders[this.page_now_index].style.opacity = 1;
}
Banner.prototype.cubeAnimate=function(){}

//布局
Banner.prototype.slideAnimateLayout=function(){
    var width = this.ele_container.offsetWidth;
    // var height = this.ele_container.offsetHeight;
    //固定slider宽高
    for(var i=0, slider; slider=this.sliders[i++];){
        slider.style.width = width + "px";
    }
    //克隆第一个元素，插入到warpper之中
    var clone_first_slider = this.sliders[0].cloneNode(true);
    this.wrapper = this.sliders[0].parentNode;
    this.wrapper.appendChild(clone_first_slider);
    this.wrapper.style.width = this.ele_container.offsetWidth*this.wrapper.children.length + "px";
    // this.wrapper.style.transition = "left 2s";
    this.wrapper.style.left = 0;
    this.sliders = [].slice.call(this.sliders);
    this.sliders.push(clone_first_slider);
    //console.log(this.sliders);
}

Banner.prototype.fadeAnimateLayout=function(){
}

// Banner.prototype.layoutPagination=function(){
//     var pagination_count = this.sliders.length - (this.options.effect === "slideAnimate" ? 1:0);
//     var pagination_ele = this.ele_container.querySelector(this.options.pagination);
//     var html = "";
//     for(var i=0;i<pagination_count;i++){
//         if(i===this.page_now_index){
//             html += "<div class='pagination-bullet pagination-bullet-active'></div>"
//         }else{
//             html += "<div class='pagination-bullet'></div>"
//         }
//     }
//     pagination_ele.innerHTML = html;
// }

Banner.prototype.changePagination=function(){
    //console.log(this.paginations.children[this.page_now_index].className);
    // if(){}else{}
    for(var i=0,bullet;bullet=this.paginations.children[i++];){
        removeClassName(bullet,"pagination-bullet-active")
    }
    var index = this.page_now_index;
    if(this.options.effect==="slideAnimate"){
        index = this.page_now_index === this.sliders.length - 1 ? 0 : this.page_now_index;
        if(this.page_now_index === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.page_now_index === 5 && this.state === "changeLast"){
            index = this.sliders.length - 2;
        }
    }
    
    this.paginations.children[index].className +=" pagination-bullet-active";
}
//自动播放
Banner.prototype.autoPlay=function(){}


function removeClassName(dom , className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}

