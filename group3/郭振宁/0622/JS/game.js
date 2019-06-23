/* 
*
*1、不要用关键字，保留字命名  2、class名字相加中间有空格 3、定时器的异步
*
*/
//选择器封装
function $(selector) {
    return (ele = document.querySelectorAll(selector)).length === 1? ele[0] : ele;
}


// var ele_pao = document.getElementById("pao");
var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
var clientWidth = document.documentElement.clientWidth;
// console.log(ele_pao.offsetTop);
var fishArr = [];



//炮上的字符输入
function paoValue(e) {
    var e = e || event;
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        var str = String.fromCharCode(e.keyCode);
        ele_pao_text.innerHTML = str;
    }
}
//键盘触发事件
document.onkeydown = function() {
    paoValue();
    bullet();
}

function createFish() {
    var fish = document.createElement("div");
    var randomLetter = String.fromCharCode(Math.round(Math.random()*25) + 65);
    var randomLeft = Math.round(Math.random()*(clientWidth - 100));
    fish.innerHTML = randomLetter;
    fish.className = "fishes";
    fish.style.left = randomLeft + "px";
    document.body.appendChild(fish);
    
    var timer = fish_move(fish);
    // console.log(randomLetter);
    
    fishArr.push({
        timer : timer,
        ele : fish,
        letter : randomLetter,
        left : randomLeft
    });
    // console.log(fishArr);
    
}
function removeFish(fish) {
    for(var i=0, value; value=fishArr[i++];) {
        if(fish === value.ele) {
            fishArr.splice(i-1 , 1);
            break;
        }
    }
}

setInterval(createFish , 1000);
function fish_move(fish) {
    // console.log(fish);
    var numTop = 0;
    var timer = setInterval(function() {
        numTop += 5;
        // console.log(fish.style.top);
        fish.style.top = numTop + "px";
        if(numTop >= 500) {
            clearInterval(timer);
            timer = null;
            fish.className += " die";
            // console.log(fish.className);
            setTimeout(function() {
                removeFish(fish);
                fish.remove();
            },1000)
        }
        // console.log(top);
    },50)
    //将定时器返回出去是为了让上面的timer接收，以对象的方式存入数组中，这样才可以在子弹与字符匹配成功时停掉对应的定时器；
    return timer;
}

//子弹
function bullet(e) {
    var e = e || event;
    var key = String.fromCharCode(e.keyCode || e.which);
    // console.log(key);
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth / 2 - 15 + "px";
    ele.style.top = ele_pao.offsetTop - 30 + "px";
    document.body.appendChild(ele);

    for(var i=0, rec; rec = fishArr[i++]; ) {
        if(rec.letter === key) {
            clearInterval(rec.timer);
            removeFish(rec.ele);
            
            setTimeout(function() {
                ele.style.left = rec.left + 35 +"px";
                ele.style.top = rec.ele.offsetTop + 50 + "px"; 
            },5)
            // break;

            
            setTimeout(function() {
                rec.ele.remove();
                ele.remove();
            },800)

            //测试前一定要写break，因为定时器是异步方法，会导致rec循环结束之后为undefined
            break;
            
        }
    }
}
