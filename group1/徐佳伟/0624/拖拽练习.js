var 
    ele_Box     = $("#box"),
    ele_topBar  = $("#top-bar"),
    ele_goBack  = $("#goBack"),
    recordArray = [];
var _tempDragMove = null;

function $ (selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

function mouseMoveStart(evt){
    var e = evt || window.event;
   
    document.removeEventListener("mousemove",_tempDragMove);
    document.addEventListener("mousemove",_tempDragMove = mouseMoveDoing.bind(false,{offsetX : e.offsetX , offsetY : e.offsetY}));
}

function mouseMoveDoing(_temp,evt){
    var e = evt || window.event;
    var Left = e.clientX - _temp.offsetX;
    var Top  = e.clientY - _temp.offsetY;
    // console.log(Left,Top);
    ele_Box.style.left = Left + "px";
    ele_Box.style.top  = Top + "px"; 

    recordArray.push({
        left : Left,
        top : Top
    });
}
function mouseMoveEnd(){
    document.removeEventListener("mousemove",_tempDragMove);
}

function handlerClick(){
    var start = recordArray.length > 0 ? recordArray.length : 1;
    var timer = setInterval(function(){
        start -- ;
        ele_Box.style.left = recordArray[start].left + "px";
        ele_Box.style.top  = recordArray[start].top + "px";
        if(start === 0){
            clearInterval(timer);
            timer = null;
            recordArray.length = 0 ;
        }
    },80)
}
ele_topBar.addEventListener("mousedown",mouseMoveStart);
ele_topBar.addEventListener("mouseup",mouseMoveEnd);
ele_goBack.addEventListener("click",handlerClick);