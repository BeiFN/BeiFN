function Magnifier(){
    // 获取属性
    //小图片外包围
    this.small_img_wrapper = $(".small-img");
    //小图片
    this.small_img = $(".small-img img");
    //移动块
    this.small_cube = $(".cube");
    //大图片外包围
    this.big_img_wrapper = $(".big-img");
    //大图片
    this.big_img = $(".big-img img");
    //图片按钮外包围
    this.img_btn_wrapper = $(".img-btn");
    //所有图片按钮
    this.img_btns = this.img_btn_wrapper.children;

    //图片地址
    this.img_src_list = [
        {
            small_img_src : "https://source-feelunique.azoyacdn.com/media/catalog/product/n/y/NYX_Professional_Makeup_Cosmic_Metals_Shadow_Palette_1497362051.png?imageMogr2/thumbnail/438x438/extent/438x438/background/d2hpdGU=",
            big_img_src : "https://source-feelunique.azoyacdn.com/media/catalog/product/n/y/NYX_Professional_Makeup_Cosmic_Metals_Shadow_Palette_1497362051.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU="
        },
        {
            small_img_src : "https://source-feelunique.azoyacdn.com/media/catalog/product/n/y/NYX_Professional_Makeup_Lingerie_Shadow_Palette_0_1497361902.png?imageMogr2/thumbnail/438x438/extent/438x438/background/d2hpdGU=",
            big_img_src : "https://source-feelunique.azoyacdn.com/media/catalog/product/n/y/NYX_Professional_Makeup_Lingerie_Shadow_Palette_0_1497361902.png?imageMogr2/thumbnail/800x800/extent/800x800/background/d2hpdGU="
        }
    ]

    // console.log(this.img_src_list[0].small_img_src);

    //小图片外包围的绝对位置
    this.small_wrapper_pos = getAbsPosition(this.small_img_wrapper);
    //移动块size
    this.cube_size = getSize(this.small_cube);
    this.small_wrapper_size = getSize(this.small_img_wrapper);
    this.big_wrapper_size = getSize(this.big_img_wrapper);
    this.big_img_size = getSize(this.big_img);
    //初始化
    this.init();
}

Magnifier.prototype.init = function(){
    //移入显示大图片外包围和移动块
    this.small_img_wrapper.addEventListener("mouseenter", this.show.bind(this));
    //移出隐藏
    this.small_img_wrapper.addEventListener("mouseleave", this.hide.bind(this));
    //操作cube
    this.small_cube.addEventListener("mousemove", this.hanlderMousemove.bind(this));
    //点击图片按钮切换图片
    this.img_btn_wrapper.addEventListener("click", delegation(this.changeImg.bind(this), ".img-box"));
}

//移入显示
Magnifier.prototype.show = function(){
    this.small_cube.style.display = "block";
    this.big_img_wrapper.style.display = "block";

    this.small_img.style.opacity = 0.3;
}
//移出隐藏
Magnifier.prototype.hide = function(){
    this.small_cube.style.display = "none";
    this.big_img_wrapper.style.display = "none";

    this.small_img.style.opacity = 1;
}

Magnifier.prototype.hanlderMousemove = function(e){
    var e = e || window.event;
    //cube坐标（要减去小图片外包围的绝对坐标，为了使鼠标处于cube的中点，要减去cube宽高的一半）
    var x = e.pageX - this.small_wrapper_pos.left - this.cube_size.width/2;
    var y = e.pageY - this.small_wrapper_pos.top - this.cube_size.height/2;
    //限定cube的边界cube
    var cub_pos = this.boundary(x, y);
    //大图片坐标
    var big_img_pos = this.bigImgPos(cub_pos.x, cub_pos.y);
    //cube移动 大图片移动
    this.move(cub_pos, big_img_pos);
}

Magnifier.prototype.move = function(cub_pos, big_img_pos){
    //cube的坐标
    this.small_cube.style.left = cub_pos.x +"px";
    this.small_cube.style.top = cub_pos.y + "px";
    //大图片的坐标
    this.big_img.style.left = -big_img_pos.big_pos_x + "px";
    this.big_img.style.top = -big_img_pos.big_pos_y + "px";

    //cube背景移动
    this.small_cube.style.backgroundPosition = -cub_pos.x +"px "+ -cub_pos.y + "px";
}

//边界检测
Magnifier.prototype.boundary = function(x, y){
    x = x<=0 ? 0: x;
    var maxX = this.small_wrapper_size.width - this.cube_size.width;
    x = x>=maxX ?  maxX : x;

    y = y<=0 ? 0: y;
    var maxY = this.small_wrapper_size.height - this.cube_size.height;
    y = y>=maxY ? maxY : y ;

    return {
        x,y
    }

}
//大图坐标
Magnifier.prototype.bigImgPos = function(x, y){
    var xx = x/(this.small_wrapper_size.width-this.cube_size.width);
    var big_pos_x = xx*(this.big_img_size.width-this.big_wrapper_size.width);
    var yy = y/(this.small_wrapper_size.height-this.cube_size.height);
    var big_pos_y = yy*(this.big_img_size.height-this.big_wrapper_size.height);
    return {
        big_pos_x,
        big_pos_y
    }
}
//切换图片
Magnifier.prototype.changeImg = function(e, ele){
    //第一个参数必定为Event，所以要把自定义参数放在第二个
    for(var i=0, btn; btn = this.img_btns[i++]; ){
        removeClassName(btn, "active");
    }
    ele.className +=" active";

    
    var index = this.getIndex(ele)-1;
    this.small_img.src = this.img_src_list[index].small_img_src;
    this.big_img.src = this.img_src_list[index].big_img_src;
    this.small_cube.style.backgroundImage = "url("+ this.img_src_list[index].small_img_src +")";

}

//获取下标
Magnifier.prototype.getIndex = function(ele){
    for(var i=0, btn; btn = this.img_btns[i++]; ){
        if(ele == btn){
            return i;
        }
    }
}

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

//获取元素的绝对位置
// function getPagePos(ele){
//     if(!ele) throw new Error("ele参数有问题，无法获取位置");
//     var _left = ele.offsetLeft;
//     var _top = ele.offsetTop;
//     while(ele.offsetParent){
//         _left += ele.offsetParent.offsetLeft;
//         _top += ele.offsetParent.offsetTop;
//     }
//     return {
//         x: _left,
//         y: _top
//     };
// }
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
    return {
          width : parseInt( getComputedStyle(dom)["width"] ),
          height : parseInt( getComputedStyle(dom)["height"] ) 
    }
}

//事件委托
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

function removeClassName(dom, className){
    return dom.className = dom.className.replace(new RegExp("\S?" + className), "");
}

new Magnifier();