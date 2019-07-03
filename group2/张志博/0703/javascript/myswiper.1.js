

function Banner(selector,options){
    //显示第几个图片；
    this.nowIndex = 0;

    //状态
    this.state = "normal";

    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");


    // if(arguments.length === 1 ){
    //     this.options = {
    //         effect : "fade",
    //         pagination : ".pagination"
    //     }
    // }

    this.options = Object.assign({
        effect : "slide",
        pagination : ".pagination"
    },options)
    this.init();
}
Banner.prototype.init = function(){
    // this.layout();
    this.layoutAnimate();
    this.layoutPagnination();

    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    this.main.addEventListener("click",this[this.options.effect].bind(this)); 
    this.pagination_ele === null ? "" :
    this.main.addEventListener("click" ,this.handlerPaginationClick.bind(this))
    this.pagination_ele === null ? "" : this.main.addEventListener("click",this.changePagination.bind(this));
}



//布局
// Banner.prototype.layout = function(){
//     switch(this.options.effect){
//         case "slide" :
//             this.main.className += "container-slide";
//             var cloneSlide = this.sliders[0].cloneNode(true);
//             this.wrapper.appendChild(cloneSlide);
//             this.sliders.push(cloneSlide);
//             this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
//             break;
//         case "fade":
//             this.main.className += " container-fade";
//             break;
//     }
// }
Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.secElement;
    if(target !== this.pagination_ele){
        for(var i = 0; i<target.parentNode.children.length;i++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}


Banner.prototype.changePagination  = function(){
    for(var i = 0,bullet;bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet,"pagination-bullet-active")
    }
    var index = this.nowIndex;
    if(this.options.effect == "slide"){
        index = this.nowIndex === this.sliders.length - 1? 0 : this.nowIndex;
        if(this.nowIndex === 0 && this.state === "changeFirst"){
            index = this.sliders.length - 2;
        }
    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}


Banner.prototype.layoutPagnination = function(){
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null) return false;
    var html = "";
    for(var i = 0; i< pagination_count;i++){
        if(i === this.nowIndex){
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

//前一张
Banner.prototype.prevIndex = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length - 1;
        this.state = "changeLast"
    }else{
        this.nowIndex --;
        this.state = "normal"
    }
}


//后一张
Banner.prototype.nextIndex = function(){
    if(this.nowIndex === this.sliders.length - 1){
        this.nowIndex = 0;
        this.state = "changeFirst";
    }else{
        this.nowIndex ++;
        this.state = "normal";
    }
}

Banner.prototype.toIndex = function(index){
    this.nowIndex = index;
}

Banner.prototype.fade = function(){
    for(var i = 0,slide; slide = this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "all 1s";
    }
    this.sliders[this.nowIndex].style.opacity = 1;
}


//滑动
Banner.prototype.slide = function(){
    // if(this.nowIndex === 0){
    //     this.wrapper.style.transition = "top 1s";
    //     this.wrapper.style.left = 0;
    //     this.nowIndex ++;
    //     setTimeout(function(){
    //         this.slide();
    //     }.bind(this),10)
    // }else{
    //     this.wrapper.style.left = 0;
    //     this.wrapper.style.transition = "left 1s";
    //     setTimeout(function(){
    //         this.wrapper.style.left = -this.nowIndex *
    //         this.main.offsetWidth + "px"
    //     }.bind(this),0)
    // }

    switch(this.state){
        case "normal" :
              this.wrapper.style.left = 0;
              this.wrapper.style.transition = "left 1s";
              setTimeout(function(){
                    this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
              }.bind(this) , 0) 
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
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}





