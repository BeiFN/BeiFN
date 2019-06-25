function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0] : ele;
}

var box = $("#box");
var top_bar = $("#top-bar");
var goBack = $("#goBack");
var glouble = {};
var back = [];

function handlerDragStart(evt){
    var e = evt ||event ;
    glouble.x = e.offsetX;
    glouble.y = e.offsetY;
    top_bar.addEventListener("mousemove",handlerDragMove);
}

function handlerDragMove(evt){
    var e = evt || event;
    var numTop = e.clientY - glouble.y;
    var numLeft =  e.clientX - glouble.x;
    box.style.top = numTop + "px";
    box.style.left =numLeft + "px";

    back.push({
        top:numTop,
        left:numLeft
    })

}

function handlerDragEnd(){
    top_bar.removeEventListener("mousemove",handlerDragMove);
}


function backHome(){
    var back_origin = back.length;
    timer = setInterval(function(){
        back_origin--;
        box.style.top = back[back_origin].top + "px";
        box.style.left = back[back_origin].left + "px";
    },50)
    if(back_origin === 0){
        clearInterval(timer);
        back.length = 0;
    }
    console.log(1);
}
console.log(back);
top_bar.addEventListener("mousedown",handlerDragStart);
top_bar.addEventListener("mouseup",handlerDragEnd);
goBack.addEventListener("click",backHome)