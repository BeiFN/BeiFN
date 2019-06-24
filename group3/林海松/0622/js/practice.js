



var pao = $("#pao"); 
var pao_text = pao.children[0];
var clientWidth = document.documentElement.clientWidth;
var letterArray = [];
var score = $("#score");
var btn_replay = $("#btn_replay");
var score_text1 = score.children[1];
var score_text2 = score.children[3];
var count = 0;
score_text1.innerHTML = 0;
function $(select) {
    var ele = null;
    return (ele=document.querySelectorAll(select)).length === 1 ? ele[0] : ele ;
}

//落下的鱼和字母
function randomLetter()
{
    var ele = document.createElement("div");
    var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
    var randomleft = Math.round(Math.random()*(clientWidth - 100));
    ele.className  = "fish";
    ele.style.left = randomleft +"px";
    ele.style.top  = 0;    
    ele.innerHTML  = randomLetter;
    document.body.appendChild(ele);
    var timer = LetterMove(ele);//传参
    letterArray.push({
        left : randomleft,
        letter : randomLetter,
        ele : ele,
        timer : timer      
    })
    
}

//删除元素
function removeRecord(ele){
    for(var i = 0 , rec ; rec = letterArray[i ++] ;){
         if(rec.ele === ele){
              letterArray.splice(i-1,1);
              break;
         }
    }
}

//创建子弹
function creatBullet(evt)
{
    var e = evt || window.event ;
    var key = String.fromCharCode(e.keyCode || e.which);
    var ele = document.createElement("div");
    ele.className = "bullet";
    ele.style.left = clientWidth/2 -15 +"px";
    ele.style.top = pao.offsetTop - 30 + "px";
    document.body.appendChild(ele);
    for(var i = 0 , rec ; rec = letterArray[i++] ;)
        {
            if(rec.letter ===key)//子弹打到，就删除
                {
                    score_text1.innerHTML = ++count;//全局变量
                    clearInterval(rec.timer);
                    removeRecord(rec.ele);
                    setTimeout(function(){
                        ele.style.left = rec.left + 35 +"px";
                        ele.style.top = rec.ele.offsetTop + 50 +"px";
                        },5)      
                    setTimeout(function(){
                        rec.ele.remove();
                        ele.remove();
                        },300)
                    break;
                }
        }
}
//字母移动
function LetterMove(ele)
{
    var move_top = 0;
    var timer = null ;
    timer = setInterval(function()
    {
        move_top += 5;
        ele.style.top = move_top + "px";
        if(move_top >= 390)
            {
                clearInterval(timer);
                timer = null;
                ele.className += "die" ;
                setTimeout(function(){
                    removeRecord(ele);
                    ele.remove();
                },1000)
            }
    },50)
    return timer;
    
}

//输入字母
function handEnterRandomLetter(eve)
{
    var e = eve || window.event ;
    var keyCode = e.keyCode || e.which;
    if(keyCode >=65 && keyCode <= 95)
        {
            keyCode = String.fromCharCode(keyCode);
            pao_text.innerHTML = keyCode;
        }
}

timeKeeping();
function timeKeeping()
{  
    var count = 3;
    score_text2.innerHTML = count;
    var time = setInterval(function() {
        score_text2.innerHTML = --count;
        if(count <= 0)
            {
                console.log(1);
                btn_replay.style.display = "block";
                btn_replay.onclick = function()
                    {
                        window.location.reload();
                    }
                clearInterval(fish_time);
                // function btn_replay()
                // {
                //     console.log(1);
                //     btn_replay.style.display = "block";
                //     btn.onclick = function()
                //     {
                //         window.location.reload();
                //     }
                // }
                clearInterval(time);
                
                //score_text2.innerHTML =0;
                //btn_replay();
                //window.location.reload();
            }
    }, 1000);
}

// function btn_replay(){
//     btn_replay.style.display = "block";
//     btn.onclick = function()
//     {
//         window.location.reload();
//     }
// }

document.onkeydown = function(evt){
    handEnterRandomLetter(evt);
    creatBullet(evt);
}       
   
var fish_time = setInterval( randomLetter , 1000);


//窗口改变后，重新计算宽度。
window.onresize = function()
{
    clientWidth = document.documentElement.clientWidth;
}