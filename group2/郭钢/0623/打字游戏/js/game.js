function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var mogu_list = $("#mogu");
var letterArry = [];
var count = 0;
var countValue = $("#core").children[0].children[0];
var time_r = $("#core").children[1].children[0];
var timeValue = time_r.innerHTML;
var overGame = $("#gameOver");
var overCore = overGame.children[1];
var reStart = $("#startAgain");
var anotherStart = $("#anotherAgain")
console.log(timeValue);


// 游戏结束的函数
timeDown = setInterval(function () {
    time_r.innerHTML = --timeValue;
    if (timeValue <= 0) {
        clearInterval(timeDown);
        overGame.style.display =" block";
        overCore.innerHTML += count;
        clearInterval(sunGo)
    }
}, 1000)

// 游戏结束重新加载页面
reStart.onclick = function(){
    window.location.reload();
}
anotherStart.onclick = function(){
    window.location.reload();
}

// 生成随机字母
function letterChange() {
    var num = 65 + Math.round(Math.random() * 25);
    var letter = String.fromCharCode(num);
    return letter;
}


// 太阳光自动生成
function sunCreate() {
    var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
    var ele = document.createElement("div");
    var widthSun = Math.round(Math.random() * (clientWidth - 100));
    ele.className = "sun";
    ele.style.left = widthSun + "px";
    ele.style.top = 0;
    ele.innerHTML = randomLetter;
    document.body.appendChild(ele);
    var timer = sunRemove(ele)
    letterArry.push({
        ele: ele,
        letter: randomLetter,
        left: widthSun,
        timer: timer,
    })
}


// 把生成在太阳光在数组中移除
function sunCordRemove(ele) {
    for (var i = 0, rec; rec = letterArry[i++];) {
        if (rec.ele === ele) {
            letterArry.splice(i - 1, 1);
            break;
        }
    }
}


// 太阳光移动以及太阳光掉落到终点时消失
function sunRemove(ele) {
    var num = 0;
    var timer = null;
    timer = setInterval(function () {
        num += 5;
        ele.style.top = num + "px";
        if (num >= 530) {
            if(timeValue>0) countValue.innerHTML = --count;
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            setTimeout(function () {
                sunCordRemove(ele);
                ele.remove();
            }, 1000)
        }
    }, 100)
    return timer;
}



// 按下按键生成子弹
function bulletCreate(evt) {
    var e = evt || event;
    var key = String.fromCharCode(e.keyCode);
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth / 2 - 15 + "px";
    ele.style.top = mogu_list.offsetTop - 20 + "px";
    document.body.appendChild(ele);

    for (var i = 0, rec; rec = letterArry[i++];) {
        if (rec.letter === key) {
            if(timeValue>0)  countValue.innerHTML = ++count;
            clearInterval(rec.timer);
            sunCordRemove(rec.ele);

            setTimeout(function () {
                ele.style.left = rec.left + 35 + "px";
                ele.style.top = rec.ele.offsetTop + 50 + "px";
            }, 5)
            setTimeout(function () {
                rec.ele.remove();
                ele.remove();
            }, 1000)
            break;
        }
    }
}

// 太阳光上的随机字母
function moguRandmoLetter(evt) {
    var e = evt || event;
    var moguValue = mogu_list.children[0];
    if (e.keyCode >= 65 && e.keyCode <= 90) moguValue.innerHTML = String.fromCharCode(e.keyCode);
}

// 按下按键执行函数
document.onkeydown = function (evt) {
    moguRandmoLetter(evt);
    bulletCreate(evt);
}

// 阳光生成计时器
var sunGo;
sunGo = setInterval(
    sunCreate, 500)


// 页面尺寸改变
window.onresize = function () {
    clientWidth = document.documentElement.clientWidth;
}