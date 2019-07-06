
function Magnifier(){
    // 属性获取，元素选择
    this.small_wrapper = $(".small-img");
    this.small_img = $(".small-img img");
    this.small_cube = $(".cube");
    this.big_wrapper = $(".big-img");
    this.big_img = $(".big-img img");

    this.img_btn_wrapper = $(".img-btn");
    this.img_btns = this.img_btn_wrapper.children;
    console.log(this.img_btns);
    
    this.list_i = 0;
    this.list = [
        {
            src:  "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src_d:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            // src_x:"https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        },
        {
            src:  "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            src_d:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            // src_x:"https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        },
    ];

    // 获取属性值
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.small_cube_size = getSize(this.small_cube);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.big_img_size = getSize(this.big_img);
    this.big_wrapper_size = getSize(this.big_wrapper);

    

    // 核心方法调用
    this.init();
};


Magnifier.prototype.changeImgs = function(){
    // this.small_img.src = this.list[this.list_i].src;
    this.small_img.src = this.list[this.list_i].src_d;
    this.small_cube.style.backgroundImage = "url("+ this.list[this.list_i].src_d+")";
    this.big_img.src = this.list[this.list_i].src_d;
}
Magnifier.prototype.changeImgClick = function(evt){
    var e = evt || window.event;
    var target = e.target || e.srcElement;

    console.log(target.parentNode,target.parentNode.className);
    var reg = new RegExp("\S?"+"active");

    if(reg.test(target.parentNode.className)){
        return false;
    };
    for(var i = 0;i<this.img_btns.length;i++){
        if(this.img_btns[i] === target.parentNode){
            this.list_i = i;
            this.img_btns[i].className += " active";
        }else{
            removeClassName(this.img_btns[i],"active");
        }
    }
    console.log(this.list_i);
    this.changeImgs();
}

Magnifier.prototype.init = function(){
    // console.log(111);
    this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove",this.handlerMouseMove.bind(this));
    // this.small_wrapper.addEventListener("mousemover",this.move.bind(this));
    this.img_btn_wrapper.addEventListener("click",this.changeImgClick.bind(this));
};

Magnifier.prototype.show = function(){
    // console.log(111);
    this.small_cube.style.display  = "block";
    this.big_wrapper.style.display = "block";
}

Magnifier.prototype.hide = function(){
    this.small_cube.style.display  = "none";
    this.big_wrapper.style.display = "none";
}


Magnifier.prototype.move = function(cube_position,big_img_position){
    // console.log(3);
    this.small_cube.style.left = cube_position.x + "px";
    this.small_cube.style.top = cube_position.y +"px";

    this.big_img.style.left = -big_img_position.x + "px";
    this.big_img.style.top = -big_img_position.y + "px";

    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
}

Magnifier.prototype.handlerMouseMove = function(evt){
    // console.log(2);
    var e = evt ||window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width/2;
    var y = e.pageY - this.small_wrapper_position.top - this.small_cube_size.height/2;

    var cube_position = this.boundary(x,y);
    

    var big_img_position = this.getBigPosition(cube_position.x, cube_position.y);

    this.move(cube_position,big_img_position);
}
// 边界检测
Magnifier.prototype.boundary = function(x,y){
    x = x<=0?0:x;
    var maxX = this.small_wrapper_size.width - this.small_cube_size.width;
    x= x>=maxX? maxX:x;

    y = y<=0?0:y;
    var maxY = this.small_wrapper_size.height - this.small_cube_size.height;
    y= y>=maxY? maxY:y;

    return {
        x : x,
        y : y,
    }
}
// 根据比例计算大图位置
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = x /(this.small_wrapper_size.width -this.small_cube_size.width);
    var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));

    var propy = y /(this.small_wrapper_size.height -this.small_cube_size.height);
    var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height));

    return{
        x:big_img_x,
        y:big_img_y,
    }
}


new Magnifier();

function Utils(){

}

// 纯工具
// 获取决定定位
// function getAbsPosition(dom){
//     var position = {
//         left : dom.offsetLeft,
//         top : dom.offsetTop,
//     }
//     if(dom.offsetParent === document.body){
//         return position;
//     }else{
//           var pos = getAbsPosition(dom.offsetParent);
//           return  {
//                 left : dom.offsetLeft + pos.left,
//                 top  : dom.offsetTop + pos.top
//           }
//     }    
// }

function getAbsPosition(dom){
    var position = {
        left :dom.offsetLeft,
        top:dom.offsetTop,
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left : dom.offsetLeft + pos.left,
            top : dom.offsetTop + pos.top,
        }
    }
}


// 获取元素宽高
function getSize(dom){
    return {
        // 获取元素CSS属性
        width: parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"]),
        // width : parseInt(getComputedStyle(dom)["width"]),
        // height : parseInt(getComputedStyle(dom)["height"]),
    }
}

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length===1?ele[0]:ele;
}

function removeClassName(dom , className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\\s\?"+className) , "" );
    
}