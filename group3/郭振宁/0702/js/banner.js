/* 
*
*
*
*
*/

function Banner(selector , options) {
    //图片下标
    this.nowIndex = 0;
    this.options = options;
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");

    this.init();

    if(arguments.length === 1) {
        this.options = {
            effect : "slide"
        }
    }
}
Banner.prototype.init = function() {
    this.layout();
    this.btn_prev.addEventListener("click" , this.prevIndex.bind(this));
    this.btn_next.addEventListener("click" , this.nextIndex.bind(this));

    this.main.addEventListener("click" , this[this.options.effect].bind(this));
}
Banner.prototype.layout = function() {
    switch(this.options.effect) {
        case "slide" : {
                        this.main.className += " container-slide";
                        var cloneSlide = this.sliders[0].cloneNode(true);
                        this.wrapper.appendChild(cloneSlide);
                        this.sliders = [].slice.call(this.sliders);
                        this.sliders.push(cloneSlide);
                        this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
                    };break;
        case "fade" : {
                        this.main.className += " container-fade";
                    };break;

    }
}
Banner.prototype.prevIndex = function() {
    if(this.nowIndex === 0) {
        this.nowIndex = this.sliders.length - 1;
    }else {
        this.nowIndex--;
    }
}
Banner.prototype.nextIndex = function() {
    if(this.nowIndex === this.sliders.length - 1) {
        this.nowIndex = 0;
    }else {
        this.nowIndex++;
    }
    console.log(this.nowIndex);
    // console.log(this.nowIndex);
}
Banner.prototype.fade = function() {
    for(var i=0; i<this.sliders.length; i++) {
        this.sliders[i].style.opacity = 0;
        this.sliders[i].style.transition = "all 1s";
    }
    this.sliders[this.nowIndex].style.opacity = 1;
}
Banner.prototype.slide = function() {
    if(this.nowIndex === 0) {
        console.log(1);
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = 0;
        this.nowIndex++;
        setTimeout(function() {
            this.slide();
        }.bind(this),100)
    }else {
        this.wrapper.style.left = 0;
        this.wrapper.style.transition = "all 1s";
        setTimeout(function() {
            this.wrapper.style.left = -(this.main.offsetWidth * this.nowIndex) + "px";
        }.bind(this),0)
    }
}








new Banner(".container" , {
    effect : "slide"
});