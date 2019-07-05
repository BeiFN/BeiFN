/**
 * 1.元素的隐藏
 * 2.元素的移动
 */

function Magnifire(){
    //存储小图外围
    this.smallImgWrap = document.querySelector(".small-img");
    //获取小图
    this.smallImg =this.smallImgWrap.querySelector("img");
    //存储cube;
    this.smallCube    = document.querySelector(".cube");
   //存储大图外围
   this.bigImgWrap    = document.querySelector(".big-img");
   //存储大图
   this.bigImg        = document.querySelector(".big-img img");

   //获取按钮外围
   this.buttonWrape = document.querySelector(".img-btn");
   //获取按钮列表
   this.buttonImages= this.buttonWrape.children;

    //图片列表
   this.imgsArr = [
       {
           small_src :" https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
           big_src :  " https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"    
          
       },
       {
        small_src :"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        big_src :  "https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
       }
    ]





   //存储小图外围相对于body的位置
   this.smallImgWrapPos = getAbsPosition(this.smallImgWrap);
   //cube的宽高
   this.smallCubeW = parseInt(getComputedStyle(this.smallCube)["width"]);
   this.smallCubeH = parseInt(getComputedStyle(this.smallCube)["height"]);
   //小图外围的宽高
   this.smallImgWrapSize = {
       width : this.smallImgWrap.offsetWidth,
       height: this.smallImgWrap.offsetHeight
   }
   //大图的宽高
   this.bigImgSize = {
       width  :parseInt(getComputedStyle(this.bigImg)["width"]),
       height :parseInt(getComputedStyle(this.bigImg)["height"]),
   }
   //大图外围的宽高
   this.bigImgWrapSize = {
       width :parseInt(getComputedStyle(this.bigImgWrap)["width"]),
       height:parseInt(getComputedStyle(this.bigImgWrap)["height"])
   }

   //调用初始化函数
   this.inite();
    
}


//初始化函数
Magnifire.prototype.inite = function (){
   this.smallImgWrap.addEventListener("mouseenter",this.showEle.bind(this));
   this.smallImgWrap.addEventListener("mouseleave",this.hideEle.bind(this));
   this.smallImgWrap.addEventListener("mousemove",this.handlerMouseMove.bind(this));
   this.buttonWrape .addEventListener("click",delegation(this.handlerChangeImg.bind(this),".img-box"));
}

//点击图片按钮,更换对应图片
/**
 * 1.获取当前被点击按钮的下标
 * 2.根据下标切换图片
 */

//改变按钮图片
Magnifire.prototype.handlerChangeImg = function(evt,ele){

    //初始化按钮
    for(var i = 0 ,btn ; btn = this.buttonImages[i++];){
        btn.index = i-1;
        removeClassName(btn,"active");
    }
   //添加按钮的样式
    ele.className += " active";

    //根据按钮下标改变图片
    this.smallImg.src = this.imgsArr[ele.index].small_src;
    this.bigImg.src = this.imgsArr[ele.index].big_src;
    this.smallCube.style.backgroundImage = "url("+ this.imgsArr[ele.index].small_src +")";

}

//显示
Magnifire.prototype.showEle = function(){
    this.smallCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
    this.smallImg.style.opacity = 0.3;
}
//隐藏
Magnifire.prototype.hideEle = function(){
    this.smallCube.style.display = "none";
    this.bigImgWrap.style.display = "none";

    this.smallImg.style.opacity = 1;
}
//鼠标移动处理函数,解决耦合
Magnifire.prototype.handlerMouseMove = function(evt){
    var e = evt || window.event;
   
    var difX = this.smallImgWrapPos.left + this.smallCubeW/2;
    var difY = this.smallImgWrapPos.top + this.smallCubeH/2;
    var x = e.clientX - difX ;
    var y = e.clientY - difY;
    
    //边界检测之后鼠标的位置
    var mousePositon = this.boundary(x,y);
    //根据鼠标位置确定大图的移动距离
    var bigPosition = this.getBigPosition(mousePositon);
    // console.log(bigPosition);
    //调用移动函数,控制cube和大图的移动
    this.moveEle(mousePositon,bigPosition);
 
 }
//元素的移动
Magnifire.prototype.moveEle = function (mousePositon,bigPosition){
    //cube的移动
    this.smallCube.style.left = mousePositon.x + "px";
    this.smallCube.style.top  = mousePositon.y + "px";
    //cube背景的移动
    this.smallCube.style.backgroundPosition = -mousePositon.x + "px "  +  -mousePositon.y + "px";

    //大图的移动
    this.bigImg.style.left = -bigPosition.x + "px";
    this.bigImg.style.top  = -bigPosition.y + "px";

}
//边界检测
Magnifire.prototype.boundary = function(x,y){
    var borderX = this.smallImgWrapSize.width - this.smallCubeW;
    var borderY = this.smallImgWrapSize.height -this.smallCubeH;
    x <= 0 ? x= 0 : x;
    x > borderX ? x= borderX:x;
    y <= 0 ? y= 0 : y;
    y > borderY ? y = borderY:y;
    return {
        x : x,
        y : y
    }
}

//获取元素相对于body的绝对位置
function getAbsPosition (dom){

   var position = {
       left : dom.offsetLeft,
       top : dom.offsetTop,
   }

   if(dom.offsetParent === document.body){
       return position;
   }else{
       var ps = getAbsPosition(dom.offsetParent);

       return {
           left: dom.offsetLeft + ps.left,
           top : dom.offsetTop + ps.top,
       }
   }
}
//计算大图的移动距离
Magnifire.prototype.getBigPosition = function (position){
   var ratioX = position.x/(this.smallImgWrapSize.width - this.smallCubeW);
   var ratioY = position.y/(this.smallImgWrapSize.height -this.smallCubeH);
   // console.log(ratioX,ratioY)
   return{
       x: parseInt( ratioX*(this.bigImgSize.width - this.bigImgWrapSize.width)),
       y: parseInt( ratioY*(this.bigImgSize.height - this.bigImgWrapSize.height)),
   }
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


new Magnifire();