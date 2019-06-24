var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack");
var timer = null;
var recordArray = [];




var _tempDragMove = null;
//鼠标点击，
function handlerDragStart(evt){
    var e = evt || event;
    document.removeEventListener("mousemove",_tempDragMove);
    document.addEventListener("mousemove",_tempDragMove = handlerDragMove.bind(false,{offsetX:e.offsetX,offsetY:e.offsetY}));

}
//鼠标移动
function handlerDragMove(_offset,evt){
    var e = evt || event;
    var numLeft = e.clientX- _offset.offsetX;
    var numTop =  e.clientY - _offset.offsetY ;
    box.style.left =numLeft +"px";
    box.style.top =numTop +"px";
    //记录鼠标坐标
    recordArray.push({
        left:numLeft,
        top:numTop
    })
}
//鼠标松开,拖拽结束
function handlerDragEnd(){
    document.removeEventListener("mousemove",_tempDragMove);

}
//点击回放，回放
function handlerReplay(){
    var start = recordArray.length;
    timer = setInterval(function(){
        start --;
        box.style.left = recordArray[start].left+"px";
        box.style.top = recordArray[start].top +"px";

        if(start === 0){
            clearInterval(timer);
            recordArray.length = 0;
        }
    },50)
}

topBar.addEventListener("mouseup",handlerDragEnd);
topBar.addEventListener("mousedown",handlerDragStart);
goBack.addEventListener("click",handlerReplay);