function Banner(selector , options){
    this.showIndex  = 0;
    this.state      = "normal";


    this.main       = document.querySelector(selector);
    this.wrapper    = this.main.querySelector(".wrapper");
    this.sliders    = this.main.querySelectorAll(".slide");
    this.nextBtn    = this.main.querySelector(".button-next");
    this.prevBtn    = this.main.querySelector(".button-prev");

    //根据对象属性判断轮播效果以及是否添加分页器
    this.options = Object.assign({
        effect : "slide",
        pagination : ".pagination"
    },options)

    this.init();
}

//添加事件
Banner.prototype.init = function(){
    this.layoutAnimate();
    this.layoutPagination();

    this.nextBtn.addEventListener("click" , this.nextIndex.bind(this));         
    this.prevBtn.addEventListener("click" , this.prevIndex.bind(this));
    this.main.addEventListener("click" , this[this.options.effect].bind(this));
    //改变当下分页器的样式
    this.pagination_ele === null ? "" : this.main.addEventListener("click" , this.changePagination.bind(this));
    //点击分页器跳转至指定图片
    this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click" , this.paginationClick.bind(this));
    // console.log(this.pagination_ele.children);
}

//下一张图片
Banner.prototype.nextIndex = function(){
    if(this.showIndex === this.sliders.length-1){
        this.showIndex = 0;
        this.state = "firstIndex";
    }else{
        this.showIndex ++;
    }
}

//上一张图片
Banner.prototype.prevIndex = function(){
    if(this.showIndex === 0){
        this.showIndex = this.sliders.length-1;
        this.state = "lastIndex";
    }else{
        this.showIndex--;
    }
}


//效果布局
Banner.prototype.layoutAnimate = function(){
    switch(this.options["effect"]){
        case "slide":
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders);
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade":
            this.main.className += " container-fade";
            this.wrapper.style.width = this.main.offsetWidth + "px";
            break;
    }
}

//分页器布局;
Banner.prototype.layoutPagination = function(){
    var pagination_count = this.sliders.length - (this.options.effect === "slide" ? 1 : 0);
    this.pagination_ele = document.querySelector(this.options.pagination);
    if(this.pagination_ele === null) return false;
    //使用字符串给分页器盒子添加元素；
    html = "";
    for(var i = 0; i<pagination_count;i++){
        if( i === this.nowIndex){
            html +="<div class = 'pagination-bullet pagination-bullet-active'></div>";
        }else{
            html +="<div class = 'pagination-bullet'></div>";
        }
    }
    this.pagination_ele.innerHTML = html;
}

//点击的分页器改变样式
Banner.prototype.changePagination = function(){

    for(var i = 0,bullet;bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet , "pagination-bullet-active");
    }

    var index = this.showIndex;

    //轮播特效为slide情况下
    if(this.options.effect === "slide"){
        //当showIndex为最后一张图片时，将index的索引指向第一张图片
        index = this.showIndex === this.sliders.length - 1 ? 0 : this.showIndex;

        //当showIndex跳转至0时,由于此时showIndex++设定在延时器内，所以放在最后执行所以showIndex的值仍停留在上一次图片滑动时的值
        if(this.showIndex === 0 && this.state === "firstIndex"){
            index = 1;
        }
        if(this.showIndex === this.sliders.length-1 && this.state ==="lastIndex"){
            index = this.sliders.length - 2;
        }
    }
    this.pagination_ele.children[index].className += " pagination-bullet-active";
}

Banner.prototype.paginationClick = function(evt){
    var e = evt || event;
    target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        for(var i = 0;i<target.parentNode.children.length;i++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

Banner.prototype.toIndex = function(index){
    this.showIndex = index;
}

//轮播效果函数：

//slide轮播效果
Banner.prototype.slide = function(){
    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = -(this.showIndex * this.main.offsetWidth) + "px";
            }.bind(this),0);
            this.wrapper.style.transition = "left 1s";
            break;
        case "firstIndex" :
            //关闭画面效果
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            //先进行页面渲染后,进行延时器内操作
            setTimeout(function(){
                this.showIndex ++;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
        case "lastIndex" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.sliders.length - 1) * this.main.offsetWidth + "px";
            setTimeout(function(){
                this.showIndex --;
                this.state = "normal";
                this.slide(); 
            }.bind(this),0);
            break;
    }
}

////slide淡入淡出效果
Banner.prototype.fade = function(){
    for(var i = 0,slide;slide = this.sliders[i++];){
        slide.style.opacity = 0;
        slide.style.transition = "opacity 1s";
    }
    this.sliders[this.showIndex].style.opacity = 1;
}

function removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className),"");
}







// #
// # 　　　┏┓　　　┏┓
// # 　　┏┛┻━━━┛┻┓
// # 　　┃　　　　　　　┃
// # 　　┃　　　━　　　 ┃
// # 　　┃　┳┛　┗┳　┃
// # 　　┃　　　　　　　 ┃
// # 　　┃　　　┻　　　 ┃
// # 　　┃　　　　　　　 ┃
// # 　　┗━┓　　　┏━┛Codes are far away from bugs with the animal protecting
// # 　　　　┃　　　┃    神兽保佑,代码无bug
// # 　　　　┃　　　┃
// # 　　　　┃　　　┗━━━┓
// # 　　　　┃　　　　　 ┣┓
// # 　　　　┃　　　　 ┏┛
// # 　　　　┗┓┓┏━┳┓┏┛
// # 　　　　　┃┫┫　┃┫┫
// # 　　　　　┗┻┛　┗┻┛
// --------------------- 
// 作者：vbirdbest 
// 来源：CSDN 
// 原文：https://blog.csdn.net/vbirdbest/article/details/78995793 
// 版权声明：本文为博主原创文章，转载请附上博文链接！
