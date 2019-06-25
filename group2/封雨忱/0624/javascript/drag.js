var bigBox=document.getElementById('bigBox');
var dragBox=document.getElementById('dragBox');
var btn=document.getElementById('btn');
var GLOBAL={};
var recordArray=[];
function handlerStart(evt){
    var e=evt||window.event;
    GLOBAL.offsetX=e.offsetX;
    GLOBAL.offsetY=e.offsetY;
    document.removeEventListener('mousedown',handlerStart);
    document.addEventListener('mousemove',handlerMove);
}
function handlerMove(evt){
    var e=evt||window.event;
    var coorLeft=e.clientX-GLOBAL.offsetX;
    var coorRight=e.clientY-GLOBAL.offsetY;
    recordArray.push(
        {
            left:coorLeft,
            top:coorRight
        }
    );
    bigBox.style.left=coorLeft+'px';
    bigBox.style.top=coorRight+'px';
    // console.log(recordArray);
}
function handlerEnd(){
    document.removeEventListener('mousemove',handlerMove);
}
function handlerRemove(){
    var time=recordArray.length;
    var loop=setInterval(function(){
        time--;
        bigBox.style.left=recordArray[time].left+'px';
        bigBox.style.top=recordArray[time].top+'px';
        if(time===0){
            clearInterval(loop);
            recordArray.length=0;
        }
    },5)
}
dragBox.addEventListener('mousedown',handlerStart);
dragBox.addEventListener('mouseup',handlerEnd);
btn.addEventListener('click',handlerRemove)