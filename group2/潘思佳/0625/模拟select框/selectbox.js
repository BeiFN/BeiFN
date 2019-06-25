var selectBox = $("#selectBox");
var downList = $("#downList");

var onOff = false;

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function bodyHidden() {
    downList.style.display = "none";
    onOff = false;
}

function boxAppear(evt) {
    var e = evt || window.event;
    typeof e.stopPropagation === "function" ? e.stopPropagation() : e.cancelBubble = true;

    onOff = !onOff;
    if (onOff) {
        downList.style.display = "block";
    } else downList.style.display = "none";
}

function selectText(evt) {
    var e = evt || window.event;
    typeof e.stopPropagation === "function" ? e.stopPropagation() : e.cancelBubble = true;
    selectBox.firstElementChild.innerHTML = e.target.innerHTML;
}

document.body.addEventListener("click", bodyHidden);
selectBox.addEventListener("click", boxAppear);
downList.addEventListener("click", selectText);