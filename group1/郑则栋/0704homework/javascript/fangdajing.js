function Foo(){
    this.container=document.querySelector(".container");
    this.smallWrap=document.querySelector(".small-img");
    this.smallImg=document.querySelector(".small-img img");
    this.cube=document.querySelector(".cube");
    this.bigWrap=document.querySelector(".big-img");    
    this.bigImg=document.querySelector(".big-img img");
    this.imgBtn=document.querySelector(".img-btn");
    this.img_btns=document.querySelectorAll(".img-box");
    console.log(this.img_btns);
    this.init();
    this.cube_position=findPosition(this.cube);
    this.cube_size=getSize(this.cube);
    this.smallWrap_size=getSize(this.smallWrap);
    this.bigWrap_size=getSize(this.bigWrap);
    this.bigImg_size=getSize(this.bigImg);
    //object
    this.obj={
        bigimg:   ["https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240","https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"],
        middleimg:["https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240","https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"],
        smallimg:["https://upload-images.jianshu.io/upload_images/16960494-6016305427ecad9f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240","https://upload-images.jianshu.io/upload_images/16960494-7f9040ccc609945a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"]
        
    }
}
Foo.prototype.init=function(){
    this.smallWrap.addEventListener("mouseenter",this.someAppear.bind(this));
    this.smallWrap.addEventListener("mouseleave",this.someDisappear.bind(this));
    this.smallWrap.addEventListener("mousemove",this.someCubeMove.bind(this));
    this.imgBtn.addEventListener("click",delegation(this.changeImg.bind(this) , ".img-box"));
    
}
Foo.prototype.changeImg = function(evt,ele){
    var _temp=null;
    console.log(ele);
    for(var i = 0 , btn ; btn = this.img_btns[i++];){
        if(ele===btn){
            _temp=i-1;
        }
          removeClassName(btn,"active");
    }
    this.smallImg.src=this.obj.middleimg[_temp];
    this.bigImg.src=this.obj.bigimg[_temp];
    this.cube.style.backgroundImage="url(" +this.obj.middleimg[_temp] +")";
    ele.className += " active";
}
Foo.prototype.someAppear=function(){
    this.cube.style.opacity=1;
    this.bigWrap.style.display="block";
    this.smallImg.style.opacity=0.3;
}
Foo.prototype.someDisappear=function(){
    this.cube.style.opacity=0;
    this.bigWrap.style.display="none";
    this.smallImg.style.opacity=1;

}
Foo.prototype.someCubeMove=function(eve){
    var e=eve||window.event;
    var mouseX=e.clientX;
    var mouseY=e.clientY;
    var cubeLeft=-this.cube_position.left+mouseX-this.cube_size.width/2;
    var cubeTop=-this.cube_position.top+mouseY-this.cube_size.height/2;
    var finanlPosition= this.judgePositon(cubeLeft,cubeTop);
    this.finalCubePosition(finanlPosition.x,finanlPosition.y);
    this.finalBingImgPosition(finanlPosition.x,finanlPosition.y);

}
Foo.prototype.judgePositon=function(x,y){
    x<0?x=0:"";
    x>this.smallWrap_size.width-this.cube_size.width?x=this.smallWrap_size.width-this.cube_size.width:"";
    y<0?y=0:"";
    y>this.smallWrap_size.height-this.cube_size.height?y=this.smallWrap_size.height-this.cube_size.height:"";
    return {x:x,y:y};
}
Foo.prototype.finalCubePosition=function(x,y){
    this.cube.style.left=x+"px";
    this.cube.style.top=y+"px";
    this.cube.style.backgroundPositionX = -x+"px";
    this.cube.style.backgroundPositionY = -y+"px";
}
Foo.prototype.finalBingImgPosition=function(x,y){
    var propertionX=x/(this.smallWrap_size.width-this.cube_size.width)*(this.bigImg_size.width-this.bigWrap_size.width);
    var propertionY=y/(this.smallWrap_size.height-this.cube_size.height)*(this.bigImg_size.height-this.bigWrap_size.height);
    this.bigImg.style.left=-propertionX+"px";
    this.bigImg.style.top=-propertionY+"px";
}

//findwidth
function findPosition(ele){
    var page={
        left:ele.offsetLeft,
        top:ele.offsetTop
    }
    if(ele.offsetParent===document.body){
        return page;
    }
    else{
        var pos=findPosition(ele.offsetParent);
        return {
            left :ele.offsetLeft+pos.left,
            top: ele.offsetTop+pos.top
        }
    }
}
//宽高
function getSize(dom){
    return {
          width : parseInt( getComputedStyle(dom)["width"] ),
          height : parseInt( getComputedStyle(dom)["height"] ) 
    }
}

//事件监听
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
                      handlerClick.call(ele , e,ele);
                      break;
                }
          }
    }
}
function removeClassName(dom , className){
    return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
}
new Foo();