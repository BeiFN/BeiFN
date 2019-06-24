var ele_text = document.getElementById("pao");
var ele_txts = ele_text.children[0];
var letterArray = [];
var ele_count = document.getElementById("count");
var alls = ele_count.children[0];
var wrong = ele_count.children[1];
var wrong_tow = ele_count.children[2];
var star = document.getElementById("star");
var ele_show_time = document.getElementById("show_time");
var width = document.documentElement.clientWidth;
var falses = 0 , //过线失分
    error  = 0 , // 摁错失分
    score = 0, //摁对得分
    count = 0; //总分
var counts = ele_count.children[3];





//炮台显示对应的字母
function handlerGame(evt){
    var e = evt || event;
    var keyCode = e.keyCode ||e.which
    var txts = String.fromCharCode(keyCode);
    if(keyCode >= 65 && keyCode <= 90){
        ele_txts.innerHTML = txts;
    }
}

//创建随机字母  并有随机的位置
function randomletter (){
    var randomletter = String.fromCharCode(65+Math.random()*26)  //随机字母
    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomletter;
    ele.style.top = 0; 
    document.body.appendChild(ele) //插入页面
    //随机位置
    var left = Math.round(Math.random()*(width-100));
    ele.style.left = left + "px";

    var timer = moverfish(ele);
    letterArray.push({
        timer : timer,
        ele : ele,
        letter : randomletter,
        left : left
    })
    // count = score - error - falses;
    // counts.innerHTML = "总分数：" + count;
    Count ();
}

function removebullet(ele){
    for(var i = 0 ,rec ; rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice(i-1,1);
            break;
        }
    }
}


//移动随机字母 创造下落的效果

function moverfish(ele){
    var numTop = 0;
    var timer = null;
    timer = setInterval(function(){
        numTop += 5;
        ele.style.top = numTop +"px";
        if (numTop >= 450) {
            falses ++;
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            setTimeout(function(){
                removebullet(ele);
                ele.remove();
            },1000)
        }
    },50)
    // wrong.innerHTML = "过线失分：" + falses ;
    // count = score - error - falses;
    // counts.innerHTML = "总分数：" + count;
    Count ()
    return timer;
}
//创建子弹

function createBullet(evt){
    var e = evt || event; 
    var key = String.fromCharCode( e.keyCode || e.which);
    
    var ele =document.createElement("div");
    ele.className = "bullet";
    
    ele.style.top = ele_text.offsetTop - 30 + "px";
    ele.style.left = width/2 - 15 + "px" ;
    document.body.appendChild(ele);


    
    //移动子弹
    for(var i = 0 ,rec ;rec = letterArray[i++];){
        if(rec.letter === key){
            score ++;
            clearInterval(rec.timer);
            removebullet(rec.ele);
            setTimeout(function(){
                ele.style.left = rec.left + 35 + "px";
                ele.style.top  = rec.ele.offsetTop + 50 + "px";
            },5)
            setTimeout(function(){
                rec.ele.remove();;
                ele.remove();
            },800)
            break;
        }else{
            error++;
            ele.remove();
        }
    }
    Count ();
}
document.onkeydown = function(evt){
    handlerGame(evt);
    createBullet(evt);
};
star.onclick = handlerStarGame;
var times = 10;
var timer = null ;
function handlerStarGame(){
    timer = setInterval( randomletter , 800);
    star.style.display = "none";
    setInterval(showTime,1000);
    return timer;
}
var showTime = function(){
    times --;
    ele_show_time.innerHTML = times  < 10 ? "倒计时：" + "0"+ times +"秒" : "倒计时：" + times +"秒";
    End();
}
var End =function(){
    if (times < 0){
        var end = confirm("时间到了，您的分数为：" + count+"您是否要继续游戏？");
        // clearInterval(timer);
        if(!end){
            location.reload();
        }
        times = 11;
    }
}

//计分板
function Count (){
    wrong.innerHTML = "过线失分：" + falses ;
    wrong_tow.innerHTML = "摁错失分：" + error;
    alls.innerHTML = "得分：" + score;
    count = score - error - falses;
    counts.innerHTML = "总分数：" + count;
}