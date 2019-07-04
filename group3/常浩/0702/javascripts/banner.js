//创建基本的构造函数  目前参数是需要一个选定的范围 selector
//后续增加options 可供用户选择
function Banner(selector,options){
    //内部需要选中我们的元素
    this.showIndex  = 0 ;
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.next    = this.main.querySelector(".button-next");
    this.prev    = this.main.querySelector(".button-prev");
    this.wrapper = this.main.querySelector(".wrapper");
    this.state  = "normal";
    this.options = Object.assign({
        effect : "slide" ,
        pagination : ".pagination"
    },options)
    this.init();
    
}
Banner.prototype.init = function(){
    this.next.addEventListener("click",this.nexting.bind(this));
    this.prev.addEventListener("click",this.preving.bind(this));

    //先布局
    // this.layoutfade();
    this.layoutAnimate();
    this.layoutPagination();
    //再动画
    this.main.addEventListener("click",this.slideMode.bind(this));
    this.pagination_ele === null ? "" : this.main.addEventListener("click",this.changePagination.bind(this));
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click",this.handlerPaginationClick.bind(this))


}
Banner.prototype.handlerPaginationClick =function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        for(var i = 0 ; i < target.parentNode.children.length; i ++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

Banner.prototype.changePagination =function(){
    for(var i = 0 ,bullet ; bullet = this.pagination_ele.children[i++]; ){
        removeClassName(bullet,"pagination-bullet-active")
    }
    var index = this.showIndex;
    if(this.options.effect == "slide"){
        index = this.showIndex === this.sliders.length - 1 ? 0 : this.showIndex;
        if(this.showIndex === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.showIndex === 5 && this.state === "changeLast"){
            index = this.sliders.length -2;
        }

    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}
Banner.prototype.toIndex = function(index){
    this.showIndex = index;
}
Banner.prototype.nexting = function(){
    if(this.showIndex === this.sliders.length - 1){
        this.showIndex = 0;
        this.state = "changeFirst";
    }else{
        this.showIndex ++ ;
        this.state = "normal";
    }
}
Banner.prototype.preving = function(){
    if(this.showIndex === 0 ){
        this.showIndex = this.sliders.length - 1;
        this.state = "changeLast";
    }else{
        this.showIndex -- ;
        this.state = "normal";
    }
}
Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide":
            this.layoutSlide();
            break;
        case "fade" :
            this.layoutfade();
    }
}
Banner.prototype.layoutPagination = function(){
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null) return false ;
    var html = "";
    for(var i = 0 ;i < pagination_count ; i ++){
        if(i === this.showIndex){
            html += "<div class = 'pagination-bullet pagination-bullet-active'></div>"
        }else{
            html += "<div class = 'pagination-bullet'></div>"
        }
    } 
    this.pagination_ele.innerHTML = html;
}

Banner.prototype.layoutfade = function(){
    this.main.className  += " container-fade";
}
Banner.prototype.fadeMode = function(){
    for(var i = 0 , slide; slide = this.sliders[i ++]; ){
        slide.style.opacity = 0 ;
        slide.style.transition = "all 1s";
    }
    this.sliders[this.showIndex].style.opacity = 1;
}
Banner.prototype.layoutSlide = function(){
    this.main.className += " container-slide" ;
    //我们需要设置wrapper的宽度  它的宽度是根据sliders的数量来定的  所以我们需要先复制第一个元素到末尾的位置
    var eleFirst = this.sliders[0].cloneNode(true);
    this.wrapper.appendChild(eleFirst);
    this.sliders = [].slice.call(this.sliders);
    this.sliders.push(eleFirst);
    this.wrapper.style.left = 0;
    this.wrapper.style.width = this.main.offsetWidth * (this.sliders.length) +"px";
}

Banner.prototype.slideMode = function(){
    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.showIndex * this.main.offsetWidth + "px";
            }.bind(this),0)
            break;
        case "changeFirst" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.showIndex ++ ;
                this.state = "normal";
                this.slideMode();
            }.bind(this),0);
            break;
        case "changeLast" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.sliders.length - 1) * this.main.offsetWidth + "px";
            setTimeout(function(){
                this.showIndex --;
                this.state = "normal";
                this.slideMode();
            }.bind(this),0)
            break;
    }
    
}
function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}
