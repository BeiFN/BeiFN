


 class Magnifier{
       constructor(){
             // 放属性;
             this.i = 0;
             this.small_wrapper  = $(".small-img");
             this.small_img      = $(".small-img img");
             this.small_cube     = $(".cube");
             this.img_btn_wrapper= $(".img-btn");
             this.img_btns       = this.img_btn_wrapper.children;
             //大图部分;
             this.big_wrapper    = $(".big-img");
             this.big_img        = $(".big-img img");
             this.img_box           = $(".img-box");
         
             this.small_wrapper_position = getAbsPosition(this.small_wrapper);
             this.small_cube_size        = getSize(this.small_cube);
             this.small_wrapper_size     = getSize(this.small_wrapper);
             this.big_img_size           = getSize(this.big_img);
             this.big_wrapper_size       = getSize(this.big_wrapper);
             //核心方法调用;
             this.init();
             
       }
       init(){
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
              this.small_wrapper.addEventListener("mouseenter" , this.show.bind(this));
              this.small_wrapper.addEventListener("mouseleave" , this.hide.bind(this));
          
              this.small_wrapper.addEventListener("mousemove" , this.handlerMousemove.bind(this));
              this.img_btn_wrapper.addEventListener("click" , delegation(this.changeImg.bind(this),".img-box"));
              this.img_btn_wrapper.addEventListener("click",this.changeTotalImg.bind(this));
       }
       changeImg(evt,ele){
            var e  = evt || window.event;
            var target = e.target || e.srcElement;
            for(var i = 0 , btn; btn = this.img_btns[i++];){
                if(target.parentNode === btn){
                    this.i = i;
                    return false;
              }
                removeClassName(btn,"active");
        
            }
            ele.className += " active";
       }
       changeTotalImg(){
            this.small_cube.style.backgroundImage = "url("+this.list[this.i].srcsmall+")";
            this.small_img.src = this.list[this.i].srcsmall;
            this.big_img.src = this.list[this.i].srcBig;
       }
       show(){
            this.small_cube.style.display = "block";
            this.big_wrapper.style.display= "block";
            //增加隐藏效果;
            this.small_img.style.opacity = 0.3;
       }
       hide(){
            this.small_cube.style.display = "none";
            this.big_wrapper.style.display= "none";
            this.small_img.style.opacity  = 1;
       }
       move(cube_position,big_img_position){
            this.small_cube.style.left = cube_position.x + "px";
            this.small_cube.style.top  = cube_position.y + "px";
            this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
            this.big_img.style.left = -big_img_position.x + "px";
            this.big_img.style.top  = -big_img_position.y + "px";
       }
       handlerMousemove(evt){
            var e = evt || window.event;
            var x = e.pageX - this.small_wrapper_position.left - this.small_cube_size.width / 2;
            var y = e.pageY - this.small_wrapper_position.top  - this.small_cube_size.height / 2;
            var cube_position  = this.boundary(x,y);
            var big_img_position = this.getBigPosition(cube_position.x,cube_position.y);
            this.move(cube_position,big_img_position);
       }
       boundary(x,y){
            x = x <= 0 ? 0 : x;
            //x 的最大值;
            var maxX = this.small_wrapper_size.width - this.small_cube_size.width;
            x = x >= maxX ? maxX : x;
            y = y <= 0 ? 0 : y;
            var maxY = this.small_wrapper_size.height - this.small_cube_size.height;
            y = y >= maxY ? maxY : y;
            return {
                x : x,
                y : y
            }
       }
       getBigPosition(x,y){
            var propx = x / (this.small_wrapper_size.width - this.small_cube_size.width);
            var big_img_x = parseInt(propx * (this.big_img_size.width - this.big_wrapper_size.width));
            var propy = y / (this.small_wrapper_size.height - this.small_cube_size.height);
            var big_img_y = parseInt(propy * (this.big_img_size.height - this.big_wrapper_size.height));
        
            return {
                x : big_img_x,
                y : big_img_y
            }
       }
      //  getAbsPosition(dom){
      //       var position = {
      //             left : dom.offsetLeft,
      //             top  : dom.offsetTop
      //       }
      //       if(dom.offsetParent === document.body){
      //             return position;
      //       }else{
      //             var pos = getAbsPosition(dom.offsetParent);
      //             return {
      //                 left : dom.offsetLeft + pos.left,
      //                 top  : dom.offsetTop  + pos.top
      //             }
      //       }    
      //  }
      //  getSize(dom){
      //        return{
      //             width : parseInt(getComputedStyle(dom)["width"]),
      //             height: parseInt(getComputedStyle(dom)["height"])
      //        }
      //  }
       
       
 }
 function getAbsPosition(dom){
      var position = {
          left : dom.offsetLeft,
          top  : dom.offsetTop
      }
      if(dom.offsetParent === document.body){
          return position;
      }else{
          var pos = getAbsPosition(dom.offsetParent);
          return {
              left : dom.offsetLeft + pos.left,
              top  : dom.offsetTop  + pos.top
          }
      }
  }
  
  function getSize(dom){
      return {
          width : parseInt(getComputedStyle(dom)["width"]),
          height: parseInt(getComputedStyle(dom)["height"])
      }
  }
  
  function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
  }
  function delegation( handlerClick , selector){
      return function(evt){
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var eleList = this.querySelectorAll(selector);
          var targetFamily = [];
          var _tempTarget  = target;
          var count = 0;
          while(true && count ++ < 100){
              if(_tempTarget === this || _tempTarget === null){
                  break;
              }
              targetFamily.push(_tempTarget);
              _tempTarget = _tempTarget.parentNode;
          }
          for(var i = 0 , ele ; ele = eleList[i++];){
              if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                  handlerClick.call(ele , e, ele);
                  break;
              }
          }
      }
  }
  
  function removeClassName(dom , className){
      return dom.className = dom.className.replace(new RegExp("\\s\?" + className) , "");
  }

//  Magnifier.getSize();
new Magnifier();