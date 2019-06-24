 var 
     ele_pao = $("#pao"),
     ele_btn = $("#btn"),
     ele_pao_text = ele_pao.children[0],
     letterArray = [],
     count = 1,
     clientWidth = document.documentElement.clientWidth;

function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res [0] : res ;
}
function createLetter(){
    var randomLeft = Math.round(Math.random() * (clientWidth - 100));
    var randomLetter = String.fromCharCode(Math.round(Math.random() * 25 + 65));

    var ele = document.createElement("div");
    ele.className = "fish";
    ele.innerHTML = randomLetter;
    ele.style.top = 0;
    ele.style.left = randomLeft +"px";

    document.body.appendChild(ele);
    var timer = eleMove(ele);
    letterArray.push({
        timer : timer,
        left : randomLeft,
        ele : ele,
        letter : randomLetter
    });
}

function eleMove(ele){
    var topNum = 0;
    var timer = null;
    timer = setInterval(function(){
        topNum +=5;
        ele.style.top = topNum + "px";

        if(topNum >=700){
            clearInterval(timer);
            ele.className += " die";
            letterRemove(ele);
            timer = null;

            setTimeout(function(){
                ele.remove();
            },600)
        }
    },50);
    return timer;
}

function createButtle(evt){
    var e = evt || window.event;
    var keycode = e.keycode || e.which;
    var ele = document.createElement("div");

    keycode = String.fromCharCode(keycode);

    ele.className = "bullet";
    ele.style.top = ele_pao.offsetTop -30 +"px";
    ele.style.left = clientWidth/2 -15 +"px";
    document.body.appendChild(ele);

    for(var i = 0,rec ; rec = letterArray[i++];){
        if(keycode === rec.letter){
            $(".count").innerHTML = "得分值:"+ count ++ ;
            
            clearInterval(rec.timer);
            letterRemove(rec.ele);

            setTimeout(function(){
                ele.style.left = rec.left+35+"px";
                ele.style.top  = rec.ele.offsetTop+50 +"px";
            },5)

            setTimeout(function(){
                rec.ele.remove();
                ele.remove();
            },800)
            break;
        }
    }
}
function letterRemove(ele){
    for(var i = 0, rec; rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice( i-1 ,1);
        }
    }
}
/**
 * 炮台字符
 * @param {事件} evt 
 */
function paoLetter(evt){
    var e = evt || window.event;
    var keycode = e.keycode || e.which;
    if(keycode >=65 && keycode <= 90){
        keycode = String.fromCharCode(keycode);
        ele_pao_text.innerHTML = keycode;
    }
}
setInterval(createLetter,1000);
document.onkeydown = function(e){
    paoLetter(e);
    createButtle(e);
}
ele_btn.onclick = function(){
    location.reload();
}
document.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
}

/**
 *设置倒计时 
*/
createSpan();   
setInterval(countTime,1000);

function countTime(){
    var arrayList = getTime(2019,6,25);
    var spanList = $(".span");
    
    spanList[1].innerHTML = arrayList[1]+":";
    spanList[2].innerHTML = arrayList[2];
    spanList[0].innerHTML = arrayList[0]+":";
}

countTime();

function createSpan(){
    var span = null;
    // var spanList = [];
    for(var i = 0 ; i ++ < 3 ;){
        span = document.createElement("span");
        span.className = "span";
        document.body.appendChild(span);                                     
    }               
}      
function getTime(){
    var 
        hour    = 0,
        minute  = 0,
        second  = 0,
        setTime = new Date(),
        tagTime = null      ;

    setTime.setFullYear(arguments[0]);
    setTime.setMonth   (arguments[1]-1);
    setTime.setDate    (arguments[2]);

    if(arguments.length > 3){
        hour = arguments[3];
        minute = arguments[4];
        second = arguments[5];
    }

    setTime.setHours(hour);
    setTime.setMinutes(minute);
    tagTime = setTime.setSeconds(second);               
    tagTime = setTime - Date.now();

    var hours   = parseInt(tagTime/1000/3600)   ;
    var minutes = parseInt(tagTime/1000/60 %60) ;
    var seconds = parseInt(tagTime/1000%3600%60);

    return [
        hours   > 10? ""+hours   : "0"+hours  ,
        minutes > 10? ""+minutes : "0"+minutes,
        seconds > 10? ""+seconds : "0"+seconds,
    ];
}