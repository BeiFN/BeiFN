class Magnifier{
    constructor(){
        this.small_wrapper   = $(".small-img");
        this.small_img       = $(".small-img img");
        this.small_cube      = $(".cube");
        this.img_btn_wrapper = $(".img-btn");
        this.img_btns = this.img_btn_wrapper.children;
        // this.img_btn_list = Array.from(this.img_btns);
        this.img_btn_list = [].slice.call(this.img_btns);
        // 大图部分;
        this.big_wrapper   = $(".big-img");
        this.big_img       = $(".big-img img");
        // 获取几个值;
        this.list = [{
            srcS: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            srcB: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },
            {
                srcS: "https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                srcB: "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
        ];

        this.small_wrapper_position = getAbsPosition(this.small_wrapper);
        this.small_cube_size        = getSize(this.small_cube);
        this.small_wrapper_size     = getSize(this.small_wrapper);
        this.big_img_size           = getSize(this.big_img);
        this.big_wrapper_size       = getSize(this.big_wrapper);
        this.init();
     }
    init(){
        this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
        this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
        this.small_wrapper.addEventListener("mousemove" , this.handlerMove.bind(this));
        this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImg.bind(this) , ".img-box"));
    }
    //改变图片
    changeImg(evt, ele){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        for (var i = 0, btn; btn = this.img_btns[i++];) {
            removeClassName(btn, "active");
        }
        ele.className += " active";
    
        var index = this.img_btn_list.indexOf(target.parentNode);
        this.small_img.src = this.list[index].srcS;
        this.small_cube.style.backgroundImage = "url(" + this.small_img.src + ")";
        this.big_img.src = this.list[index].srcB;
    }

    //方块与大图显示
    show(){
        this.small_cube.style.display  = "block";
        this.big_wrapper.style.display = "block";
        this.small_img.style.opacity = 0.3;
    }
     //方块与大图隐藏
    hide(){
        this.small_cube.style.display  = "none";
        this.big_wrapper.style.display = "none";
        this.small_img.style.opacity = 1;
    }
    move(cube_position,big_img_position){
        this.small_cube.style.left = cube_position.x + "px";
        this.small_cube.style.top  = cube_position.y + "px";
    
        this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";

        this.big_img.style.left = -big_img_position.x + "px";
        this.big_img.style.top  = -big_img_position.y + "px";
    }
    handlerMove(evt){
        var e = evt || window.event;
        var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
        var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;
        var cube_position    = this.boundary(x,y);
        var big_img_position = this.getBigPosition(x,y);
        this.move(cube_position,big_img_position)
    }
    //边界
    boundary(x,y){
    // 计算x,y的值;
        // x最小值
        x = x <= 0 ? 0 : x;
        // x最大值
        this.maxX = this.small_wrapper_size.width - this.small_cube_size.width
        x = x >= this.maxX ? this.maxX : x;

        y = y <= 0 ? 0 : y;
        this.maxY = this.small_wrapper_size.height - this.small_cube_size.height ;
        y = y >= this.maxY ? this.maxY : y;

        return {
            x : x,
            y : y
        }
    }
}


// 根据比例计算大图位置;
    Magnifier.prototype.getBigPosition = function(x,y){
        var propX = x / (this.small_wrapper_size.width - this.small_cube_size.width);
        var big_img_x = parseInt(propX * this.maxX);
        var propY = y / (this.small_wrapper_size.height - this.small_cube_size.height);
        var big_img_y = parseInt(propY * this.maxY );
        return {
            x : big_img_x,
            y : big_img_y
        }
    };

function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top  : dom.offsetTop
    };
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
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
                handlerClick.call(ele , e , ele);
                break;
            }
        }
    }
}

function removeClassName(dom , className){
    // var classString = dom.className;
    // var classReg = new RegExp("\S?"+className);
    // classString = classString.replace(classReg,"");
    // dom.className = classString;
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}


new Magnifier();



