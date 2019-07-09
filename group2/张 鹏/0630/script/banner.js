var nextBtn = document.getElementById("btnright");
var prevBtn = document.getElementById("btnleft");
var banner = document.querySelector(".banner");
var ul = banner.querySelector("ul");
var list = banner.querySelectorAll("li");
var p1 = banner.querySelector("#p1");
var aList = p1.querySelectorAll("a");
var index = 0;
var timer = null;
changeColor(aList);
nextBtn.addEventListener("click", handelNext);
prevBtn.addEventListener("click", handelPrev);
timer = setInterval(handelNext, 2000);
function handelNext() {
    if (index === list.length - 1) {
        ul.style.left = 0;
        index = 1;
    } else {
        index++;
    }
    console.log(index);
    changeColor(aList);
    move(-678 * index, ul, "left");
}
function handelPrev() {
    if (index === 0) {
        ul.style.left = -((list.length - 1) * 678) + "px";
        index = list.length - 2;
    } else {
        index--;
    }
    move(-678 * index, ul, "left");

}
function move(target, dom, attr) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
        target = (attr === "opacity" ? target * 100 : target)
        var speed = (target - iNow) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (target === iNow) {
            clearInterval(dom.timer)
        } else {
            dom.style[attr] = (attr === "opacity" ? (iNow + speed) / 100 : iNow + speed + "px")
        }
    }, 30)
}
function changeColor(dom) {
    for (var i = 0; i < dom.length; i++) {
        dom[i].style.backgroundColor = "";
    }
    if (index === 0 || index == list.length - 1) {
        dom[0].style.background = "#fff";
    } else {
        dom[index].style.backgroundColor = "#fff";
    }
}
banner.addEventListener("mouseenter", stopBanner);
banner.addEventListener("mouseleave", continueBanner);
function stopBanner() {
    clearInterval(timer);
}
function continueBanner() {
    timer = setInterval(handelNext, 2000);
}