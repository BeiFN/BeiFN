var ele_pao = $("#pao");
var ele_pao_text = ele_pao.children[0];
var ele_scoreBoard = $("#scoreBoard");
var ele_scoreBoard_children = ele_scoreBoard.children;
// 屏幕的宽度;
var clientWidth = document.documentElement.clientWidth;
// 储存随机字母的数组;
var letterArray = [];
// 正确次数和错误次数以及得分
var rightCount = 0, wrongCount = 0, score = 0;

ele_scoreBoard_children[0].innerHTML = rightCount;
ele_scoreBoard_children[2].innerHTML = wrongCount;
ele_scoreBoard_children[4].innerHTML = score;

function $(selector) {
     var ele = null;
     return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

function createRandomLetter() {
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

function removeRecord(ele) {
     for (var i = 0, rec; rec = letterArray[i++];) {
          if (rec.ele === ele) {
               letterArray.splice(i - 1, 1);
               break;
          }
     }
}

function eleMove(ele) {
     var numTop = 0;
     var timer = null;
     timer = setInterval(function () {
          numTop += 5;
          ele.style.top = numTop + "px";
          if (numTop >= 500) {
               wrongCount++;
               ele_scoreBoard_children[2].innerHTML = wrongCount;
               clearInterval(timer);
               // 清空变量，让变量内的数据被垃圾回收机制回收;
               timer = null;
               ele.className += " die";
               // 动画运行结束删除元素;
               setTimeout(function () {
                    removeRecord(ele);
                    ele.remove();
               }, 1000)
          }
     }, 50)
     return timer;
}
// 创建子弹;
function createBullet(evt) {
     var e = evt || window.event;
     var key = String.fromCharCode(e.keyCode || e.which);

     var ele = document.createElement("div");
     ele.className = "bullet";
     ele.style.left = clientWidth / 2 - 15 + "px";
     ele.style.top = ele_pao.offsetTop - 30 + "px";

     var flag = false;
     for (var j in letterArray) {
          if (letterArray[j].letter === key) flag = true;
     }
     if (flag === false) {
          wrongCount++;
          return false;
     }
     else {
          document.body.appendChild(ele);
     }

     // 判定是否存在相应的字母; 在letter里面判定;
     for (var i = 0, rec; rec = letterArray[i++];) {
          // 如果存在页面中的鱼,代表的字母和当前输入的字母相同;
          if (rec.letter === key) {
               rightCount++;
               clearInterval(rec.timer);
               removeRecord(rec.ele);
               // 给子弹设置一个位置;
               setTimeout(function () {
                    ele.style.left = rec.left + 35 + "px";
                    ele.style.top = rec.ele.offsetTop + 50 + "px";
               }, 5)

               // 删除动画;
               setTimeout(function () {
                    rec.ele.remove();
                    ele.remove();
               }, 800)
               break;
          }
     }
}
// 计算分数
function calculateScore() {
     score = rightCount;
     ele_scoreBoard_children[0].innerHTML = rightCount;
     ele_scoreBoard_children[2].innerHTML = wrongCount;
     ele_scoreBoard_children[4].innerHTML = score;
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

// on系列事件没办法对多函数调用的妥协;
document.onkeydown = function (evt) {
     handlerEnterLetter(evt)
     createBullet(evt);
     calculateScore();
};
var countDown = setInterval(createRandomLetter, 1000);
setTimeout(function () {
     clearInterval(countDown);
}, 5000);      //倒计时

// 屏幕尺寸发生改变的时候,重新计算屏幕的宽度;
window.onresize = function () {
     clientWidth = document.documentElement.clientWidth;
}

// 点击重新开始游戏
restart.onclick = function () {
     location.reload();
}
