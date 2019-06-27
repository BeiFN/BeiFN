/**
 * common  函数库
 * 
 * v 0.0.01
 * 
 * by.BillLiu
 * date:2019.6.15
 */


 /**
  * @function randomRGBAColor
  * 作用：返回rgba()字符串，随机颜色
  */
 
function randomRGBAColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var a = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// console.log(randomRGBAColor());

/**
 * @param{运算参数1} a
 * @param{运算参数2} b
 * @param{运算符}  o
 * 
 * 根据运算符，计算a和b的两数运算结果
 */
function calculator(a, b, o) {
    switch (o) {
        case "+":
            return Number(a) + Number(b);
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
        case "%":
            return (a % b);
            break;
    }
}

/**
 * @param {字符串} arg
 * 判定是否为纯数字
 * 
 */

 function isNumber(arg){
     return !isNaN(arg);
 }

//  console.log(isNumber("12a3"));

/**
 * @param{数字1，数字2}min,max
 * 随机取[min,max]区间里的数
 * 
 */
function getRandomInt(min,max){
    return min+Math.round(Math.random()*(max-min));
}

// console.log(getRandomInt(2,5));


function on(dom,evetType,callback,selector){
    if(dom.addEventListener){
          if(arguments.length === 4 && typeof arguments[3] === "string" ){
                dom.addEventListener(evetType , delegation( callback , selector ));
          }else{
                dom.addEventListener(evetType , callback);
          }
    }else if(dom.attachEvent){
          dom.attachEvent("on" + eventType, callback);
    }else{
          dom["on" + eventType] = callback;
    }
}

function delegation( handlerClick , selector ){
    return function(evt){
          var e = evt || window.event;
          var target = e.target || e.srcElement;
          var eleList = this.querySelectorAll(selector);
          var targetFamily = [];
          var _tempTarget = target;
          var count = 0;
          while(true && count ++ < 100){
                if(_tempTarget === this || _tempTarget === null){
                      break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
          }
          for(var i = 0 , ele ; ele = eleList[i++]; ){
                if(targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1){
                      handlerClick.call(ele , e);
                      break;
                }
          }
    }
}