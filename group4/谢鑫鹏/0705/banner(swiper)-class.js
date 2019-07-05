let{$, on, removeClassName} = Utils;
class Banner{
    constructor(selector, options){
        // 选择元素
        this.main = $(selector);
        this.prevBtn = this.main.querySelector(".button-prev");
        this.nextBtn = this.main.querySelector(".button-next");
        this.wrapper = this.main.querySelector(".wrapper");
        this.banners = this.main.querySelectorAll(".slide");
        // 参数判断
        if(this.main === null || this.banners.length === 0){
            return false;
        }
        this.options = Object.assign({
            effect : "slide",
            pagination : ".pagination"
        },options)
        // 其余元素
        this.nowIndex = 0;
        this.state = "normal";
        this.init();
        this.autoPlay();
    }
    // 初始化（绑定事件）
    init(){
        // 先布局
        this.layoutAnimate();
        this.layoutPagination();
        // 下标改变
        on(this.prevBtn,"click",this.prevIndex.bind(this));
        on(this.nextBtn,"click",this.nextIndex.bind(this));
        // 选择动画
        on(this.main,"click",this[this.options.effect].bind(this));
        this.paginations === null ? "" : on(this.main,"click",this.paginationChange.bind(this));
        this.paginations === null ? "" : on(this.paginations,"click",this.paginationClick.bind(this));

    }
    // 根据动画更改布局
    layoutAnimate(){
        switch(this.options.effect){
            case "slide" :
                this.main.className += " container-slide";
                // 克隆第一张轮播图，并放入轮播图数组
                let cloneBanner = this.banners[0].cloneNode(true);
                this.wrapper.appendChild(cloneBanner);
                this.banners = [].slice.call(this.banners);
                this.banners.push(cloneBanner);
                // 设置wrapper宽度
                this.wrapper.style.width = this.main.offsetWidth * this.banners.length + "px";
                break;
            case "fade" :
                this.main.className += " container-fade";
                break;
        }
        
    }
    // 页码布局
    layoutPagination(){
        let paginationCount = this.banners.length - (this.options.effect === "slide" ? 1 : 0);
        this.paginations = $(this.options.pagination);
        if(this.paginations === null){
            return false;
        }
        let html = "";
        for(let i = 0; i < paginationCount; i++){
            if(i === this.nowIndex){
                html += "<div class='pagination-bullet pagination-bullet-active'></div>";
            }else{
                html += "<div class='pagination-bullet'></div>"
            }
        }
        this.paginations.innerHTML = html;
    }
    // 切换下标
    // 上一张
    prevIndex(){
        if(this.nowIndex === 0){
            this.nowIndex = this.banners.length - 1;
            this.state = "changeLast";
        }else{
            this.nowIndex --;
            this.state = "normal";
        }
    }
    // 下一张
    nextIndex(){
        if(this.nowIndex === this.banners.length - 1){
            this.nowIndex = 0;
            this.state = "changeFirst";
        }else{
            this.nowIndex ++;
            this.state = "normal";
        }
    }
    // 页码跳转
    toIndex(index){
        this.nowIndex = index;
    }
    // 点击页码
    paginationClick(evt){
        let e = evt || window.event;
        let target = e.target || e.srcElement;
        if(target !== this.paginations){
            for(let i = 0; i < target.parentNode.children.length; i++){
                if(target === target.parentNode.children[i]){
                    this.toIndex(i);
                    break;
                }
            }
        }
    }
    // 页码改变
    paginationChange(){
        for(let i = 0, pagination; pagination = this.paginations.children[i++]; ){
            removeClassName(pagination," pagination-bullet-active");
        }
        let index = this.nowIndex;
        if(this.options.effect == "slide"){
            index = this.nowIndex === this.banners.length - 1 ? 0 : this.nowIndex;
            if(this.nowIndex === 0 && this.state === "changeFirst"){
                index = 1;
            }
            if(this.nowIndex === 5 && this.sate === "changeLast"){
                index = this.banners.length - 2;
            }
        }
        console.log(this.nowIndex);
        this.paginations.children[index].className += " pagination-bullet-active";
    }
    // 动画效果
    // 淡入淡出
    fade(){
        for(let i = 0, banner; banner = this.banners[i++]; ){
            banner.style.opacity = 0;
            banner.style.transition = "all 1s";
        }
        this.banners[this.nowIndex].style.opacity = 1;
    }
    // 水平滑过
    slide(){
        switch(this.state){
            case "normal" :
                this.wrapper.style.left = 0;
                this.wrapper.style.transition = "left 1s";
                setTimeout(function(){
                    this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px";
                }.bind(this), 0)
                break;
            case "changeFirst" :
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = 0;
                setTimeout(function(){
                    this.nowIndex ++;
                    this.state = "normal";
                    this.slide();
                }.bind(this), 0)
                break;
            case "changeLast" :
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = -(this.banners.length - 1) * this.main.offsetWidth + "px";
                setTimeout(function(){
                    this.nowIndex --;
                    this.state = "normal";
                    this.slide();
                }.bind(this), 0)
        }
    }
    // 自动播放
    autoPlay(){
        // let evt = document.createEvent('HTMLEvents');
        // evt.initEvent("click",true,true);
        setInterval(function(){
            console.log(this.nowIndex);
            let evt = new Event("click", {
                bubbles : true
            });
            this.nextBtn.dispatchEvent(evt);
        }.bind(this),1000)
    }
}

