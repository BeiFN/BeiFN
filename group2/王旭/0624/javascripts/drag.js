var box = document.getElementById("box");
var bar = document.getElementById("top-bar");
var comeback = document.getElementById("goBack");
var tempDrag = null;
var recodeArray = [];

function dragStart(evt){
    var e = evt || event;
    document.removeEventListener("mousemove",tempDrag);
    document.addEventListener("mousemove",tempDrag = dragMove.bind(false,
        {offsetX:e.offsetX,offsetY:e.offsetY}));
}

function dragMove(_offset,evt){
    var e = evt || event;
    var numleft = e.clientX - _offset.offsetX;
    var numtop = e.clientY - _offset.offsetY;
    //console.log(numleft,numtop,_offset.offsetX,_offset.offsetY);
    if(numleft < 0){
        numleft = 0;
        document.removeEventListener("mousemove",tempDrag);
    }
    if(numtop < 0 ){
        numtop = 0;
        document.removeEventListener("mousemove",tempDrag);
    }
    box.style.left = numleft + "px";
    box.style.top = numtop + "px";
    recodeArray.push(
        {
            left : numleft,
            top : numtop
        }
    )
}

function dragEnd(){
    document.removeEventListener("mousemove",tempDrag);
}

function replay(){
    var timer = setInterval(function(){
            var temp = recodeArray.pop()
            box.style.left = temp.left + "px";
            box.style.top = temp.top + "px";
        if(recodeArray.length <= 0){
            clearInterval(timer);
        }
    }, 50);
}




bar.addEventListener("mousedown",dragStart);
bar.addEventListener("mouseup",dragEnd);
comeback.addEventListener("click",replay);