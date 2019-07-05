/*
*
*
*
*
*
*/
function Banner(selector) {
    this.index = 0;
    
    this.main_ele = document.querySelector(selector);
    this.sliders = document.querySelectorAll(".slide");
    this.btn_prev = document.querySelector(".button-prev");
    this.btn_next = document.querySelector(".button-next");
    this.init();
}
Banner.prototype.init = function() {
    this.btn_next.addEventListener("click" , this.next.bind(this));
    this.btn_prev.addEventListener("click" , this.prev.bind(this));
}
Banner.prototype.next = function() {
    if(this.index === this.sliders.length - 1) {
        this.index = 0;
    }else {
        this.index ++;
    }
    this.show();
}
Banner.prototype.prev = function() {
    if(this.index === 0) {
        this.index = this.sliders.length - 1;
    }else {
        this.index --;
    }
    this.show();
}
Banner.prototype.show = function() {
    for(var i=0; i<this.sliders.length; i++) {
        this.sliders[i].style.opacity = "0";
        this.sliders[i].style.transition = "all 1s";
    }
    this.sliders[this.index].style.opacity = "1";
}

new Banner("#container");