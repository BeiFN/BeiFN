var pao = document.getElementById("pao");
var fish = document.getElementById("fish");
var client_width = document.documentElement.clientWidth;
var letterArray = [];

// 创建鱼
setInterval(createFish, 1000);

function createFish() {
    // var e = evt || event;
    var fish = document.createElement("div");
    fish.className = "fish";
    var randomLeft = Math.round(Math.random() * (document.documentElement.clientWidth - 160)) + "px";
    fish.style.left = randomLeft;
    var span = document.createElement("span");
    //调用创造字母函数
    span.id = "f_span";
    fish.appendChild(span);
    // document.body.appendChild(fish);
    //获得随机字母
    var randomLetter1 = randomLetter();
    span.innerHTML = randomLetter1;
    timer = fishMove(fish);
    letterArray.push({
        timer: timer,
        fish: fish,
        letter: randomLetter1,
        left: randomLeft
    })
}

//判断是否存在重复字母，有了则删除。

function removeRecord(ele) {
    for (var i = 0, rec; rec = letterArray[i++];) {
        if (rec.ele = ele) {
            letterArray.splice(i - 1, 1);
        
        }
    }

}



//鱼获得随机字母
function randomLetter() {
    var shu = 65 + Math.round(Math.random() * 25)
    var letter = String.fromCharCode(shu);
    return letter;
    // console.log(fish.children[0].innerHTML);
}

function fishMove(ele) {

    var numTop = 0;
    var timer = null;
    timer = setInterval(function () {
        numTop += 5;
        ele.style.top = numTop + "px";
        document.body.appendChild(ele);
        if (numTop >= 600) {
            clearInterval(timer);
            // 清空变量，让变量内的数据被垃圾回收机制回收;
            timer = null;
            ele.className += " die";
            // 动画运行结束删除元素;
            setTimeout(function () {
                removeRecord(ele)
                ele.remove();
            }, 1000)
        }
    }, 50)
    return timer;

}




//文字输入
document.onkeydown = function (evt) {

    handlerEnterLetter(evt);

    createBullet(evt);
}

function handlerEnterLetter(evt) {
    var e = evt || event;
    var code = e.keyCode || e.witch;
    if (code >= 65 && code <= 90) {
        code = String.fromCharCode(code);
        pao.children[0].innerHTML = code;
    } else return false;
}
// 创建子弹
function createBullet(evt) {
    var e = evt || event;
    var key = String.fromCharCode(e.keyCode || e.which);
    var ele = document.createElement("div");
    ele.className = "bullet";
    // console.log(div);

    ele.style.left = document.documentElement.clientWidth / 2 -25  + "px";
    ele.style.top = pao.offsetTop -50 + "px";
    document.body.appendChild(ele);

    //判断是否存在相应的字母，在letter里面判定
    for (var i = 0, rec; rec = letterArray[i++];) {
        // 如果存在页面中鱼，代表字母和当前输入的字母一样
        if (rec.letter === key) {
            clearInterval(rec.timer);
            removeRecord(rec.fish);
            return false;
            // rec.ele.remove();
            // console.log(111111111);

            //给子弹设置一个位置；
            setTimeout(function () { 
                ele.style.left = rec.fish.offsetLeft + 50 + "px";
                // console.log(ele.style.left);
                ele.style.top = rec.fish.offsetTop + 60 + "px";
                // console.log(rec.ele.style.top);
            },.5)
            break;
            //删除动画；
            setTimeout(function () {
                rec.fish.remove();
                fish.remove();
            },800)
            break;
        }
    }
}

window.onresize = function () {
    clientWidth = document.documentElement.clientWidth;
}