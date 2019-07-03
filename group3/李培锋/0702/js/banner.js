/**
 * 目标：
 * 1.点击左右按钮，翻页
 * 2.点击分页器翻页
 * 3.多种动画效果
 * 4.自动播放
 */

 //介质：nowIndex;  页面跳转依据
 
 //1.选择元素,创建构造函数
 function Banner(selector,options){  //调用的区块，拥护选择的生成模式
    //当前显示图片信息
    this.nowIndex = 0;
    //页面状态 mormal/tofirst/tolast
    this.state = "normal"
    //获取元素
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    console.log(this.sliders);
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");
    //将用户输入与默认情况合并
    this.options = Object.assign({
        effect : "slide",
        pagination: ".pagination"
    },options)
    this.init();

 }
 //2.绑定事件
 Banner.prototype.init = function(){
     this.layoutAnimate();  //翻页动画；
     this.layoutPagnination();  //分页的动态创建
     //左右按钮翻页绑定
     this.btn_prev.addEventListener("click",this.prevIndex.bind(this));
     this.btn_next.addEventListener("click",this.nextIndex.bind(this));
     //动画
     this.main.addEventListener("click",this[this.options.effect].bind(this));
     //判断分页器是否存在，然后给绑定
     this.pagination_ele === null? "":this.main.addEventListener("click",this.changePagination.bind(this));
     this.pagination_ele === null ? "" : this.pagination_ele.addEventListener("click" , this.handlerPaginationClick.bind(this))
    }

//3.处理函数
 //按钮
 Banner.prototype.prevIndex = function(){//向前翻页，当为第一页时，跳转到最后一页
     if(this.nowIndex === 0){
         this.nowIndex = this.sliders.length - 1;
         this.state = "changeLast"
     }else{
         this.nowIndex--;
         this.state = "normal";
     }
 }
 Banner.prototype.nextIndex = function(){//向前翻页，当为第一页时，跳转到最后一页
    if(this.nowIndex === this.sliders.length-1){
        this.nowIndex = 0;
        this.state = "changeFirst"
    }else{
        this.nowIndex++;
        this.state = "normal";
    }
}
//分页器
 Banner.prototype.toIndex = function(index){
     this.nowIndex = index;
 }
 //动画布局 不同的动画有不一样的布局
 Banner.prototype.layoutAnimate = function(){
     switch(this.options.effect){
         case "slide":
             this.main.className += " container-slide";
             var cloneSlide = this.sliders[0].cloneNode(true);      //克隆第一张图片，插到最后一张后面
             this.wrapper.appendChild(cloneSlide);
             this.sliders = [].slice.call(this.sliders);//转化为真数组
             this.sliders.push(cloneSlide);//把克隆的图片放入数组
             this.wrapper.style.width = this.main.offsetWidth*this.sliders.length+"px";
             break;
         case "fade":
             this.main.className += " container-fade";
             break;
     }
 }
 //淡入淡出
 Banner.prototype.fade = function(){//先将所有的的透明度变为0，当前页面的透明度设为1
     for(var i= 0,slide;slide = this.sliders[i++];){
         slide.style.opacity = 0;
         slide.style.transition = "all 1s";
     }
     this.sliders[this.nowIndex].style.opacity = 1;
 }
 //滑动
 Banner.prototype.slide = function(){
     switch(this.state){
         case "normal" :
             this.wrapper.style.left = 0;
             this.wrapper.style.transition = "left 1s";
             setTimeout(function(){
                 this.wrapper.style.left = -this.nowIndex*this.main.offsetWidth + "px";
             }.bind(this),0)
             break;
         case "changeFirst":
             this.wrapper.style.transition = "top 1s";
             this.wrapper.style.left = 0;
             setTimeout(function(){
                 this.index ++;
                 this.state = "normal";
                 this.slide();
             }.bind(this),0);
             break;
         case "changeLast":
             this.wrapper.style.transition = "top 1s";
             this.wrapper.style.left = -(this.sliders.length-1)*this.main.offsetWidth +"px";
             setTimeout(function(){
                 this.nowIndex--;
                 this.state = "normal";
                 this.slide();
             }.bind(this),0)

            
     }
 }
 //生成分页器
 Banner.prototype.layoutPagnination = function(){
     var pagination_count = this.sliders.length - (this.options.effect === "slide"?1:0);
 //确定分页数量，淡入淡出比滑动少一张图
     this.pagination_ele = document.querySelector(this.options.pagination);  //获取分页器
     if(this.pagination === null) return false;     //用户没有选择分页器，以下不执行
     var html = ""; //以字符串形式向页面中添加分页器元素
     for(var i = 0;i<pagination_count;i++){ //如果是当前显示页数，添加active
         if(i === this.nowIndex){
             html += "<div class='pagination-bullet pagination-bullet-active'></div>"
         }else{
             html += "<div class='pagination-bullet'></div>"
         }
     }
     this.pagination_ele.innerHTML = html;
 }
 Banner.prototype.changePagination = function(){
     for(var i = 0 ,bullet;bullet = this.pagination_ele.children[i++];){ //清除  active
         removeClassName(bullet,"pagination-bullet-active")
     }
     var index = this.nowIndex;
     if(this.options.effect == "slide"){
         index = this.nowIndex === this.sliders.length - 1? 0 :this.nowIndex; //对于划过模式，如果是最后一张图片，显示为第一张，其余正常；
         //根据
         if(this.nowIndex === 0 && this.state === "changFirst"){//第一张
             index = 1
         }
         if(this.nowIndex === 5 && this.state === "changeLast"){//最后一张
             index = this.sliders.length-2
         }
        }
         this.pagination_ele.children[index].className +=" pagination-bullet-active"
        
 }
 //分页器跳转实现
 Banner.prototype.handlerPaginationClick = function(evt){
     var e = evt||event;
     var target = e.target || e.srcElement;
     if(target !== this.pagination_ele){
         for(var i=0;i<target.parentNode.children.length;i++){
             if(target === target.parentNode.children[i]){
                 this.toIndex(i);
                 break;
             }
         }
     }
 }

 function removeClassName(dom , className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}