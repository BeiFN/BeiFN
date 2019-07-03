//获取元素
function Banner (selector ,options){
    this.nowIndex = 0 ;
    this.state = "normal";

    this.main  = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");
    this.options = Object.assign({
        effect:"slide",
        pagination :".pagination"
    },options)
    this.init();
}
//绑定事件
Banner.prototype.init =function () {

        //布局
        this.layoutAnimate();
        this.layoutPagination();
        this.btn_next.addEventListener("click",this.nextIndex.bind(this));
        console.log(this.nextIndex)
   // this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));

    //动画
    this.main.addEventListener("click",this[this.options.effect].bind(this));
    this.pagination_ele === null ? "" :this.main.addEventListener("click",this.changePagination.bind(this));
    this.pagination_ele ===null ? "": this.pagination_ele.addEventListener("click",this.handlerPaginationClick.bind(this));

}

Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || event ;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        for(var i = 0;i<target.parentNode.children.length;i++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

Banner.prototype.changePagination = function(){
    for(var i = 0 ,bullet;bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet," pagination- bullet-active")
    }
    var index = this.nowIndex;
    if(this.options.effect == "slice"){
        index = this.nowIndex === this.sliders.length - 1 ? 0 :this.nowIndex;
        if(this.nowIndex === 0 && this.state === "changeFirst"){
            index = 1;
        }
        if(this.nowIndex === 5 && this.state ==="changeLast"){
            index = this.sliders.length - 2;
        }
    }
    this.pagination_ele.children[index].className += " pagintion-bullet-active";
}
Banner.prototype.layoutPagination = function(){
    var pagination_count =this.sliders.length -(this.options.effect === "slide" ? 1: 0);
    console.log(pagination_count) 
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null){
        return false;
    }
    var  html =  ""; 
    for(var i = 0;i < pagination_count ;i++){
        if(i === this.nowIndex){
            html += "<div class = 'pagination- bullet  pagination-bullet-active'></div>"

        }else{
            html += "<div class = 'pagination-bullet'></div>"
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
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth *this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
    }
}

Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length - 1;
        this.state = "changeLast"
    }else{
        this.nowIndex ++;
        this.state = "normal";
    }
}
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length - 1){
         this.nowIndex = 0;
         // alert("第一张");
         this.state = "changeFirst"
    }else{
          this.nowIndex ++;
          this.state = "normal"
    }
}
Banner.prototype.toIndex =function(){
    this.nowIndex = index ;
}
Banner.prototype.fade = function(){
    for(var i = 0,slide; slide =this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.aliders[this.nowIndex].style.opacity = 1;
}
Banner.prototype.slide =function(){
    switch(this.state){
        case "normal":
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -this.nowIndex*this.main.offsetWidth + "px";
            }.bind(this),0)
            break;
        case "changeFirst":
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "top  1s";
            setTimeout(function(){
                this.nowIndex ++;
                this.state = "normal";
                this.slide();

            }.bind(this),0)
            break;
        case "changeLast":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left  = -(tis.sliders.length - 1)*this.main.offsetWidth + "px";
            setTimeout(function(){
                this.nowIndex -- ;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
    }
}
function removeClassName(dom ,className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}