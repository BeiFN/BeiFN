var container = $("#container");
var pre = $(".pre");
var next = $(".next");
var wrap = $("#wrap");
var pic = $("#pic");
var num = $(".num");
var timer = null;
var index = 0;
container.addEventListener("mouseover", handlerMouseOver);
container.addEventListener("mouseout", handlerMouseOut);
pre.addEventListener("mouseover", handlerPreMouseOver);
pre.addEventListener("mouseout", handlerPreMouseOut);
next.addEventListener("mouseover", handlerNextMouseOver);
next.addEventListener("mouseout", handlerNextMouseOut);
pre.addEventListener("click", turnPre);
next.addEventListener("click", turnNext);
container.addEventListener("click", handlerContainer);
function autoPlay() {
    var count = 0;
    var _index = 0;
    timer = setInterval(function () {
        count++;
        if (_index = (count % pic.length)) {
            if (_index === 1) {
                wrap.style.left = 0;
            }
            move(-1130 * _index, wrap, "left");
            changSpanBg(_index);
        }

    }, 3000);
}
function handlerMouseOver() {
    pre.style.display = "block";
    next.style.display = "block";
    clearInterval(timer);
}
function handlerMouseOut() {
    pre.style.display = "none";
    next.style.display = "none";
    autoPlay();
}
function handlerPreMouseOver() {
    pre.style.background = "url(" + "https://static.zcool.cn/git_z/z/widget/slider/images/svg/left_arrowhover.svg?v=2" + ")";
}
function handlerPreMouseOut() {
    pre.style.background = "url(" + "https://static.zcool.cn/git_z/z/widget/slider/images/svg/left_arrow.svg?v=2" + ")";
}
function handlerNextMouseOver() {
    next.style.background = "url(" + "https://static.zcool.cn/git_z/z/widget/slider/images/svg/right_arrowhover.svg?v=2s" + ")";
}
function handlerNextMouseOut() {
    next.style.background = "url(" + "https://static.zcool.cn/git_z/z/widget/slider/images/svg/right_arrow.svg?v=2" + ")";
}
function turnNext() {
    clearInterval(timer);
    if (index === pic.length - 1) {
        index = 1;
        wrap.style.left = 0;
        changSpanBg(index);
    } else {
        index++;
        changSpanBg(index);
    }
}
function turnPre() {
    clearInterval(timer);
    if (index === 0) {
        index = pic.length - 2;
        wrap.style.left = "-5650" + "px";
        changSpanBg(index);
    } else {
        index--;
        changSpanBg(index);
    }
}
function handlerContainer(evt) {
    var e = evt || event;
    if (e.target === pre || e.target === next) {
        move(-1130 * index, wrap, "left");
    }
}
function changSpanBg(index) {
    for (var i = 0; i < num.children.length; i++) {
        num.children[i].style.backgroundColor = "";
    }
    if (index < pic.length - 1) {
        num.children[index].style.backgroundColor = "yellowgreen";
    }
    if (index === pic.length - 1) {
        num.children[0].style.backgroundColor = "yellowgreen";
    }
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
    }, 50)
}
