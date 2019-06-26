var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack");
var time = null;
var _dragMove = null;
var moveRecord = [];

function moveStartHandler(evt) {
    var e = evt || event;

    document.removeEventListener("mousemove", _dragMove)
    document.addEventListener("mousemove", _dragMove = dragMoveHandler.bind(false, {
        left: e.offsetX,
        top: e.offsetY
    }))
}

function dragMoveHandler(_offset, evt) {
    var e = evt || event;
    numLeft = e.clientX - _offset.left;
    numTop = e.clientY - _offset.top;

    box.style.left = numLeft + "px";
    box.style.top = numTop + "px";

    moveRecord.push({
        left: numLeft,
        top: numTop
    });
}

function moveEndHandler() {
    document.removeEventListener("mousemove", _dragMove);
}


function goBackHandler() {
    var start = moveRecord.length;

    time = setInterval(function (){
        start--;

        box.style.left = moveRecord[start].left + "px";
        box.style.top = moveRecord[start].top + "px";

        if (start === 0) {
            clearInterval(time);
            moveRecord.length = 0;
        }
    }, 50);
}

topBar.addEventListener("mousedown", moveStartHandler)
topBar.addEventListener("mouseup", moveEndHandler)
goBack.addEventListener("click", goBackHandler)