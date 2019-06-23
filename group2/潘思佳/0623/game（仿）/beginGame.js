var battery = $("#battery");
var score = $("#score");
var restart = $("#restart");
var startButton = $("#startButton");

var batteryInput = battery.children[0];
var clientWidth = document.documentElement.clientWidth;
var fishList = [];

var lock = false;

var scoreText = 0;

var timer = null;

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function inputWord(evt) {
    var e = evt || window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode >= 65 && keyCode <= 90) {
        batteryInput.innerHTML = String.fromCharCode(keyCode);
    }
}

function createFish() {
    var randomWord = String.fromCharCode(65 + Math.round(Math.random() * 24));
    var randomLeft = Math.round(Math.random() * (clientWidth - 100));

    var fish = document.createElement("div");
    fish.className = "fish";
    fish.innerHTML = randomWord;
    fish.style.left = randomLeft + "px";
    fish.style.top = 0;
    document.body.appendChild(fish);

    var fishTimer = setInterval(function() { fishMove(fish, fishTimer) }, 50);

    fishList.push({
        fishTimer: fishTimer,
        fish: fish,
        randomWord: randomWord,
        randomLeft: randomLeft
    });
}

function fishMove(ele, fishTimer) {
    var topDis = parseInt(ele.style.top);
    topDis += 5;
    if (topDis > 400) {
        clearInterval(fishTimer);
        ele.className += " die";
        var disapperTime = setTimeout(function() {
            removeFish(ele, disapperTime);
        }, 1000);
    }
    ele.style.top = topDis + "px";
}

function removeFish(ele, disapperTime) {
    ele.remove();
    clearTimeout(disapperTime);
    for (var i = 0; i < fishList.length; i++) {
        if (fishList[i].fish === ele) {
            fishList.splice(i, 1);
            break;
        }
    }
}

function createBullet() {
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.top = battery.offsetTop - 30 + "px";
    ele.style.left = clientWidth / 2 - 15 + "px";

    document.body.appendChild(ele);

    for (var i = 0; i < fishList.length; i++) {
        if (batteryInput.innerHTML === fishList[i].randomWord) {
            clearInterval(fishList[i].fishTimer);
            setTimeout(function() {
                ele.style.left = fishList[i].randomLeft + 35 + "px";
                ele.style.top = fishList[i].fish.offsetTop + 50 + "px";
            }, 5);
            setTimeout(function() {
                ele.remove();
                removeFish(fishList[i].fish);
            }, 500);

            scoreText++;
            score.innerHTML = scoreText;
            break;
        }
    }
}

function clickHandler() {
    if (lock) { //在倒计时时不可以再次点击start
        return;
    }
    lock = true;

    //将不合法输入排除
    var timeArr = proofreading(hourBox.value, minuteBox.value, secondBox.value);

    if (!timeArr) restartGame();

    //计算相对时间
    var tempTime = new Date().getTime() + parseInt(timeArr[0]) * 3600 * 1000 + parseInt(timeArr[1]) * 60 * 1000 + parseInt(timeArr[2]) * 1000;
    var targetTime = new Date(tempTime);

    //开始倒计时

    timer = setInterval(createFish, 1000);

    var interValTime = setInterval(function() {
        countDown(targetTime, interValTime);
    }, 200);
}

//倒计时
function countDown(targetTime, interValTime) {
    var relativeTime = targetTime - Date.now();
    if (relativeTime <= 0) {
        clearInterval(interValTime);
        clearInterval(timer);
        lock = false;
        return false;
    }
    hour_box.innerHTML = judgeNumber(parseInt((relativeTime) / 1000 / 3600));
    minute_box.innerHTML = judgeNumber(parseInt((relativeTime) / 1000 / 60 % 60));
    second_box.innerHTML = judgeNumber(parseInt((relativeTime) / 1000 % 60));
}

function judgeNumber(num) {
    return num < 10 ? "0" + num : "" + num;
}

function proofreading(temp_hour, temp_minute, temp_second) {
    var arr = [temp_hour, temp_minute, temp_second];
    if (arr.some(function(e) {
            if (e < 0) return true;
        })) {
        alert("请输入正整数");
        return false;
    }
    if (arr.every(function(e) {
            if (e === "") return true;
        })) {
        alert("请至少输入一个值");
        return false;
    }
    arr[0] === "" ? arr[0] = 0 : arr[0];
    arr[1] === "" ? arr[1] = 0 : arr[1];
    arr[2] === "" ? arr[2] = 0 : arr[2];
    return arr;
}

function restartGame() {
    window.location.reload();
}

document.addEventListener("keydown", inputWord);
document.addEventListener("keydown", createBullet);
startButton.addEventListener("click", clickHandler);
restart.addEventListener("click", restartGame);