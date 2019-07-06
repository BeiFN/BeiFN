class Utils{
    static $$(selector){
        let ele=null;
        return (ele=document.querySelectorAll(selector)).length==1?ele[0]:ele;
    }
    static getAbsposition(dom){
        let position={
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
    static getSize(dom){
        return {
            width:parseInt(getComputedStyle(dom).width),
            height:parseInt(getComputedStyle(dom).height)
        }
    }
    static delegation( callback , selector ){
        return function(evt){
              let e = evt || window.event;
              let target = e.target || e.srcElement;
              let eleList = this.querySelectorAll(selector);
              let targetFamily = [];
              let _tempTarget = target;
              let count = 0;
              while(true && count ++ < 100){
                    if(_tempTarget === this || _tempTarget === null){
                          break;
                    }
                    targetFamily.push(_tempTarget);
                    _tempTarget = _tempTarget.parentNode;
              }
              for(let i = 0 , ele ; ele = eleList[i++]; ){
                    if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                          callback.call(ele , e , ele,i-1);
                          break;
                    }
              }
        }
    }
    static  removeClassName(dom , className){
        return dom.className = dom.className.replace(new RegExp("\S?"+className) , "" );
    }

}
let{$$,getAbsposition,getSize,delegation,removeClassName}=Utils;
class Magnifier{
    constructor({smallWrapper=".small-img",smallImg=".small-img img",cube=".cube",bigWrapper=".big-img",bigImg=".big-img img",imgBtn=".img-btn"}={}){
        this.smallWrapper=$$(smallWrapper);
        this.smallImg=$$(smallImg);
        this.cube=$$(cube);
        this.bigWrapper=$$(bigWrapper);
        this.bigImg=$$(bigImg)
        this.smallWrapperPos=getAbsposition(this.smallWrapper);
        this.smallSize=getSize(this.smallWrapper);
        this.cubeSize=getSize(this.cube);
        this.bigWrapperSize=getSize(this.bigWrapper);
        this.bigImgSize=getSize(this.bigImg);
        this.imgBtn=$$(imgBtn);
        this.imgBoxs=this.imgBtn.children;
        this.imgList=[{
            smallImgScr:"https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigImgSrc:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        },{
            smallImgScr:"https://upload-images.jianshu.io/upload_images/16960494-5e81b49dd994d9cc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            bigImgSrc:"https://upload-images.jianshu.io/upload_images/16960494-82fa6d1cbc1be296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        }]
       this.init();
    }
    init(){
        this.smallWrapper.addEventListener("mouseenter",this.showEle.bind(this));
        this.smallWrapper.addEventListener("mouseleave",this.hideEle.bind(this));
        this.smallWrapper.addEventListener("mousemove",this.handlerMove.bind(this));
        this.imgBtn.addEventListener("click",delegation(this.changePic.bind(this),".img-box"));
    }
    showEle(){
        this.cube.style.display = "block";
        this.bigWrapper.style.display = "block";
        this.smallImg.style.opacity = 0.3;
    }
    hideEle(){
        this.cube.style.display="none";
        this.bigWrapper.style.display="none";
        this.smallImg.style.opacity=1;
    }
    handlerMove(evt){
        var e=evt||window.event;
        var x=e.pageX-this.smallWrapperPos.x-this.cubeSize.width/2;
        var y=e.pageY-this.smallWrapperPos.y-this.cubeSize.height/2;
        var cubePosition=this.boundry(x,y);
        var bigImgPosition=this.getBigImgPosition(cubePosition);
        this.moveEle(cubePosition,bigImgPosition);
    }
    boundry(x,y){
        x=x<=0?0:x;
        x=x>=(this.smallSize.width-this.cubeSize.width)?(this.smallSize.width-this.cubeSize.width):x;
        y=y<=0?0:y;
        y=y>=(this.smallSize.height-this.cubeSize.height)?(this.smallSize.height-this.cubeSize.height):y;
        return {
            x:x,
            y:y
        }
    }
    getBigImgPosition(cubePosition){
        var precX=cubePosition.x/(this.smallSize.width-this.cubeSize.width);
        var precY=cubePosition.y/(this.smallSize.height-this.cubeSize.height);
        var x=precX*(this.bigImgSize.width-this.bigWrapperSize.width);
        var y=precY*(this.bigImgSize.height-this.bigWrapperSize.height)
        return {
            x:x,
            y:y
        }
    }
    moveEle(cubePosition,bigImgPosition){
        this.cube.style.left=cubePosition.x+"px";
        this.cube.style.top=cubePosition.y+"px";
        this.bigImg.style.left=-bigImgPosition.x+"px";
        this.bigImg.style.top=-bigImgPosition.y+"px";
        this.cube.style.backgroundPosition=-cubePosition.x+"px "+-cubePosition.y+"px";
    }
    changePic(evt,ele,index){
        for(var i=0,btn;btn=this.imgBoxs[i++];){
            removeClassName(btn," active");
        }
        ele.className+=" active";
        this.smallImg.src=this.imgList[index].smallImgScr;
        this.cube.style.backgroundImage= 'url(' +this.imgList[index].smallImgScr+ ')';
        this.bigImg.src=this.imgList[index].bigImgSrc;
    }
}
new Magnifier();
