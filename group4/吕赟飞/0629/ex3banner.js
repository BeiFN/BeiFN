var index = 1;

var next_btn = $(".button-next");
var prev_btn = $(".button-prev");
var sliders = $(".slider");
var wrapper = $(".wrapper");
var container = $(".container");
var liList = Array.from($("li"));
var prevLi = null;

function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

for (var i = 0; i < liList.length; i++) {
    liList[i].addEventListener("click", liClickHandler);
}

prevLi = liList[0];

function liClickHandler() {
    index = liList.indexOf(this) + 1;
    imgMove(-1280 * index, wrapper, "left");
    liBG();
}

next_btn.addEventListener("click", function () {
    if (index === sliders.length - 2) {
        index = 1;
        wrapper.style.left = 0;
    } else {
        index++;
    }
    liBG();
});

prev_btn.addEventListener("click", function () {
    if (index === 1) {
        index = sliders.length - 2;
        wrapper.style.left = "-7680px";
    } else {
        index--;
    }
    liBG();
});


function liBG() {
    if (prevLi) prevLi.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    prevLi = liList[index - 1];
    prevLi.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}


container.addEventListener("click", function (evt) {
    var e = evt || window.event;
    var target = e.target || e.srcElement;
    if (target === next_btn || prev_btn) {
        imgMove(-1280 * index, wrapper, "left");
    }
});


function imgMove(target, dom, attr) {
    clearInterval(dom.timer);
    var target = attr === "opacity" ? target * 100 : target;
    dom.timer = setInterval(function () {
        var iNow = attr === "opacity" ? parseInt(getComputedStyle(dom)[attr] * 100) : parseInt(getComputedStyle(dom)[attr]);
        var speed = (target - iNow) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (target === iNow) {
            clearInterval(dom.timer);
        } else {
            dom.style[attr] = attr === "opacity" ? (iNow + speed) / 100 : iNow + speed + "px"
        }
    }, 16);
}