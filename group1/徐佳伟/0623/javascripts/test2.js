/**
 * 声明变量
 */
 var 
     count   = 1,
     ele_pao = $("#pao"),
     ele_btn = $("#btn"),
     ele_div = $(".count"),
     letterArray  = [],
     ele_pao_text = ele_pao.children[0],
     clientWidth  = document.documentElement.clientWidth;

 function $(selector){
    var res = null;
    return (res = document.querySelectorAll(selector)).length === 1 ? res[0] : res ;
  }
  
  function createRandomLetter(){
      var randomLetter = String.fromCharCode(Math.round(65 + Math.random() * 25));
      var randomLeft = Math.round(Math.random() * (clientWidth - 100));
      var timer = null;
      var ele = document.createElement("div");
      ele.style.top = "0";
      ele.style.left = randomLeft +"px";
      ele.className = "fish";
      ele.innerHTML = randomLetter;
      document.body.appendChild(ele);
      timer = eleMove(ele);
      letterArray.push({
          timer : timer,
          ele : ele,
          left : randomLeft,
          letter : randomLetter
      });
  }
  function eleMove(ele){
      var topNum = 0;
      var timer = null;
      timer = setInterval(function(){
        topNum += 5;
        ele.style.top = topNum + "px";
        if(topNum >= 700){

            ele.className += " die";
            clearInterval(timer);
            timer = null;
            setTimeout(function(){
                ele.remove();
                removeRecord(ele);
            },1000)
        }
      },50)
      return timer;
  }
  function removeRecord(ele){
    for(var i = 0,rec; rec = letterArray[i++];){
        if(rec.ele === ele){
            letterArray.splice(i-1 , 1);
            break;
        }
    }
  }
  function createBullet(keyCode){
    var bullet = document.createElement("div");

    keyCode = String.fromCharCode(keyCode);
    bullet.className = "bullet";
    bullet.style.left = clientWidth/2 - 15 +"px";
    bullet.style.top = ele_pao.offsetTop - 30 + "px";
    document.body.appendChild(bullet);

    for(var i = 0 , rec ; rec = letterArray[i++];){
        if(keyCode === rec.letter){
            ele_div.innerHTML = "总分为:" + count ++ ;
            clearInterval(rec.timer);
            removeRecord(rec.ele);

            setTimeout(function(){
                bullet.style.left = rec.left+35+"px";
                bullet.style.top = rec.ele.offsetTop+50+"px";
            },5)
            setTimeout(function(){
                rec.ele.remove();
                bullet.remove();
            },800)

            break;
        }
    }
  }
  function handlerEnterLetter(keyCode){
    if(keyCode >=65 && keyCode <= 90){
        keyCode = String.fromCharCode(keyCode);
        ele_pao_text.innerHTML = keyCode;
    }
  }

  function getKeyCode(evt){
    var e = evt || window.event;
    return e.keyCode || e.which;
  }
 document.onkeydown = function(evt){
    handlerEnterLetter(getKeyCode(evt));
    createBullet(getKeyCode(evt));
 }
 ele_btn.onclick = function(){
     location.reload();
 }
 document.onresize = function(){
     clientWidth = document.documentElement.clientWidth;
 }
 setInterval(createRandomLetter,1000);