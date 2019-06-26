var pic=document.getElementById('pic');
var progress=document.getElementById('Progress');
var point=document.getElementById('point');
var bar=document.getElementById('bar');
var GLOBAL={
    left:Progress.offsetLeft,
    proWidth:Progress.offsetWidth,
    volume:{
        "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    }
};


function pointdown(evt){
    var e=evt||window.event
    GLOBAL.x=e.offsetX;
    // document.removeEventListener('mousedown',pointdown);
    document.addEventListener('mousemove',pointMove);
}
function pointMove(evt){
    var e=evt||window.event
    // console.log(1)
    var displacement=e.clientX-GLOBAL.x-GLOBAL.left;
    displacement=displacement<-15?-15:displacement;
    displacement=displacement>=GLOBAL.proWidth-15?GLOBAL.proWidth-15:displacement;
    point.style.left=displacement+'px';

    var prop=percentage(displacement);
    progress.title = prop + "%";
    changePic(prop);
}
function percentage(_displacement){
    bar.style.width=_displacement+15+'px';
    return parseInt((_displacement+15)/GLOBAL.proWidth*100)
}
function pointUp(){
    document.removeEventListener('mousemove',pointMove);
}
function changePic(prop){
    if(prop===0){
        pic.style.backgroundImage="url('"+GLOBAL.volume.mute+"')";
    }else if(prop>0&&prop<33){
        pic.style.backgroundImage="url('"+GLOBAL.volume.low+"')";
    }else if(prop>=33&&prop<66){
        pic.style.backgroundImage="url('"+GLOBAL.volume.middle+"')";
    }else{
        pic.style.backgroundImage="url('"+GLOBAL.volume.hight+"')";
    }
}





point.addEventListener('mousedown',pointdown);
document.addEventListener('mouseup',pointUp);