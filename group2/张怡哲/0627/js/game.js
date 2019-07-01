var ele_pao = $("#pao");
var windowWidth = document.documentElement.clientWidth;
function $(selector){
    var ele = null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}
var fishArray = [];

setInterval(createRandomLetter,1000);

function createRandomLetter(timer){
    var ele = document.createElement("div");
    ele.setAttribute("class" , "fish");

    var randLetter = String.fromCharCode(65+Math.round(Math.random()*25));
    ele.innerHTML = randLetter;

    var randomLeft = Math.round(Math.random()*(windowWidth-100));
    ele.style.left = randomLeft + "px";
    ele.style.top  = 0;

    fishMove(ele);

    document.body.appendChild(ele);

    fishArray.push({
        ele    : ele,
        timer  : timer,
        letter : randLetter,
        left : randomLeft
    })
}

function fishMove(ele){
    var timer = null;
    var numTop = 0;

    timer = setInterval(function(){
        numTop++;
        ele.style.top = numTop + "px";
        
        if(numTop>500){
            ele.className += " die";
            clearInterval(timer);
            timer = null;

            setInterval(function(){
                removeRecord(ele);
                ele.remove();
            },1000);
        }
    },10);
    return timer;
}

function removeRecord(ele){
    for(var i=0,rec;rec = fishArray[i++];){
        if(rec.ele === ele){
            fishArray.splice(i-1,1);
            break;
        }
    }
}

function createBullet(evt){
    var e = evt || event;
    var key = String.fromCharCode(e.keyCode || e.which);

    var ele = document.createElement("div");
    ele.className  = "bullet";
    ele.style.left = windowWidth/2 - 15 + "px";
    ele.style.top  = ele_pao.offsetTop - 30 + "px";
    // console.log(ele_pao.offsetTop);

    document.body.appendChild(ele);

    for(var i=0,rec; rec = fishArray[i++];){
        if(rec.letter === key){
            clearInterval(rec.timer);
            removeRecord(rec.ele);
            setTimeout(function(){
                ele.style.left = rec.left + 35 +"px";
                ele.style.top  = rec.ele.offsetTop + 50 +"px";
            },5);
        }

        setTimeout(function(){
            rec.ele.remove();
            ele.remove();
        },800);

        break;
    }
}

function paoEnterLetter(evt){
    var e = evt || event;
    var keyCode = e.keyCode || e.which;

    if(keyCode >= 65 && keyCode <=90){
        keyCode = String.fromCharCode(keyCode);
        ele_pao.children[0].innerHTML = keyCode;
    }
}

document.onkeydown = function (evt){
    createBullet(evt);
    paoEnterLetter(evt)
}

window.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
}