/**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */




// 问题：    最后一张点击小圆点优化
//           创建圆点问题；（依旧会创建）
//           调用时对象的  对应赋值





/**
 * 
 * @param {String} selector 选择器
 * @param {Obj} options 动画
 */

// 设置初始变量  事件调用
function Banner(selector, options){
    this.state = "normal";
    this.nowIndex = 0;

    // 给出默认动画
    this.options = Object.assign({
        effect : "slide",
        pagination : ".pagination"
    });

    
    this.main = document.querySelector(selector);
    this.sliders = this.main.querySelectorAll(".slide");
    this.btn_prev = this.main.querySelector(".button-prev");
    this.btn_next = this.main.querySelector(".button-next");
    this.wrapper = this.main.querySelector(".wrapper");
    this.pagination_ele = document.querySelector(this.options.pagination);
    // console.log(this.pagination_ele);

    if(this.main === null || this.sliders.length === 0){
        throw new Error("Parameter error 参数错误");
    }
    
    // 是否有左右按钮

    this.init();
}



// 初始化  绑定事件，
Banner.prototype.init = function(){
    // 依据动画类型进行初始布局wrapper
    this.layoutAnimate();
    // 布局pagniation(中间的小圆点)
    this.layoutPagination();

    // 左右按钮绑定事件
    this.btn_prev.addEventListener("click", this.prev.bind(this));
    this.btn_next.addEventListener("click", this.next.bind(this));
    
    // 点击事件的动画
    this.main.addEventListener("click", this[this.options.effect].bind(this));
    // 中间圆点变化
    this.main.addEventListener("click", this.changePagination.bind(this));
    // 中间圆点点击事件
    this.pagination_ele.addEventListener("click", this.handlerPaginationClick.bind(this));
    
}

// 根据动画类型布局wrapper
Banner.prototype.layoutAnimate = function(){
    switch(this.options.effect){
        case "slide" :
            this.main.className += " container-slide";
            var cloneSlide = this.sliders[0].cloneNode(true);
            this.wrapper.appendChild(cloneSlide);
            this.sliders = [].slice.call(this.sliders); // 转真数组
            this.sliders.push(cloneSlide);
            this.wrapper.style.width = this.main.offsetWidth * this.sliders.length + "px";
            break;
        case "fade" :
            this.main.className += " container-fade";
            break;
    }
}
// 中间圆点（分页）布局
Banner.prototype.layoutPagination = function(){
    if(this.pagination_ele === null) return false;
    var pagination_count = this.sliders.length - (this.options.effect == "slide" ? 1 : 0);
    // 创建小圆点
    var html = "";
    for(var i = 0; i < pagination_count; i++){
        if(i === this.nowIndex){
            html += "<div class='pagination-bullet pagination-bullet-active'></div>";
        } else {
            html += "<div class='pagination-bullet'></div>";
        }
    }
    this.pagination_ele.innerHTML = html;
}


// 左右按钮事件  点击按钮切换元素下标
Banner.prototype.prev = function(){
    if(this.nowIndex === 0){
        this.nowIndex = this.sliders.length - 1;
        this.state = "changeLast";// 跳到最后一张
    } else {
        this.nowIndex--;
        this.state = "normal";
    }
    // console.log(this.nowIndex);
}
Banner.prototype.next = function(){
    if(this.nowIndex === this.sliders.length - 1){
        this.nowIndex = 0;
        this.state = "changeFirst";// 跳到第一张
    } else {
        this.nowIndex++;
        this.state = "normal";
    }
    // console.log(this.nowIndex);
}


// 滑动动画
// 注意添加动画前 left 值的改变的设定，与添加动画
Banner.prototype.slide = function(){
    switch(this.state){
        case  "normal" :
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "left 1s";
            setTimeout(function(){
                this.wrapper.style.left = - this.nowIndex * this.main.offsetWidth + "px";
            }.bind(this),0);
            break;
        case "changeLast" : 
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = - this.nowIndex * this.main.offsetWidth + "px";
            setTimeout(function(){
                this.nowIndex--;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
        case "changeFirst" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.nowIndex++;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
     }
}

// 小圆点改色
Banner.prototype.changePagination = function(){
    for(var i = 0, bullet; bullet = this.pagination_ele.children[i++];){
        removeClassName(bullet, "pagination-bullet-active");
    }
    var index = this.nowIndex;
    if(this.options.effect == "slide"){
        index = this.nowIndex === this.sliders.length - 1 ? 0 : this.nowIndex;
        if(this.nowIndex === this.sliders.length - 1 && this.state === "changeLast"){
            index = this.sliders.length - 2;
        }
        if(this.nowIndex === 0 && this.state === "changeFirst"){
            index = 1;
        }
    }
    // console.log(index);
    this.pagination_ele.children[index].className += " pagination-bullet-active"; 
}

// 中间圆点点击事件
Banner.prototype.handlerPaginationClick = function(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;
    if(target !== this.pagination_ele){
        // console.log(target);
        // console.log(target.parentNode);
        for(var i = 0; i < target.parentNode.children.length; i++){
            if(target === target.parentNode.children[i]){
                this.toIndex(i);
                break;
            }
        }
    }
}

// 点击圆点更改this.nowIndex 值
Banner.prototype.toIndex = function(now_index){
    this.nowIndex = now_index;
}





// 自动播放
Banner.prototype.autoPlay = function(){

}



// 
function removeClassName(dom, className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\s?" + className), "");
}


// 调用形式  选择banner区域，是否加入动画效果（有默认动画）
// new Banner(".container" , {
//     effect : "slide"
// });