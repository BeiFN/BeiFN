/**
 * 
 *  */ 
var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
// 屏幕的宽度;
var clientWidth = document.documentElement.clientWidth;
var btn =$("#btn");
// 储存随机字母的数组;
var letterArray = [];
var scoreArray = [];
/**
* 
*  */ 

function $(selector){
     var ele = null;
     return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function createRandomLetter(){
     var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
     var randomLeft = Math.round( Math.random() * (clientWidth - 100));
     // console.log(randomLetter);
     var ele = document.createElement("div");
     ele.className = "fish";
     ele.innerHTML = randomLetter;
     ele.style.top = 0;
     // ele在没有插入页面的时候是没有offset值的;
     // console.log(ele.offsetWidth);
     // 边界;
     ele.style.left = randomLeft  + "px";
     document.body.appendChild(ele);

     var timer = eleMove(ele);
     // timer => 用来关闭定时器终止鱼的运动;
     // ele   => 用来删除;
     // randomLetter => 用来判定的;
     // left => 用来给炮弹制造目标的;
     letterArray.push({
          timer : timer,
          ele : ele,
          letter : randomLetter,
          left : randomLeft
     })
}


function removeRecord(ele){
    
    for(var i = 0 , rec ; rec = letterArray[i ++] ;){
         if(rec.ele === ele){
              letterArray.splice(i-1,1);
             
              break;
         }
    }
  
}

function eleMove(ele){
     var numTop = 0;
     var timer = null;
     timer = setInterval( function (){
       
           numTop += 5;
           ele.style.top = numTop + "px";
           if(numTop >= 500){
                 clearInterval(timer);
                 // 清空变量，让变量内的数据被垃圾回收机制回收;
                 timer = null;
                 ele.className += " die";
                 // 动画运行结束删除元素;
                 setTimeout( function (){
                       removeRecord(ele)
                       ele.remove();
                 } ,1000)
           }
     },50)
    
     return timer;
}
// 创建子弹;
var ele = document.createElement("div");
function createBullet(evt){
    var e = evt || window.event;
    var key = String.fromCharCode( e.keyCode || e.which);

    
    ele.className = "bullet";
    ele.style.left = clientWidth/2 - 15 + "px";
    ele.style.top = ele_pao.offsetTop - 30 + "px";
         
    document.body.appendChild(ele);

    // 判定是否存在相应的字母; 在letter里面判定;
    for(var i = 0 ,rec ; rec = letterArray[i++]; ){
         // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
         
         if(rec.letter === key){
            scoreArray.push(rec.letter);
           
              clearInterval(rec.timer);
              removeRecord(rec.ele);
              
              // 给子弹设置一个位置;
              setTimeout(function(){
                   ele.style.left = rec.left + 35 + "px";
                   ele.style.top  = rec.ele.offsetTop + 50 + "px";
              },5)

              // 删除动画;
              setTimeout(function(){
                
                   rec.ele.remove();
                   ele.remove();
              },800)
              
              break;
         }    
    }
    var count =scoreArray.length;
            console.log(count);
            createScore(count);
          return count;
}

// 炮台的文字输入功能;
function handlerEnterLetter(evt){
     var e = evt || window.event;
     // console.log(e);
     var keyCode = e.keyCode || e.which;

     if(keyCode >= 65 && keyCode <= 90 ){
           keyCode = String.fromCharCode(keyCode);
           ele_pao_text.innerHTML = keyCode;
     }
  
     console.log(keyCode);
}

// on系列事件没办法对多函数调用的妥协;
document.onkeydown = function(evt){
     handlerEnterLetter(evt)
     createBullet(evt);
     
};
var create =  setInterval( createRandomLetter , 1000);

// 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
window.onresize = function(){
     clientWidth = document.documentElement.clientWidth;
}

// 1. 计分板;
// 2. 倒计时; 1.倒计时结束不再出鱼; 2. 显示分数。 3. 重新开始按钮; 
//创建计分板
var score = document.createElement("div");
function createScore(count){
   
    
    
    score.className = "score";
    score.style.top = "0";
    score.style.left = "0";
    document.body.appendChild(score);
    score.style.position="absolute";
    score.innerHTML = count+"分";
    return count;
}

var countdown = document.createElement("div");
countdown.className = "countdown";
document.body.appendChild(countdown);
function daojishi(){
    var now = new Date();
    
    
    var tarTime = new Date("2019-06-23 17:16:00"); 
    
    //console.log(tarTime);

    diff= tarTime-now;
    var m= Math.floor(diff/1000/60).toString().padStart(2,"0");
    var s= Math.floor(diff/1000%60).toString().padStart(2,"0");
    // if(s===0&&m>0){
    //     m=m-1;
    //     s=60;
    //     setInterval(function(){
    //        s=s-1;
    //     },1000)
    // }
   

  
    if((m==00 )&&(s==00)){
   
         
       // confirm("游戏结束 得分:" );
        
    }else{
        var strtime = m+"："+s;
    }
    
    //console.log(strtime);
    return strtime;
  
}
var t =10;
var oo =  setInterval(function(){
    // if(daojishi() ==="00:00"){
    //     clearInterval(create);
    //     clearInterval(oo);
    // }
   while(t<=0){
     tand ();
     btn.style.display = "block";
     chong.style.display = "block";
     clearInterval(oo);
     setTimeout(function(){
                
          rec.ele.remove();
          ele.remove();
     },400)
     clearInterval(create);
     break;
   }
     
     t--;
    //countdown.innerHTML = daojishi();
    countdown.innerHTML =t;
  
    
},1000)

// setTimeout(function(){
//     clearInterval(timer);
// },1000)
//window.location.reload(true);
btn.onclick　= function (){
    window.location.reload(true);
}
var tan = document.createElement("div");
function tand (){
  
  document.body.appendChild(tan);
  tan.id = "tan";
  tan.className = "tan";
  tan.style.display="block";
  tan.innerHTML =  "游戏结束，得分为：" + score.innerHTML;
}
var chong = document.createElement("button");
chong.className = "chong";
//chong.style.type = "button"
chong.innerHTML = "去充值";

document.body.appendChild(chong);
chong.onclick =function (){
     location.href = "chongzhi.html";
}