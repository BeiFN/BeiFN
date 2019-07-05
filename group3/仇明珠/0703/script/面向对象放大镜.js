function Magnifier(){
    this.smallWrapper=$$(".small-img");
    this.smallImg=$$(".small-img img");
    this.cube=$$(".cube");
    this.bigWrapper=$$(".big-img");
    this.bigImg=$$(".big-img img")
    this.smallWrapperPos=getAbsposition(this.smallWrapper);
    this.smallSize=getSize(this.smallWrapper);
    this.cubeSize=getSize(this.cube);
    this.bigWrapperSize=getSize(this.bigWrapper);
    this.bigImgSize=getSize(this.bigImg);
    this.imgBtn=$$(".img-btn");
    this.imgBoxs=this.imgBtn.children;
    this.imgList=[{
        smallImgScr:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        bigImgSrc:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    },{
        smallImgScr:"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        bigImgSrc:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    }]
    this.init()
}
Magnifier.prototype.init=function(){
    this.smallWrapper.addEventListener("mouseenter",this.showEle.bind(this));
    this.smallWrapper.addEventListener("mouseleave",this.hideEle.bind(this));
    this.smallWrapper.addEventListener("mousemove",this.handlerMove.bind(this));
    this.imgBtn.addEventListener("click",delegation(this.changePic.bind(this),".img-box"));
}
Magnifier.prototype.showEle=function(){
    this.cube.style.display="block";
    this.bigWrapper.style.display="block";
    this.smallImg.style.opacity=0.3;
}
Magnifier.prototype.hideEle=function(){
    this.cube.style.display="none";
    this.bigWrapper.style.display="none";
    this.smallImg.style.opacity=1;
}
Magnifier.prototype.handlerMove=function(evt){
    var e=evt||window.event;
    var x=e.pageX-this.smallWrapperPos.x-this.cubeSize.width/2;
    var y=e.pageY-this.smallWrapperPos.y-this.cubeSize.height/2;
    var cubePosition=this.boundry(x,y);
    var bigImgPosition=this.getBigImgPosition(cubePosition);
    this.moveEle(cubePosition,bigImgPosition);
}
Magnifier.prototype.boundry=function(x,y){
    x=x<=0?0:x;
    x=x>=(this.smallSize.width-this.cubeSize.width)?(this.smallSize.width-this.cubeSize.width):x;
    y=y<=0?0:y;
    y=y>=(this.smallSize.height-this.cubeSize.height)?(this.smallSize.height-this.cubeSize.height):y;
    return {
        x:x,
        y:y
    }
}
Magnifier.prototype.getBigImgPosition=function(cubePosition){
    var precX=cubePosition.x/(this.smallSize.width-this.cubeSize.width);
    var precY=cubePosition.y/(this.smallSize.height-this.cubeSize.height);
    var x=precX*(this.bigImgSize.width-this.bigWrapperSize.width);
    var y=precY*(this.bigImgSize.height-this.bigWrapperSize.height)
    return {
        x:x,
        y:y
    }
}
Magnifier.prototype.moveEle=function(cubePosition,bigImgPosition){
    this.cube.style.left=cubePosition.x+"px";
    this.cube.style.top=cubePosition.y+"px";
    this.bigImg.style.left=-bigImgPosition.x+"px";
    this.bigImg.style.top=-bigImgPosition.y+"px";
    this.cube.style.backgroundPosition=-cubePosition.x+"px "+-cubePosition.y+"px";
}
Magnifier.prototype.changePic=function(evt,ele,index){
    for(var i=0,btn;btn=this.imgBoxs[i++];){
        removeClassName(btn," active");
    }
    ele.className+=" active";
    this.smallImg.src=this.imgList[index].smallImgScr;
    this.cube.style.backgroundImage= 'url(' +this.imgList[index].smallImgScr+ ')';
    this.bigImg.src=this.imgList[index].bigImgSrc;
}
function $$(selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length==1?ele[0]:ele;
}
function getAbsposition(dom){
    var position={
        x:dom.offsetLeft,
        y:dom.offsetTop,
    }
    if(dom.offsetParent===document.body){
        return position;
    }else{
        var pos=getAbsposition(dom.offsetParent);
        return {
            x:dom.offsetLeft+pos.x,
            y:dom.offsetTop+pos.y
        }
    }
}
function getSize(dom){
    return {
        width:parseInt(getComputedStyle(dom).width),
        height:parseInt(getComputedStyle(dom).height)
    }
}
function delegation( callback , selector ){
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
                      callback.call(ele , e , ele,i-1);
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

