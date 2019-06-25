var horn = $(".horn");
var proBar = $(".progress-bar");
var proPoint = $(".progress-point");

var G = {}

function $(selector) {
    var ele;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function moveStartHandler(evt) {
    var e = evt || event;
    G.offsetX = e.offsetX;

    document.addEventListener("mousemove", moveVolumeHandler)
}

function moveVolumeHandler(evt) {
    var e = evt || event;

    proPoint.style.left = e.clientX - G.offsetX - 15 + "px";
}


function moveEndHandler() {
    document.removeEventListener("mousemove", moveVolumeHandler)
}


proPoint.addEventListener("mousedown", moveStartHandler)
document.addEventListener("mouseup", moveEndHandler)