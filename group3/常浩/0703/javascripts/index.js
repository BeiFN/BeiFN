function Magnifier (){
    //取值  获取元素
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.cube          = $(".cube");

    this.big_wrapper   = $(".big-img");
    this.big_img       = $(".big-img img");

    this.img_btn_wrapper = $(".img-btn");
    this.img_btns        = this.img_btn_wrapper.children;
    //创建src列表
    this.list = [
        {
            bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            jpgsrc  : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
        {
            bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            smallsrc: "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            jpgsrc  : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }
    ]

    //  获取一些元素的相关属性 尺寸
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.cube_size              = getEleSize(this.cube);
    this.small_wrapper_size     = getEleSize(this.small_wrapper);
    this.big_img_size           = getEleSize(this.big_img);
    this.big_wrapper_size       = getEleSize(this.big_wrapper);


    //初始化函数 init
    this.init()
}
Magnifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter",this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove",this.handlerMove.bind(this));

    this.img_btn_wrapper.addEventListener("click",delegation(this.changeImg.bind(this),".img-box"))

}
//移入显示cube和右面图片 模糊效果的添加增加背景属性opacity
Magnifier.prototype.show = function(){
    this.cube.style.display = "block";
    this.big_wrapper.style.display = "block";

    this.small_img.style.opacity = 0.3  ;
}
//鼠标移出隐藏cube和右面的图片
Magnifier.prototype.hide =function(){
    this.cube.style.display = "none";
    this.big_wrapper.style.display = "none";

    this.small_img.style.opacity = 1  ;

}
//鼠标移动事件;
Magnifier.prototype.handlerMove =function(evt){
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.cube_size.width/2 ;
    var y = e.pageY - this.small_wrapper_position.top - this.cube_size.height/2;

    var cube_position = this.boundar(x,y);
    var big_img_positon = this.getBigPosition(x,y);
    this.move(cube_position,big_img_positon);
    
}
//边界检测
Magnifier.prototype.boundar = function(x,y){
    x = x <= 0 ? 0 : x;
    var maxX = this.small_wrapper_size.width - this.cube_size.width;
    x = x >= maxX ? maxX : x ;

    y = y <= 0 ? 0 : y;
    var maxY = this.small_wrapper_size.height - this.cube_size.height;
    y = y >= maxY ? maxY : y ;

    return {
        x : x,
        y : y 
    }
}
//获取big_img的位置信息
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = x/(this.small_wrapper_size.width - this.cube_size.width);
    var x     = parseInt(propx *(this.big_img_size.width - this.big_wrapper_size.width));

    var propy = y/(this.small_wrapper_size.height - this.cube_size.height);
    var y     = parseInt(propy *(this.big_img_size.height - this.big_wrapper_size.height));

    return{
        x : x,
        y : y
    }
}
//cube 移动和图片的移动    添加模糊效果让cube背景移动
Magnifier.prototype.move =function(cube_position,big_img_positon){
    this.cube.style.left     = cube_position.x + "px";
    this.cube.style.top      = cube_position.y + "px";

    this.cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

    this.big_img.style.left  = -big_img_positon.x + "px";
    this.big_img.style.top  = -big_img_positon.y + "px";


    
}
//点击切换img_btn样式
Magnifier.prototype.changeImg = function(evt,ele){
    var index = 0 ;
    for(var i = 0 , btn ; btn = this.img_btns[i++];){
        removeClassName(btn,"active");
        if(ele == this.img_btns[i]){
            index = i ;
        }
    }
    ele.className += " active";

    this.small_img.src = this.list[index].jpgsrc ;
    this.cube.style.backgroundImage = "url("+ this.list[index].jpgsrc + ")";
    this.big_img.src   = this.list[index].bigsrc;
}






new Magnifier();
//元素选择器
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}
//元素的绝对位置
function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft ,
        top : dom.offsetTop
    }
    
    if(dom.offsetParent === document.body){
        return position ;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
        return position = {
            left : dom.offsetLeft + pos.left,
            top : dom.offsetTop   + pos.top 
        }
    }
}
//元素额的大小尺寸
function getEleSize (dom){
    var eleSize = {
        width  :  parseInt(getComputedStyle(dom)["width"]),
        height :  parseInt(getComputedStyle(dom)["height"])
    }
    return eleSize;
}
//清除元素类名
function removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "");
}
//事件委托 并返回当前元素
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
                      handlerClick.call(ele , e , ele);
                      break;
                }
          }
    }
}