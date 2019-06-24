var progressPoint = $(".progress-point");
var progressBar   = $(".progress-bar");
var progress      = $(".progress");
var horn          = $(".horn");

var GLOBA = {
    proOffsetLeft : progress.offsetLeft,
    proWidth:progress.offsetWidth,
    volume:{
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
    }
};
function $(selector){
    var res = null;
    return(res = document.querySelectorAll(selector)).length===1? res[0] : res;

}

//1.点的拖拽;
function handlerVolumeChangeStart(evt){
    var e = evt||window.event;
    GLOBA.X = e.offsetX;
    document.addEventListener("mousemove",handlerVolumeChangeMove);
}
function handlerVolumeChangeMove(evt){
    var e = evt || window.event;
    //根据鼠标位置,设置当前元素位置;根据点击位置计算正确元素位置;
    var left = e.clientX - GLOBA.X - GLOBA.proOffsetLeft;
    //边界检测;

    left = left < -15? -15 :left;
    left = left>= GLOBA.proWidth - 15 ? GLOBA.proWidth - 15 :left;

    progressPoint.style.left = left +"px";
    var  prop = changeProgressBarWidth(left);

    progress.title = prop + "%";

    //根据比例切换小喇叭图片;
    changeVolumeIcon(prop);
}

function changeVolumeIcon(prop){
    if(prop===0){
        //静音图标

        horn.style.backgroundImage = "url("+GLOBA.volume.mute+")";
    }else if (prop > 0 && prop < 33){
        horn.style.backgroundImage = "url("+GLOBA.volume.low+")"
    }else if(prop >= 33 && prop < 66){
        horn.style.backgroundImage = "url("+GLOBA.volume.middle+")"
  }else{
        horn.style.backgroundImage = "url("+GLOBA.volume.hight+")"
  }
}

function handlerVolumeChangeEnd(){

        document.removeEventListener("mousemove",handlerVolumeChangeMove);
}

function changeProgressBarWidth(_left){
    progressBar.style.width = _left + 15 + "px";
    return parseInt((_left+15)/GLOBA.proWidth*100);
}

progressPoint.addEventListener("mousedown",handlerVolumeChangeStart);
document.addEventListener("mouseup",handlerVolumeChangeEnd);

