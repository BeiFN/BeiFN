var ele_pao         = $("#pao");
var ele_pao_text    = ele_pao.children[0];
var clientWidth     = document.documentElement.clientWidth;
var startBtn        = $("#start");
var record          = $("#record");
var letterArray = [];
var count = 0;
var mistake = 0;
var startTime=null;
var downTime=40;
var refreshTime = 1000;
var level=1;


function $(selector){
    var ele = null;
    return (ele=document.querySelectorAll(selector)).length===1 ? ele[0] :ele ;
}

window.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
}

document.onkeydown = function (evt){
    handlerEnterLetter(evt);
    createBullet(evt);
    // gameOver();
    recordScore();
}




function createRandomLetter(){
    var ele = document.createElement("div");
    ele.className=("fish");

    var randomLetter = String.fromCharCode(65+Math.round(Math.random()*25));
    // console.log(randomLetter);
    ele.innerHTML    = randomLetter;
    // console.log(ele.innerHTML);
    
    var randomLeft   = Math.round(Math.random()*(clientWidth-250));
    ele.style.top    = 0;
    ele.style.left   = randomLeft + "px";
    document.body.appendChild(ele);

    var timer = eleMove(ele);
    letterArray.push({
        ele : ele,
        timer : timer,
        left  : randomLeft,
        letter : ele.innerHTML
    });
}

startBtn.onclick = gameStart;


function gameStart(){
    startTime=setInterval( createRandomLetter , refreshTime);
    startBtn.style.display="none";
    mistake=0;
    count=0;
    recordScore();
}

function gameOver(){
        clearInterval(startTime);
        for(var i=0,rec;rec=letterArray[i++];)
        {
             rec.ele.remove();
             clearInterval(rec.timer);
        }
        letterArray.length = 0;
        startBtn.style.display="block";
        console.log(letterArray);
}

function levelUp(){
    if(count===20){
        if(level===3){
            alert("恭喜通关！！！");
            gameOver();
            // break;
        }
        alert("恭喜晋级!!");
        downTime-=5;
        refreshTime-=50;
        level++;
        gameStart();
        // gameOver();
    }
}

function eleMove(ele){
    var numTop = 0;
    var timer  = null;
    timer      = setInterval(function (){
        numTop +=5;
        ele.style.top =numTop + "px";
        if(numTop >= 500){
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            mistake++;
            recordScore();
            if(mistake===5){
                alert("Game over!");
                gameOver();
            }
            setTimeout( function (){
                removeRecord(ele)
                ele.remove();
          } ,800)
        }
    },downTime);
    return timer;
}

function recordScore(){
    record.children[1].innerHTML=level;
    record.children[3].innerHTML=count;
    record.children[5].innerHTML=mistake;
}

function removeRecord(ele){
    for(var i=0,rec;rec=letterArray[i++];){
        if(rec.ele===ele){
            letterArray.splice(i-1,1);
            break;
        }
    }
}

function createBullet(evt){
    var e=evt||event;
    var key=String.fromCharCode(e.keyCode||e.which);

    var ele =document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth/2-15+"px";
    ele.style.top = ele_pao.offsetTop-30+"px";

    document.body.appendChild(ele);

    for(var i=0,rec; rec = letterArray[i++];){
        if(rec.letter===key){
            clearInterval(rec.timer);
            removeRecord(rec.ele);
            count++;
            setTimeout(function(){
                ele.style.left = rec.left + 35 +"px";
                ele.style.top = rec.ele.offsetTop +50 + "px";
            },5)
            // console.log(ele);
            
    
            setTimeout(function(){
                rec.ele.remove();
                ele.remove();
            },800);
            break;
        }
    }
}

function handlerEnterLetter(evt){
    var e=evt || event;
    var keyCode = e.keyCode ||e.which;
    if(keyCode >=65 && keyCode <= 90){
        keyCode = String.fromCharCode(keyCode);
        ele_pao_text.innerHTML = keyCode;
    }
}