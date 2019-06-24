var ele_pao = document.getElementById("pao");
var btn = document.getElementById("btn")
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var letterindex = [];
var rest = 60;
var speed = 1000;
var level = 1;
var hp = 5;
var points = 0;




function createfish() {
    var randomletter = String.fromCharCode(65 + Math.round(Math.random() * 25));
    var randomposition = Math.round(Math.random() * (clientWidth - 100));
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomletter;
    ele.style.left = randomposition + "px";
    document.body.appendChild(ele);
    var timer = fishdrop(ele)
    letterindex.push({
        element: ele,
        ele_position: randomposition,
        ele_content: randomletter,
        stop: timer
    })
    console.log(letterindex)
}

function Initiate() {
    btn.style.display = "none"
    Points.innerHTML = "得分：" + points;
    Level.innerHTML = "当前" + level + "/10关"
    Hp.innerHTML = "还剩" + hp + "点hp";
    setInterval(createfish, speed);
    setInterval(function () {
        rest--;
        TheRest.innerHTML = rest + "s"
        if (rest === 0) win();
    }, 1000);

}

function miss() {
    Hp.innerHTML = "还剩" + --hp + "点hp";
    setTimeout(function () {
        if (hp <= 0) {
            fail()
        }
    }, 0.000001);
}

function win() {
    if (confirm("是否继续挑战")) {

        level++;
        speed -= 100;
        rest = 60;
    } else { location.reload(); }
}

function fail() {
(confirm("是否重新来过")) ? location.reload() :  window.close() ;
}

function fishdrop(ele) {
    var count = 0;
    var timer = null;
    timer = setInterval(function () {
        count += 7;
        ele.style.top = count + "px";
        if (count === 546) {
            miss();
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            setTimeout(function () {
                removeindex(ele)
                ele.remove();
            }, 777)
        }
    }, 50)
    return timer;
}

function removeindex(ele) {
    for (var i = 0, rec; rec = letterindex[i++];) {
        if (ele = rec.element) {
            letterindex.splice(i - 1, 1);
            break;
        }
    }
}

function createbullet(evt) {
    var e = evt || window.event;
    var key = String.fromCharCode(e.keyCode || e.which);
    var ele1 = document.createElement("div");
    ele1.className = "bullet";
    ele1.style.left = clientWidth / 2 - 15 + "px";
    ele1.style.top = ele_pao.offsetTop - 30 + "px";
    document.body.appendChild(ele1);
    for (var i = 0, index; index = letterindex[i++];) {
        if (key === index.ele_content) {
            points++;
            Points.innerHTML = "得分：" + points;
            clearInterval(index.stop);
            removeindex(index.element)

            setTimeout(function () {
                ele1.style.left = index.ele_position + 35 + "px";
                ele1.style.top = index.element.offsetTop + 50 + "px";
            }, 5)
            setTimeout(function () {
                index.element.remove();
                ele1.remove();
            }, 800)
            break;
        }
        else {
            miss();
            break;
        }
    }
}

document.onkeydown = function (evt) {
    createbullet(evt)
}
btn.onclick = Initiate