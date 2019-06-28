/* 
*
*
*
*/
function $(selector) {
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
var clientWidth = document.documentElement.clientWidth;
var paoTop = ele_pao.offsetTop;
var time = new Date();
var count  = 0;

var fishArr = [];
// console.log(ele_pao , ele_pao_text);

document.addEventListener("keydown" , paoText);


//炮字母
function paoText(evt) {
    var e = evt || event;
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        var str = String.fromCharCode(e.keyCode);
        ele_pao_text.innerHTML = str;
    }
    createBullet(str);
}
//鱼字母
function fish() {
    var str = String.fromCharCode(Math.round(Math.random()*25 + 65));
    var left = parseInt(Math.random()* (clientWidth - 100));

    var ele = document.createElement("div");
    ele.className = "fishes";
    ele.innerHTML = str;
    ele.style.left = left + "px";
    document.body.appendChild(ele);        
    var ele_timer = fishMove(ele);

    fishArr.push({
        ele : ele,
        html : str,
        timer : ele_timer,
        left : left
    })
}
function removeDate(ele) {
    for(var i=0, fish; fish = fishArr[i++];) {
        if(fish.ele === ele) {
            fishArr.splice(i-1 , 1);
            break;
        }
    }
    console.log(fishArr);
} 
function fishMove(ele) {
    var top = 0;
    var timer = setInterval(function() {
        top += 5;
        ele.style.top = top + "px";
        if(top === 500) {
            clearInterval(timer);
            ele.className += " die";
            setTimeout(function() {
                removeDate(ele);
                ele.remove();
            },1000)
        }
    },100)
    return timer;
}
setInterval(fish , 1000);

function createBullet(str) {
    console.log(1);
    var bullet = document.createElement("div");

    bullet.className = "bullet";
    bullet.style.left = clientWidth / 2 - 15 + "px";
    bullet.style.top = paoTop - 30 + "px";
    document.body.appendChild(bullet);

    for(var i=0, value; value = fishArr[i++];) {
        if(str === value.html) {
            clearInterval(value.timer);
            removeDate(value.ele);
            count ++;
            scoreNum.innerHTML = count;

            setTimeout(function() {
                bullet.style.left = value.left + 35  + "px";
                bullet.style.top = value.ele.offsetTop + 50 + "px";
            },50)

            setTimeout(function() {
                value.ele.remove();
                bullet.remove();
            },650);
            break;
        }
    }
}

function count_down() {
    var time2 = time.getTime() + 60000;
    
    var reduce = time2 - Date.now();
    var seconds = parseInt(reduce / 1000);

    ms.innerHTML = seconds;
 
}
count_down();
setInterval(count_down , 1000);

reStart.addEventListener("click" , reFresh);
function reFresh() {
    location.reload();
}
