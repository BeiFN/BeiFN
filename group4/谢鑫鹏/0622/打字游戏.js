/**
 * 选择器
 * @param {*} selector 
 */
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

var elePao = $("#pao");
var elePaoText = elePao.children[0];
var clientWidth = document.documentElement.clientWidth;
var fishArray = [];
var score = 0;
var eleScore = $("#score");
var timerCreate = null;
var eleEnd = $("#end");
var eleReload = $("#reload");
var box = $("#box");
/**
 * 页面变化时重新设置宽度
 */
window.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
}
/**
 * 炮台输入文字
 */
function inputLetter(evt){
    e = evt || window.event;
    var keyCode = e.keyCode || e.which;
    if(keyCode >= 65 && keyCode <= 90){
        keyCode = String.fromCharCode(keyCode);
        elePao.innerHTML = keyCode;
    }
}
/**
 * 生成随机字母
 */
function createRandomLetter(){
    var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
    var randomLeft = Math.round(Math.random() * (clientWidth - 100));
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomLetter;
    ele.style.top = 0;
    ele.style.left = randomLeft + "px";
    box.appendChild(ele);
    var timer = eleMove(ele);
    fishArray.push({
        timer : timer,
        ele :ele,
        letter : randomLetter,
        left : randomLeft
    })
}
/**
 * 鱼（字母）移动
 */
function eleMove(ele){
    var numTop = 0;
    var timer = null;
    timer = setInterval(function(){
        numTop += 5;
        ele.style.top = numTop + "px";
        if(numTop >= 500){
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            setTimeout(function(){
                removeLetter(ele);
                ele.remove();
            }, 1000)
        }
    }, 50)
    return timer;
}
/**
 * 移出鱼（字母） 
 */
function removeLetter(ele){
    for(var i = 0, letter; letter = fishArray[i++]; ){
        if(letter.ele === ele){
            fishArray.splice(i - 1, 1);
            break;
        }
    }
}
/**
 * 创建子弹
 */
function createBullet(evt){
    var e = evt || window.event;
    var key = String.fromCharCode(e.keyCode || e.which);
    var count = 0;
    for(var i = 0, fish; fish = fishArray[i++]; ){
        var fishLetterArray = [];
        fishLetterArray.push(fish.letter);
        if(fish.letter === key){
            score ++;
            eleScore.innerHTML = "score:" + score;
            var ele = document.createElement("div");
            ele.className = "bullet";
            ele.style.left = clientWidth / 2 - 15 + "px";
            ele.style.top = elePao.offsetTop - 30 + "px";
            document.body.appendChild(ele);
            clearInterval(fish.timer);
            removeLetter(fish.ele);
            setTimeout(function(){
                ele.style.left = fish.left + 35 + "px";
                ele.style.top = fish.ele.offsetTop + 50 + "px";
            }, 5)
            setTimeout(function(){
                fish.ele.remove();
                ele.remove();
            },1000)
            break;
        }else{
            count ++;
            if(count === fishArray.length){
                score <= 0 ? score = 0 : score --;
                eleScore.innerHTML = "score:" + score;
            }    
        }
    }
}
/**
 * 结束
 */
setTimeout(function(){
    fishArray = [];
    clearInterval(timerCreate);
    while(box.hasChildNodes()){ 
        box.removeChild(box.firstChild); 
    }
    eleEnd.children[0].innerHTML = "score:" + score;
    eleEnd.style.display = "block";
    eleReload.onclick = function(){
        location.reload();
    }
},10000)

eleScore.innerHTML = "score:" + score;
document.onkeydown = function(evt){
    inputLetter(evt);
    createBullet(evt);
}

timerCreate = setInterval(createRandomLetter, 1000);

