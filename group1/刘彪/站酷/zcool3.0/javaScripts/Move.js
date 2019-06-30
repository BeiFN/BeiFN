//回到顶部

var goUp = document.getElementsByClassName("up")[0];

window.addEventListener("scroll",showUpArrow)

function showUpArrow(){
    var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;
    var str = " width: 50px;height: 50px;left: 1345px;background: #bbbbbb;border-radius: 8px;z-index: 5;display: block;"
     if(scroll_top > 3080){
        goUp.style.cssText = str+"position:absolute;top: 3722px;"
        
     }else if(scroll_top>=560 && scroll_top<=3080 )
     {
        goUp.style.cssText = str+"position:fixed;bottom: 30px;"
     }
     else if(scroll_top < 560){
        goUp.style.cssText ="display:none";
     }
    
}

//轮播图

var showIndex = 0;

var container  = $(".picsbox");
var wrapper    = $("#wrapper");
var sliders    = $(".slider");
var next_arrow = $(".nextarr");
var prev_arrow = $(".lastarr");
var autoPlay   = true; 
function $(selector){
   var res = null;
   return (res = document.querySelectorAll(selector)).length ===1 ? 
   res[0] : res;
}


//自动轮播
window.onload = function(){
   setInterval(function(){
      if(autoPlay){
      if(showIndex === sliders.length -1){
         wrapper.style.left = 0;
         showIndex = 1;
      }else{
         showIndex ++;
      }
      move(-1130*showIndex,wrapper,"left");
   }
   },5000)
}

next_arrow.addEventListener("click",function(){
   // console.log(showIndex,sliders.length);
  
   if(showIndex === sliders.length -1){
      wrapper.style.left = 0;
      showIndex = 1;
   }else{
      showIndex ++;
   }
})

prev_arrow.addEventListener("click",function(){
   
   if(showIndex === 0){
      wrapper.style.left = "-4520px";
      showIndex  = sliders.length - 2;
   }
   else{
      showIndex --;
   }
})

container.onclick = function(evt){
   autoPlay = false;
   var e = evt||window.event;
   var target = e.target || e.srcElement;
   if(target === next_arrow || target === prev_arrow){
      
      move(-1130*showIndex,wrapper,"left");
      setTimeout(function(){
         autoPlay = true;
      },5000)
   }
}


function move(targetAttr,dom,attr){
   clearInterval(dom.timer);
   dom.timer = setInterval(function(){

      targetAttr = (attr === "opacity" ? targetAttr*100 : targetAttr)

      var NowState = (attr==="opacity" ? 
      parseInt(getComputedStyle(dom)[attr]*100) :
      parseInt(getComputedStyle(dom)[attr]));

     var  speed = (targetAttr - NowState)/10;
     speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
     if(targetAttr === NowState){
        clearInterval(dom.timer);
     }
     else{
        dom.style[attr] = (attr === "opacity" ?
         (NowState+speed)/100 : NowState + speed + "px");
     }

   },20)
}




