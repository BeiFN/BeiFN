// ![low.png](https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
// ![hight.png](https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
// ![middle.png](https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
// ![mute.png](https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

var point = $("#progress-point")
var progress = $("#progress")
var progressBar = $("#progress-bar")
var voice = $("#voice")
var Global = {}

function $(selector) {
    var e = null;
    return (e = document.querySelectorAll(selector)).length === 1 ? e[0] : e
}

function handlerStart(evt) {
    var e = evt || event;
    var offsetX = e.offsetX;
    Global.offsetWidth = offsetX;
    document.addEventListener("mousemove", handlerMove);
}

function handlerMove(evt) {
    var e = evt || event;
    // console.log(progress.offsetLeft) 测量元素距离左边的距离
    // console.log(e.clientX)
    var pwid = progress.offsetWidth
    var widthLeft = e.clientX-progress.offsetLeft-Global.offsetWidth;
    widthLeft  =( widthLeft<=-15?-15:widthLeft)
    widthLeft = (widthLeft>=pwid-15?pwid-15:widthLeft)
    //百分比
    var percent = parseInt((widthLeft+15)/pwid*100);
    progress.title = percent+"%"
    //进度条
    progressBar.style.width = widthLeft+15+"px";
    //音量键
    vocChange(percent)
    point.style.left = widthLeft+"px";
}
function handlerStop(){
    document.removeEventListener("mousemove",handlerMove)
}

function vocChange(percent){
    // console.log(percent)
    if(percent==0){
        voice.style.backgroundImage = "url(https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)"
    }else if(percent>0&&percent<=33){
        voice.style.backgroundImage = "url(https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)"
    }else if(percent>33&&percent<=66){
        voice.style.backgroundImage = "url(https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)"
    }else if(percent>66){
        voice.style.backgroundImage = "url(https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)"
    }

}
//去除默认事件
progress.onmousedown = function(evt){     
    var e = evt || window.event;
    e.preventDefault();
}
point.addEventListener("mousedown", handlerStart)
document.addEventListener("mouseup",handlerStop)