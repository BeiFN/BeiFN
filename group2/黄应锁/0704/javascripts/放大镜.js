 function Magnifier(){
     this.small_wrapper = $(".small-img");
     this.small_img = $(".small-img img");
     this.big_wrapper = $(".big-img");
     this.cube = $(".cube");
     this.big_img = $(".big-img img");
     this.img_btns = $(".img-btn");
     this.img_box = $(".img-box");
     this.init();
 }

 Magnifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter",this.showCube.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hiddenCube.bind(this));
    this.small_wrapper.addEventListener("mousemove",this.handlerCubeMove.bind(this));
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.img_btns.addEventListener("click", delegation(this.changeImg.bind(this),".img-box"));
    this.cube_size = getSize(this.cube);
    this.small_wrapper_size = getSize(this.small_wrapper);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.big_img_size = getSize(this.big_img);

    this.list  = [
        {
            small_img_src:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            big_img_src:"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
            small_img_src:"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            big_img_src :"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        }
    ]
      
}

Magnifier.prototype.changeImg = function(evt,ele,index){
    for(var i = 0 , btn; btn = this.img_box[i++]; ){
            removeClassName(btn,"active");
        }
    ele.className += " active";
    this.changContent(index);
}

Magnifier.prototype.changContent = function(index){
     this.small_img.src = this.list[index].small_img_src;
     this.cube.style.backgroundImage = "url("+this.list[index].small_img_src +")";
     this.big_img.src = this.list[index].big_img_src;
}

Magnifier.prototype.showCube = function(){
    
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";
    this.small_img.style.opacity = 0.3;
}
Magnifier.prototype.hiddenCube = function(){
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";
    this.small_img.style.opacity = 1;
}
Magnifier.prototype.handlerCubeMove = function(evt){
    var e = evt || event ;
    var x = e.pageX - this.small_wrapper_position.left - this.cube_size.width/2 ; 
    var y = e.pageY - this.small_wrapper_position.top - this.cube_size.height/2 ; 
    var cube_position = this.boundary(x,y);
    var big_img_position = this.getBigPosition(x,y);
    this.move(cube_position,big_img_position);
}

Magnifier.prototype.move = function(cube_position,big_img_position){
    this.cube.style.left = cube_position.x + "px";
    this.cube.style.top  = cube_position.y + "px";
    this.cube.style.backgroundPosition = -cube_position.x +"px " + -cube_position.y + "px";

    this.big_img.style.left = big_img_position.x + "px";
    this.big_img.style.top = big_img_position.y + "px";

}
Magnifier.prototype.boundary = function(x,y){
    x = x < 0 ? 0 : x;
    var maxX = this.small_wrapper_size.width - this.cube_size.width;
    x = x > maxX ? maxX : x;
    y = y < 0 ? 0 :y;
    var maxY = this.small_wrapper_size.height - this.cube_size.height;
    y = y > maxY ? maxY : y;
    return {
        x : x,
        y : y,
    }
}

Magnifier.prototype.getBigPosition =function(x,y){
    var prop_x = x/(this.small_wrapper_size.width - this.cube_size.width);
    var big_img_x =parseInt(prop_x *(this.big_wrapper_size.width - this.big_img_size.width));
    var prop_y = y/(this.small_wrapper_size.height - this.cube_size.height);
    var big_img_y =parseInt(prop_y *(this.big_wrapper_size.height - this.big_img_size.height));
    return {
        x : big_img_x,
        y : big_img_y,
    }
}
function getAbsPosition(dom){
    var position  = {
        left:dom.offsetLeft,
        top:dom.offsetTop,
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left:dom.offsetLeft + pos.left,
            top:dom.offsetTop + pos.top,
        }
    }
}

function getSize(dom){
    return {
        width : parseInt( getComputedStyle(dom)["width"] ),
        height : parseInt( getComputedStyle(dom)["height"] ) 
    }
}
function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?" + className),"");
}

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function delegation( handlerClick , selector ){
    return function(evt){
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var eleList = this.querySelectorAll(selector);
          var targetFamily = [];
          var _tempTarget = target;
          var count = 0;
          while(true && count ++ < 100){
                if(_tempTarget === this || _tempTarget === null){
                      break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
          }
          for(var i = 0 , ele ; ele = eleList[i++]; ){
                if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                      handlerClick.call(ele , e, ele,i-1);
                      break;
                }
          }
    }
}

new Magnifier();