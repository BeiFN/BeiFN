/**
 * @man 需要被拖拽的对象
 * @btn 回放功能按钮
 * @_none 鼠标移动时的处理函数
 * @road 储存拖拽所经过的坐标数据
 * @timer 回放定时器
 */
//获取DOM元素
var man = document.getElementById("man");
var btn = document.getElementsByTagName("button")[0];
var _none = null;
var road = [];
var timer = null;
//鼠标点击选中
function handlerDragStart(evt){
    var e = evt || window.event;
    console.log("选中了");
    document.removeEventListener("mousemove", _none);
    document.addEventListener("mousemove", _none = handlerDragMove.bind(false,{offsetX:e.offsetX,offsetY:e.offsetY}));
}
//鼠标拖拽移动
function handlerDragMove(_offset,evt){
    var e = evt || window.event;
    var numLeft = e.clientX - _offset.offsetX;
    var numTop = e.clientY - _offset.offsetY;
    man.style.left =  numLeft + "px";
    man.style.top = numTop + "px";
    road.push({
        left: numLeft,
        top: numTop,
    });
}
//鼠标松开停止
function handlerDragEnd(){
    console.log("停止了");
    document.removeEventListener("mousemove", _none);
}
//按钮按下
function handlerjoke(){
    var choose = confirm("你天真吗？");
    var number = road.length - 1;
    if(choose === true){
        timer = setInterval(function(){
            man.style.left = road[number].left + "px";
            man.style.top = road[number].top + "px";
            number--;
            if(number === 0){
                clearInterval(timer);
                road.length = 0;
            }
        },40)
    }else{
        window.location.href = "./game.html";
    }
}


//事件监听
man.addEventListener("mouseup",handlerDragEnd);
man.addEventListener("mousedown",handlerDragStart);
btn.addEventListener("click",handlerjoke);