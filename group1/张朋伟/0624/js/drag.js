function $(selector) {
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
var progressPoint = $(".progress-point");
var progressBar = $(".progress-bar");
var progress = $(".progress");
var horn = $(".horn");
// var handlerVolumeChangeMove = null;
// document.removeEventListener("mousemove", handlerVolumeChangeMove);

var GLOBAL = {
    proOffsetLeft: progress.offsetLeft,
    proWidth: progress.offsetWidth,
    volume: {
        "low": "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    }
};
//小点的拖拽
progressPoint.addEventListener("mousedown", handlerVolumeChangeStart);

function handlerVolumeChangeStart(evt) {
    var e = evt || event;
    // var left = e.clientX;
    GLOBAL.X = e.offsetX;
    // console.log(GLOBAL.X);
    document.addEventListener("mousemove", handlerVolumeChangeMove)
}

function handlerVolumeChangeMove(evt) {
    var e = evt || event;
    var left = e.clientX - GLOBAL.X - GLOBAL.proOffsetLeft;
    left = left < -15 ? -15 : left;
    // left = left >= GLOBAL.proWidth -15 ? GLOBAL.proOffsetLeft : left;
    left = left >= GLOBAL.proWidth - 15 ? GLOBAL.proWidth - 15 : left ;
    console.log(left);

    progressPoint.style.left = left + "px";
    progressBar.style.width = left + "px";
    var prop = parseInt(left / GLOBAL.proWidth * 100);
    // console.log(pro);
    if (prop === 0) {
        // 静音图标
        horn.style.backgroundImage = "url(" + GLOBAL.volume.mute + ")"
    } else if (prop > 0 && prop < 33) {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.low + ")"
    } else if (prop >= 33 && prop < 66) {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.middle + ")"
    } else {
        horn.style.backgroundImage = "url(" + GLOBAL.volume.hight + ")"
    }

}
document.addEventListener("mouseup", handlerVolumeChangeEnd);

function handlerVolumeChangeEnd() {
    document.removeEventListener("mousemove", handlerVolumeChangeMove);
}
// 优化用户体验 阻止区域中无用的默认事件;
progress.onmousedown = function(evt){     
    var e = evt || window.event;

    e.preventDefault(); 
}