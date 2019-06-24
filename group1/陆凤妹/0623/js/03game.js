/**
 * 
 *  */ 
 var ele_pao = $("#pao");
 var ele_mark = $("#mark");
 var ele_s = $("#s");
 var oBtn = $("#btn");
 var ele_pao_text = ele_pao.children[0];    // 炮上的文字
 // 屏幕的宽度;   屏幕宽度不会改变
 var clientWidth = document.documentElement.clientWidth;
 // 储存随机字母的数组;
 var letterArray = [];

var num = 0;   //记录分数



/**
 * 
 *  */ 
// 元素选择   封装
 function $(selector){
      var ele = null;
                              //    ===   三等不比对基本类型，比对数据类型，
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
 }



 function createRandomLetter(){
      //随机字母
      var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
     
      var randomLeft = Math.round( Math.random() * (clientWidth - 100));
      // console.log(randomLetter);
      var ele = document.createElement("div");//创建一个div容纳随机字母
      ele.className = "fish";
      ele.innerHTML = randomLetter;
      ele.style.top = 0;
      // ele在没有插入页面的时候是没有offset值的;
      // console.log(ele.offsetWidth);
      // 边界;
      ele.style.left = randomLeft  + "px";   //随机    
      document.body.appendChild(ele); //
    
      var timer = eleMove(ele);  //定时器调用随机字母
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
            if(numTop >= 400){
                  clearInterval(timer);
                  // 清空变量，让变量内的数据被垃圾回收机制回收;
                  timer = null;
                  ele.className += " die";
                  // 动画运行结束删除元素;
                  setTimeout( function (){
                        removeRecord(ele)
                        ele.remove();
                     

                    //     没打中鱼
                          num--;
                          ele_mark.innerHTML = num;

                  } ,1000)
            }
      },50)
      return timer;
 }
// 创建子弹;
 function createBullet(evt){
     var e = evt || window.event;
     var key = String.fromCharCode( e.keyCode || e.which);    //键盘字母兼容性问题

     var ele = document.createElement("div");    //创建一个div装子弹
     ele.className = "bullet";                  //给div设置样式属性
     ele.style.left = clientWidth/2 - 15 + "px";             //设置子弹在屏幕中，随机落到地面的左右偏移位置    
     ele.style.top = ele_pao.offsetTop - 30 + "px";             //设置子弹在屏幕中，随机打到字母的高度
          
     document.body.appendChild(ele);       //将div插入到body中


     // 判定是否存在相应的字母; 在letter里面判定;
     for(var i = 0 ,rec ; rec = letterArray[i++]; ){
          // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
          if(rec.letter === key){

          //    分数++
              num++;
               ele_mark.innerHTML = num;
          //     console.log(num);

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
 }
 


 function handlerEnterLetter(evt){
      var e = evt || window.event;  
      // console.log(e);
      var keyCode = e.keyCode || e.which;  

      if(keyCode >= 65 && keyCode <= 90 ){
            keyCode = String.fromCharCode(keyCode); 
            ele_pao_text.innerHTML = keyCode;
          
      }
   
 }

 // on系列事件没办法对多函数调用的妥协;
 document.onkeydown = function(evt){
      handlerEnterLetter(evt)
      createBullet(evt);
   
 };
  var timer2 = setInterval( createRandomLetter , 1000);


  //倒计时游戏结束
 var time = 30;
 setInterval(function(){ 
      if(time>0){
          time--;
          ele_s.innerHTML = time;  
      }else{
           clearInterval(timer2);
           oBtn.style.display = "block";
           for(var i=0, sc;sc=letterArray[i++];){
                sc.ele.remove();
           }
           letterArray.length=0;
      } 
    
  },1000)


  //游戏结束，重新加载
oBtn.onclick = function(){
         window.location.reload();
     }

 // 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
 window.onresize = function(){
      clientWidth = document.documentElement.clientWidth;
 }





 // 1. 计分板;
 // 2. 倒计时; 1.倒计时结束不再出鱼; 2. 显示分数。 3. 重新开始按钮; 