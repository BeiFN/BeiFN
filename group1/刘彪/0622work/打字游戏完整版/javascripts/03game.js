/**
 * 
 *  */
var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
var scoreBoard = $("#ScoreBoard").children[1];
var timeBoard = $("#TimeBoard");
var finalBoard = $("#FinalBoard");
var finalScore = finalBoard.children[0];
var btn = finalBoard.children[1];
// 屏幕的宽度;
var clientWidth = document.documentElement.clientWidth;

// 储存随机字母的数组;
var letterArray = [];

//分数
var score = 0;

//出鱼标志

var fish = 1;


/**
 * 
 *  */

function $(selector) {
     var ele = null;
     return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}


// 炮台的文字输入功能;
function handlerEnterLetter(evt) {
     var e = evt || window.event;
     // console.log(e);
     var keyCode = e.keyCode || e.which;

     if (keyCode >= 65 && keyCode <= 90) {
          keyCode = String.fromCharCode(keyCode);
          ele_pao_text.innerHTML = keyCode;
     }

     // console.log(keyCode);
}

//生成鱼
function createFishLetter() {
     if (fish) {
          var randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 25));
          var randomLeft = Math.round(Math.random() * (clientWidth - 100));
          // console.log(randomLetter);
          var ele = document.createElement("div");
          ele.className = "fish";
          ele.innerHTML = randomLetter;
          ele.style.top = 0;
          // ele在没有插入页面的时候是没有offset值的;
          // console.log(ele.offsetWidth);
          // 边界;
          ele.style.left = randomLeft + "px";
          document.body.appendChild(ele);

          var timer = eleMove(ele);
          // timer => 用来关闭定时器终止鱼的运动;
          // ele   => 用来删除;
          // randomLetter => 用来判定的;
          // left => 用来给炮弹制造目标的;
          letterArray.push({
               timer: timer,
               ele: ele,
               letter: randomLetter,
               left: randomLeft
          })
     }

}
//鱼的移动
function eleMove(ele) {
     var numTop = 0;
     var timer = null;
     timer = setInterval(function () {
          numTop += 5;
          ele.style.top = numTop + "px";
          if (numTop >= 500) {
               clearInterval(timer);
               // 清空变量，让变量内的数据被垃圾回收机制回收;
               timer = null;
               ele.className += " die";
               // 动画运行结束删除元素;
               setTimeout(function () {
                    removeRecord(ele)
                    ele.remove();
               }, 1000)
          }
     }, 50)
     return timer;
}



// 创建字母炮弹,并判断页面中是否存在相同字母
function createBullet(evt) {
     var e = evt || window.event;
     var key = String.fromCharCode(e.keyCode || e.which);

     var ele = document.createElement("div");
     ele.className = "bullet";
     ele.style.left = clientWidth / 2 - 15 + "px";
     ele.style.top = ele_pao.offsetTop - 30 + "px";
     document.body.appendChild(ele);

     // 判定是否存在相应的字母; 在letter里面判定;
     for (var i = 0, rec; rec = letterArray[i++];) {
          //减分标志,默认减分
          var flag = 1;
          // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
          if (rec.letter === key) {
               clearInterval(rec.timer);
               removeRecord(rec.ele);   //删除该条鱼的记录
               // 给子弹设置一个目标位置;
               setTimeout(function () {
                    ele.style.left = rec.left + 35 + "px";
                    ele.style.top = rec.ele.offsetTop + 50 + "px";
               }, 5)
               // 删除动画;
               setTimeout(function () {
                    rec.ele.remove();
                    ele.remove();
               }, 800)

               flag = 0;//改变减分标志
               break;
          }
     }

     //计分板
     if (flag) {
          if (score > 0) {
               --score;
          } else {
               score = 0;
          }
     } else {
          ++score;
     }
     scoreBoard.innerHTML = score.toString().padStart(3, "0");
}

//从鱼数组删除记录
function removeRecord(ele) {
     for (var i = 0, rec; rec = letterArray[i++];) {
          if (rec.ele === ele) {
               letterArray.splice(i - 1, 1);
               break;
          }
     }
}

//倒计时
var total = 10;
var clearInt = setInterval(function () {
     total--;
     timeBoard.innerHTML = total + "s";
     // console.log(total);
     if (total == 0) {
          fish = 0;//出鱼标志改变

          //删除记录和动画
          for (var i = 0, rec; rec = letterArray[i++];) {
               rec.ele.remove();
               removeRecord(rec);
          }
          //显示最终得分
          finalScore.innerHTML = scoreBoard.innerHTML;
          scoreBoard.style.display = "none";
          finalBoard.style.display = "block";
          clearInterval(clearInt);

          return
     }
}, 1000)



//---------------------业务-------------------------------


// on系列事件没办法对多函数调用的妥协;既要显示炮台字母,也要创建炮弹

window.onload = function () {
     if (confirm("是否开始游戏?")) {
          document.onkeydown = function (evt) {
               handlerEnterLetter(evt)
               createBullet(evt);
          };
          setInterval(createFishLetter, 1000);

          // 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
          window.onresize = function () {
               clientWidth = document.documentElement.clientWidth;
          }
     }
}

btn.onclick = function () {
     document.location.reload();
}


 // 1. 计分板;
 // 2. 倒计时; 1.倒计时结束不再出鱼; 2. 显示分数。 3. 重新开始按钮; 