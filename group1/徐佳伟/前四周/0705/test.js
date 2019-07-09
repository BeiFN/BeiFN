
function Magnifier(){
    this.small_cube    = $(".cube");
    this.small_wrapper = $(".small-img");
    this.small_img     = $(".small-img img");
    this.big_cube      = $(".big-img");
    this.big_img       = $(".big-img img");
    this.img_btn       = $(".img-btn");
    this.img_boxs       = $(".img-box");
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

    //获取几个值
    this.small_wrapper_position = getPosition(this.small_wrapper);
    this.small_cube_size = getSize(this.small_cube);
    this.big_img_size  = getSize(this.big_img);
    this.big_wrapper_size = getSize(this.big_cube);
    this.init();
}

Magnifier.prototype.init = function(){
    this.small_wrapper.addEventListener("mouseenter",this.handlerMouseOver.bind(this));
    this.small_wrapper.addEventListener("mouseleave",this.hanlderMouseOut.bind(this));
    this.small_wrapper.addEventListener("mousemove" ,this.handlerMouseMove.bind(this));

    // this.img_btn.addEventListener("mouseenter",this.handlerMouseOverBtn.bind(this));
    this.img_btn.addEventListener("click",delegation(this.handlerClick.bind(this) , ".img-box"));
}
//点击小框框切换图片
Magnifier.prototype.handlerClick = function(evt,ele){
    for(var i = 0 , imgBtn ; imgBtn = this.img_boxs[i]; i ++){
        removeClassName(imgBtn,"active");          
    }      
    ele.className += " active";
    
    for(var j = 0 ; j < this.list.length; j++){  
        //ele下就一个子元素img
        if(this.list[j].url === ele.children[0].src){
            // console.log(this.list[j].id);
            this.changeImg(this.list[j].id);
        }
    }
}
//更换放大镜图片
Magnifier.prototype.changeImg = function(id){
    var listUrl = "" ;
    for(var i = 0 ; i < this.list.length ; i++){
        if(this.list[i].id === id)
            listUrl = this.list[i].url;
    }
    this.small_img.src = listUrl ;
    this.big_img.src = listUrl;
    this.small_cube.style.backgroundImage = "url(" +listUrl + ")";
}
//放大镜移动
Magnifier.prototype.handlerMouseMove = function(evt){
    var e = evt || window.event;
    var x = e.pageX - this.small_wrapper_position.left - this.small_cube.offsetWidth/2;
    var y = e.pageY - this.small_wrapper_position.top  - this.small_cube.offsetHeight/2;
    //边距界限
    var cube_position    = this.boundary(x,y);
    var big_img_position = this.getBigPosition(x,y);
    this.move(cube_position,big_img_position);
}
//获取大盒子应该移动多少距离
Magnifier.prototype.getBigPosition = function(x,y){
    var porpx = x/(this.small_wrapper.offsetWidth  - this.small_cube_size.width );
    var porpy = y/(this.small_wrapper.offsetHeight - this.small_cube_size.height);

    var big_img_x =parseInt (porpx * (this.big_img_size.width  - this.big_wrapper_size.width));
    var big_img_y =parseInt (porpy * (this.big_img_size.height - this.big_wrapper_size.height));
    return {
        x : big_img_x,
        y : big_img_y
    }
}
//盒子的边界
Magnifier.prototype.boundary = function(x,y){
    //最小值
    x = x < 0 ? 0 : x;
    y = y < 0 ? 0 : y;
    //最大值
    var maxX = this.small_wrapper.offsetWidth  - this.small_cube_size.width;
    var maxY = this.small_wrapper.offsetHeight - this.small_cube_size.height;
    x = x >  maxX ? maxX : x;
    y = y >  maxY ? maxY : y;
    return {
        x : x,
        y : y
    }
}
//盒子移动
Magnifier.prototype.move = function(cube_position,big_img_position){
    this.small_cube.style.left = cube_position.x + "px";
    this.small_cube.style.top  = cube_position.y + "px";

    this.big_img.style.left = - big_img_position.x + "px";
    this.big_img.style.top  = - big_img_position.y + "px";

    this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
}
//移入
Magnifier.prototype.handlerMouseOver = function(){
    this.small_cube.style.display = "block";
    this.big_cube.style.display   = "block";

    this.small_img.style.opacity = 0.3;
}
//移出
Magnifier.prototype.hanlderMouseOut = function(){
    this.small_cube.style.display = "none";
    this.big_cube.style.display   = "none";

    this.small_img.style.opacity = 1;
}



    function $ (selector){
        var res = null;
        return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
    }

    function getSize(dom){
        return {
            width  : parseInt(getComputedStyle(dom)["width" ]),
            height : parseInt(getComputedStyle(dom)["height"])
        }
    }

    function getPosition(dom){
        var position = {
            left : dom.offsetLeft,
            top  : dom.offsetTop
        }
        if(dom.offsetParent === document.body){
            return position;
        }else{
            var pos = getPosition(dom.offsetParent);
            return {
                left : dom.offsetLeft + pos.left,
                top  : dom.offsetTop  + pos.top
            }
        }
    }

    function removeClassName(dom,className){
        return dom.className = dom.className.replace(new RegExp("\S?" + className) , "");
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

new Magnifier();
