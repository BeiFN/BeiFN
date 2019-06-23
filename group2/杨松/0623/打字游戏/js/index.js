var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
// 屏幕的宽度;
var clientWidth = document.documentElement.clientWidth;
// 储存随机字母的数组;
var letterArray = [];
//  计数板
var ele_score = $("#score");
//   倒计时
var hour_box = $("#hours");
var minute_box = $("#minute");
var  second_box = $("#seconds");
// 结束计分
var ele_showtime = $("#showtime");
var ele_showscore = $("#showscore");
var ele_rebtn = $("#rebtn");
var ele_restart =$("#restart");

function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function createRandomLetter(){
    var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
    var randomLeft = Math.round( Math.random() * (clientWidth - 100));
    // console.log(randomLetter);
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomLetter;
    ele.style.top = 0;
    // ele在没有插入页面的时候是没有offset值的;
    // console.log(ele.offsetWidth);
    // 边界;
    ele.style.left = randomLeft  + "px";
    document.body.appendChild(ele);

    var timer = eleMove(ele);
    // timer => 用来关闭定时器终止鱼的运动;
    // ele   => 用来删除;
    // randomLetter => 用来判定的;
    // left => 用来给炮弹制造目标的;
    letterArray.push({
        timer : timer,
        ele : ele,
        letter : randomLetter,
        left : randomLeft
    })
}

function removeRecord(ele){
    for(var i = 0 , rec ; rec = letterArray[i ++] ;){
        if(rec.ele === ele){
            letterArray.splice(i-1,1);
            break;
        }
    }
}

function eleMove(ele){
    var numTop = 0;
    var timer = null;
    timer = setInterval( function (){
        numTop += 5;
        ele.style.top = numTop + "px";
        if(numTop >= 500){
            clearInterval(timer);
            // count--;
            // ele_score.innerHTML = "您的分数为: "+ count ;
            // 清空变量，让变量内的数据被垃圾回收机制回收;
            timer = null;
            ele.className += " die";
            // 动画运行结束删除元素;
            setTimeout( function (){
                removeRecord(ele);
                ele.remove();
            } ,800)
        }
    },50);
    return timer;
}
var count = 0;
// 创建子弹;
function createBullet(evt){
    var e = evt || window.event;
    var key = String.fromCharCode( e.keyCode || e.which);

    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth/2 - 15 + "px";
    ele.style.top = ele_pao.offsetTop - 30 + "px";

    document.body.appendChild(ele);

    // 判定是否存在相应的字母; 在letter里面判定;
    for(var i = 0 ,rec ; rec = letterArray[i++]; ){
        // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
        if(rec.letter === key){
            clearInterval(rec.timer);
            count++;
            ele_score.innerHTML = "您的分数为: "+ count ;
            removeRecord(rec.ele);
            // 给子弹设置一个位置;
        }
        if(rec.letter !== key){
            clearInterval(rec.timer);
            count--;
            ele_score.innerHTML = "您的分数为: "+ count ;
            removeRecord(rec.ele);
        }
        setTimeout(function(){
            ele.style.left = rec.left + 35 + "px";
            ele.style.top  = rec.ele.offsetTop + 50 + "px";
        },5);

        // 删除动画;
        setTimeout(function(){
            rec.ele.remove();
            ele.remove();
        },800);
        break;
    }
}

// 炮台的文字输入功能;
function handlerEnterLetter(evt){
    var e = evt || window.event;
    // console.log(e);
    var keyCode = e.keyCode || e.which;

    if(keyCode >= 65 && keyCode <= 90 ){
        keyCode = String.fromCharCode(keyCode);
        ele_pao_text.innerHTML = keyCode;
    }

    console.log(keyCode);
}
// on系列事件没办法对多函数调用的妥协;
document.onkeydown = function(evt){
    handlerEnterLetter(evt);
    createBullet(evt);
};
var noFish = setInterval( createRandomLetter , 1000);

// 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
window.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
};

//  倒计时
var stop_id = setInterval(getTimeDown,1000);
var countdown = 100;
function getTimeDown(){
    hour_box.innerHTML = "00";
    minute_box.innerHTML = "00";
    countdown--;
    second_box.innerHTML = "" + countdown;
    if(countdown <= 10){
        second_box.style.color ="red";
        second_box.style.fontSize ="30px"
    }
    if(countdown === 0 || count<=-7)
    {
        ele_showscore.style.display = "block";
        // ele_showtime.innerHTML = count;
        setInterval(function () {
            ele_restart.style.display ="block";
            clearInterval(stop_id);
            clearInterval(noFish);
        },50)

    }
}
ele_rebtn.onclick = function(){
    history.go(0);
    countdown = 0;
};

// 1. 计分板;
// 2. 倒计时; 1.倒计时结束不再出鱼; 2. 显示分数。 3. 重新开始按钮;