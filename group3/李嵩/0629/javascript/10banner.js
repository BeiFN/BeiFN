
// 1. 当前显示的那一张;

var showIndex = 0;

var next_btn  = $(".button-next");
var prev_btn  = $(".button-prev");
var sliders   = $(".slider");
var wrapper   = $(".wrapper");
var container = $(".container");
var price     = $(".price");



function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

// part1 : 按钮控制showIndex;
next_btn.onclick = function(){
      if(showIndex === sliders.length - 2){
            showIndex = 1;
            wrapper.style.left = 0;
            num(showIndex);
      }else{
            showIndex ++;
            num(showIndex);
      }
      // console.log(showIndex);
      // move(-300 * showIndex , wrapper , "left");
}

prev_btn.onclick = function(){
      if(showIndex === 0){
            showIndex = 4;
            wrapper.style.left= -1500+"px";
            num(showIndex);
            
      }else{
            showIndex --;
            num(showIndex);
      }
      // move(-300 * showIndex , wrapper , "left");
}

container.onclick = function(evt){
      var e = evt || window.event;
      var target = e.target || e.srcElement;
      if(target === next_btn || target === prev_btn){
            move(-300 * showIndex , wrapper , "left")
            num(showIndex);
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
function num(xiabiao){
      // var pagination=document.querySelector(".pagination");
      // var span_List=pagination.childNodes;
      // for (var k = 0,value;value=span_List[k++];)
      // {
      var Value = parseInt(document.querySelector(".price").innerHTML);
      // var Value=document.getElementsByTagName(value.innerHTML);
      // console.log(Value);
      // }
     // var Value=value.innerHTML;
     var price=document.querySelector(".price");
      if  (Value===xiabiao)
      price.style.backgroundColor="#ddd";
}



 
      var timer2=setInterval(function(){
            if(showIndex === sliders.length - 2){
                  showIndex = 1;
                  wrapper.style.left = 0;
            }else{
                  showIndex ++;
            }
            automove(-300 * showIndex , wrapper , "left")
},3000)

var onmouse=document.querySelector(".container");
onmouse.addEventListener("mouseover",clear);
function clear(){
      clearInterval(timer2);
}


function automove(target , dom1 , attr){
      clearInterval( dom1.timer );
      dom1.timer = setInterval(function(){
            // 获取当前元素的位置;
            var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom1)[attr] * 100) : parseInt(getComputedStyle(dom1)[attr]);
            // target重新赋值;
            target = (attr === "opacity" ? target * 100 : target)
            var speed = (target - iNow) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(target === iNow){
                  clearInterval(dom1.timer)
            }else{
                  dom1.style[attr] = (attr === "opacity" ? (iNow + speed ) / 100 : iNow + speed + "px")
            }
      },50)
}
