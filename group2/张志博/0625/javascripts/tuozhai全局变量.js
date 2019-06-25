var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var GLOBAL = {};


// topBar.addEventListener("mousemove" , handlerMove);
topBar.addEventListener("mouseup",handlerEnd);
function handlerStart(evt){
    var e = evt || window.event;
    GLOBAL.offsetX = e.offsetX;
    GLOBAL.offsetY = e.offsetY;
    console.log("点击");
    
    document.addEventListener("mousemove" , handlerMove);
}
function handlerMove(evt){
    var e = evt || event;
    // console.log(e)
    // console.log(GLOBAL.offsetX,GLOBAL.offsetY);
    box.style.left = e.clientX -GLOBAL.offsetX + "px";
    box.style.top = e.clientY -GLOBAL.offsetY + "px";
    

    // console.log("移动");
}


function handlerEnd(){
    // console.log("抬起");
    document.removeEventListener("mousemove",handlerMove);
}


topBar.addEventListener("mousedown", handlerStart);

