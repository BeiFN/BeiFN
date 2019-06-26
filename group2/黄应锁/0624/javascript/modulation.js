function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele ; 
}

var bar = $(".bar");
var horn = $(".horn");
var progress = $(".progress");
var progress_bar = $(".progress-bar");
var progress_point = $(".progress-point");
var group = {
    progressLeft : progress.offsetLeft,
    progressWidth : progress.offsetWidth,  
    volume : {
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
        "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
  }
}

function handlerDragStart(evt){
    var e = evt || event;
    group.X = e.offsetX;
    document.addEventListener("mousemove",handlerVolumeChangeMove)
}

function handlerVolumeChangeMove(evt){
    var e = evt || event;
    var left = e.clientX - group.progressLeft - group.X ;
    
    left = left > -15 ? left : -15;
    left = left < group.progressWidth-15 ? left : group.progressWidth-15;
    progress_point.style.left = left + "px";

    var progress_width = changeProgressWidth(left);
    progress.title = progress_width + "%" ;

    changeVolumeIcon(progress_width);
}

function handlerVolumeChangeEnd(){
    document.removeEventListener("mousemove",handlerVolumeChangeMove);
}

function changeProgressWidth(left){
    progress_bar.style.width = left + 15 + "px";
    return parseInt((left+15)/group.progressWidth*100) ;
}

function changeVolumeIcon(progress_width){
    if(progress_width === 0){
        horn.style.backgroundImage = "url("+group.volume.mute +")";
    }else if(progress_width > 0 && progress_width <=33){
        horn.style.backgroundImage = "url("+group.volume.low +")";
    }else if (progress_width>33 && progress_width <= 66){
        horn.style.backgroundImage = "url("+group.volume.middle +")";
    }else{
        horn.style.backgroundImage = "url("+group.volume.hight +")";
    }
}

progress_point.addEventListener("mousedown", handlerDragStart);
document.addEventListener("mouseup",handlerVolumeChangeEnd);

progress.onmousedown = function(evt){     
    var e = evt || window.event;
    e.preventDefault();
}