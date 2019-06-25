var menu = $("#menu");
var textBox = $("#text_box");

var selectText = null;
var selected = null;

function $(selector) {
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

function menuAppear(evt) {
    var e = evt || window.event;

    typeof e.preventDefault === "function" ? e.preventDefault() : e.returnValue = false;

    selectText = window.getSelection().toString();

    menu.style.display = "block";
    menu.style.left = e.clientX + "px";
    menu.style.top = e.clientY + "px";
}

function choose(evt) {
    var e = evt || window.event;

    typeof e.preventDefault === "function" ? e.preventDefault() : e.returnValue = false;

    if (e.target.innerHTML === "复制") copyText();
    else if (e.target.innerHTML === "粘贴") pasteText();
    else if (e.target.innerHTML === "剪切") shearText();
    else if (e.target.innerHTML === "删除") deleteText();
}

function copyText() {
    selected = selectText;
}


function pasteText() {
    textBox.innerHTML += selected;
}

function shearText() {
    selected = selectText;
    var reg = new RegExp(selected, "ig");
    textBox.innerHTML = textBox.innerHTML.replace(reg, "");
}

function deleteText() {
    shearText();
    selected = "";
}

function removeMenu() {
    menu.style.display = "none";
}

document.addEventListener("contextmenu", menuAppear);
document.addEventListener("click", removeMenu);
menu.addEventListener("click", choose);