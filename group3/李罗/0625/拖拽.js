var box=document.getElementById("box");
var topBar=document.getElementById("top-bar");
var goBack=document.getElementById("goBack");

var timer=null;
var GLOBAL={};
var _tempDragMove=null;
recordArray=[];
//鼠标按下 拖拽开始
function handlerDragStart(evt){
    var e=evt||window.event;
    GLOBAL.offsetX = e.offsetX;
    GLOBAL.offsetY = e.offsetY;
    topBar.removeEventListener("mousemove" ,  handlderDragMove);
    topBar.addEventListener("mousemove" ,  handlderDragMove);
}
//鼠标移动 拖拽进行中
function handlderDragMove(evt){
    var e = evt || event;
    var numLeft = e.clientX -  GLOBAL.offsetX;
    var numTop = e.clientY -  GLOBAL.offsetY;
    box.style.left = numLeft  + "px";
    box.style.top = numTop + "px";


    recordArray.push({
        left : numLeft,
        top : numTop
    })
}
//鼠标松开 拖拽结束
function handlerDragEnd(){
    topBar.removeEventListener("mousemove" ,   handlderDragMove);
}

function handlerReplay(){
    var start=recordArray.length;
    timer = setInterval( function(){
        start--;
        console.log(recordArray[start]);
        box.style.left = recordArray[start].left + "px";
        box.style.top = recordArray[start].top + "px";
        console.log(recordArray[start]);
        if(start===0){
            clearInterval(timer);
            recordArray.length=0;
        }
    },50)
}

document.removeEventListener("click",handlerDragEnd);

topBar.addEventListener("mouseup",handlerDragEnd);
topBar.addEventListener("mousedown",handlerDragStart);
goBack.addEventListener("click",handlerReplay);