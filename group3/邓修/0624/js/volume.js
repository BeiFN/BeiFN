var progressPoint = $(".progress-point");
var progressBar = $(".progress-bar");
var progress = $(".progress");
var percent=$("#per");
var horn = $(".horn");
var GLOBAL = {
    proOffsetLeft: progress.offsetLeft,
    proWidth: progress.offsetWidth,
    volume: {
        "low": "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "high": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    }
};

function $(selector) {
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

//小点的拖拽
function handlerVolumeChangeStart(evt) {
    var e = evt || event;
    GLOBAL.offsetX = e.offsetX;//获取鼠标点击时在小点中的位置
    document.addEventListener("mousemove", handlerVolumeChangeMove);
}

function handlerVolumeChangeMove(evt) {
    var e = evt || event;
    //根据鼠标点击时距离当前可视窗口的距离计算元素位置
    var numLeft = e.clientX - GLOBAL.offsetX - GLOBAL.proOffsetLeft;
    //边界检测
    numLeft = numLeft < -15 ? -15 : numLeft;
    numLeft = numLeft >= GLOBAL.proWidth - 15 ? GLOBAL.proWidth - 15 : numLeft;
    progressPoint.style.left = numLeft + "px";
    //根据小点移动的距离计算进度条的宽度并返回百分比
    var per = changeProgressBarWidth(numLeft);
    percent.innerHTML=per+"%";
    //根据百分比切换音量图片
    changeVolumeIcon(per);
}
function changeVolumeIcon(per) {
    if (per === 0) {
        //静音图标
        horn.style.backgroundImage = "url(" + GLOBAL.volume.mute + ")";
    }
    else if (per > 0 && per < 33) {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.low + ")";
    }
    else if (per >= 33 && per < 66) {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.middle + ")";
    }
    else {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.high + ")";
    }
}
//计算进度条宽度及百分比
function changeProgressBarWidth(numLeft){
    progressBar.style.width=numLeft+15+"px";
    return parseInt((numLeft+15)/GLOBAL.proWidth*100);
}

function handlerVolumeChangeEnd() {
    document.removeEventListener("mousemove", handlerVolumeChangeMove);
}

progressPoint.addEventListener("mousedown", handlerVolumeChangeStart);
document.addEventListener("mouseup", handlerVolumeChangeEnd);