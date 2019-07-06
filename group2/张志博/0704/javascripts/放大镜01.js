function Manifier(){
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.small_cube    = $(".cube");

    //大图
    this.big_wrapper   = $(".big-img");
    this.big_img       = $(".big-img img");




    this.init();
}


Manifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove" , this.handlerMousemove.bind(this));



    //获取值
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.small_cube_size        = getSize(this.small_cube);
    this.small_wrapper_size     = getSize(this.small_wrapper);
    this.big_img_size           = getSize(this.big_img);
    this.big_wrapper_size       = getSize(this.big_wrapper);

}

Manifier.prototype.show = function(){
    this.small_cube.style.display = "block";
    this.big_wrapper.style.display = "block";
}


Manifier.prototype.hide = function(){
    this.small_cube.style.display = "none";
    this.big_wrapper.style.display = "none";
}


Manifier.prototype.move = function(cube_position , big_img_position){
    this.small_cube.style.left = cube_position.x + "px";
    this.small_cube.style.top  = cube_position.y + "px";


    this.big_img.style.left = -big_img_position.x + "px";
    this.big_img.style.top  = -big_img_position.y + "px";
}


Manifier.prototype.handlerMousemove = function(evt){
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width/2;
    var y = e.pageY - this.small_wrapper_position.top - this.small_cube_size.height / 2;

    var cube_position = this.boundary(x,y);

    var big_img_position = this.getBigPosition(x,y);
    this.move(cube_position , big_img_position);

}




//边界检测

Manifier.prototype.boundary = function(x,y){
//     if(x <= 0){
//         x = 0;
//     }
//     if(x >)
// }
    x = x <= 0 ? 0 : x;
    var maxX = this.small_wrapper_size.width - this.small_cube_size.width;

    x = x >= maxX ? maxX : x;

    y = y <= 0 ? 0 : y;
    var maxY = this.small_wrapper_size.height - this.small_cube_size.height;


    y =  y >= maxX ? maxY : y ;

    return {
        x : x,
        y : y
    }
  
}


//根据比例计算大图位置
Manifier.prototype.getBigPosition = function(x,y){
    var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width)
    var big_img_x = parseInt( propx * (this.big_img_size.width - this.big_wrapper_size.width));
    var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height)
    var big_img_y = parseInt( propx * (this.big_img_size.height - this.big_wrapper_size.height));
    

    return {
        x : big_img_x,
        y : big_img_y
    }

}



function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent)
        return {
            left : dom.offsetLeft + pos.left,
            top  : dom.offsetTop  + pos.top
        }
    }
}

function getSize(dom){
    return{
        width : parseInt( getComputedStyle(dom)["width"]),
        height : parseInt( getComputedStyle(dom)["height"])
    }
}

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

new Manifier();
