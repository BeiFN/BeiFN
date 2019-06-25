var box = $("#box");
var drag = $("#drag");
var playBack = $("#play_back");

var _dragMove = null;
var lock = false;
var timer = null;

var moveList = [{
    Bleft: 0,
    Btop: 0
}];

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function dragBegin(e) {
    console.log("1", e);
    if (lock) return;
    document.removeEventListener("mousemove", _dragMove);

    document.addEventListener("mousemove", _dragMove = dragMove.bind(false, { offsetX: e.offsetX, offsetY: e.offsetY }));
}

function dragMove(_offset, e) {
    console.log(e);
    box.style.left = e.clientX - _offset.offsetX + "px";
    box.style.top = e.clientY - _offset.offsetY + "px";
    moveList.push({
        Bleft: box.style.left,
        Btop: box.style.top
    });
}

function dragEnd() {
    document.removeEventListener("mousemove", _dragMove);
}

function playBackButton() {
    lock = true;
    timer = setInterval(function() {
        if (moveList.length === 0) clearInterval(timer);
        box.style.left = moveList.pop().Bleft;
        box.style.top = moveList.pop().Btop;
    }, 50);
}

drag.addEventListener("mousedown", dragBegin);
drag.addEventListener("mouseup", dragEnd);
playBack.addEventListener("click", playBackButton);