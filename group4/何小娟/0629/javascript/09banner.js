
//当前显示的那一张;
var showIndex = 1;

var next_btn  = $(".button-next");
var prev_btn  = $(".button-prev");
var sliders   = $(".slider");
var wrapper   = $(".wrapper");
var container = $(".container");
var timer = null;



function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}


next_btn.onclick = function(){
      // 7-2=5
      if(showIndex === sliders.length - 2){
            showIndex = 1;
            // 为了有个过渡的效果，把left值提前一个元素的宽度
            wrapper.style.left = 0 + "px";
      }else{
            showIndex ++;
      }
      // move(-300 * showIndex , wrapper , "left");
}
prev_btn.onclick = function(){
      if(showIndex === 1){
            showIndex = sliders.length - 2;
            wrapper.style.left = -1800 + "px";
      }else{
            showIndex --;
      }
      // move(-300 * showIndex , wrapper , "left");
}

// 优化：把上面两个函数都调用函数move()的部分提取出来
container.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target === next_btn || target === prev_btn){
            move(-300 * showIndex , wrapper , "left");
      }
}


function move( target , dom , attr ){
      clearInterval( dom.timer );
      dom.timer = setInterval(function(){
            // 获取当前元素的位置;
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
            // target重新赋值;
            target = (attr === "opacity" ? target * 100 : target)
            var speed = (target - iNow) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(target === iNow){
                  clearInterval(dom.timer)
            }else{
                  dom.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
            }
      },50)
}