function Banner(selector,options){
    this.nowIndex= 0;
    this.main     = document.querySelector(selector);
    this.sliders  = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper  = this.main.querySelector(".wrapper");
    
    this.options = Object.assign({
                  effect : "slide",
                  pagination : ".pagination"
      },options)

    this.init();
}
Banner.prototype.init=function(){
    this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
    this.btn_next.addEventListener("click",this.nextIndex.bind(this));
    this.main.addEventListener('click',this[this.options.effect].bind(this))
}
Banner.prototype.prevIndex=function(){
    if(this.nowIndex===0){
        this.nowIndex = this.sliders.length - 1
        this.state = "changeLast"
    }else{
        this.nowIndex--;
        this.state = "normal"
        // console.log(this.nowIndex)
    }
//     if(this.nowIndex === 0){
//         this.nowIndex = this.sliders.length - 1;
//         // // alert("最后一张");
//         // this.state = "changeLast"
//   }else{
//         this.nowIndex --;
//         console.log(this.nowIndex)
//         // this.state = "normal"
//   }
}
Banner.prototype.nextIndex=function(){
    if(this.nowIndex===this.sliders.length - 1){
        this.nowIndex=0;
        this.state = "changeFirst"
    }else{
        this.nowIndex++ ;
        this.state = "normal"
        // console.log(this.nowIndex)
    }
    // if(this.nowIndex === this.sliders.length - 1){
    //         this.nowIndex = 0;
    //         // alert("第一张");
    //         this.state = "changeFirst"
    //    }else{
    //          this.nowIndex ++;
    //          this.state = "normal"
    //    }
}
Banner.prototype.slide=function(){
    switch(this.state){
        case 'normal':
            this.wrapper.style.left=0;
            this.wrapper.style.transition='left 1s';
            setTimeout(function(){
                this.wrapper.style.left= -this.nowIndex * this.main.offsetWidth+'px';
            }.bind(this),0)
            break;
        case 'changeFirst':
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.nowIndex ++;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
        case 'changeLast':
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
            setTimeout(function(){
                this.nowIndex --;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
            break;
    }
}