
/**
 * create lhg
 * v 0.0.01
 * date 20190612
 * 
 *  */


/**
 * @function randomRGBAColor()
 * 返回随机颜色
 * 
 *  */
function randomRGBAColor(){
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var a = Math.random().toFixed(2);
    var randomColor = "rgba("+ r +","+ g +","+ b +","+ a +")";
    return randomColor;
}

/**
 * @param(参数a)
 * @param(b)
 * @param(o计算符)
 * 
 * 返回计算结果
 *  */
function calculator(a , b, o){
    switch(o){
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
            return a % b;
            break;
        default : return ("无效运算符"); break;
    }
}

/**
 * @param  arg 字符串
 * 
 * 判断是否纯数字
 *  */

function isNumber(arg){
    return !isNaN(arg);
}

















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