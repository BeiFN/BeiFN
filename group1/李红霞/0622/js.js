var score = 0;
var pao = document.getElementById("pao");
var scorebtn = document.getElementById("score")
var fishArr = [];

//键盘监听函数
document.onkeypress = handlerEnter;
function handlerEnter(evt){
    var e = evt || window.event;
    //获得用户按键输入的字母
    if((e.keyCode >= 65) && (e.keyCode <= 90)){
        var keyEnter = String.fromCharCode(e.keyCode);
        pao.innerHTML = keyEnter; 
        //处理用户输入的字母
        handlerletter(keyEnter);
    }
}

function createbullet(){
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.top = 600+"px"
    bullet.style.left = 50+"%";
    bullet.style.marginLeft = "-15px"; 
    document.body.appendChild(bullet)
    return bullet;
}

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


//设置定时器，每间隔一秒从屏幕上水平随机位置出现鱼
var timer = setInterval(createfish, 1000);
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

//添加重玩按钮并设置点击监听函数
var button = document.getElementById("replay");
button.onclick = function(){
    location.reload();
}
