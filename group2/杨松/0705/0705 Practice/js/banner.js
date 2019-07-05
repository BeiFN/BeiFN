/*
* 实现 点击按钮分页
* 实现 点击分页器分页
*
* */
    class Banner{
    constructor(selector,options){
        this.nowIndex =0;
        this.main = document.querySelector(selector);
        this.sliders =this.main.querySelectorAll('.slide');
        this.prev = this.main.querySelector('.button-prev');
        this.next = this.main.querySelector('.button-next');
        this.wrapper = this.main.querySelector('.wrapper');
        this.options = Object.assign({
            effect:"slide",
            pagination:".pagination"
        },options);
        this.init();
    }
    init(){
        this.layoutAnimate();
        this.layoutPageAnimate();
        this.prev.addEventListener("click",this.prevBtn.bind(this));
        this.next.addEventListener('click',this.nextBtn.bind(this));
        this.main.addEventListener('click',this[this.options.effect].bind(this)); //动画
        this.page_ele === null ? '':this.main.addEventListener('click',this.changePage.bind(this));
        this.page_ele === null ?"":this.main.addEventListener('click',this.handlerPageClick.bind(this));
    }
    //下一张
    nextBtn(){
        if(this.nowIndex === this.sliders.length-1){
            this.nowIndex = 0;
            this.state = "normal"
        }else {
            this.nowIndex ++;
            this.state = "normal"
        }
    }
    //上一张
    prevBtn(){
        if(this.nowIndex === 0){
            this.nowIndex = this.sliders.length -1;
            this.state = "changeLast"

        }else {
            this.nowIndex --;
            this.state = "normal"
        }
    }
    //动画布局
    layoutAnimate(){
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
            case "cube":
                this.main.className += "container-cube";
                break;
        }
    }
    //点击分页器分页
    layoutPageAnimate(){
        var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.page_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null ) return false;
    var html = "";
    for(var i = 0 ; i < pagination_count ; i++){
        if(i === this.nowIndex){
            html += "<div class='pagination-bullet pagination-bullet-active'></div>"
        }else{
            html += "<div class='pagination-bullet'></div>"
        }
    }
    this.page_ele.innerHTML = html;
    }
    //改变分页
    changePage(){
        for(var i = 0 , bullet; bullet = this.page_ele.children[i++];){
            removeClassName(bullet , "pagination-bullet-active")
        }
        var index = this.nowIndex;
        if(this.options.effect == "slide"){
            index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex;
    
            if(this.nowIndex === 0 && this.state === "changeFirst"){
                index = 1;
            }
            if(this.nowIndex === 5 && this.state === "changeLast"){
                index = this.sliders.length - 2;
            }
        }
    
        this.page_ele.children[index].className += " pagination-bullet-active";
    }
    // 点击分页
    handlerPageClick(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        if(target !== this.page_ele){
            console.log(target.parentNode);
            console.log(target.parentNode.children);
            for(var i = 0 ; i < target.parentNode.children.length ; i ++){
                if(target === target.parentNode.children[i]){
                    this.toIndex(i);
                    break;
                }
            }
        }
    }
    toIndex(){
        this.nowIndex = index;
    }
    //淡入淡出
    fade(){
        for(var i = 0 , slide ; slide = this.sliders[i++];){
            slide.style.opacity = 0;
            slide.style.transition = "all 1s";
        }
        // console.log("动画");
        this.sliders[this.nowIndex].style.opacity = 1;
    }
    
    //滑动
    slide(){
        switch(this.state){
            case "normal":
                this.wrapper.style.left = 0;
                this.wrapper.style.transition= "left 2s";
                setTimeout(function(){
                    this.wrapper.style.left = -this.nowIndex *this.main.offsetWidth +'px';
                }.bind(this),0);
                break;
            case "changeFirst":
                this.wrapper.style.transition = 'left 2s';
                this.wrapper.style.left =0;
                setTimeout(function(){
                    this.nowIndex ++;
                    this.state ='normal';
                    this.slide();
                }.bind(this),0);
                break;
            case "changeLast":
                this.wrapper.style.left =0;
                this.wrapper.style.transition ='left 2s';
                this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth +'px';
                setTimeout(function(){
                  this.nowIndex --;
                  this.state = 'normal';
                  this.slide()
          }.bind(this),0);
        }
    }

}
//滑动
// Banner.prototype.slide = function(){
//     switch(this.state){
//         case "normal" :
//             this.wrapper.style.left = 0;
//             this.wrapper.style.transition = "left 1s";
//             setTimeout(function(){
//                 this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
//             }.bind(this) , 0)
//             break;
//         case "changeFirst":
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = 0;
//             setTimeout(function(){
//                 this.nowIndex ++;
//                 this.state = "normal";
//                 this.slide();
//             }.bind(this),0);
//             break;
//         case "changeLast" :
//             this.wrapper.style.transition = "top 1s";
//             this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
//             setTimeout(function(){
//                 this.nowIndex --;
//                 this.state = "normal";
//                 this.slide();
//             }.bind(this),0)
//     }
// }

function removeClassName(dom , className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}