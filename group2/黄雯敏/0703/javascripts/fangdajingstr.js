function Magnifier(){
    this.smallImgWrap = $(".small-img");
    this.smallImg = $(".small-img img");
    this.shadowCube = $(".shadow");
    this.imgBtnWrap = $(".img-btn");
    this.bigImgWrap = $(".big-img");
    this.bigImg = $(".big-img img");
    this.imgBtns = this.imgBtnWrap.children;
    this.list = [
        {
            src : ""
        }
    ]
    this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);
    this.shadowCubeSize = getSize(this.shadowCube);
    this.smallImgWrapSize = getSize(this.smallImgWrap);
    this.bigImgWrapSize = getSize(this.bigImgWrap);
    this.bigImgSize = getSize(this.bigImg);

    this.init();
}
Magnifier.prototype.init = function(){
    this.smallImgWrap.addEventListener( "mouseenter", this.showEle.bind(this));
    this.smallImgWrap.addEventListener( "mouseleave", this.hideEle.bind(this) );
    this.smallImgWrap.addEventListener( "mousemove" , this.handlerShadowMove.bind(this) );
    this.imgBtnWrap.addEventListener( "click" , delegation(this.changeImg.bind(this) , ".img-box"))
}

Magnifier.prototype.showEle = function(){
    this.shadowCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
    this.smallImg.style.opacity = 0.3;
}
Magnifier.prototype.hideEle = function(){
    this.shadowCube.style.display = "none";
    this.bigImgWrap.style.display = "none";
    this.smallImg.style.opacity = 1;
}
Magnifier.prototype.moveEle = function(shadowPosition,bigImgPosition){
    this.shadowCube.style.left = shadowPosition.x + "px";
    this.shadowCube.style.top  = shadowPosition.y + "px";

    this.shadowCube.style.backgroundPosition = -shadowPosition.x + "px " + -shadowPosition.y + "px";

    this.bigImg.style.left = -bigImgPosition.x + "px";
    this.bigImg.style.top  = -bigImgPosition.y + "px";
}
Magnifier.prototype.handlerShadowMove = function(evt){
    var e = evt || window.event;
    var x = e.pageX - this.smallImgWrapPosition.left - this.shadowCubeSize.width / 2;
    var y = e.pageY - this.smallImgWrapPosition.top - this.shadowCubeSize.height / 2 ;

    var shadowPosition = this.boundary(x,y)
    var bigImgPosition = this.getBigPosition(x,y);

    this.moveEle(shadowPosition , bigImgPosition);
}
function delegation(handlerClick,selector){
    return function(evt){
        var e = evt || window.event;
        var target = e.target || e.srcElement;
        var _tempTarget = target;
        var eleList = this.querySelectorAll(selector);
        var targetFamily = [];
        var count = 0;
        while(true && count++ < 100){
            if(_tempTarget === this || _tempTarget ===null){
                break;
            }
            targetFamily.push(_tempTarget);
            _tempTarget = _tempTarget.parentNode;
        }
        for(var i=0,ele; ele=eleList[i++];) {
            if(targetFamily.length === 1 ? ele ===targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                handlerClick.call(ele, e, ele);
                break;
            }
        }
    }
}
Magnifier.prototype.changeImg = function(evt,ele){
    for(var i = 0, btn; btn = this.imgBtns[i++];){
        removeClassName(btn,"active");
    }
    ele.className += " active";
}
Magnifier.prototype.boundary = function(x,y){
    if(x <= 0){
        x = 0;
    }
    if(x > (this.smallImgWrapSize.width - this.shadowCubeSize.width) ){
        x = this.smallImgWrapSize.width - this.shadowCubeSize.width;
    }
    if(y <=0 ){
        y = 0;
    }
    if(y > (this.smallImgWrapSize.height - this.shadowCubeSize.height) ){
        y = this.smallImgWrapSize.height - this.shadowCubeSize.height;
    }
    return {
        x : x,
        y : y
    }
}
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = x / (this.smallImgWrapSize.width - this.shadowCubeSize.width);
    var big_img_x = parseInt(propx * (this.bigImgSize.width - this.bigImgWrapSize.width));
    var propy = y / (this.smallImgWrapSize.height - this.shadowCubeSize.height);
    var big_img_y = parseInt(propy * (this.bigImgSize.height - this.bigImgWrapSize.height));
    return {
            x : big_img_x,
            y : big_img_y
      } 
}
function getSize(dom){
    return {
        width : parseInt(getComputedStyle(dom)["width"]),
        height : parseInt(getComputedStyle(dom)["height"])
    }
}
function getAbsPosition(dom){
    var position = {
        left : dom.offsetLeft,
        top : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
        return position;
    }else{
        var pos = getAbsPosition(dom.offsetParent);
        return {
            left : dom.offsetLeft + pos.left,
            top : dom.offsetTop + pos.top
        }
    }
}
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
function removeClassName(dom,className){
    var classString = dom.className;
    var classReg = new RegExp("\S?"+className);
    classString = classString.replace(classReg,"");
    dom.className = classString;
    return dom.className;
}
new Magnifier();