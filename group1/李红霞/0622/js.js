//声明记录分数的变量
var score = 0;
//获得需要修改属性的元素
var pao =$("#pao");
var scorebtn = $("#score");
var time = $("#time");
var times = time.children;   //获得所有的span标签
//声明数组，存放屏幕上当前存在的鱼的信息
var fishArr = [];
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length > 1 ? ele : ele[0];
}
//键盘监听函数 用户点击键盘时触发
document.onkeypress = handlerEnter;
function handlerEnter(evt){
    var e = evt || window.event;
    document.body.focus();
    //获得用户按键输入的字母
    if((e.keyCode >= 65) && (e.keyCode <= 90)){
        var keyEnter = String.fromCharCode(e.keyCode);
        pao.innerHTML = keyEnter; 
        //处理用户输入的字母
        handlerletter(keyEnter);
    }
}
//创建炮弹的函数  用户点击键盘时触发
function createbullet(){
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = 600+"px"
    bullet.style.left = 50+"%";
    bullet.style.marginLeft = "-15px"; 
    document.body.appendChild(bullet)
    return bullet;
}
//处理用户输入的函数，当用户输入字母后调用该函数
function handlerletter(keyEnter){
    //已知用户输入的是字母，创建一个炮弹div
    var bullet = createbullet();
    //循环遍历用户输入的字母是否为数组fishArr中含有的字母
    var flag = false;
    for(var i = 0, fishItem; fishItem = fishArr[i++];){
        if(keyEnter == fishItem["letter"]){
           flag = true;
            //获得该炮弹div的宽和高
            bulletLeft = fishItem["left"]+50;
            bulletTop = fishItem["div"].offsetTop+50;
            bullet.style.top = bulletTop+"px";
            bullet.style.left = bulletLeft+"px";
            clearInterval(fishItem["timedown"])
            
            fishArr.splice(i-1,1);
 
            //如果输入的内容在fishArr数组中含有，将该div从该数组中删除，并且删除该元素
            setTimeout(function(){
                fishItem["div"].remove();
                bullet.remove();
            },1000);

            // fishItem["div"].remove();
            // bullet.remove();
            break;
        }
    }      
        if(flag == true){
            score++;
        }else{
            score--;
        }
        scorebtn.innerHTML = score;
}
function fishmove(div){
    var count = 0;
    var timerdown = setInterval(function(){
        div.style.top = count*5+"px";
        if(count*5 < 500){
            count++;   
        }else{
            div.className += " die"

            for(var i = 0, fishItem; fishItem = fishArr[i++];){
                if(div == fishItem["div"]){
                    fishArr.splice(i-1,1);
                }
            }
            setTimeout(function(){
                div.remove();
                clearInterval(timerdown);
                }
            , 1000);
        }
    }, 50);
    return timerdown;
}
//设置定时器，每间隔一秒从屏幕上水平随机位置出现鱼
var timer = setInterval(createfish, 1000);
function createfish(){
    //创建鱼的div
    var div = document.createElement("div");
    var clientWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
    var left1 = Math.round ((clientWidth - 100) * Math.random());
    div.className = "fish";        // *** //
    div.style.top = 0;
    div.style.left = left1 + "px"; 

    //每个鱼上出现随机字母
    var randomLetterCode = 65 + Math.round(Math.random()*25);
    var randomLetter = String.fromCharCode(randomLetterCode);
    div.innerHTML = randomLetter;    
    document.body.appendChild(div);

    //实现鱼的自由下落
    var timerdown = fishmove(div);

    //将每个div的timedown，left， letter，保存在一个数组中
    var obj = {
        "timedown":timerdown,
        "left":left1,
        "letter":randomLetter,
        "div":div
    }
    fishArr.push(obj);
    // console.log(fishArr)
}
countdown(timer)

//倒计时应该从页面加载时就设定屏幕的时间为1分钟，随着时间的增加，时间逐渐减少，当时间为0时推出游戏  退出游戏即停止产生鱼，retuen 0
function countdown(timer){
    var allTime = 120;
    var countdownTime = setInterval(() => {
        if(allTime < 0){
            for(var i = 0, fish; fish = fishArr[i++];){
                fish["div"].remove();
            }
            alert("游戏结束，点击重玩重新开始游戏")
            clearInterval(timer);
            clearInterval(countdownTime);
            return false;
        }
        var hour = parseInt(allTime/3600);
        var minite =  parseInt(allTime%3600/60);
        var second = parseInt(allTime%60);
        times[0].innerHTML = (parseInt(allTime/3600)>10)?hour:"0"+hour;
        times[1].innerHTML = (parseInt(allTime%3600/60))>10?minite:"0"+minite;
        times[2].innerHTML = (parseInt(allTime%60))>10?second:"0"+second;
        allTime--;
    }, 100);
}

//添加重玩按钮并设置点击监听函数
var button = document.getElementById("replay");
button.onclick = function(){
    location.reload();
}
