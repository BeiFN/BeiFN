function  Magnifier(){
    // 属性获取; => 元素选择
    this.small_wrapper = $(".samllImg");
    this.small_img = $(".samllImg img");
    this.cube = $(".cube")
    this.big_img = $(".bigImg")
    this.init()
}
Magnifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hidden.bind(this));
    this.small_wrapper.addEventListener("mouseover",this.hadderMove.bind(this));
}
Magnifier.prototype.show = function(){
    this.cube.style.display = "block";
    this.big_img.style.display = "block";
}
Magnifier.prototype.hidden = function(){

}
Magnifier.prototype.hadderMove =function(){

}

//边界检测
Magnifier.prototype.boundary = function(){

}

//工具
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

new Magnifier();