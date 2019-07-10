 
 function Banner(selector,options){
     this.nowIndex = 0;
     this.state = "normal";

     this.container = document.querySelector(selector);
     this.wrapper  = this.container.querySelector(".wrapper");
     this.slides  = this.container.querySelectorAll(".slide");
     this.btnNext = this.container.querySelector(".button-next");
     this.btnPrev =this.container.querySelector(".button-prev");
     this.bWidth  = this.container.offsetWidth;

     this.options = Object.assign({
         effect : "slide",
         pagination : ".pagination"
     },options);
     this.init();
 }

 Banner.prototype.init = function(){
     //先布局
    this.layoutAnimate();
    this.layoutPagination();
    //监听事件
    this.btnNext.addEventListener("click", this.handlerClickNext.bind(this));
    this.btnPrev.addEventListener("click", this.handlerClickPrev.bind(this));

    //动画
    this.container.addEventListener("click",this[this.options.effect].bind(this));
    this.pagination_ele === null ? "" : this.container.addEventListener("click",this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.container.addEventListener("click",this.handlerPaginationClick.bind(this));
}

 //点击分页
 Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;

    // if(target !== this.pagination_ele){
    //     for(var i = 0 ; i < target.parentNode.children.length ;i++){
    //         if(target === target.parentNode.children[i]){
    //             this.toIndex(i);
    //             break;
    //         }
    //     }
    // }
 }
 //自适应分页器
 Banner.prototype.changePagination = function(){
    for(var i = 0 ,bullet ; bullet = this.pagination_ele.children[i++] ; ){
        removeClassName(bullet,"pagination-bullet-active");      
    }
    var index = this.nowIndex;
    if(this.options.effect === "slide"){
        // console.log(this.nowIndex);
        index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex;
        if(this.nowIndex === 0 && this.state === "classFirst"){
            index = 1;
        }
        if(this.nowIndex === 5 && this.state === "classLast"){
            index = this.slides.length - 2;
        }
    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
 }
 Banner.prototype.toIndex = function(index){
    this.nowIndex = index;
 }
 //淡入淡出效果
 Banner.prototype.fade = function(){
    for( var i = 0 , slide ; slide = this.slides[i ++];){
        slide.style.transition = "all 1s";
        slide.style.opacity = 0;
    }
    this.slides[this.nowIndex].style.opacity = 1;
 }
 //滑动效果
 Banner.prototype.slide = function(){
     switch(this.state){
         case "normal":
             this.wrapper.style.left = 0;
             this.wrapper.style.transition = "left 1s";
             setTimeout(function(){
                this.wrapper.style.left = -this.nowIndex * this.bWidth + "px";
                // this.slide();
             }.bind(this),0)
             break;
        case "classFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.nowIndex ++ ;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
            break;
        case "classLast":
            this.wrapper.style.transition = "bottom 1s";
            this.wrapper.style.left = -this.nowIndex * this.bWidth + "px";
            setTimeout(function(){
                this.nowIndex -- ;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
            break;
     }
 }
//想下一张进发
 Banner.prototype.handlerClickNext = function(){
     if(this.nowIndex === this.slides.length - 1){
         this.nowIndex = 0 ;
         this.state = "classFirst";
     }else{
         this.nowIndex ++;
         this.state = "normal";
     }
 }
//向前一张进发
 Banner.prototype.handlerClickPrev = function(){
     if(this.nowIndex === 0){
         this.nowIndex = this.slides.length - 1;
         this.c=this.state = "classLast";
     }else{
         this.nowIndex --;
         this.state = "normal";
     }
 }
//页码布局
 Banner.prototype.layoutPagination = function(){
    var pagination_count = this.slides.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null) return false;
    var html = "";
    for(var i = 0 ; i < pagination_count; i ++){
        if( i === this.nowIndex){
            html += '<div class = "pagination-bullet pagination-bullet-active"></div>'
        }else{
            html += '<div class = "pagination-bullet"></div>'
        }
    }
    this.pagination_ele.innerHTML = html;
 }

//轮播图的布局
 Banner.prototype.layoutAnimate = function(){
     switch(this.options.effect){
         case "slide" :
             this.container.className += " container-slide";
             var cloneSlide = this.slides[0].cloneNode(true);
             this.slides = [].slice.call(this.slides);
             this.slides.push(cloneSlide);
             this.wrapper.appendChild(cloneSlide);
             this.wrapper.style.width = this.slides.length * this.bWidth + "px";
             
            //  console.log(this.bWidth,this.slides,cloneSlide);
            break;
         case "fade" :
             this.container.className += " container-fade";
            break;
     }

 }

 function removeClassName(dom,className){
    // var classname = dom.className;
    // var reg = new RegExp("\S?"+className);
    // className = className.replace(reg , "");
    // dom.className = classname;

    dom.className = dom.className.replace("\S?"+className,"");
 }