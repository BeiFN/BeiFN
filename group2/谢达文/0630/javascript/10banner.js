
// 1. 当前显示的那一张;

var showIndex = 0;

var next_btn  = $(".button-next");
var prev_btn  = $(".button-prev");
var sliders   = $(".slider");
var wrapper   = $(".wrapper");
var container = $(".container");



function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

// part1 : 按钮控制showIndex;
next_btn.onclick = function(){
      if(showIndex === sliders.length - 1){
            showIndex = 1;
            wrapper.style.left = 0;
      }else{
            showIndex ++;
      }
      // console.log(showIndex);
      // move(-300 * showIndex , wrapper , "left");
}
prev_btn.onclick = function(){
      if(showIndex === 0){
            showIndex = sliders.length - 1;
      }else{
            showIndex --;
      }
      // move(-300 * showIndex , wrapper , "left");
}

container.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target === next_btn || target === prev_btn){
            move(-300 * showIndex , wrapper , "left");
      }
}

// 目标点 :    
// 0       0 
// -300    1
// -600    2
// -300*n  n;   

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