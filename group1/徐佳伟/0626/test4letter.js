var 
    pao = $("#pao");
    offsetWidth = document.documentElement.offsetWidth;
    letterArray = [];

function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res;
}

function handlerRandomLetter(){
    
    var randomLetter =String.fromCharCode(Math.round(Math.random() * 25 + 65));
    var randomLeft = Math.round(Math.random() * (offsetWidth - 100));

    var e = document.createElement("div");
    e.className = "fish";
    e.innerHTML = randomLetter;
    e.style.left = randomLeft + "px";

    document.body.appendChild(e);
    var timer = handlerMoveLetter(e);
    letterArray.push({
        Left : randomLeft,
        Letter : randomLetter,
        ele : e,
        timer : timer
    })
    // console.log(letterArray);
}

function handlerMoveLetter(e){
    var topNum = 0;
    var timer = null;
    timer = setInterval(function(){
        topNum += 5;
        e.style.top = topNum + "px"
        if(topNum >= 700){

            e.className += " die";
            clearInterval(timer);
            timer = null;
            letterRemove(e);

            setTimeout(function(){
                e.remove();
            },1000)
        }
    },50)
    return timer;
}

function letterRemove(e){
    for(var i = 0,rec ; rec = letterArray[i++];){
        if(e === rec.ele){
            letterArray.splice( i-1 ,1);
        }
    }
}

function createBullet(evt){
    var e = evt || window.event
    var keyCode = e.keycode || e.which;
    keyCode = String.fromCharCode(keyCode);
   
    var div = document.createElement("div");
    div.className = "bullet";
    div.style.left = offsetWidth/2 -15  +"px";
    div.style.top = pao.offsetTop - 30 +"px";
    document.body.appendChild(div);

    // for(var i = 0,rec ; rec = letterArray[i++];){
    //     if(keyCode === rec.Letter){          
    //         console.log(rec)
    //         clearInterval(rec.timer);
    //         letterRemove(rec.ele);

    //         setTimeout(function(){
    //             div.style.left = rec.Left+35+"px";
    //             div.style.top  = rec.ele.offsetTop+50 +"px";
    //         },5)

    //         setTimeout(function(){
    //             rec.ele.remove();
    //             div.remove();
    //         },800)
    //         break;
    //     }
    // }

    for(var i=0 , rec ; rec = letterArray[i++] ; ){
        if(keyCode === rec.Letter){

            clearInterval(rec.timer);
            letterRemove(rec.ele);
            
            setTimeout(function(){
                div.style.left = rec.Left + 35+"px";
                div.style.top = rec.ele.offsetTop+ 50 +"px";
            },5)

            setTimeout(function(){
                div.remove();
                rec.ele.remove();
            },500)
            break;
        }
    }
}

function handlerKeydown(evt){
    var e = evt || window.event;
    var keyCode = e.keyCode || e.which;
    if(keyCode >=65 && keyCode <=90){
        keyCode = String.fromCharCode(keyCode);
        pao.children[0].innerHTML = keyCode;
    }
    createBullet();
    // console.log(keyCode);
}

document.addEventListener("keydown",handlerKeydown);
window.onresize = function(){
    offsetWidth = document.documentElement.offsetWidth;    
}
setInterval(handlerRandomLetter,1000);

