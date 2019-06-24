
var pao = $("#pao")
var body = $("body")
var start = $("#start")
var txtBox = $("#box")
var timeSpan = $("#time")
var rest = $("#restart")
var trueCount = $("#trueCount")
var falseCount = $("#falseCount")


function $(selector) {
    var e = null;
    return (e = document.querySelectorAll(selector)).length === 1 ? e[0] : e
}

//这里装里面的字 子弹要移动 所以要记录鱼的left 还有鱼这个元素来击中删除，还有他的定时器
var arr = []
var rightCount = 0;
var wrongCount = 0;
var timeId;
var sudo = 800;
var time = 20;
var level = 1;

function createYu() {
    // console.log(document.documentElement.clientWidth)
    // console.log(pao.offsetLeft);
    timeId = setInterval(function () {
        var letter = String.fromCharCode(parseInt(Math.random() * 26) + 65)
        var div = document.createElement("div")
        div.className = "yu"
        div.innerHTML = letter
        var leftWidth = (Math.random() * ((document.documentElement.clientWidth) - 100))
        div.style.left = leftWidth + "px"
        //控制高度 返回定时器  用于在输入正确的时候就关闭
        var topInterval = topMove(div);
        body.appendChild(div)
        arr.push({
            itvl: topInterval,
            ele: div,
            left: leftWidth,
            letter: letter
        })
    }, sudo)
}

function topMove(div) {
    var top = 0;
    var tId = setInterval(function () {
        top += 5;
        div.style.top = top + "px";
        div.style.transform = "rotate(0deg)"
        if (top == 400) {
            //已经清除了定时器 他不移动了 然后旋转
            div.style.transition = "all 1s"
            div.style.transform = "rotate(180deg)"
            //错误数++
            wrongCount++;
            falseCount.innerHTML = wrongCount;
            //删除数组中的元素
            removeArrEle(div);
            setTimeout(function () {
                //删除元素 
                div.remove();
            }, 1000)
            clearInterval(tId)
            tId = null;
        }
    }, 50)
    //在没有到达线的时候要删除定时器用这个id
    return tId;
}

function removeArrEle(div) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ele === div) {
            //一个值 两个值是删除  三个值是替换
            arr.splice(i, 1);
            break;
        }
    }
}

function createBullet(letter) {


    // var i = checkRight(letter);
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = document.documentElement.clientHeight - 160 + "px"
    bullet.style.left = pao.offsetLeft + 10 + "px";
    body.appendChild(bullet)
    // console.log(i)
    for (var i = 0, rec; rec = arr[i++];) {
        if (rec.letter == letter) { //这里判断输入的和现在里面有的是否一致
            // console.log(rec);
            clearInterval(rec.itvl)
            //炮弹移动
            danMove(bullet, i - 1);
            rightCount++;
            trueCount.innerHTML = rightCount;

            setTimeout(function () {
                //删除子弹
                bullet.remove();
                //删除元素
                rec.ele.remove();
                //删除数组中的这个元素
                removeArrEle(rec.ele);
            }, 300)
            break;
        } else {

        }
    }
}

// //检查输入的是否一致函数
// function checkRight(letter) {
//     for (var i = 0; i < arr.length; i++) {
//         //如果输入正确
//         if (letter == arr[i].letter) {
//             return i;
//         }
//     }
//     return false;
// }
//炮弹移动
function danMove(bullet, i) {
    bullet.style.transition = "all .3s"
    setTimeout(function () {
        bullet.style.top = arr[i].ele.offsetTop + 35 + "px"
        bullet.style.left = arr[i].left + 35 + "px";
    }, 5)
}

// window.onload = createYu;



document.onkeydown = function (evt) {
    var e = evt || event;
    if (evt.keyCode >= 65 && evt.keyCode <= 90) {
        var letter = String.fromCharCode(evt.keyCode)
        // //创建炮上的字
        // createLetter(e);
        //创建子弹
        createBullet(letter);
        pao.innerHTML = letter
    }

}

txtBox.onclick = beginGame;
function beginGame() {
    start.style.display = "none";
    createYu();

    timeChange(time);
}

function timeChange() {
    timeSpan.innerHTML = time
    setInterval(function () {
        time = time - 1;
        timeSpan.innerHTML = time
        var tc = trueCount.innerHTML
        if (time == 0 && rightCount >= 20) {
            alert("恭喜通过第" + level + "关")
            clearInterval(timeId)
            for (var i = 0, res; res = arr[i++];) {
                res.ele.remove();
            }
            arr = [];
            sudo -= 100;
            level++
            time = 20 - level;
            createYu();
            rightCount = 0;
            if (level == 5) {
                alert("恭喜恭喜 ，全部通关，点击重新开始游戏")
                location.reload();
            }
            return;
        } else if (time == 0 && rightCount < 20 || wrongCount > 20) {
            alert("挑战失败 ，重新开始")
            location.reload();
        }
    }, 1000)

}

rest.onclick = function () {
    location.reload();
}
