 
 function Banner(selector,options){
     this.nowIndex  = 0;

     this.state = "normal";
     this.container = document.querySelector(selector);
     this.bWitch    = this.container.offsetWidth;
     this.wrapper   = this.container.querySelector(".wrapper");
     this.slides    = this.wrapper.querySelectorAll(".slide");
     this.btnNext   = this.container.querySelector(".button-next");
     this.btnPrev   = this.container.querySelector(".button-prev");

     this.options = Object.assign({
            effect : "slide",
            pagination : ".pagination"
     },options)

     this.init();
 }

 Banner.prototype.init = function(){
     //布局
     this.layoutAnimate();
     this.layoutPagnination();
     //按钮翻页
     this.btnNext.addEventListener("click" , this.handlerClickNext.bind(this));
     this.btnPrev.addEventListener("click" , this.handlerClickPrev.bind(this));
     //添加动画
     this.container.addEventListener("click",this[this.options.effect].bind(this));
     this.pagination_ele === null ? "" : this.container.addEventListener("click",this.changePagination.bind(this));
     this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click" , this.handlerPaginationClick.bind(this));
 }

 Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
          // console.log(target.parentNode);
          // console.log(target.parentNode.children);
          for(var i = 0 ; i < target.parentNode.children.length ; i ++){
                if(target === target.parentNode.children[i]){
                      this.toIndex(i);
                      break;
                }
          }
    }
}

Banner.prototype.changePagination = function(){

    for(var i = 0 , bullet; bullet = this.pagination_ele.children[i++];){
          removeClassName(bullet , "pagination-bullet-active")
    }
    var index = this.nowIndex;
    if(this.options.effect == "slide"){
          index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex; 

          if(this.nowIndex === 0 && this.state === "changeFirst"){
                index = 1;
          }
          if(this.nowIndex === 5 && this.state === "changeLast"){
                index = this.slides.length - 2;
          }
    }

    this.pagination_ele.children[index].className += " pagination-bullet-active";
    // console.log(this.nowIndex,this.state);
}
//分页器布局
 Banner.prototype.layoutPagnination = function(){
     var pagination_count = this.slides.length -(this.options.effect === "slide" ? 1 : 0);
     //获取每个小点点
     this.pagination_ele = document.querySelector(this.options.pagination);
    //  console.log(this.pagination_ele);
     if(this.pagination_ele === null ) return false;
     var html = "";
     for(var i = 0 ; i < pagination_count ; i++){
           if(i === this.nowIndex){
                 html += "<div class='pagination-bullet pagination-bullet-active'></div>"
           }else{
                 html += "<div class='pagination-bullet'></div>"
           }
     }
     this.pagination_ele.innerHTML = html;
 }

 //动画布局
 Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide" :
            this.container.className += " container-slide";
            var cloneSlide = this.slides[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.slides = [].slice.call(this.slides);
            this.slides.push(cloneSlide);
            this.wrapper.style.width = this.slides.length * this.bWitch + "px";
            break;
        case "fade":
            this.container.className += " container-fade";
            break;
    }
 }
 Banner.prototype.toIndex = function(index){
     this.nowIndex = index;
 }


//淡入淡出
 Banner.prototype.fade = function(){
     for(var i = 0 ,slide ; slide = this.slides[i++];){
         slide.style.opacity = 0;
         slide.style.transition = "all 1s";
     }
     this.slides[this.nowIndex].style.opacity = 1;
 }
//滑动
 Banner.prototype.slide = function(){
     switch(this.state){
         case "normal" :
             this.wrapper.style.left = 0;
             this.wrapper.style.transition = "left 1s";
             setTimeout(function(){
                 this.wrapper.style.left = -this.nowIndex*this.bWitch + "px";
             }.bind(this),0)
             break;
        case "changeFirst":
            //类似于取消动画延时
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                //直接跳过去一页
                this.nowIndex ++;
                this.state = "normal";
                //更新完nowIndex递归调用slide
                this.slide();
            }.bind(this),0)
            break;
        case "changeLast":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.slides.length - 1)*this.bWitch +"px";
            setTimeout(function(){
                this.nowIndex --;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
            break;
     }
 }
 //按钮
 Banner.prototype.handlerClickPrev = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.slides.length - 1;
        this.state = "changeLast";
    }else{
        this.nowIndex --;
        this.state = "normal";
    }
 }
 Banner.prototype.handlerClickNext = function(){
     if(this.nowIndex === this.slides.length - 1){
         this.nowIndex = 0;
         this.state = "changeFirst";
     }else{
         this.nowIndex ++ ;
         this.state = "normal";
     }
 }
//  removeClassName(bullet , "pagination-bullet-active")
 function removeClassName(dom,className){
    // return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
    // var classString = dom.className;
      // var classReg = new RegExp("\S?"+className);
      // classString = classString.replace(classReg,"");
      // dom.className = classString;
    // var className = dom.className;
    // var reg = new RegExp("\S?"+className);
    // var str = className.replace(reg,"");
    // return str;
    var str = dom.className;
    var reg = new RegExp("\S?"+className);
    str = str.replace(reg,"");
    dom.className = str;

 }
