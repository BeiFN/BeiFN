function Magnifier(){
    this.i = 0;
    this.small_img_wrapper = $(".small-img");
    this.small_img         = $(".small-img img");
    this.small_cube        = $(".cube");

    this.big_img_wrapper   = $(".big-img");
    this.big_img           = $(".big-img img");
    this.img_btn           = $(".img-btn");
  
    this.img_btns          = this.img_btn.children;
    console.log(this.img_btns);
    this.img_box           = $(".img-box");
    console.log(this.img_box);

    this.init();
} 

Magnifier.prototype.init = function(){
      this.list = [
            {
                  srcsmall : "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                  srcBig   :"https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
            },
            {
                  srcsmall : "https://img14.360buyimg.com/n1/s450x450_jfs/t1/40868/26/1431/86285/5cc65cc9E976b43d3/ca2ef76a8a801dcd.jpg",
                  srcBig   :"https://img14.360buyimg.com/n0/jfs/t1/40868/26/1431/86285/5cc65cc9E976b43d3/ca2ef76a8a801dcd.jpg"
            },
            {
                  srcsmall :"https://img11.360buyimg.com/n1/s450x450_jfs/t1/74337/9/3553/149378/5d1c8f50Ecd9cdfe0/e79035cf3023f3ff.jpg",
                  srcBig   :"https://img14.360buyimg.com/n0/jfs/t1/74337/9/3553/149378/5d1c8f50Ecd9cdfe0/e79035cf3023f3ff.jpg"
            }
      ]
    this.small_img_wrapper.addEventListener("mouseenter",this.showImg.bind(this));
    this.small_img_wrapper.addEventListener("mouseleave",this.hideImg.bind(this));
    this.small_img_wrapper.addEventListener("mousemove",this.handlerMousemove.bind(this));
    this.img_btn.addEventListener("click",delegation(this.changeImgPage.bind(this), ".img-box"));
    this.img_btn.addEventListener("click",this.changeTotalImg.bind(this));
}


Magnifier.prototype.changeImgPage = function(evt ,ele){
      var e = evt || event;
      var target = e.target || e.srcElement;
      for(var i = 0,btn;btn = this.img_btns[i++];){
            if(target.parentNode === btn){
                  this.i = i;
                  return false;
            }
            removeClassName(btn,"active");
      }
      ele.className += " active";
      console.log(ele);
}
Magnifier.prototype.changeTotalImg = function(){
      this.small_cube.style.backgroundImage = "url("+this.list[this.i].srcsmall+")";
      this.small_img.src = this.list[this.i].srcsmall;
      this.big_img.src = this.list[this.i].srcBig;
}
Magnifier.prototype.handlerMousemove = function(evt){
      var e = evt || event;
      this.small_img_wrapper_position = getAbsPosition(this.small_img_wrapper)
      this.small_cube_size = getSize(this.small_cube);
      this.small_img_wrapper_size = getSize(this.small_img_wrapper);
      this.big_img_wrapper_size   = getSize(this.big_img_wrapper);
      this.big_img_size           = getSize(this.big_img);
      this.x = e.pageX-this.small_img_wrapper_position.left-this.small_cube_size.width/2;
      this.y  = e.pageY-this.small_img_wrapper_position.top-this.small_cube_size.height/2;
      this.cube_boundary = this.boundray(this.x,this.y)
      this.cube_left = this.cube_boundary.x ;
      this.cube_top  = this.cube_boundary.y;
      this.img_prop = this.proportion(this.x,this.y);
      this.moveImg(this.cube_boundary,this.img_prop);
} 

Magnifier.prototype.proportion = function(pro1,pro2){
      this.propX = (pro1/(this.small_img_wrapper_size.width - this.small_cube_size.width))*(this.big_img_size.width-this.big_img_wrapper_size.width);
      this.propY = pro2/(this.small_img_wrapper_size.height - this.small_cube_size.height)*(this.big_img_size.height-this.big_img_wrapper_size.height);
      return {
            propX :this.propX,
            propY :this.propY
      }

}

Magnifier.prototype.boundray = function(x,y){
      x = (x < 0 ? 0:x);
      x = x  >  (this.small_img_wrapper_size.width - this.small_cube_size.width) ? (this.small_img_wrapper_size.width - this.small_cube_size.width) : x;
      y = y < 0 ? 0 : y;
      y = y > (this.small_img_wrapper_size.height - this.small_cube_size.height) ? (this.small_img_wrapper_size.height - this.small_cube_size.height) : y;
      return {
            x : x,
            y: y 
      }
}
Magnifier.prototype.showImg = function(){
    this.small_cube.style.display = "block";
    this.big_img_wrapper.style.display = "block";
    this.small_img.style.opacity = 0.3;
    console.log(1);
}

Magnifier.prototype.hideImg = function(){
    this.small_cube.style.display = "none";
    this.big_img_wrapper.style.display = "none";
    this.small_img.style.opacity = 1; 
}

Magnifier.prototype.moveImg = function(cube_boundary,img_prop){
      
      this.small_cube.style.left = cube_boundary.x + "px";
      this.small_cube.style.top  = cube_boundary.y + "px";
      this.big_img.style.left    = -img_prop.propX + "px";
      this.big_img.style.top     = -img_prop.propY + "px"; 
      this.small_cube.style.backgroundPosition = -cube_boundary.x + "px " + -cube_boundary.y + "px";
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
