//创建构造函数，获取元素
function Magnify(){
    this.cube = $(".cube");
    this.small_wrapper = $(".small-img");
    this.big_wrapper = $(".big-img");
    this.big_img = $(".big-img img");
    this.small_img = $(".small-img img");
    this.img_btn = $(".img-btn");
    this.img_box  = $(".img-box");
    


    this.init();
}

//实例化，绑定事件，调用函数
Magnify.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove" , this.handlerMove.bind(this));
    this.img_btn.addEventListener("click" , delegation(this.changeImg.bind(this),".img-box"));
    // this.img_btn.addEventListener("click" , this.smaImgChange.bind(this));
    // this.img_btn.addEventListener("click" , this.changeBigImg.bind(this));
}

Magnify.prototype.smaImgChange = function(){

}

//鼠标移入事件
Magnify.prototype.show = function(){
    // console.log(1);
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";

    this.small_img.style.opacity = .3;
    // this.cube.style.opacity = 1;

}

//鼠标移出
Magnify.prototype.hide = function(){
    // console.log(2);
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";


    this.small_img.style.opacity = 1;
}

//处理鼠标移动
Magnify.prototype.handlerMove = function(evt){
    var e = evt || window.event;
    var position = getAbsPosition(this.small_wrapper);
    var cubex = e.pageX - position.left - this.cube.offsetWidth / 2;
    var cubey = e.pageY - position.top - this.cube.offsetHeight / 2;
    
    var cube_position = this.boundary(cubex , cubey);
    var big_position = this.bigPosition(cubex,cubey);
    this.eleMove(cube_position , big_position);
    
}

//元素移动
Magnify.prototype.eleMove = function(cube_position,big_position){
    // console.log(cube_position.x,cube_position.y);
    this.cube.style.left = cube_position.x + "px";
    this.cube.style.top = cube_position.y + "px";

    this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px" ;
    

    this.big_img.style.left = - big_position.x + "px";
    this.big_img.style.top = - big_position.y + "px";

    // console.log(this.cube.style.backgroundPosition);

}

//边界检测
Magnify.prototype.boundary = function(x,y){
    
    x = x < 0 ? 0 : x;
    var maxX = this.small_wrapper.offsetWidth - this.cube.offsetWidth;
    x = x >= maxX ? maxX : x;
    y = y < 0 ? 0 : y;
    var maxY = this.small_wrapper.offsetHeight - this.cube.offsetHeight;
    y = y >= maxY ? maxY : y;
    return {
        x : x,
        y : y
    }
}

//计算大图位置比例
Magnify.prototype.bigPosition = function(x , y){
    var perx = x / (this.small_wrapper.offsetWidth - this.cube.offsetWidth);
    var positionx = parseInt(perx * (this.big_img.offsetWidth - this.big_wrapper.offsetWidth));
    var pery = y / (this.small_wrapper.offsetHeight - this.cube.offsetHeight);
    var positiony = parseInt(pery * (this.big_img.offsetHeight - this.big_wrapper.offsetHeight));    
    return {
        x : positionx,
        y : positiony
    }
}

//改变下边小图片边框
Magnify.prototype.changeImg = function(evt,ele){
    // console.log(1);
    for(var i = 0 , btn ; btn = this.img_box[ i ++ ];){
        classNameRemove(btn , "active")
        this.changeSamllImg(btn,evt);
    }
    ele.className += " active";
    
    

}

//移除类名
function classNameRemove(ele,classname){
    return ele.className = ele.className.replace(new RegExp("\S?" + classname) , "");
}

//选择器
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

//绝对位置
function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
        return position = {
            left : dom.offsetLeft + pos.left,
            top : dom.offsetTop + pos.top
        }
    }
}

//事件委托
function delegation(handleClick , selector){
    return function(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var _target = target;
        var count = 0;
        while(true && count ++ < 100){
            if(_target === null || _target === this){
                break;
            }else{
                targetFamily.push(_target);
                _target = _target.parentNode;
            }           
        }
        for(var i = 0 , ele ; ele = eleList[ i ++ ];){
            if(targetFamily.lenght === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                handleClick.call(ele,e,ele);
                break;
            }
        }
    }
}


