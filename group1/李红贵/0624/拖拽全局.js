function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1? res[0] : res;
}



var box = $("#box");
console.log(box);
var topBar = $("#top-bar");
var goback = $("#goBack");

var GLOBAL = {};
GLOBAL.moveLineArr = [];
GLOBAL.timer = null;

topBar.addEventListener("mousedown",handleDragStart);
topBar.addEventListener("mouseup",handleDragEnd);
goback.addEventListener("click",reGoback);

function handleDragStart(evt){
    var e = evt || window.event;
    GLOBAL.offsetX = e.offsetX;
    GLOBAL.offsetY = e.offsetY;
    // topBar.removeEventListener("mousemove",handleDragMove);
    // topBar.addEventListener("mousemove",handleDragMove);
    document.removeEventListener("mousemove",handleDragMove);
    document.addEventListener("mousemove",handleDragMove);
    // 使用document而不是topBar,是为了避免移动过快导致移出topBar而出现bug
}

function handleDragMove(evt){
    var e = evt || window.event;
    
    var moveX =  e.clientX - GLOBAL.offsetX;
    var moveY = e.clientY - GLOBAL.offsetY;
    box.style.left = moveX + "px";
    box.style.top = moveY + "px";
    console.log(GLOBAL.moveLineArr);
    
    GLOBAL.moveLineArr.push({
        left : moveX,
        top : moveY
    });
    
    console.log(moveX,moveY);
    console.log(GLOBAL.moveLineArr);

}
function handleDragEnd(evt){
    var e = evt || window.event;
    document.removeEventListener("mousemove",handleDragMove);

}

function reGoback(){
    var nStar = GLOBAL.moveLineArr.length;
    console.log(nStar);
    var ntim = nStar;
    console.log(ntim);
    if(ntim === 0)return;
    GLOBAL.timer = setInterval(function(){
        nStar --;
        console.log(nStar);
        box.style.left = GLOBAL.moveLineArr[nStar].left + "px";
        box.style.top = GLOBAL.moveLineArr[nStar].top + "px";
        if(nStar <= 0){
            clearInterval(GLOBAL.timer);
            GLOBAL.moveLineArr.length = 0;
        }
    },parseInt(2000/ntim));
}