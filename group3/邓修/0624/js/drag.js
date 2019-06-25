//获取元素
var box = document.getElementById("box");
var topBar = document.getElementById("top-bar");
var goBack = document.getElementById("goBack");
var timer = null;
var recordArray = [];
var tempDragMove = null;
var offsetX = 0, offsetY = 0;

//函数
function handlerDragStart(evt) {
    var e = evt || event;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    // recordArray.push({ left: 0, top: 0 });
    document.removeEventListener("mousemove", handlerDragMove);
    document.addEventListener("mousemove", handlerDragMove);
}
function handlerDragMove(evt) {
    var e = evt || event;
    var numLeft = e.clientX - offsetX;
    var numTop = e.clientY - offsetY;
    box.style.left = numLeft + "px";
    box.style.top = numTop + "px";
    recordArray.push({ left: numLeft, top: numTop });
}
function handlerDragEnd() {
    document.removeEventListener("mousemove", handlerDragMove);
}
function handlerGoBack() {
    var len = recordArray.length;
    // console.log(recordArray);
    timer = setInterval(function () {
        len--;
        box.style.left = recordArray[len].left + "px";
        box.style.top = recordArray[len].top + "px";
        if (len === 0) {
            clearInterval(timer);
            recordArray.length = 0;
        }
    }, 50)
}

//业务
topBar.addEventListener("mousedown", handlerDragStart);
topBar.addEventListener("mouseup", handlerDragEnd);
goBack.addEventListener("click", handlerGoBack);