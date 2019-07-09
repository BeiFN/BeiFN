function Magnifier(){
    //小盒子属性
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.small_cube    = $(".cube");
    //大盒子属性
    this.big_wrapper   = $(".big-img");
    this.big_img       = $(".big-img img");
    //小按钮
    this.img_btn  = $(".img-btn");
    this.img_boxs = $(".img-box");
    //变量属性
    this.small_wrapper_position = getAbsPosition(this.small_wrapper);
    this.small_cube_size = getSize(this.small_cube);
    this.small_wrapper_size = getSize(this.small_wrapper);

    this.big_img_size = getSize(this.big_img);
    this.big_wrapper_size = getSize(this.big_wrapper);
    this.list = [
        {
            url : "https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            id  : 1
        },
        {
            url : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            id  : 2
        }
    ]
    //初始化
    this.init();
}
//初始化分工
Magnifier.prototype.init = function(){
    //监听
    this.small_wrapper.addEventListener("mouseenter",this.handlerMouseOver.bind(this));
    this.small_wrapper.addEventListener("mousemove" ,this.hanlderMousemove.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.handlerMouseOut.bind(this) );

    this.img_btn.addEventListener("click",delegation(this.handlerClick.bind(this),".img-box"));
}
//点击小图片
Magnifier.prototype.handlerClick = function(evt,ele){
    for (var i = 0 ,box ; box = this.img_boxs[i++];){
        removeClassName(box,"active");
    }
    ele.className += " active";
    this.changeImage(ele);
}
//实现图片成功切换
Magnifier.prototype.changeImage = function(ele){
    for(var i = 0 ; i  < this.list.length ; i++){
        if(this.list[i].url === ele.children[0].src){
            this.small_img.src = this.list[i].url;
            this.big_img.src   = this.list[i].url;
            this.small_cube.style.backgroundImage = "url(" + this.list[i].url + ")";
        }
    }
}
//鼠标在盒子所发事件的业务处理函数
Magnifier.prototype.hanlderMousemove = function(evt){
    var e = evt || window.event;
    //遮罩层的定位是根据小盒子来的切记！滚啊
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width /2;
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height/2;
   
    var position_cube = this.boundary(x,y);
    //自行优化
    var position_big  = this.getBigPosition(position_cube.x,position_cube.y);   
    this.Move(position_cube,position_big);
}

//大盒子按比例移动
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = x / (this.small_wrapper_size.width  - this.small_cube_size.width);
    var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
    return {
        x : parseInt((this.big_img_size.width  - this.big_wrapper_size.width)*propx ),
        y : parseInt((this.big_img_size.height - this.big_wrapper_size.height)*propy)
    }
}
//设置小盒子遮罩层的边界
Magnifier.prototype.boundary = function(x,y){
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;

    var maxX = this.small_wrapper_size.width  - this.small_cube_size.width;
    var maxY = this.small_wrapper_size.height - this.small_cube_size.height;

    x = x > maxX ? maxX : x;
    y = y> maxY ? maxY : y;
    return {
        x : x,
        y : y
    }
}
//鼠标单纯移动
Magnifier.prototype.Move = function(position_cube,position_big){
    this.small_cube.style.left = position_cube.x + "px";
    this.small_cube.style.top  = position_cube.y + "px";

    this.big_img.style.left = - position_big.x + "px";
    this.big_img.style.top  = - position_big.y + "px";

    this.small_cube.style.backgroundPosition = -position_cube.x +"px "+ -position_cube.y + "px";
}
//鼠标移入小盒子
Magnifier.prototype.handlerMouseOver = function(){
    this.small_cube.style.display = "block";
    this.big_wrapper.style.display = "block";

    this.small_img.style.opacity = 0.3;
}
//鼠标离开小盒子
Magnifier.prototype.handlerMouseOut = function(){
    this.small_cube.style.display = "none";
    this.big_wrapper.style.display = "none";

    this.small_img.style.opacity = 1;
}

new Magnifier();
//选择器封装
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}
//获取offset
function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
        return position;
    }
    else{
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left : pos.left + dom.offsetLeft,
            top  : pos.top  + dom.offsetTop
        }
    }
}

//获取元素本身的宽高
function getSize(dom){
    return {
        "width"  : parseInt(getComputedStyle(dom)["width"] ),
        "height" : parseInt(getComputedStyle(dom)["height"])
    };
}
//删除class名
function removeClassName(dom,className){
    return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
}
//获取所有的元素
    
function delegation( handlerClick , selector ){
    return function(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var tarFamily = [];
        var eleList = document.querySelectorAll(selector);
        var _temp = target;
        while(true){
            if(_temp === this || _temp === null){
                break;
            }
            tarFamily.push(_temp);
            _temp = _temp.parentNode;
        }
        for (var i = 0 , ele ; ele = eleList[i++];){
            if(tarFamily.length === 1 ? ele === tarFamily[0] : tarFamily.indexOf(ele) !== -1){
                //ele就是当前指向的元素
                handlerClick.call(ele,e,ele);
            }
        }
    }
}