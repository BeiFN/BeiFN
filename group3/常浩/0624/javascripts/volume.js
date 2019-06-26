//自己封装一个选择器
//目标是一步一步实现的
//让按钮可以点击移动
var progressPoint = $(".progress-point");
var progress      = $(".progress");
var progressBar   = $(".progress-bar");
var horn          = $(".horn");
var proOffsetLeft = progress.offsetLeft;
var maxwidth      = progress.offsetWidth;
var GLOBAL = {
    volumes : {
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" , 
    }
}
var offsetX = null;
// var left = e.client
function handlerStar(evt){
    var e = evt || event;
    offsetX = e.offsetX;
    document.addEventListener("mousemove",handlerMove);
}
function handlerMove(evt){
    var e = evt || event;
    var left = e.clientX - offsetX - proOffsetLeft ;
    left = left < -15 ? -15 : left;
    left = left >= maxwidth - 15 ? maxwidth-15 : left;
    progressPoint.style.left = left + "px";
    var prop = changeProBarWidth(left);
    progress.title = prop + "%";
    changePic(prop);
}
function changeProBarWidth(lefts){
    progressBar.style.width = lefts + 15 + "px";
    return parseInt((lefts + 15)/maxwidth *100); 
}
function changePic(prop){
    if(prop === 0){
        horn.style.backgroundImage = "url("+GLOBAL.volumes.mute +")"
    }else if(prop > 0 && prop < 33){
        horn.style.backgroundImage = "url("+GLOBAL.volumes.low +")"
    }else if(prop >= 33 && prop < 66){
        horn.style.backgroundImage = "url("+GLOBAL.volumes.middle +")"
    }else{
        horn.style.backgroundImage = "url("+GLOBAL.volumes.hight +")"
    }
}
function handlerStop(){
    document.removeEventListener("mousemove",handlerMove);
}
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
progressPoint.addEventListener("mousedown",handlerStar);
document.addEventListener("mouseup",handlerStop);
progress.onmousedown = function(evt){
    var e = evt || event;
    e.preventDefault();
}