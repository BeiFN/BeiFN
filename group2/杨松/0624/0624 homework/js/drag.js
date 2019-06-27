var progressPoint = $(".progress-point");
var progressBar   = $(".progress-bar");
var progress      = $(".progress");
var horn          =$(".horn");
var GLOBAL       = {
    proOffsetLeft: progress.offsetLeft,
    proWidth: progress.offsetWidth,
    volume: {
        "low": "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    }
};
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
progressPoint.addEventListener("mousedown",handlerVolumeChangeStart);
document.addEventListener("mouseup" ,handlerVolumeChangeEnd);
function handlerVolumeChangeStart(e){
    var e = e || event ;
    GLOBAL .X = e.offsetX;
    document.addEventListener("mousemove" ,handlerVolumeChangeMove)
}
function handlerVolumeChangeMove(e){
    var e =e || event;
    var left = e.clientX- GLOBAL.X -GLOBAL.proOffsetLeft;
    left =left < -15 ? -15 :left;
    left =left>=GLOBAL.proWidth -15 ? GLOBAL.proWidth-15:left;
    progressPoint.style.left = left + "px";
    var prop = changeProgressBarWidth(left);
    progress.title = prop + "%";

    changeVolumeIcon(prop);
}
function handlerVolumeChangeEnd(){
    document.removeEventListener("mousemove",handlerVolumeChangeMove);
}

function changeVolumeIcon(prop){
    if(prop === 0){
        horn.style .backgroundImage ="url("+GLOBAL.volume.mute +")"
    }else if(prop >0 && prop<=33){
        horn.style.backgroundImage ="url("+GLOBAL.volume.low+")"
    }else if(prop>33 && prop<66){
        horn.style.backgroundImage ="url("+GLOBAL.volume.middle+")"
    }else {
        horn.style.backgroundImage = "url("+GLOBAL.volume.hight+")"
    }
}
function changeProgressBarWidth(_left){
    progressBar.style.width = _left +15 + "px" ;
    return parseInt((_left +15) /GLOBAL.proWidth *100);
}
progress.onmousedown = function(evt){
    var e = evt || window.event;
    e.preventDefault();

};
