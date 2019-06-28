var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var global = {};

function dragStart(evt){
    var e = evt || window.event;
    global.offsetX = e.offsetX;
    global.offsetY = e.offsetY;
    window.addEventListener("mousemove", dragMove);
}
function dragMove(evt){
    var e = evt || window.event;
    box.style.left = e.clientX - global.offsetX + "px";
    box.style.top = e.clientY - global.offsetY + "px";
}
function dragEnd(){
    window.removeEventListener("mousemove",dragMove);
}

topBar.addEventListener("mousedown", dragStart);
topBar.addEventListener("mouseup", dragEnd);