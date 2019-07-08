class Magnifier{
    constructor(){
        this.small_img   = document.querySelector(".small-img");
        this.small_show  = document.querySelector(".small-img img")
        this.cube        = document.querySelector(".cube");
        this.big_img     = document.querySelector(".big-img");
        this.bigImg_show = document.querySelector(".big-img img");
        this.img_botton  = document.querySelector(".img-btn");
        this.img_btns    = this.img_botton.children;
        this.list = [
            {//图片的地址不正确
                  small_pic : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
                  cube_pic  : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
                  big_pic   : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            {
                  small_pic : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
                  cube_pic  : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
                  big_pic   : "https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            }
            
      ];
        this.small_img.addEventListener("mouseenter" , this.show.bind(this));
        this.small_img.addEventListener("mouseleave" , this.hide.bind(this));
        this.small_img.addEventListener("mousemove"  , this.hanlderMousemove.bind(this));//计算
        this.img_botton.addEventListener("click",Magnifier.delegation(this.changeImg.bind(this),".img-box"));
    }
    show(){
        this.cube.style.display    = "block";
        this.big_img.style.display = "block";
        this.small_show.style.opacity = "0.3";
    }
    changeImg(evt,ele){
        var e = evt || window.event;
        var index = 0;
        for(var i = 0 , item ; item = this.img_btns[i++] ; ){
            Magnifier.removeClassName(ele,"active");
            if(ele == this.img_btns[i]){
                index = i ;
            }
        }
        ele.className += "active";
        this.small_show.src = this.list[index].small_pic; 
        this.cube.style.backgroundImage = "url("+this.list[index].cube_pic+")";
        this.bigImg_show.src = "url("+this.list[index].big_pic+")";
    }
    hide(){
        this.cube.style.display    = "none";
        this.big_img.style.display = "none";
        this.small_show.style.opacity = "1";
    }
    move(cube_position){
        this.cube.style.left = cube_position.x + "px";
        this.cube.style.top  = cube_position.y + "px";
        this.cube.style.backgroundPosition = -cube_position.x +"px"+" "+ -cube_position.y + "px";
    }
    hanlderMousemove(evt){
        var e = evt || window.event;
        // var x = e.offsetX - this.cube.offsetWidth  / 2;
        // var y = e.offsetY - this.cube.offsetHeight / 2;//不行，有bug。解决方法是使用遮罩层或换一种位置获取
        var x = e.clientX - this.cube.offsetWidth  ;
        var y = e.clientY - this.cube.offsetHeight / 2;
        var cube_position = this.boundary(x,y);
        var img_position  = this.proportion(cube_position.x,cube_position.y);
        this.move(cube_position);
        this.BigShow(img_position);
    }
    boundary(position_x,position_y){
        if(position_x <= 0){
            position_x = 0;
        }
        if(position_x >= (this.small_img.offsetWidth - this.cube.offsetWidth)){
            position_x = this.small_img.offsetWidth - this.cube.offsetWidth;
        }
        if(position_y <= 0){
            position_y = 0;
        }
        if(position_y >= (this.small_img.offsetHeight - this.cube.offsetHeight)){
            position_y = this.small_img.offsetHeight - this.cube.offsetHeight;
        }
        return {
            x : position_x ,
            y : position_y
        } 
    }
    proportion(x,y){
        var propX = x / (this.small_img.offsetWidth  - this.cube.offsetWidth);
        var big_img_x = parseInt(propX * (this.bigImg_show.offsetWidth - this.big_img.offsetWidth));
        var propY = y / (this.small_img.offsetHeight - this.cube.offsetHeight);
        var big_img_y = parseInt(propY * (this.bigImg_show.offsetHeight - this.big_img.offsetHeight));
        return {
            X : big_img_x,
            Y : big_img_y
        }
    }
    BigShow(position){
        this.bigImg_show.style.left = - position.X + "px";
        this.bigImg_show.style.top  = - position.Y + "px";
    }
    static delegation(handerClick , selector){
        return function(evt){
            var eleList = this.querySelectorAll(selector);
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var targetFamily = [];
            var _temp = target;
            var count = 0;
            while(true && count++ < 100){
                if(_temp === this){
                    break;
                }
                targetFamily.push(_temp)
                _temp = _temp.parentNode
            }
            for(var i = 0 , ele ; ele = eleList[i++]; ){
                if( targetFamily.length === 1 ? (target === ele) : (targetFamily.indexOf(ele) !== -1) ){
                    handerClick.call(ele,e,ele);
                    break;
                }
            }
        }
    }
    static removeClassName(dom,className){
        return dom.className = dom.className.replace(new RegExp("\S?"+className), "");
    }
}
new Magnifier();