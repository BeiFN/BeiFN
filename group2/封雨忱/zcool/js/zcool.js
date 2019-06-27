//顶部悬浮
var mian_nav=document.getElementById('mian_nav');
var back=document.getElementById('back');
window.onscroll=function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop >= 620){
        mian_nav.style.position = "fixed";
        mian_nav.style.top = "0px";
  }else{
    mian_nav.style.position = "static";
  }
  //回到顶部
  if(scrollTop >= 620){
    back.style.display="block";
  }else{
    back.style.display="none";
  }
  if(scrollTop>=3000){
    back.style.position="absolute";
    back.style.top="3622px";
    back.style.display="block";
  }else if((scrollTop >= 620)&&(scrollTop<3000)){
    back.style.display="block";
    back.style.cssText="position:fixed;display:block;";
  }
}
//二级菜单事件
var find=document.getElementById('find');
var nav_secound1=document.querySelector('.nav_secound1');
var delayed=false;
var time=null;
find.addEventListener('mouseover',function(){
    nav_secound1.style.display="block";
    clearInterval(time);
    time=setInterval(function(){
        if(delayed===false){
        nav_secound1.style.display="none";
        }
    },500)
})
find.addEventListener('mouseout',function(){
    nav_secound1.style.display="none";
})
nav_secound1.addEventListener('mouseover',function(){
    delayed=true;
    nav_secound1.style.display="block";
})
nav_secound1.addEventListener('mouseout',function(){
    nav_secound1.style.display="none";
})
