function $$(selector){
    var ele=null;
    (document.querySelectorAll(selector).length)===1?ele=(document.querySelectorAll(selector)[0]):ele=document.querySelectorAll(selector);
    return ele;
}
var pao=$$("#pao");
var timeContainer=$$(".time");
var score=$$(".score");
var count1=0;
var record=[];
var clientWidth=document.documentElement.clientWidth;
function createFish(){
    var fish=document.createElement("div");
    fish.className="fish";
    fish.innerHTML=createLetter();
    fish.style.left=createNleft()+"px";
    document.body.appendChild(fish);
    var timer=fishMove(fish);
    console.log(timer);
    var obj={
        "timer":timer,
        "fish":fish,
        "html":fish.innerHTML,
        "nleft":fish.offsetLeft,
    }
    console.log(obj);
    record.push(obj);
}
var fishTimer=setInterval(createFish,2000);
function createLetter(){
    var letter=String.fromCharCode(65+Math.round(Math.random()*(90-65)));
    return letter;
}
function createNleft(){
    var nleft=Math.round(Math.random()*clientWidth-180);
    return nleft;
}
function createBullet(letter){
    var bullet=document.createElement("div");
    bullet.className="bullet";
    bullet.style.left=clientWidth/2-30+"px";
    document.body.appendChild(bullet);
    for(i=0;i<record.length;i++){
        if(letter==record[i].html){
            count1++;
            clearInterval(record[i].timer);
            setInterval(function(){
                score.innerHTML="已捕捉"+count1+"鱼";
            },500)
            setTimeout(function(){
                 bullet.style.left = record[i].nleft + 35 + "px";
                 bullet.style.top  = record[i].fish.offsetTop + 50 + "px";
            },5)
            setTimeout(function(){
                record[i].fish.remove();
                removeRecord(record[i].fish);
                bullet.remove();
            },800)

            break;
       }    
        }
    }
function removeRecord(ele){
    for(var i=0;i<record.length;i++){
        if(record[i].fish===ele){
            record.splice(i,1);
            break;
        }
    }
}
function fishMove(fish){
    var ntop=0;
    fish.style.transform="(0deg)";
    var timer=setInterval(function(){
        ntop+=40;
        fish.style.top=ntop+"px";
        if(ntop>=400){
            clearInterval(timer);
            fish.className+=" die";
            setTimeout(function(){
                fish.remove();
            },2000)
            removeRecord(fish);
        }
    },500); 
    return timer;
}
document.onkeydown=function(evt){
    var e=evt||window.event;
    if(e.keyCode>=65&&e.keyCode<=90){
        pao.innerHTML=String.fromCharCode(e.keyCode);
        createBullet(String.fromCharCode(e.keyCode));
    }
}
window.onreset-function(){
    clientWidth=document.documentElement.clientWidth;
}


//附加功能
//倒计时
var time=10;
 var timer2=setInterval(function(){
    timeContainer.innerHTML="还有"+(time--)+"秒";
    if(time<0){
        clearInterval(timer2);
        clearInterval(fishTimer);
    }
},1000)
//重新开始
var restart=$$(".restart");
restart.onclick=function(){
    window.location.reload();
}