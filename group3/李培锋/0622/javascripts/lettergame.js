
 var ele_pao = $("#pao");
 var ele_pao_text = ele_pao.children[0];
 var clientWidth = document.documentElement.clientWidth;
 var letterArray = [];
 function $(selector){                                                                        //通用的选择器
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
 }
      /* 
      timer => 用来关闭定时器终止鱼的运动;
      ele   => 用来删除;
      randomLetter => 用来判定的;
      left => 用来给炮弹制造目标的;
      */
 function createRandomLetter(){                                                               //随机字母/鱼
      var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
      var randomLeft = Math.round( Math.random() * (clientWidth - 100));                       //随机区域 由于 可视窗口减去 元素本身宽度
      var ele = document.createElement("div");                                                 //鱼的盒子，样式，文本，位置
      ele.className = "fish";
      ele.innerHTML = randomLetter;                                                        
      ele.style.top = 0;
      ele.style.left = randomLeft  + "px";
      document.body.appendChild(ele);
      var timer = eleMove(ele);
      letterArray.push({
           timer : timer,
           ele : ele,
           letter : randomLetter,
           left : randomLeft
      })
 }

//清除之前的数据
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
                  clearInterval(timer);                  // 清空变量，让变量内的数据被垃圾回收机制回收;
                  timer = null;
                  ele.className += " die";
                  setTimeout( function (){              // 动画运行结束删除元素;
                        removeRecord(ele)
                        ele.remove();
                  } ,1000)
            }
      },50)
      return timer;
 }
// 创建子弹;
 function createBullet(evt){
     var e = evt || window.event;
     var key = String.fromCharCode( e.keyCode || e.which);

     var ele = document.createElement("div");
     ele.className = "bullet";
     ele.style.left = clientWidth/2 - 15 + "px";
     ele.style.top = ele_pao.offsetTop - 30 + "px";
          
     document.body.appendChild(ele);

     // 判定是否存在相应的字母; 在letter里面判定;
     for(var i = 0 ,rec ; rec = letterArray[i++]; ){                                   // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
          if(rec.letter === key){
               clearInterval(rec.timer);
               removeRecord(rec.ele);           
               setTimeout(function(){                                                 // 给子弹设置一个位置;
                    ele.style.left = rec.left + 35 + "px";
                    ele.style.top  = rec.ele.offsetTop + 50 + "px";
               },5)
               setTimeout(function(){                                                 // 删除动画;
                    rec.ele.remove();
                    ele.remove();
               },800)

               break;
          }    
     }
 }
 // 炮台的文字输入功能;
 function handlerEnterLetter(evt){
      var e = evt || window.event;
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
 setInterval( createRandomLetter , 1000);

 // 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
 window.onresize = function(){
      clientWidth = document.documentElement.clientWidth;
 }

