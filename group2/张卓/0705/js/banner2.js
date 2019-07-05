function Banner(selector, options) {
    this.imgContainer = $(selector)
    this.imgWrapper = $(".wrapper")
    this.slideList = $(".slide")
    this.slideWidth = this.slideList[0].offsetWidth;
    this.prevBtn = $(".button-prev")
    this.nextBtn = $(".button-next")
    this.paginationWrapper = $(".pagination")
    this.nowIndex = 0;
    if (arguments.length == 1) {
        this.options = {
            effect: "slide",
            pagination: ".pagination"
        }
    } else {
        this.options = Object.assign({
            effect: "slide",
            pagination: ".pagination"
        }, options)
    }
    // this.options = ({effect="slide",pagination=".pagination"}=options)

    this.state = "normal"
    this.init();
}
Banner.prototype.init = function () {
    //改变动画布局的
    this.animationStyleChange()
    //改变分页布局的
    this.paginationLayout()

    this.prevBtn.addEventListener("click", this.handlerPrevClick.bind(this));
    this.nextBtn.addEventListener("click", this.handlerNextClick.bind(this))
    this.imgContainer.addEventListener("click", this[this.options.effect].bind(this))
    this.imgContainer.addEventListener("click",this.changePagination.bind(this))
    this.paginationWrapper.addEventListener("click",this.pageChange.bind(this))
    
}
//点击分页器更改页码
Banner.prototype.pageChange = function(evt){
    var e = evt||event
    var target = e.target||e.srcElement
    // [].slice.call(this.paginationWrapper.children)
    for(var i = 0,page;page = this.paginationWrapper.children[i];i++){
        if(target==page){
            this.nowIndex=i
        }
    }

}

//改变分页的方法
Banner.prototype.changePagination = function(){
    for(var i = 0,page;page = this.paginationWrapper.children[i];i++){
        removeClassName(page,"pagination-bullet-active")
    }
    var index = this.nowIndex;
    if(index == this.slideList.length-1){
        index = 0
    }
    if(index==0&&this.state=="lastAdd"){
        index =1
    }
    if(index==0&&this.state=="firstJian"){
        index = this.slideList.length-2
    }
    this.paginationWrapper.children[index].className+=" pagination-bullet-active"
}

//分页的布局
Banner.prototype.paginationLayout = function(){
    for(var i = 0;i<(this.options.effect=="slide"?this.slideList.length-1:this.slideList.length);i++){
        var page = document.createElement("div")
        page.className = "pagination-bullet"
        this.paginationWrapper.appendChild(page)
    }
    this.paginationWrapper.children[this.nowIndex].className +=" pagination-bullet-active";
}
//淡入淡出
Banner.prototype.fade = function () {
    // this.imgContainer.className = this.imgContainer.className.replace(new RegExp("\s?container-fade","g"),"")
    // this.imgContainer.className +=" container-fade"
    for (var i = 0, slide; slide = this.slideList[i++];) {
        slide.style.transition = "opacity 1s"
        slide.style.opacity = 0;
    }
    this.slideList[this.nowIndex].style.opacity = 1
}

//大长条的
Banner.prototype.slide = function () {
    
    //在正常情况下
    switch (this.state) {
        case "normal":
            this.imgWrapper.style.left = 0;
            this.imgWrapper.style.transition = "left 1s"
            this.imgWrapper.style.left = -this.nowIndex * (this.slideWidth) + "px"
            break;
        case "lastAdd":
            this.imgWrapper.style.transition = "top 1s"
            this.imgWrapper.style.left = 0;
            this.nowIndex++;
            this.state = "normal"
            setTimeout(function () {
                this.slide();
            }.bind(this), 0)
            break;
        case "firstJian":
            this.imgWrapper.style.transition = "top 1s"
            this.imgWrapper.style.left = -(this.slideList.length - 1) * (this.slideWidth) + "px"
            this.nowIndex--;
            this.state = "normal"
            setTimeout(function () {
                this.slide();
            }.bind(this), 0)
            break;
    }
}

//改变动画的布局  不同的动画不同的布局 
Banner.prototype.animationStyleChange = function () {
    switch (this.options.effect) {
        case "fade":
            this.imgContainer.className += " container-fade"
            break;
        case "slide":
            this.changeSlideStyle();
            break;
    }
}
Banner.prototype.changeSlideStyle = function () {
    for (var i = 0, slide; slide = this.slideList[i]; i++) {
        slide.style.width = this.imgWrapper.offsetWidth + "px"
        slide.style.float = "left"
    }
    var cloneNode = this.slideList[0].cloneNode(true);
    this.imgWrapper.appendChild(cloneNode)
    //改变wrapper的长度
    this.imgWrapper.style.width = this.imgWrapper.children.length * (this.imgWrapper.offsetWidth) + "px"
    this.imgWrapper.style.left = 0
    this.imgWrapper.className += " container-slide";
    this.slideList = [].slice.call(this.slideList)
    this.slideList.push(cloneNode)
}

Banner.prototype.handlerNextClick = function () {
    //点击到下一张我们先改变他的下标索引
    if (this.nowIndex == this.slideList.length - 1) {
        this.nowIndex = 0;
        this.state = "lastAdd"
    } else {
        this.nowIndex++;
        this.state = "normal"
    }
    console.log(this.nowIndex)
}
Banner.prototype.handlerPrevClick = function () {
    //点击到下一张我们先改变他的下标索引
    if (this.nowIndex == 0) {
        this.nowIndex = this.slideList.length - 1;
        this.state = "firstJian"
    } else {
        this.nowIndex--;
        this.state = "normal"
    }
    console.log(this.nowIndex)
}

function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\s?"+className,"g"),"")
}

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length == 1 ? ele[0] : ele
}


//         ┏┓　　　┏┓+ +
// #　　　┏┛┻━━━┛┻┓ + +
// #　　　┃　　　　　　　┃ 　
// #　　　┃　　　━　　　┃ ++ + + +
// #　　     ████━████ ┃+
// #　　　┃　　　　　　　┃ +
// #　　　┃　　　┻　　　┃
// #　　　┃　　　　　　　┃ + +
// #　　　┗━┓　　　┏━┛
// #　　　　　┃　　　┃　　　　　　　　　　　
// #　　　　　┃　　　┃ + + + +
// #　　　　　┃　　　┃　　　　Codes are far away from bugs with the animal protecting　　　
// #　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
// #　　　　　┃　　　┃
// #　　　　　┃　　　┃　　+　　　　　　　　　
// #　　　　　┃　 　　┗━━━┓ + +
// #　　　　　┃ 　　　　　　　┣┓
// #　　　　　┃ 　　　　　　　┏┛
// #　　　　　┗┓┓┏━┳┓┏┛ + + + +
// #　　　　　　┃┫┫　┃┫┫
// #　　　　　　┗┻┛　┗┻┛+ + + +
