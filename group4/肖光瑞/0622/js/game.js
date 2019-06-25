/**
 * 
 * @param {*} selector 
 */
function $(selector) {
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

/**
 * 
 * @param {*} max 
 * @param {*} min 
 */
function random(max, min) {
    return min + Math.round(Math.random() * (max - min))
}

var cannon = $("#cannon"),
    txt = cannon.children[0],
    letterArray = [],
    box = $("#box");
var clientWidth = document.documentElement.clientWidth;
var countNum = $("#count-num");
var count = 0;
var restart = $("#restart"),
    restartSpan = restart.children[0],
    restartP = restart.children[1];
var timer1 = 0;

function createRandomLetter() {
    var randomLetter = String.fromCharCode(random(90, 65));
    var randomLeft = random((clientWidth - 100), 0);
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomLetter;
    ele.style.top = 0;
    ele.style.left = randomLeft + "px";
    box.appendChild(ele);

    var timer = eleMove(ele);
    letterArray.push({
        timer: timer,
        ele: ele,
        letter: randomLetter,
        left: randomLeft
    })
}

function removeRecond(ele) {
    for (var i = 0, rec; rec = letterArray[i++];) {
        if (rec.ele === ele) {
            letterArray.splice(i - 1, 1);
            break;
        }
    }
}

function eleMove(ele) {
    var numTop = 0,
        timer = 0;
    timer = setInterval(function () {
        numTop += 5;
        ele.style.top = numTop + "px";
        if (numTop >= 500) {
            clearInterval(timer);
            timer = 0;
            ele.className += " die";
            setTimeout(() => {
                removeRecond(ele)
                ele.remove();
            }, 1000);
        }
    }, 50)
    return timer;
}

function createBullet(evt) {
    var e = evt || window.event;
    var key = String.fromCharCode(e.keyCode || e.which);

    var index = 0;
    for (var i = 0, rec; rec = letterArray[i++];) {
        if (rec.letter === key) {
            var ele = document.createElement("div");
            ele.className = "bullet";
            ele.style.left = clientWidth / 2 - 15 + "px";
            ele.style.top = cannon.offsetTop - 30 + "px";
            document.body.appendChild(ele);
            count++;
            clearInterval(rec.timer);
            removeRecond(rec.ele);
            setTimeout(function () {
                ele.style.left = rec.left + 35 + "px";
                ele.style.top = rec.ele.offsetTop + 50 + "px";
            })
            setTimeout(function () {
                rec.ele.remove();
                ele.remove();
            }, 800)
            break;
        } else {
            index++;
            if (index % letterArray.length == 0) {
                count > 0 ? count-- : count = 0;
            }
        }
    }
    countNum.innerHTML = `sorce:${count}`;
}


function handlerEnterLetter(evt) {
    var e = evt || window.event;
    var keyCode = e.keycode || e.which;
    if (keyCode >= 65 && keyCode <= 90) {
        keyCode = String.fromCharCode(keyCode);
        txt.innerHTML = keyCode;
    }
}


setTimeout(function () {
    clearInterval(timer1)
    while (box.hasChildNodes()) {
        box.removeChild(box.firstChild)
    }

    restartSpan.innerHTML = `sorce:${count}`;
    restart.style.display = "block";
}, 5000)

restartP.onclick = function () {
    location.reload();
}
document.onkeydown = function () {
    handlerEnterLetter();
    createBullet();
}

timer1 = setInterval(createRandomLetter, 1000);

window.onresize = function () {
    clientWidth = document.documentElement.clientWidth;
}