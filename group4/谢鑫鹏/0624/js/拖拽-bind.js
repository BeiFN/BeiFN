var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack");
var _dragMove = null;
var record = [];
var timer = null;

function dragStart(evt){
    var e = evt || window.event;
    window.removeEventListener("mousemove",_dragMove);
    window.addEventListener("mousemove", _dragMove = dragMove.bind(false,{offsetX : e.offsetX, offsetY : e.offsetY}));
}
function dragMove(offsetXY,evt){
    var e = evt || window.event;
    var numLeft = e.clientX - offsetXY.offsetX;
    var numTop = e.clientY - offsetXY.offsetY;
    box.style.left = numLeft + "px";
    box.style.top = numTop + "px";
    record.push({
        left : numLeft,
        top : numTop,
    })
}
function dragEnd(){
    window.removeEventListener("mousemove", _dragMove);
}
function replay(){
    var num = record.length;
    timer = setInterval(function(){
        num --;
        box.style.left = record[num].left + "px";
        box.style.top = record[num].top + "px";
        if(num === 0){
            clearInterval(timer);
            record.length = 0;
        }
    },50)
}

topBar.addEventListener("mousedown", dragStart);
topBar.addEventListener("mouseup", dragEnd);
goBack.addEventListener("click", replay);