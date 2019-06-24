var box = document.getElementById("box"),
    topBar = document.getElementById("top-bar"),
    goBack = document.getElementById("goBack");
var GLOBAL = {};
var recordArray = [],
    timer = 0;


function handlerDragStart(evt) {
    var e = evt || event;
    GLOBAL.offsetX = e.offsetX;
    GLOBAL.offsetY = e.offsetY;
    document.addEventListener("mousemove", handlerDragMove)
}

function handlerDragMove(evt) {
    var e = evt || event;
    var numLeft = e.clientX - GLOBAL.offsetX;
    var numTop = e.clientY - GLOBAL.offsetY;
    box.style.left = numLeft + "px";
    box.style.top = numTop + "px";
    recordArray.push(
        {
            left: numLeft,
            top: numTop
        }
    )

}
function handlerDragEnd() {
    document.removeEventListener("mousemove", handlerDragMove);
}

function handlerReplay() {
    var i = recordArray.length;
    timer = setInterval(function () {
        i--;
        box.style.left = recordArray[i].left + "px";
        box.style.top = recordArray[i].top + "px";
        if (i == 0) {
            clearInterval(timer);
            recordArray.length = 0;
        }
    }, 50)
}

topBar.addEventListener("mouseup", handlerDragEnd);
topBar.addEventListener("mousedown", handlerDragStart);
goBack.addEventListener("click", handlerReplay);