    //获取属性、元素
class Magnifier{
    constructor(){
        this.small_wrapper   = Magnifier.$(".small-img");
        this.small_img       = Magnifier.$(".small-img img");
        this.small_cube      = Magnifier.$(".cube");
        this.big_wrapper     = Magnifier.$(".big-img");
        this.big_img         = Magnifier.$(".big-img img");
        //图片切换
        this.img_btn_wrapper = Magnifier.$(".img-btn");
        this.img_btns        = this.img_btn_wrapper.children; 


        this.list = [
            {
                src : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                
            },
            {
                src : "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                bigsrc : "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
        ]

        this.small_wrapper_position = Magnifier.getAbsPosition(this.small_wrapper);
        this.small_cube_size        = Magnifier.getSize(this.small_cube);
        this.small_wrapper_size     = Magnifier.getSize(this.small_wrapper);
        this.big_img_size           = Magnifier.getSize(this.big_img);
        this.big_wrapper_size       = Magnifier.getSize(this.big_wrapper);
        
        this.init();
}
    //初始化、绑定事件
init(){
    this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
    this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
    this.small_wrapper.addEventListener("mousemove" , this.hanlderMousemove.bind(this));
    this.img_btn_wrapper.addEventListener("click" , Magnifier.delegation(this.changeImg.bind(this) , ".img-box"))
    
}
    //鼠标滑入
show(){
    this.big_wrapper.style.display = "block";
    this.small_cube.style.display  = "block";
    this.small_img.style.opacity   = 0.3;
}
    //鼠标滑出
hide(){
    this.big_wrapper.style.display = "none";
    this.small_cube.style.display  = "none";
    this.small_img.style.opacity   = 1;
}

    //移动
move(cube_position , big_img_position){
    this.small_cube.style.left = cube_position.x + "px";
    this.small_cube.style.top  = cube_position.y + "px";

    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

    this.big_img.style.left = -big_img_position.x + "px";
    this.big_img.style.top  = -big_img_position.y + "px";
}

hanlderMousemove(evt){
    var e = evt || event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width  / 2;
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;
    var cube_position    = this.boundary(x,y);
    var big_img_position = this.getBigPosition(cube_position.x , cube_position.y);
    this.move(cube_position , big_img_position);
}
    //cube移动边界检测
boundary(x,y){
    x = x <=0 ? 0 : x;  //x最小值
    var maxX = this.small_wrapper_size.width - this.small_cube_size.width;
    x = x >= maxX ? maxX : x;
    
    y = y <=0 ? 0 : y;  //y最小值
    var maxY = this.small_wrapper_size.height - this.small_cube_size.height;
    y = y >= maxY ? maxY : y;

    return {
        x : x,
        y : y
    }
}

    //根据比例计算大图位置
getBigPosition(x,y){
    var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
    var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
    var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
    var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height));

    return {
        x : big_img_x,
        y : big_img_y
    }
}


    //选择器
static $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1? res[0] : res;
}

static getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop 
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = Magnifier.getAbsPosition(dom.offsetParent);
        return {
            left : dom.offsetLeft + pos.left,
            top  : dom.offsetTop  + pos.top
        }
    }
}

static getSize(dom){
    return {
        width : parseInt(getComputedStyle(dom)["width"]),
        height: parseInt(getComputedStyle(dom)["height"])
    }
}

    //切换小图
changeImg(evt , ele ){
    var temp = 0;
    for(var i = 0 , btn ; btn = this.img_btns[i]; i++){
        Magnifier.removeClassName(btn, "active");
        if(ele === btn){
            temp = i;
        }
        ele.removeClassName +=" active";
        this.small_img.src=this.list[temp].src;
        this.big_img.src=this.list[temp].bigsrc;
        this.small_cube.style.backgroundImage="url("+this.list[temp].src+")";
    }


}

static delegation(handlerClick , selector){
    return function(evt){
        var e = evt || event;
        var target = e.target || e.srcElement;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var _tempTarget = target;
        var count = 0;
        while(true && count ++ <100){
            if(_tempTarget === this || _tempTarget === null){
                break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }
        for(var i = 0 , ele ; ele = eleList[i++];){
            if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                handlerClick.call(ele , e , ele);
                break;
            }
        }
    }
}

static removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\S?" + className) , "");
}

}



    new Magnifier();