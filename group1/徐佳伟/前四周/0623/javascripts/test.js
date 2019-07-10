 var 
    ele_pao      = $("#pao"),
    ele_pao_text = ele_pao.children[0],
    btn          = $("#btn"),
    clientWidth  = document.documentElement.clientWidth,
    letterArray  = [],
    count        = 1 ,
    timer        = null ;
 function $(selector){
    var res = null ;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
}
/**
 * 添加随机鱼
 */
 function createRandomLetter(){
    var randomLetter = String.fromCharCode(65 + Math.round(Math.random()*25));
    var randomLeft = Math.round(Math.random()*(clientWidth - 100));
    var fish = document.createElement("div");

    fish.className = "fish";
    fish.innerHTML = randomLetter;
    fish.style.top = "0";
    fish.style.left = randomLeft + "px";
    document.body.appendChild(fish);
    
    timer = eleMove(fish);
    letterArray.push(
        {
            timer : timer,
            ele : fish,
            left : randomLeft,
            letter : randomLetter
        }
    );
 }
 /**
  * 删除死鱼或跑鱼
  * @param {*} ele 
  */
 function removeRecord(ele){
    for(var i = 0 ,rec ; rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice( i - 1 , 1 );
            break;
        }
    }
 }
 /**
  * 开炮
  * @param {*} ele 
  */
 function createBullet(keyCode){
    keyCode = String.fromCharCode(keyCode);
   
    var bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.left = clientWidth/2 - 15 +"px";
    bullet.style.top = ele_pao.offsetTop - 30 +"px";
    document.body.appendChild(bullet);

    for( var i = 0 ,rec; rec = letterArray[i++];){
        if(rec.letter === keyCode){
            clearInterval(rec.timer);
            removeRecord(rec.ele);
            $(".count").innerHTML = "总得分:"+(count ++);

            setTimeout(function(){
                bullet.style.left = rec.left + 35 + "px";
                bullet.style.top = rec.ele.offsetTop + 60 + "px";
            },100)

            setTimeout(function(){
                rec.ele.remove();
                bullet.remove();
            },800)

            break;
        }
    }

 }

 /**
  * 让鱼动起来
  * @param {} ele 
  */
 function eleMove(ele){
    var numTop = 0;

    timer = setInterval(function(){
        numTop += 5;
        ele.style.top = numTop +"px";
        if(numTop >= 700){
        //是时候关闭计时器了   
            clearInterval(timer);
            //清空计时器地址
            timer = null;
            ele.className += " die";
            setTimeout(function(){
                //删除元素
                removeRecord(ele);
                ele.remove();
            },1000)
        }
    },100)
 }


 function handlerEnterLetter(keyCode){
    if(keyCode >=65 && keyCode <=90){
        keyCode = String.fromCharCode(keyCode);       
        ele_pao_text.innerHTML = keyCode;
    }
 }
 function getKeyCode(evt){
    var e = evt || window.event;
    return e.keyCode || e.which;
 }
 btn.onclick = function(){
     location.reload();
 }
 document.onkeydown = function(evt){
    // var keyCode = getKeyCode(evt);
    // var e = evt || window.event;
    // var keyCode = e.keyCode || e.which;
    handlerEnterLetter(getKeyCode(evt));
    createBullet(getKeyCode(evt));
 }
 
setInterval(createRandomLetter,1000);
 
window.onresize = function(){
    clientWidth = document.documentElement.clientWidth;
}





