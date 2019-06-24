// 初始化
init();
function init() {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", clickHandler);
}
var ipt = document.getElementById("ipt");
// 点击事件
var timeInterval = null;
var startGame = null;
function clickHandler(e) {
    if(timeInterval || ipt.value.length === 0) return false;
    startGame = setInterval( createRandomLetter , speedTime);
    var timeArr = ipt.value.split(":");
    ipt.value = "";
    //修正输入错误
    if(timeArr.length === 1){
        timeArr[2] = timeArr[0];
        timeArr[0] = timeArr[1] = 0;
    }else if(timeArr.length === 2){
            timeArr[2] = timeArr[1];
            timeArr[1] = timeArr[0];
            timeArr[0] = 0;
    }
    var now = new Date().getTime();
    var targetTime = now + timeArr[0] * 60 * 60 * 1000 + timeArr[1] * 60 * 1000 + timeArr[2] * 1000;
    timeInterval = setInterval(function () {
        getCount(targetTime);
    }, 200);
}

// 计算时间
function getCount(targetTime) {
    var now = new Date().getTime();
    var rest = targetTime - now;
    if (rest <= 0) {
        clearInterval(startGame);
        for(var i= 0; i < letterArray.length; i++)
            letterArray[i].ele.remove();
        alert("游戏结束！您的得分为" + count + "分");
        count = 0;
        score.innerHTML = 0;
        ele_pao_text.innerHTML = "";
        clearInterval(timeInterval);
        timeInterval = null;
        startGame = null;
        return false;
    }
    var arr = [];
    arr[0] = Math.floor(rest / 1000 / 60 / 60);
    arr[1] = Math.floor(rest / 1000 / 60 % 60);
    arr[2] = Math.floor(rest / 1000 % 60);
    writeTimer(arr);
}

// 写入页面
function writeTimer(arr) {
    var hour = document.querySelector(".hour");
    var minute = document.querySelector(".minute");
    var second = document.querySelector(".second");
    hour.textContent = arr[0] < 10 ? "0" + arr[0] : "" + arr[0];
    minute.textContent = arr[1] < 10 ? "0" + arr[1] : "" + arr[1];
    second.textContent = arr[2] < 10 ? "0" + arr[2] : "" + arr[2];
}

var speed = document.getElementById("speed");
var speedTime = 500; //速度默认为500ms
speed.onkeydown = function (evt) {
    var e = evt || window.event;
    if(e.keyCode === 13){
        clearInterval(startGame);
        clearInterval(timeInterval);
        speedTime = speed.value * 100;
        speed.value = "";
    }
}

ipt.onkeydown = function (evt) {
    var e = evt || window.event;
    if(e.keyCode === 13 && !timeInterval){
        ipt.blur();
        clickHandler();
    }
}