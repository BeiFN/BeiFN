//炮台文字输入
var ele_pao=$("#pao") ;
var ele_pao_text=ele_pao.children[0];
var clientWidth=document.documentElement.clientWidth;
var letterArray=[];
var score=0;
var score_Num=$(".score_num");

function $(selector){
    var ele=null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}



// 创建随机位置的字母
function createRandomLetter(){
    var randomLetter=String.fromCharCode(65+Math.round(Math.random()*25));

    var randomLeft=Math.round(Math.random()*(clientWidth-100));
    var ele=document.createElement("div");
    ele.className="fish";                         
    ele.innerHTML=randomLetter;
    ele.style.top=0;
    ele.style.left=randomLeft+"px";
    document.body.appendChild(ele);
    

    // 删除
    var timer=eleMove(ele);
    letterArray.push({
        timer:timer,
        ele:ele,
        letter:randomLetter,
        left:randomLeft
    })
}

function removeRecord(ele){
    for(var i=0,rec;rec=letterArray[i++];){
        if(rec.ele===ele){
            letterArray.splice(i-1,1);
            break;
        }
    }
}


function eleMove(ele){
    var numTop=0;
    var timer=null;
    timer=setInterval(function(){
        numTop += 5;
        ele.style.top=numTop+"px";
        if(numTop>500){
            clearInterval(timer);
 
            timer=null;
            ele.className += " die";
            score--;
            score_Num.innerHTML = score;
            if(score<0){
                alert("游戏结束");
                return false; 
            }

            setTimeout(function(){
                removeRecord(ele);
                ele.remove();  
            },1000)
        }
        
        
    },50)
    return timer;
}
//创建子弹
function createBullet(evt){
    var e=evt||window.event;
    var key=String.fromCharCode(e.keyCode||e.which)
    var ele=document.createElement("div");
    ele.className="bullet";
    ele.style.left=clientWidth/2 - 15 + "px";
    ele.style.top=ele_pao.offsetTop - 30+"px";

    document.body.appendChild(ele);

    //判定是否存在相应的字母，在letter里面判定；
    for(var i=0,rec;rec=letterArray[i++];){
        if(rec.letter===key){
            clearInterval(rec.timer);
            removeRecord(rec.ele);
            //给子弹设置一个位置
            setTimeout(function(){
                ele.style.left=rec.left + 35+ "px";
                ele.style.top=rec.ele.offsetTop + 50 + "px";
            },5)
            //删除动画
            setTimeout(function(){
                rec.ele.remove();
                ele.remove();
               
            },800)
            break;
        }
    }
}
// 炮台的文字输入功能
function handerEnterLetter(evt){
    var e=evt||window.event;
    // console.log(e);
    var keyCode=e.keyCode||e.which;
    if(keyCode>=65&&keyCode<=90){
        keyCode=String.fromCharCode(keyCode);
        ele_pao_text.innerHTML=keyCode;
        score++;
    score_Num.innerHTML = score;
    }
    console.log(keyCode);
}


document.onkeydown=function(evt){
    handerEnterLetter(evt);
    createBullet(evt);  
	score_Num.innerHTML = score;
};
setInterval( createRandomLetter ,1000);
window.onresize=function(){
    clientWidth=document.documentElement.clientWidth;
}
