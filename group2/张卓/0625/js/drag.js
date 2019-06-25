var box = $("#box")
var drag = $("#drag");
var replay = $("#replay")

var moveArr = []
var Global = {}

function $(selector) {
    var e = null;
    return (e = document.querySelectorAll(selector)).length === 1 ? e[0] : e
}

function handlerStart(evt) {
    moveArr = []
    var e = evt || event;
    // console.log(e.clientX)
    Global.offsetX = e.offsetX;
    Global.offsetY = e.offsetY;
    document.addEventListener("mousemove", handlerMove);
}

function handlerMove(evt) {
    var e = evt||event
    // var clientXWidth = e.clientX;
    // var clientYHeight = e.clientY;
    var Xwidth = e.clientX - Global.offsetX;
    var Yheight = e.clientY - Global.offsetY;
    moveArr.push({wid:Xwidth,hei:Yheight})
    // console.log(moveArr)
    box.style.left = Xwidth+"px";
    box.style.top = Yheight+"px";
}

function handlerStop(){
    document.removeEventListener("mousemove",handlerMove)
}

function goReplay(){
    var lengthArr  =  moveArr.length-1
    var timeId = setInterval(function(){
        if(lengthArr<=-1){
            clearInterval(timeId);
            return;
        }
            box.style.left = moveArr[lengthArr].wid+"px";
            box.style.top = moveArr[lengthArr].hei+"px";
            lengthArr--;
    },30)
    
}


//三个事件 按下  移动  松开  一个元素添加多个事件  用监听的方式
drag.addEventListener("mousedown", handlerStart)
//鼠标抬起关闭事件
drag.addEventListener("mouseup",handlerStop)
replay.addEventListener("click",goReplay)