var progressPoint = $(".progress-point");
var progressBar   = $(".progress-bar");
var progress      = $(".progress");
var horn          = $(".horn");
var global = {
    progressLeft : progress.offsetLeft,
    progressWidth : progress.offsetWidth,
    volume : {
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
    }
};

/**
 * 选择器
 */
function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
/**
 * 点的拖拽
 */
function dotMove(evt){
    var e = evt || window.event;
    global.x = e.offsetX;
    document.addEventListener("mousemove", barChange);
    console.log("1");
}
/**
 * 进度条的变化
 */
function barChange(evt){
    var e = evt || window.event;
    var left = e.clientX - global.x - global.progressLeft;
    left = left < -15 ? -15 : left;
    left = left >= global.progressWidth - 15 ? global.progressWidth - 15 : left;
    progressPoint.style.left = left + "px";
    progressBar.style.width = left + 15 + "px";
    var per = parseInt((left + 15) / global.progressWidth * 100);
    progress.title = per;
    imgChange(per);
}
/**
 * 图标的变化
 */
function imgChange(per){
    if(per === 0){
        horn.style.backgroundImage = "url(" + global.volume.mute + ")";
    }else if(per > 0 && per < 33){
        horn.style.backgroundImage = "url(" + global.volume.low + ")";
    }else if(per >= 33 && per < 66){
        horn.style.backgroundImage = "url(" + global.volume.middle + ")";
    }else{
        horn.style.backgroundImage = "url(" + global.volume.hight + ")";
    }
}
/**
 * 音量调节结束
 */
function changeEnd(){
    document.removeEventListener("mousemove", barChange);
}

progressPoint.addEventListener("mousedown", dotMove);
document.addEventListener("mouseup",changeEnd);

/**
 * 优化用户体验,阻止区域中无用的默认事件
 */
progress.onmousedown = function(evt){
    var e = evt || window.event;
    e.preventDefault();
}