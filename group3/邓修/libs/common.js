/**
 *  commonjs 函数库 
 *  v 0.0.1  
 *  by. huaizhiY
 *  date : 2019/6/12 
 * 
 *  */ 


/**
 * @function randomRGBAColor 
 * 作用 : 返回 rgba()字符串，随机颜色。
 */
function randomRGBAColor(){
      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);
      var a = Math.random().toFixed(2);
      return "rgba("+ r +","+ g +","+ b +" ,"+ a +")";
}

/**
 * 
 * @param {运算参数1} a 
 * @param {运算参数2} b 
 * @param {运算符} o 
 * 
 * 根据运算符 ，计算 a 和 b 的两数运算结果。
 */

function calculator( a , b , o){
      switch(o){
            case "+" : 
                  return Number(a)+ Number(b);
                  break;
            case "-" :
                  return a-b
                  break;
            case "*":
                  return a*b;
                  break;
            case "/":
                  return (a/b);
                  break;
            case "%":
                  return (a%b);
                  break;
            default :
                  return ("暂不支持运算");
      }
}

/**
 * 
 * @param {字符串} arg
 * 判定是否为纯数字 
 */
function isNumber(arg){
      return !isNaN(arg);
}

/**
 * getCountDown(year,month,date[,hour,minute,second])
 * 
 * 返回值结构 :
 *           [hour,minute,second]
 * 
 */
function getCountDown(){
      // 1. 只传年月日 ;
      // 2. 年月日时分秒;
      var 
            hour   = 0,
            minute = 0,
            second = 0;

      var targetDate = new Date();
      targetDate.setFullYear(arguments[0]); // 2019 6 18 
      targetDate.setMonth   (arguments[1] - 1);       // 2019 7 18 
      targetDate.setDate    (arguments[2]);       // 2019 7 10 

      // 根据参数不同,我们会进行不同的计算;
      if( arguments.length > 3){
            hour   = arguments[3];
            minute = arguments[4];
            second = arguments[5];
      }
      targetDate.setHours  (hour);
      targetDate.setMinutes(minute);
      var targetTime = targetDate.setSeconds(second);

      var reduce = targetTime - Date.now();

      var second = parseInt(reduce / 1000 % 60) ;
      var minute = parseInt(reduce / 1000 / 60 % 60);
      var hour   = parseInt( reduce / 1000 / 3600);
      var days   = hour > 24 ? parseInt(hour / 24) : 0;  
      hour       = hour > 24 ? hour % 24 : hour;

      console.log(hour);
      return [
                  hour < 10 ? "0" + hour : "" + hour ,
                  minute < 10 ? "0" + minute : "" +minute ,
                  second < 10 ? "0" + second : "" +second ,
                  days ? days : ""
            ];
}

function on(dom,eventType,callback,selector){
      if(dom.addEventListener){
            if(arguments.length === 4 && typeof arguments[3] === "string" ){
                  dom.addEventListener(eventType , delegation( callback , selector ));
            }else{
                  dom.addEventListener(eventType , callback);
            }
      }else if(dom.attachEvent){
            dom.attachEvent("on" + eventType, callback);
      }else{
            dom["on" + eventType] = callback;
      }
}

function delegation( handlerFunction , selector ){
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
                        handlerFunction.call(ele , e);
                        break;
                  }
            }
      }
}