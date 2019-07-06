function Magnifier(){
    //选择元素
    //小图片的选择
    this.small_wrapper=$(".small-img");
    this.small_img=$(".small-img img");
    this.small_cube=$(".cube");
    // this.img_btn_wrapper = $(".img-btn");
    // this.img_btns        = this.img_btn_wrapper.children;
    //大图片
    this.big_wrapper=$(".big-img");
    this.big_img=$(".big-img img");

    

    //获取装图片的盒子距离body的
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    //获取元素的宽高
    this.small_cube_size =getSize(this.small_cube);
    this.small_wrapper_size =getSize(this.small_wrapper);
    this.big_img_size =getSize(this.big_img);
    this.big_wrapper_size =getSize(this.big_wrapper);

    this.init();
  
};

Magnifier.prototype.init=function(){
    //绑定事件
    //鼠标移入装小图的部分，cube和装大图片显示
    this.small_wrapper.addEventListener("mouseenter",this.showEle.bind(this));
    //鼠标移出装小图的部分，cube和装大图片隐藏
    this.small_wrapper.addEventListener("mouseleave",this.hideEle.bind(this));

    this.small_wrapper.addEventListener("mousemove",this.hanlderMousemove.bind(this));

    // this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"))
}

Magnifier.prototype.showEle=function(){
    
    this.small_cube.style.display  = "block";
    this.big_wrapper.style.display = "block";

    // this.small_cube.style.opacity=0.3;
}

Magnifier.prototype.hideEle=function(){
    this.small_cube.style.display  = "none";
      this.big_wrapper.style.display = "none";

    // this.small_cube.style.opacity=1;
}


Magnifier.prototype.move=function(cube_position,big_img_position){
    this.small_cube.style.left=cube_position.x+"px";
    this.small_cube.style.top=cube_position.y+"px";
    // this.small_cube.style.backgroundPosition=-cube_position.x+"px"+-cube_position.y+"px";
    this.big_img.style.left= -big_img_position.x+"px";
    this.big_img.style.top= -big_img_position.y+"px";
    
}

Magnifier.prototype.hanlderMousemove=function(evt){
    
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;


    var cube_position    = this.boundary(x,y);
    var big_img_position = this.getBigPosition(x,y);
    this.move(cube_position,big_img_position)

}

//边界检测
Magnifier.prototype.boundary=function(x,y){
    x=x <= 0 ? 0:x;
    var MaxX=this.small_wrapper_size.width-this.small_cube_size.width;
    x= x >= MaxX ? MaxX:x;

   y= y<=0 ? 0:y;
   var MaxY=this .small_wrapper_size.height-this.small_cube_size.height;
   y = y >= MaxY ? MaxY :y;

   return{
       x : x,
       y : y
   }
}


//根据小图位置计算大图位置，主要是比例
Magnifier.prototype.getBigPosition=function(x,y){
    var propX = x/(this.small_wrapper_size.width - this.small_cube_size.width);
    var big_imgX = parseInt(propX*(this.big_img_size.width-this.big_wrapper_size.width));
    var propY = y/(this.small_wrapper_size.height - this.small_cube_size.height);
    var big_imgY = parseInt(propY*(this.big_img_size.height-this.big_wrapper_size.height));
    return{
        x:big_imgX,
        y:big_imgY
    }

}

//获取元素的绝对位置
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
        width:parseInt(getComputedStyle(dom)["width"]),
        height:parseInt(getComputedStyle(dom)["height"])
    }
}







function $(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length===1?ele[0]:ele;
}




new Magnifier();