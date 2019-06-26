var progressBar     =   $(".progress-bar");
var progress        =   $(".progress");
var horn            =   $(".horn");
var progressPoint   =   $(".progress-point");
var tempObj         =   {
                            proOffsetLeft:progress.offsetLeft,     //计算父元素的x轴的偏移量
                            proWidth:progress.offsetWidth,         //计算父元素的宽度
                            background:{                           //储存背景图片
                                "mute"     :"https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                                "middle"   :"https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                                "height"    :"https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                                "low"      :"https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                            }
                        }
function $(selector){
    var res=null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}
//点击按钮时
function handlerStart(evt){
    var e = evt || event;
    tempObj.x = e.offsetX;          //获取到父元素的x轴偏移量
    document.addEventListener("mousemove",handlerMove);
}
//控制按钮移动
function handlerMove(evt){
    var e = evt || event;
    var numLeft = e.clientX - tempObj.x - tempObj.proOffsetLeft;
    //设置移动的最大值和最小值 ==> 边界
    numLeft = numLeft < -15 ? -15 : numLeft;    
    numLeft = numLeft > tempObj.proWidth -15 ? 1115 : numLeft;
    progressPoint.style.left = numLeft +"px";
    //控制进度条的宽度
    progressBar.style.width = numLeft + "px";
    //获取当前进度的百分比       现在的进度 / 总进度
    var temp_title= parseInt((numLeft / 1115)*100);
    progressPoint.title = temp_title + "%" ;
    //根据音量比例切换背景图片
    changeIcon(temp_title);
}
//松开按钮时
function handlerEnd(){
    document.removeEventListener("mousemove",handlerMove);
}
//根据百分比切换图片
function changeIcon(temp_title){
    if(temp_title === 0){
        horn.style.backgroundImage="url("+tempObj.background.mute+")"
    }else if(temp_title > 0 && temp_title<=33){
        horn.style.backgroundImage="url("+tempObj.background.low+")"
    }else if(temp_title > 33 && temp_title<=66){
        horn.style.backgroundImage="url("+tempObj.background.middle+")"
    }else{
        horn.style.backgroundImage="url("+tempObj.background.height+")"
    }
}
//阻止默认事件的发生
document.oncontextmenu=function (evt){
    var e = evt || event;
    e.preventDefault();
}

progressPoint.addEventListener("mousedown",handlerStart);
progressPoint.addEventListener("mouseup",handlerEnd);

