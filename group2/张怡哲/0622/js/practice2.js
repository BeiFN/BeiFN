var ele_pao         = $("#pao");
var ele_pao_text    = ele_pao.children[0];
var clientWidth     = document.documentElement.clientWidth;
var startBtn        = $("#start");
var record          = $("#record");
var letterArray = [];

function $ (selector){
    var ele=null;
    return (ele=document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

window.onresize() = function(){
    clientWidth = document.documentElement.clientWidth;
}

document.onkeydown = funtion(evt){
    handlerEnterLetter(evt);
    createBullet(evt);
}

function createRandomLetter(){
    var randomLetter = 65+Math.round(Math.random()*25); 


    var ele=document.createElement("div");
    ele.className("fish");
    
    ele.innerHTML = randomLetter;

    randomLeft = Math.round(Math.random()*(clientWidth-100));
    ele.style.top = 0;
    ele.style.left = randomLeft + "px";
    document.body.appendChild(ele);

    var timer = eleMove(ele);

    letterArray.push({
        ele : ele,
        timer : timer,
        left : randomLeft, 
        letter : randomLetter
    });
}


function eleMove(ele){
    var numTop = 0;
    var timer = null;
    timer = setIntervar(function (){
        numTop += 5;
        ele.style.top = numTop + "px";
        if (numTop>=500){
            clearInterval(timer);
            timer = null;
            ele.className += " die";
            setTimeout(function (){
                removeRecord(ele);
                ele.remove();
            },800)
        }
    })
}

function removeRecord(ele){
    for(var i=0,rec;rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice(i-1,1);
            break;
        }
    }
}

function createBullet(evt){
    var e = evt||event;
    var key = String.fromCharCode(e.keyCode || e.which);

    var ele = document.createElement("div");
    ele.className("bullet");
    ele.style.left = clientWidth/2-15+"px";

    document.body.appendChild(ele);

    for(var i=0,rec; rec = letterArray[i++];){
        if(rec.letter === key){
            clearInterval(timer);
            removeRecord(rec.ele);
            setTimeout(function(){
                ele.style.left = rec.left + 35 + "px";
                ele.style.top = rec.ele.offsetTop + 50 +"px";
            },5);

            setTimeout(function(){
                rec.ele.remove();
                ele.remove();
            },800);
            break;
        }
    }
}

function handlerEnterLetter(evt){
    var e = evt || event;
    var keyCode = e.keyCode || e.which;
    if(keyCode >= 65 && keyCode <= 90){
        keyCode = String.fromCharCode(keyCode);
        ele_pao_text.innerHTML = keyCode;
    }
}

