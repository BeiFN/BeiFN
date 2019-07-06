
class Banner{
    constructor(seletor,{effect = "slide",pagination = ".pagination"} ={}) {
        this.index = 0;
        this._index = "normal";
        this.effect = effect;
        this.pagination = pagination;
        this.main = document.querySelector(seletor);
        this.wrapper = this.main.querySelector(".wrapper");
        this.btn_prev = this.main.querySelector(".button-prev");
        this.btn_next = this.main.querySelector(".button-next");
        this.sliders = this.main.querySelectorAll(".slide");
        this.init();
    }
    init() {
        this.layoutAnimate();
        this.layoutPagnination();
        this.btn_prev.addEventListener("click", this.handlerPrevClick.bind(this));
        this.btn_next.addEventListener("click", this.handlerNextClick.bind(this));
        this.main.addEventListener("click", this[this.effect].bind(this));
        this.main.addEventListener("click", this.changePagination.bind(this));
        this.pagination_ele.addEventListener("click", this.ClickChangePagination.bind(this))

    }
    handlerPrevClick() {
        if (this.index === 0) {
            this.index = this.sliders.length - 1;
            this._index = "last";
        } else {
            this.index--;
        }
    }
    handlerNextClick() {
        if (this.index === this.sliders.length - 1) {
            this.index = 0;
            this._index = "first";
        } else {
            this.index++;
        }
    }
    toIndex (i){
        this.index = i;
    }
    layoutAnimate(){
        switch (this.effect) {
            case "slide":
                this.main.className += " container-slide";
                var cloneSlide = this.sliders[0].cloneNode(true);
                this.wrapper.appendChild(cloneSlide);
                this.sliders = [].slice.call(this.sliders);
                this.sliders.push(cloneSlide);
                this.wrapper.style.width = this.sliders.length * this.main.offsetWidth + "px";
                break;
            case "fade":
                this.main.className += " container-fade";
                break;
        }

    }
    ClickChangePagination(evt) {
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        if (target !== this.pagination_ele) {
            for (var i = 0; i < target.parentNode.children.length; i++) {
                if (target === target.parentNode.children[i]) {
                    this.toIndex(i);
                    break;
                }
            }
        }
    }
    layoutPagnination() {
        // var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
        // this.pagination_ele = this.main.querySelector(this.options.pagination);
        var pagination_count = this.sliders.length - (this.effect === "slide" ? 1 : 0);
        this.pagination_ele = this.main.querySelector(this.pagination);
        if (this.pagination_ele === null) return false;
        var html = "";
        for (var i = 0; i < pagination_count; i++) {
            if (i === this.index) {
                html += '<div class="pagination-bullet pagination-bullet-active"></div>';
            } else {
                html += '<div class="pagination-bullet"></div>';
            }
        }
        this.pagination_ele.innerHTML = html;
    }
    changePagination() {
        let{removeClassName} = Utils;
        for (var i = 0, ele; ele = this.pagination_ele.children[i++];) {
            removeClassName(ele, "pagination-bullet-active");
        }
        var _temp = this.index;
        if (this.effect === "slide") {
            _temp = this.index === this.sliders.length - 1 ? 0 : this.index;
            if (this.index === 0 && this._index === "first") {
                _temp++;
            }
            if (this.index === (this.sliders.length - 1) && this, this._index === "last") {
                _temp = this.sliders.length - 2;
            }
        }
        this.pagination_ele.children[_temp].className += " pagination-bullet-active";

    }

    slide() {
        switch (this._index) {
            case "normal":
                this.wrapper.style.left = 0;
                this.wrapper.style.transition = "left 1s";
                this.wrapper.style.left = -(this.index * this.main.offsetWidth) + "px";
                break;
            case "first":
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = 0;
                setTimeout(function () {
                    this.index++;
                    this._index = "normal";
                    this.slide();
                }.bind(this), 0);
                break;
            case "last":
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = -(this.sliders.length - 1) * this.main.offsetWidth + "px";
                setTimeout(function () {
                    this.index--;
                    this._index = "normal";
                    this.slide();
                }.bind(this), 0);
                break;
        }
    }

    fade() {
        for (var i = 0, ele; ele = this.sliders[i++];) {
            ele.style.opacity = 0;
            ele.style.transition = "all 1s";
        }
        this.sliders[this.index].style.opacity = 1;

    }
}







// function Banner(seletor,options){
//     this.index = 0;
//     this._index = "normal";

//     this.main = document.querySelector(seletor);
//     this.wrapper = this.main.querySelector(".wrapper");
//     this.btn_prev = this.main.querySelector(".button-prev");
//     this.btn_next = this.main.querySelector(".button-next");
//     this.sliders = this.main.querySelectorAll(".slide");
//     // if(arguments.length ===1){
//     //     this.options = {
//     //         effect:"slide",
//     //     }
//     // }else{
//         this.options = Object.assign(
//             {
//                 effect:"slide",
//                 pagination : ".pagination",
//             }
//         ,options);
//     // }


