var progressPoint=$(".progress-point");
var progress=$(".progress");
var progressBar=$(".progress-bar");
var horn=$(".horn");
var GLOBAL={
    proOffsetLeft:progress.offsetLeft,
    proWidth:progress.offsetWidth,//包含边框
    volume:{
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
    }
};


function $(selector){
    ele=null;
    return (ele=document.querySelectorAll().length===1?ele[0]:ele);
}

//point 的拖拽
function handlerVolumeChangeStart(evt){
    var e=evt||window.event;
    GLOBAL.X=e.offsetX;//鼠标到包含它的div边框的距离
    document.addEventListener("mousemove",handlerVolumeChangeMove);
}

function handlerVolumeChangeMove(evt){
    var e=evt||window.event;
    //根据鼠标位置,设置当前元素位置; 根据点击位置计算正确元素位置;
    var left=e.clientX-GLOBAL.X-GLOBAL.proOffsetLeft;

    //检测边界；
    left=left<-15?-15:left;
    left=left>=GLOBAL.proWidth-15?GLOBAL.proWidth:left;

    progressPoint.style.left=left+"px";

    

}






progressPoint.addEventListener("mousemove",handlerVolumeChangeStart);
document.addEventListener("mouseup",handlerDragEnd)