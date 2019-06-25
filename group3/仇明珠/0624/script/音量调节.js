var wrap=$$(".wrap");
var horn=$$(".horn");
var prograss=$$(".prograss");
var prograssPellet=$$(".prograss-pellet");
var prograssBar=$$(".prograss-bar");
var prooffsetLeft=prograss.offsetLeft;
var GLOBAL=[];
var imgArr=[
    {"mute":"https://upload-images.jianshu.io/upload_images/16960494-e859bac6f34f9188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
    {"low":"https://upload-images.jianshu.io/upload_images/16960494-86ea623e30ad4c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
    {"middle":"https://upload-images.jianshu.io/upload_images/16960494-ecacc6b836a0661e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"},
    {"high":"https://upload-images.jianshu.io/upload_images/16960494-0192f12b7372e21e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"}
]
prograssPellet.addEventListener("mousedown",dragStart);
function dragStart(evt){
    var e=evt||window.event;
    var offsetX=e.offsetX;
    GLOBAL.push({"offsetX":offsetX});
    document.addEventListener("mousemove",dragMove);
}
document.addEventListener("mouseup",dragEnd);
function dragMove(evt){
    var e=evt||window.event;
    var nleft=e.clientX;
    nleft=nleft-prooffsetLeft-GLOBAL[0].offsetX;
    nleft<-15?nleft=-15:"";
    nleft>985?nleft=985:"";
    prograssPellet.style.left=nleft+"px";
    prograssBar.style.width=nleft+"px";
    var num=showTitle(nleft);
    prograss.title=num+"%";
    showVoice(num);

}
function dragEnd(){
    document.removeEventListener("mousemove",dragMove);
}
function showTitle(num){
    var number=Math.round(((num+15)/1000)*100);
    return number;
}
function showVoice(num){
    if(num==0){
        horn.style.backgroundImage="url("+imgArr[0].mute+")"
    }
   else if(num>0 && num<33){
        horn.style.backgroundImage="url("+imgArr[1].low+")"
    }else if(num>33 && num<66){
        horn.style.backgroundImage="url("+imgArr[2].middle+")"
    }else{
        horn.style.backgroundImage="url("+imgArr[3].high+")"
     }
}
function $$(selector){
    return (document.querySelectorAll(selector).length)===1?document.querySelectorAll(selector)[0]:document.querySelectorAll(selector)
}
prograss.onmousedown = function(evt){     
    var e = evt || window.event;

    e.preventDefault();
    
}