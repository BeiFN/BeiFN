var imgCon = document.getElementById("imgCon");
var imgBox = document.getElementById("imgbox");
var leftBn = document.getElementById("leftBn");
var rightBn = document.getElementById("rightBn");

var position = 0;
var lock = true;

leftBn.addEventListener("click", clickHandeler);
rightBn.addEventListener("click", clickHandeler);
imgBox.addEventListener("mouseenter", mouseHandler);
imgBox.addEventListener("mouseleave", mouseHandler);

var time = setInterval(autoMove, 3000);

//鼠标点击事件
function clickHandeler(e) {
    if (!lock) return;
    if (imgCon.style.transition = "none") imgCon.style.transition = "all 0.5s";
    if (this.id === "leftBn") {
        position--;
        if (position < 0) {
            imgCon.style.transition = "none";
            position = 6;
        }
    } else if (this.id === "rightBn") {
        position++;
        if (position > 6) {
            imgCon.style.transition = "none";
            position = 0;
        }
    }
    imgMove();
}

//鼠标覆盖停止轮播
function mouseHandler(e) {
    if (e.type == "mouseenter") {
        clearInterval(time);
    } else if (e.type == "mouseleave") {
        time = setInterval(autoMove, 3000);
    }
}

//图片移动
function imgMove() {
    lock = false; //安全锁，防止连点计数混乱
    setTimeout(function() { lock = true; }, 500);

    imgCon.style.left = -position * 1130 + "px";

    if (imgCon.style.transition === "none 0s ease 0s") { //解决第一张图双倍等待时间问题
        setTimeout(function() {
            imgCon.style.transition = "all 0.5s";
            if (position === 0) position++;
            if (position === 6) position--;
            imgCon.style.left = -position * 1130 + "px";
        }, 20);
    }
    clearTimeout();
}

//自动轮播
function autoMove() {
    // console.log(imgCon.style.transition)
    // getComputedStyle();
    if (!imgCon.style.transition) {
        imgCon.style.transition = "all 0.5s"
    }
    if (imgCon.style.transition == "none") {
        imgCon.style.transition = "all 0.5s";
    }
    if (position > 6) {
        imgCon.style.transition = "none"; //队尾取消动画，跳至队头
        position = 0;
    }
    imgMove();

    position++;

}
// 初始设置;
autoMove();