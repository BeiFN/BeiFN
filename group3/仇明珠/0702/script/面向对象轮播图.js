function Banner(selector,options){
    this.main=document.querySelector(selector);
    this.options=Object.assign({
        effect:"slide",
        pagination:".pagination"
    });
    this.nextBtn=document.querySelector(".button-next");
    this.prevBtn=document.querySelector(".button-prev");
    this.wrapper=document.querySelector(".wrapper");
    this.sliders=this.wrapper.children;
    this.nowIndex=0;
    // this.state = "normal";
    this.init();
}
Banner.prototype.init=function(){
    console.log(this.wrapper);
    this.layOut();
    this.nextBtn.addEventListener("click",this.toNext.bind(this));
    this.prevBtn.addEventListener("click",this.toPrev.bind(this));
    this.main.addEventListener("click",this[this.options.effect].bind(this))
}
Banner.prototype.layOut=function(){
    if(this.options.effect==="slide"){
        this.slideLayOut();
    }else{
        this.fadeLayout();
    }
}
Banner.prototype.slideLayOut=function(){
    this.main.className+=" container-slide";
    var clone=this.sliders[0].cloneNode(true);
    this.wrapper.appendChild(clone);
    this.sliders=[].slice.call(this.sliders);
    console.log(this.sliders);
    this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
}
Banner.prototype.fadeLayout=function(){
    this.main.className+=" container-fade";
}
Banner.prototype.toNext=function(){
    if(this.nowIndex==this.sliders.length-1){
        this.state = "changeFirst"
        this.nowIndex=0;
    }else{
        this.sate="normal";
        this.nowIndex++;
    }
}
Banner.prototype.toPrev=function(){
    if(this.nowIndex==0){
        this.nowIndex=this.sliders.length-1;
        this.state="changeLast";
    }else{
        this.nowIndex--;
        this.state="normal";
    }
}
Banner.prototype.slide = function () {
    console.log(this.state);
    if (this.state == "normal") {
        this.wrapper.style.left = 0;
        this.wrapper.style.transition = "left 1s";
        setTimeout(function () {
            this.wrapper.style.left = -this.main.offsetWidth * this.nowIndex + "px";
        }.bind(this), 0)
    } else if (this.state == "changeFirst") {
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = 0;
        setTimeout(function () {
            this.nowIndex++;
            this.state = "normal";
            this.slide();
        }.bind(this), 0);
    } else if (this.state == "changeLast") {
        this.wrapper.style.transition = "top 1s";
        this.wrapper.style.left = -(this.sliders.length - 1) * this.main.offsetWidth + "px";
        setTimeout(function () {
            this.nowIndex--;
            this.state = "normal";
            this.slide();
        }.bind(this), 0)
    }
}
var banner=new Banner(".container")