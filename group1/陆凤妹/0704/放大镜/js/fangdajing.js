function Magnifier(){
    this.container = document.querySelector(".container");
    this.small_img = document.querySelector(".small-img");
    this.cube = document.querySelector(".cube");
    this.big_img = document.querySelector(".big-img");
    this.moveJL = getAbsPosition(this.cube);
    this.init();
}


Magnifier.prototype.init = function(){
    this.small_img.addEventListener("mouseenter",this.show.bind(this));
    this.small_img.addEventListener("mouseleave",this.hide.bind(this));
    this.small_img.addEventListener("mousemove",this.move.bind(this));
    this.cube.addEventListener("mousemove",this.boundary.bind(this));

}

Magnifier.prototype.show = function(){
    this.cube.style.display = "block";
    this.big_img.style.display = "block";
}
Magnifier.prototype.hide = function(){
    this.cube.style.display = "none";
    this.big_img.style.display = "none";
}

function getAbsPosition(dom){
    var position = {
          left : dom.offsetLeft,
          top  : dom.offsetTop
    }
    if(dom.offsetParent === document.body){
          return position;
    }else{
          var pos = getAbsPosition(dom.offsetParent)
          return {
                left : dom.offsetLeft + pos.left,
                top  : dom.offsetTop  + pos.top
          }
    }
}
Magnifier.prototype.move = function(evt){
    // console.log(this.cube.offsetWidth);
     var e = evt || event;
     var clientLeft = e.clientX;
     var clientTop = e.clientY;
    //  console.log(clientLeft,clientTop);
     var cubeJL = clientLeft -this.moveJL.left -parseInt((getComputedStyle(this.cube)["width"]))/2 ;
  
     var cubeJT=clientTop -this.moveJL.top -parseInt((getComputedStyle(this.cube)["height"]))/2;
    //  console.log(clientLeft)

    this.obj={
        x:cubeJL,
        y:cubeJT
    }
   var xixi= this.boundary();
   
   this.cube.style.left = xixi.x  + "px";
   this.cube.style.top =  xixi.y  + "px";   

}


Magnifier.prototype.boundary = function(){
    x=this.obj.x;
    y=this.obj.y;
    // console.log(x,y);
    // x最小值
    x = x <= 0 ? 0 : x;
    // x最大值
    var maxCubeX =parseInt(getComputedStyle(this.small_img)["width"])-parseInt(getComputedStyle(this.cube)["width"]);
    x = x >= maxCubeX ? maxCubeX : x;

    y = y <= 0 ? 0 : y;
    var maxCubeY =parseInt(getComputedStyle(this.small_img)["height"])-parseInt(getComputedStyle(this.cube)["height"]);
    y = y >= maxCubeY ?maxCubeY : y;
      console.log(maxCubeY);
    // console.log(x,y);
    return {
          x : x,
          y : y
    }
}
     
Magnifier.prototype.getBigPosition = function(x,y){
    var propx = this.obj.x / (parseInt(getComputedStyle(this.small_img)["width"])-parseInt(getComputedStyle(this.cube)["width"]));
    var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
    console.log(propx)
        // var big_img_x = parseInt(propx * ((parseInt(getComputedStyle(this.big_img)["width"])) -parseInt((getComputedStyle(this.cube)["width"]))/2));

    var propy =this.obj.y / (parseInt(getComputedStyle(this.small_img)["width"])-parseInt(getComputedStyle(this.cube)["width"]));
    var big_img_y =parseInt(propy * ((parseInt(getComputedStyle(this.big_img)["height"])) -parseInt((getComputedStyle(this.cube)["height"]))/2));
   
   
   
   
   
   
   
    // var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
    //   var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
    //   var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
    //   var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height)); console.log()

    // return {
    //       x : big_img_x,
    //       y : big_img_y
    // }
}

new Magnifier();