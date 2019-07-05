function Magnifier(){
    this.smallImgWrap = document.querySelector(".small-img");
    this.shadowCube = document.querySelector(".shadow");
    this.bigImgWrap = document.querySelector(".big-img");
    this.bigImg = document.querySelector(".big-img img");
    this.smallImgWrapPosition = getAbsPosition(this.smallImgWrap);
    this.smallImgWrapSize = {
        width : parseInt(getComputedStyle(this.smallImgWrap)["width"]),
        height : parseInt(getComputedStyle(this.smallImgWrap)["height"])
    }
    this.shadowCubeSize = {
        width : parseInt(getComputedStyle(this.shadowCube)["width"]),
        height : parseInt(getComputedStyle(this.shadowCube)["height"])
    }
    this.bigImgWrapSize = {
        width : parseInt(getComputedStyle(this.bigImgWrap)["width"]),
        height : parseInt(getComputedStyle(this.bigImgWrap)["height"])
    }
    this.bigImgSize= {
        width : parseInt(getComputedStyle(this.bigImg)["width"]),
        height : parseInt(getComputedStyle(this.bigImg)["height"])
    }
    this.smallImgWrap.addEventListener( "mouseenter" , this.showEle.bind(this) );
    this.smallImgWrap.addEventListener( "mouseleave" , this.hideEle.bind(this) );
    this.smallImgWrap.addEventListener( "mousemove"  , this.handlerShadowMove.bind(this) );

  //  this.smallImgWrap.addEventlistener("mouseenter", this.showEle.bind(this));
  //  this.smallImgWrap.addEventlistener("mouseleave", this.hideEle.bind(this));
  //  this.smallImgWrap.addEventlistener("mousemove", this.handlerShadowMove.bind(this));

}

Magnifier.prototype.showEle = function(){
    this.shadowCube.style.display = "block";
    this.bigImgWrap.style.display = "block";
}
Magnifier.prototype.hideEle = function(){
    this.shadowCube.style.display = "none";
    this.bigImgWrap.style.display = "none";
}
Magnifier.prototype.handlerShadowMove = function(evt){
    var e = evt || window.event;
    var x = e.pageX - this.smallImgWrapPosition.left - this.shadowCubeSize.width / 2;
    var y = e.pageY - this.smallImgWrapPosition.top - this.shadowCubeSize.height / 2 ;

    var small_position = this.boundary(x,y)
    var big_position = this.getBigPosition(small_position);

    this.moveEle(small_position , big_position);


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
Magnifier.prototype.getBigPosition = function(position){
    var total_width  = this.smallImgWrapSize.width - this.shadowCubeSize.width;
    var total_height = this.smallImgWrapSize.height - this.shadowCubeSize.height;
    
    var big_total_width = this.bigImgSize.width - this.bigImgWrapSize.width;
    var big_total_height = this.bigImgSize.height - this.bigImgWrapSize.height;

    return {
          x : parseInt(position.x / total_width * big_total_width) ,
          y : parseInt(position.y  / total_height * big_total_height)
    }   
}
Magnifier.prototype.moveEle = function(small,big){
    this.shadowCube.style.left = small.x + "px";
    this.shadowCube.style.top = small.y + "px";
    this.bigImg.style.left = -big.x + "px";
    this.bigImg.style.top = -big.y + "px";
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
new Magnifier();
//new Magnifier();