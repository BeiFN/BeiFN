function Magnifier(){
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.cube          = $(".cube");
    this.big_wrapper   = $(".big-img");
    this.big_img       = $(".big-img img");
    this.img_btn       = $(".img-btn");

    // console.log(this.cube);
    this.init();
}

Magnifier.prototype.init = function(){
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.cube_size = getSize(this.cube);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.big_img_size = getSize(this.big_img);

    this.picList = {
        iphone : {
            small : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            big   : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        xiaodu : {
            small: "https://img14.360buyimg.com/n1/s450x450_jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg",
            big: "https://img14.360buyimg.com/n0/jfs/t1/31784/25/9843/215961/5caabb7cE1798332d/d1fa17bc9f379ad1.jpg"
        }
    }

    this.maxX = (this.small_wrapper_size.width - this.cube_size.width );
    this.maxY = (this.small_wrapper_size.height - this.cube_size.height );


    this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove" , this.handlerMousemove.bind(this));
    this.img_btn.addEventListener("click" , this.handerClick.bind(this))
}

Magnifier.prototype.show = function(){
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";

    this.small_img.style.opacity = ".3";
}

Magnifier.prototype.hide = function(){
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";

    this.small_img.style.opacity = "1";
}

Magnifier.prototype.handlerMousemove = function(evt){
    var e = evt || event;

    x = e.pageX - this.small_wrapper_position.left - this.cube_size.width/2;
    y = e.pageY - this.small_wrapper_position.top - this.cube_size.height/2;

    this.cube_position = this.boundary(x , y);
    this.big_position  = this.getBigPosition(x , y);

    this.move(this.cube_position , this.big_position , this.cube_background_position);
}

Magnifier.prototype.getBigPosition = function(x , y){
    var prop_x = this.cube_position.x / this.maxX;
    var prop_y = this.cube_position.y / this.maxY;

    var big_position_x = (this.big_img_size.width - this.big_wrapper_size.width) * prop_x;
    var big_position_y = (this.big_img_size.height - this.big_wrapper_size.height) * prop_y;
    
    return {
        x : big_position_x,
        y : big_position_y
    }
}

Magnifier.prototype.boundary = function(x,y){
    x = x <= 0 ? 0 : x;
    x = x >=  this.maxX ? this.maxX : x;
    y = y <= 0 ? 0 : y;
    y = y >= this.maxY ? this.maxY : y;
    
    return {
        x : x,
        y : y
    }
}

Magnifier.prototype.move = function(cube_position , big_position , cube_background_position){
    this.cube.style.left = cube_position.x + "px";
    // console.log(this.cube_position.left);
    this.cube.style.top = cube_position.y + "px";

    this.big_img.style.left = -big_position.x + "px";
    this.big_img.style.top = -big_position.y + "px";

    this.cube.style.backgroundPosition = -this.cube_position.x + "px "+ -cube_position.y + "px";
}

Magnifier.prototype.handerClick = function(evt){
    var e = evt || event;
    var target = e.target || e.srcElement;

    this.clearBtnClassName();

    for(var i=0,btn; btn = this.img_btn.children[i++];){
        if(target.parentNode === btn){
            this.changePic(btn);
            btn.className += " active";
        }
    }

    // console.log(this.img_btn.children[0]);
    // console.log(target.parentNode);
}

Magnifier.prototype.changePic = function(ele){
    var img_info = ele.getAttribute("picinfo");

    this.small_img.src = this.picList[img_info].small;
    this.big_img.src   = this.picList[img_info].big;
    this.cube.style.backgroundImage = "url("+this.picList[img_info].small+")";
}

Magnifier.prototype.clearBtnClassName = function(){
    for(var i = 0 , btn ; btn = this.img_btn.children[i++];){
        btn.className = "img-box";
    }
}



function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function getAbsPosition(ele){
    var position = {
        left : ele.offsetLeft,
        top  : ele.offsetTop
    }

    if(ele.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(ele.offsetParent);
        return {
            left : ele.offsetLeft + pos.left,
            top  : ele.offsetTop  + pos.top
        }
    }
}

function getSize(dom){
    var size = {
        width : parseInt( getComputedStyle(dom)["width"] ),
        height : parseInt( getComputedStyle(dom)["height"] )
  }
    return size;
}

new Magnifier();


