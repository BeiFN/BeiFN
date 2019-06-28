
// 回到顶部  吸顶
window.onscroll = function()
{
   var center_nav = document.getElementById("center_nav");
   var _top = document.body.scrollTop || document.documentElement.scrollTop;
   if(_top > 596)
   {
       center_nav.style.position = "fixed";
       center_nav.style.top = "-56px";
       center_nav.style.zIndex = "999";
   }
   else
   {
       center_nav.style.position = "static";
   }
   var goTop = document.getElementById("goTop");
   if(_top > 4000)
   {
       goTop.style.position = "fixed";
       goTop.style.top = "365px";
       goTop.style.display = "block";
   }
   else
   {
       goTop.style.display = "none";
   }
   goTop.onclick = function ()
   {
       document.body.scrollTop = "0";
       document.documentElement.scrollTop = "0";
   }
  
}


// 无限轮播
var actions = document.getElementById("action");
var lis = actions.children;
var count = 0;
var jian_left = document.getElementById("jian1");
var jian_right = document.getElementById("jian2");
var timer = setInterval(sport,2000);

function sport(){
    count -=1180;
    if(count < -4720){
        count = 0;
    }
    actions.style.left = count + "px";
   

}
function moveLeft(){
    count -=1180;
    if(count < -4720){
        count = 0;
    }
    actions.style.left = count + "px";
}


function moveRight(){
    count +=1180;
    if(count > 0){
        count = -4720;
    }
    actions.style.left = count + "px";
}

actions.appendChild(lis[0].cloneNode(true));
jian_left.addEventListener("click",moveLeft);
jian_right.addEventListener("click",moveRight);