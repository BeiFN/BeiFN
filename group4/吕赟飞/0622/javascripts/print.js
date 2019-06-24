/**
 * @var ele_pao 炮台
 * 
 * 
 */

var ele_pao = $("#pao");
var ele_ban = $(".box");

var sTime = $("#sTime");
var btn = $("#btn");
var box = $("#box");
var hour_box = $("#hour_box");
var minute_box = $("#minute_box");
var second_box = $("#second_box");
var score = $("#score");
var restart = $("#restart");

var count = 0;

var ele_pao_text = ele_pao.children[0];
// 获取屏幕的宽度
var clientWidth = document.documentElement.clientWidth;
// 数组存储随机鱼的信息
var LetterArr = [];

// 选择器函数封装
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function removeRecord(ele) {
    for (var i = 0, rec; rec = LetterArr[i++];) {
        if (rec.ele = ele) {
            LetterArr.splice(i - 1, 1);
            break;
        }
    }
}

// 创建子弹
function createBullet(evt) {
    var e = evt || event;
    var key = String.fromCharCode(e.keyCode || e.which);

    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.left = clientWidth / 2 - 15 + "px";
    bullet.style.top = ele_pao.offsetTop - 30 + "px";

    document.body.appendChild(bullet);

    for (var i = 0, rec; rec = LetterArr[i++];) {
        if (rec.letter === key) {

            clearInterval(rec.timer);
            removeRecord(rec.ele);
            setTimeout(function () {
                bullet.style.left = rec.left + 35 + "px";
                bullet.style.top = rec.ele.offsetTop + 50 + "px";
            }, 16);

            setTimeout(function () {
                rec.ele.remove();
                bullet.remove();
            }, 800);
            count += 2;
            break;
        }
    }


}

// 随机创建鱼
function createRandomLetter() {
    var randomLetter = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    var randomLeft = Math.random() * (clientWidth - 100);

    var fish = document.createElement("div");
    fish.className = "fish";
    fish.innerHTML = randomLetter;
    fish.style.left = randomLeft + "px";
    document.body.appendChild(fish);

    var timer = fishMove(fish);

    LetterArr.push({
        timer: timer,
        ele: fish,
        letter: randomLetter,
        left: randomLeft
    });

}
// 鱼移动
function fishMove(ele) {
    var fishTop = 0;
    var timer = null;
    timer = setInterval(function () {
        fishTop += 5;
        ele.style.top = fishTop + "px";
        if (fishTop >= 450) {
            clearInterval(timer);
            timer = null;
            ele.className += " die";

            setTimeout(function () {
                removeRecord(ele);
                ele.remove();
            }, 1000)
        }
    }, 50)
    return timer;
}


// 炮台文字的输入功能
function createLetter(evt) {
    var e = evt || event;
    var keyCode = e.keyCode || e.which;

    if (keyCode >= 65 && keyCode <= 90) {
        ele_pao_text.innerHTML = String.fromCharCode(keyCode);
    }

}

// 屏幕尺寸改变时 重新计算宽度
window.onresize = function () {
    clientWidth = document.documentElement.clientWidth;
}

restart.onclick = function () {
    window.location.reload();
}

btn.onclick = function () {

    // 事件触发 炮台
    document.onkeydown = function (evt) {
        createLetter(evt)
        createBullet(evt);
        score.children[1].innerHTML = count;
    };

    // 定时器 鱼
    var timer = null;
    timer = setInterval(createRandomLetter, 1000);

    // 计时器
    var timeStr = sTime.value;
    var arr = timeStr.split(":");

    var hour = Number(arr[0]),
        minute = Number(arr[1]),
        second = Number(arr[2]);
    var reduce = hour * 3600 + minute * 60 + second;

    var time = setInterval(function () {
        reduce--;
        if (reduce < 0) {
            clearInterval(time);
            clearInterval(timer);
            for (var i = 0; i < LetterArr.length; i++) {
                clearInterval(LetterArr[i].timer);
                LetterArr[i].ele.remove();
            }
            return;
        }
        var seconds = parseInt(reduce % 60);
        var minutes = parseInt(reduce / 60 % 60);
        var hours = parseInt(reduce / 3600);
        hour_box.innerHTML = hours < 10 ? "0" + hours : "" + hours;
        minute_box.innerHTML = minutes < 10 ? "0" + minutes : "" + minutes;
        second_box.innerHTML = seconds < 10 ? "0" + seconds : "" + seconds;
    }, 1000)

};