function restart(){
var ele_pao  = $("#pao");
var ele_pao_txt = ele_pao.children[0];
var clientWidth = document.documentElement.clientWidth;
var ele_score = $(".count");
var ele_time = $(".free");
var fishArray = [];
var count = 0;
ele_score.innerHTML = "0";

function $(selector){
    var ele =null;
    return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] :ele;
}

/**
 * 按键炮台接受数字
 */
function handlerOnKeyDown(evt){
    var e = evt || window.event;
    var keyCode  = e.keyCode || e.which;
    if(keyCode >= 65 && keyCode <=90){
        var keyCode = String.fromCharCode(keyCode);
        ele_pao_txt.innerHTML = keyCode;
    }
}

/**
 * 创建鱼
 */
function creatRandomLetter(){
    var fish = document.createElement("div");
    fish.className= "fish";
    var randomLetter =String.fromCharCode(Math.round(Math.random()*25) + 65) ;
    fish.innerHTML = randomLetter;
    fish.style.top = 0;
    var randomLeft = Math.round(Math.random()*(clientWidth - 100));
    fish.style.left = randomLeft + "px";
    document.body.appendChild(fish);

    var timer = fishMove(fish);

    fishArray.push({
        timer:timer,
        fish:fish,
        left:randomLeft,
        letter:randomLetter,
    });
    //console.log(fishArray);

}
/**
 * 鱼移动
 */
function fishMove(fish){
    var top_distance = 0;
    var timer = null;
    timer = setInterval( function (){
        top_distance += 5;
        fish.style.top = top_distance + "px";
          if(top_distance >= 400){
                clearInterval(timer);
                timer = null;
                fish.className += " die";
                setTimeout( function (){
                    removeRecord(fish);
                    fish.remove();
                } ,1000)
          }
    },50)
    return timer;
}
/**
 * 创建子弹
 */

 function createBullet(evt){
     if(!total_time) return false;
     var e = evt ||window.event;
     var keyCode = String.fromCharCode(e.keyCode || e.which);
     var bullet = document.createElement("div");
     bullet.className = "bullet";
     bullet.style.left = clientWidth / 2 - 15 +"px";
     bullet.style.top = ele_pao.offsetTop - 25 + "px";
     document.body.appendChild(bullet);
     var flage = true;
     for(var i = 0 , rec ; rec = fishArray[i++] ; ){
         if(keyCode === rec.letter){
             count++;
             flage = false;
             ele_score.innerHTML = count;
             //setInterval(function(){
                 clearInterval(rec.timer);
                 removeRecord(rec.fish);
                 setTimeout(function(){
                     bullet.style.left = rec.left + 35 + "px";
                     bullet.style.top = rec.fish.offsetTop + 50 + "px";
                 },5);
                 setTimeout(function(){
                     rec.fish.remove();
                     bullet.remove();
                 },500);
             //},)
             break;
         }
     }
     if(flage){
         count--;
         ele_score.innerHTML = count;
     }
      
 }
 /**
  * 移除数组中的鱼
  */
function removeRecord(fish){
    for(var i = 0 ,rec ; rec = fishArray[i++] ; ){
        if(rec.fish === fish){
            fishArray.splice(i - 1 , 1);
            break;
        }
    }
}
    
    
var total_time = 60;
// var btn = $(".btn");
var gameOver = $(".gameOver");

    gameOver.style.display = "none";
    var total_time = total_time;
    timer2 = setInterval(function(){
        total_time--;
        ele_time.innerHTML = total_time;

        document.onkeydown = function(){
            handlerOnKeyDown();
            createBullet();
        }
        if(!total_time){
            clearInterval(timer2);
            clearInterval(time_createFish);
        
            for (var i = 0; i < fishArray.length; i++) {
                fishArray[i].fish.remove();
            }
            gameOver.style.display = "block";
        }
    },1000);

    
    
   var time_createFish=setInterval(creatRandomLetter,1000);

    // document.onkeydown = function(){
    //     handlerOnKeyDown();
    //     createBullet();
    // }
}
var btn = document.querySelector(".btn");
btn.onclick = restart;