//     this.init();

// }


// Banner.prototype.init = function(){
//     this.layoutAnimate();
//     this.layoutPagnination();
//     this.btn_prev.addEventListener("click", this.handlerPrevClick.bind(this));
//     this.btn_next.addEventListener("click", this.handlerNextClick.bind(this));
//     this.main.addEventListener("click",this[this.options.effect].bind(this));
//     this.pagination_ele === null ? "" :this.main.addEventListener("click",this.changePagination.bind(this));
//     this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click" , this.ClickChangePagination.bind(this))

// }

// Banner.prototype.handlerPrevClick = function(){
//     if(this.index === 0){
//         this.index =this.sliders.length - 1;
//         this._index = "last";
//     }else{
//         this.index --;
//     }
//     console.log(this.index)
// }
// Banner.prototype.handlerNextClick = function(){
//     if(this.index === this.sliders.length - 1){
//         this.index = 0;
//         this._index = "first";
//     }else{
//         this.index ++;
//     }
//     console.log(this.index)
// }
// Banner.prototype.toIndex = function(i){
//     this.index = i;
// }
// Banner.prototype.layoutAnimate = function(){
//     switch(this.options.effect){
//         case "slide":
//             this.main.className += " container-slide";
//             var cloneSlide = this.sliders[0].cloneNode(true);
//             this.wrapper.appendChild(cloneSlide);
//             this.sliders = [].slice.call(this.sliders);
//             this.sliders.push(cloneSlide);
//             this.wrapper.style.width = this.sliders.length * this.main.offsetWidth + "px";
//             break;
//         case "fade":
//             this.main.className += " container-fade";
//             break;
//     }
    
// }
// Banner.prototype.ClickChangePagination = function(evt){
//     var e = evt || window.event;
//       var target = e.target || e.srcElement;
//       if(target !== this.pagination_ele){
//             for(var i = 0 ; i < target.parentNode.children.length ; i ++){
//                   if(target === target.parentNode.children[i]){
//                         this.toIndex(i);
//                         break;
//                   }
//             }
//       }
// }

// Banner.prototype.layoutPagnination = function(){
//     var pagination_count = this.sliders.length - (this.options.effect === "slide"? 1 :0);
//     this.pagination_ele = this.main.querySelector(this.options.pagination);
//     if(this.pagination_ele === null) return false;
//     var html ="";
//     for(var i = 0 ; i < pagination_count ; i++ ){
//         if( i === this.index){
//             html += '<div class="pagination-bullet pagination-bullet-active"></div>';
//         }else{
//             html += '<div class="pagination-bullet"></div>';
//         }
//     }
//     this.pagination_ele.innerHTML =  html;
// }
// Banner.prototype.changePagination = function(){
//     for(var i = 0 ,ele; ele = this.pagination_ele.children[i++];){
//         removeclassName(ele,"pagination-bullet-active");
//     }
//     var _temp = this.index;
//     if(this.options.effect ==="slide"){
//         _temp = this.index === this.sliders.length - 1 ? 0 : this.index;
//         if(this.index === 0 && this._index === "first"){
//             _temp++;
//         }
//         if(this.index === (this.sliders.length - 1) && this,this._index ==="last"){
//             _temp = this.sliders.length - 2;
//         }
//     }
//     this.pagination_ele.children[_temp].className += " pagination-bullet-active";

// }
// function removeclassName(dom,className){
//    return dom.className = dom.className.replace(new RegExp("\S?" + className),"");
// }


// Banner.prototype.slide = function(){
//     switch(this._index){
//         case "normal":
//             this.wrapper.style.left = 0;
//             this.wrapper.style.transition = "left 1s";
//             this.wrapper.style.left = -(this.index * this.main.offsetWidth) + "px";
//             break;
//         case "first":
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = 0;
//             setTimeout(function(){
//                 this.index ++;
//                 this._index = "normal";
//                 this.slide();
//             }.bind(this),0);
//             break;
//         case "last":
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = -(this.sliders.length - 1)*this.main.offsetWidth + "px";
//             setTimeout(function(){
//                 this.index --;
//                 this._index = "normal";
//                 this.slide();
//             }.bind(this),0);
//             break;
//     }
// }

// Banner.prototype.fade = function(){
//     for(var i = 0 ,ele; ele = this.sliders[i++]; ){
//         ele.style.opacity = 0;
//         ele.style.transition = "all 1s";
//     }
//     this.sliders[this.index].style.opacity = 1;

// }