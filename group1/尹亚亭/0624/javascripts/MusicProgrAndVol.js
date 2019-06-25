
var progressPoint=$(".progress-point");
var progressBar=$(".progress-bar");
var progress=$(".progress");
var horn=$(".horn");

var GLOBAL = {
      proOffsetLeft : progress.offsetLeft,
      proWidth : progress.offsetWidth,
      volume : {
            "low" : "https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
            "hight": "https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "mute": "https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" ,
            "middle": "https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" 
      }
};

function $(selector){
	var res=null;
	return (res=document.querySelectorAll(selector)).length===1?res[0]:res;
}

function handlerVolumeChangeStart(evt){
	var e= evt || event;
	GLOBAL.X=e.offsetX;
	document.addEventListener("mousemove",handlerVolumeChangeMove);
}

function handlerVolumeChangeMove(evt){
	var e=evt||event;
	var left=e.clientX-GLOBAL.X-GLOBAL.proOffsetLeft;
	left=left<-15?-15:left;
	left=left>=GLOBAL.proWidth-15?GLOBAL.proWidth-15:left;
	
	progressPoint.style.left=left+"px";
	
	var prop=changeProgressBarWidth(left);
	progress.title=prop+"%";
	
	changeVolumeIcon(prop);
		
}

// 更换音量图标的背景图片（随着拖拽条的改变）
function changeVolumeIcon(prop){
	if(prop===0){
		horn.style.backgroundImage="url("+GLOBAL.volume.mute+")";
	}else if(prop>0 && prop<33){
		horn.style.backgroundImage="url("+GLOBAL.volume.low+")";
	}else if(prop>=33 && prop<66){
		horn.style.backgroundImage="url("+GLOBAL.volume.middle+")";
	}else{
		horn.style.backgroundImage="url("+GLOBAL.volume.hight+")";
	}
}

// 鼠标抬起--声音改变结束
function handlerVolumeChangeEnd(){
	document.removeEventListener("mousemove",handlerVolumeChangeMove);
}

// 改变拖拽条的宽度的函数
function changeProgressBarWidth(_left){
	progressBar.style.width=_left+15+"px";
	return parseInt((_left+15)/GLOBAL.proWidth*100);
}

//阻止浏览器的默认事件;
progress.onmousedown=function(evt){
	var e=evt||event;
	e.preventDefault();
}

progressPoint.addEventListener("mousedown",handlerVolumeChangeStart);
document.addEventListener("mouseup",handlerVolumeChangeEnd);








