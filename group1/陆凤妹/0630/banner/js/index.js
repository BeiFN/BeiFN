var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
function next_pic () {
    index++;
    if(index > 4){
        index = 0;
    }
    showCurrentDot();
    var newLeft;
    if(wrap.style.left === "-6780px"){
        newLeft = -2260;
    }else{
        newLeft = parseInt(wrap.style.left)-1130;
    }
    wrap.style.left = newLeft + "px";
}
function prev_pic () {
    index--;
    if(index < 0){
        index = 4;
    }
    showCurrentDot();
    var newLeft;
    if(wrap.style.left === "0px"){
        newLeft = -4520;
    }else{
        newLeft = parseInt(wrap.style.left)+1130;
    }
    wrap.style.left = newLeft + "px";
}

var index = 0;
var dots = document.getElementsByTagName("span");
function showCurrentDot () {
    for(var i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = "on";
}
