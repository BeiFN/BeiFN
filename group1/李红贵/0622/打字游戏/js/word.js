function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length ===1 ? ele[0] :ele;
}

var ele_pao = $("#pao");//大炮
var ele_pao_text = ele_pao.children[0];//大炮文本
var clientWidth = document.documentElement.clientWidth;


var startBtn = $("#reStart");//开始按钮

var errView  = $("#errorn");//显示输错次数
var misView = $("#missn");//显示遗漏次数
var scoreView = $("#scoren");//显示得分
var sen_box = $("#sen_boxs")//显示倒计时

var letterArray = [];//存放鱼
var scoreNum = 0;//得分
var missNum = 0;//遗漏次数
var errorNum = 0;//输错次数
var allIptNum = 0;//按键总次数

var jiange = 1000;//倒计时间隔毫秒
var allTime = 100000;//倒计时总时间毫秒
var timestart = null;//倒计时定时器

var timCreaFish = 1000;//产鱼间隔时间，毫秒，修改可调整难度
var viFish = 5; //产鱼游动速度 px，修改可调整难度
var starTimer = null;//产鱼定时器

starTimer = setInterval(createRandomLetter,timCreaFish);

startBtn.onclick = function(){//开始游戏
    console.log("kaishi");

    location.reload();//重新加载界面
    // clearInterval(starTimer);
 
}
window.onload = function(){//页面加载完成开始计时
    createTimer();
}
function createTimer(){
    
    timestart = setInterval(showDate,jiange);//倒计时定时器开启
    // showDate();
    // showDate(dateArr);
}

function showDate(){
    

    sen_box.innerHTML = parseInt(allTime/1000);
    allTime -= jiange;
    if(allTime <= 0){//倒计时结束，关闭倒计时和产鱼定时器
        clearInterval(timestart);
        clearInterval(starTimer);
    }
}



function createRandomLetter(){//生产鱼
    

    var randomLetter = String.fromCharCode(65+ Math.round(Math.random()*25));
    var randomLeft = Math.round(Math.random()* (clientWidth - 100));
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomLetter;
    ele.style.top = 0;
    ele.style.left = randomLeft + "px";
    document.body.appendChild(ele);
    var timer = eleMove(ele);

    letterArray.push({//生成鱼属性
        timer : timer,
        ele : ele,
        letter : randomLetter,
        left : randomLeft,
    });
}


function eleMove(ele){//鱼逃命
    var numTop = 0;
    var timer = null;
    timer = setInterval(function(){
        numTop += viFish;
        ele.style.top = numTop + "px";
        if(numTop >= 500){//撞墙而亡
            
            missNum ++;
            refreshScore("miss");

            clearInterval(timer);
            timer = null;
            ele.className += " die";//添加死亡属性，得加空格，否则是和原属性拼接成一个新属性，导致设置的所有属性样式失效

            setTimeout(function(){
                console.log("xxxx");
                removeRecord(ele);
                // ele.innerHTML = "";
                ele.remove();
            },1000);
        }
    },50);
    return timer;
}
function removeRecord(ele){//删除死鱼
    for(var i=0, rec; rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice(i-1, 1);
            break;
        }
    }
}

// 键盘输入触发
document.onkeydown = function(evt){
    console.log(evt);

    handlerEnterLetter(evt);//组装炮弹
    createBullet(evt);//发射炮弹
};
function handlerEnterLetter(evt){//炮弹填充组装
    var e = evt || window.event;
    var keyCode = e.keyCode || e.which;
    if(keyCode >=65 && keyCode <= 90){
        keyCode = String.fromCharCode(keyCode);
        ele_pao_text.innerHTML = keyCode;
    }
    console.log(keyCode);
}

function createBullet(evt){//产生炮弹
    allIptNum ++;
    var e = evt || window.event;
    var key = String.fromCharCode(e.keyCode || e.which);
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth/2 -15 +"px";
    ele.style.top = ele_pao.offsetTop -30 + "px";

    document.body.appendChild(ele);

    for(var i=0,rec; rec = letterArray[i++];){

        if(rec.letter === key){
            clearInterval(rec.timer);
            removeRecord(rec.ele);

            setTimeout(function(){
                ele.style.left = rec.left + 35 + "px";
                ele.style.top = rec.ele.offsetTop + 50 +"px";
                
            }, 50);
        

            setTimeout(function(){
                rec.ele.remove();
                ele.remove();
            },500);
            scoreNum ++;
            refreshScore("score");
          
            break;
            
        }
        
        
    }
    if(allIptNum - scoreNum > errorNum){//计算输错次数
        ele.remove();
        errorNum = allIptNum - scoreNum;
        refreshScore("err");
    }

}

function refreshScore(type){//更新统计数据
    if(type === "err"){
        errView.innerHTML = ("输错：" + errorNum);
    }else if(type === "score"){
        scoreView.innerHTML = ("得分：" + scoreNum);
    }else if(type === "miss"){
        misView.innerHTML = ("遗漏：" + missNum);
    }
}

window.onresize = function(){//屏幕尺寸改变，重新获取可视区域宽度
    clientWidth = document.documentElement.clientWidth;
}