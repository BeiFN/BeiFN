var 
    ele_Bar           = $("#bar"),
    ele_horn          = $(".horn"),
    ele_progress      = $(".progress"),
    ele_progressBar   = $(".progress-bar"),
    ele_progressPoint = $(".progress-point"),
    GLOBAL            = {
        progressLeft  : ele_progress.offsetLeft,
        progressWidth : ele_progress.offsetWidth,
        volume : {
            "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
      }
    };
var _tempmouseDoing = null;
function $ (selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length ===1 ? res[0] : res;
}
function mouseMoveStart(evt){
    var e = evt || window.event;


    document.removeEventListener("mousemove",_tempmouseDoing);
    document.addEventListener("mousemove",_tempmouseDoing = mouseMoveDoing.bind(false , {offsetX : e.offsetX }));
}

function mouseMoveDoing(_temp,evt){
    var e = evt || window.event;
    var left = e.clientX - _temp.offsetX - GLOBAL.progressLeft;
    // console.log(left)
    left = left < -15 ? -15 : left ;
    left = left > GLOBAL.progressWidth -15 ? GLOBAL.progressWidth - 15 : left;

    ele_progressPoint.style.left = left + "px";

    var porp = changeProgressBar(left);
    ele_progress.title = porp + "%";

    changeVolumeIcon(porp);  
}

function changeVolumeIcon(porp){
    if(porp === 0){
        ele_horn.style.backgroundImage = "url(" +GLOBAL.volume.mute+ ")";

    }else if(porp > 0 && porp <=33){
        ele_horn.style.backgroundImage = "url(" +GLOBAL.volume.low+ ")";
    }else if(porp > 33 && porp <=66){
        ele_horn.style.backgroundImage = "url(" +GLOBAL.volume.middle+ ")";
    }else{
        ele_horn.style.backgroundImage = "url(" +GLOBAL.volume.hight+ ")";
    }
}

function changeProgressBar(_left){
    ele_progressBar.style.width = _left + 15 + "px";
    return parseInt((_left + 15)/GLOBAL.progressWidth * 100 );
}
function mouseMoveEnd(){
    document.removeEventListener("mousemove",_tempmouseDoing);
}
ele_progressPoint.addEventListener("mousedown",mouseMoveStart);
document.addEventListener("mouseup",mouseMoveEnd);


