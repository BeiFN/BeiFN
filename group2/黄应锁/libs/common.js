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
* 
*倒计时函数 现在到某日的倒计时；
* 
* 
*/
//    setInterval(countDown("2019/10/1 10:20:10"),1000);
//    function countDown(time) {
//           var arr = getShiJian(time);
//           days_box.innerHTML = arr[3];
//           hour_box.innerHTML = arr[2];
//           minute_box.innerHTML = arr[1];
//           second_box.innerHTML = arr[0];
//           return function(){
//               countDown(time)
//           }
//     }

// function getShiJian(time){
//     var date = new Date(time);
//     var total = date.getTime() - Date.now();

//     var second = parseInt(total / 1000 % 60);
//     var minute = parseInt(total / 1000 / 60 % 60);
//     var hour = parseInt(total / 1000 / 3600 % 24);
//     var days = parseInt(total / 1000 / 3600 / 24);

//     return [
//         second < 10 ? "0" + second : "" + second,
//         minute < 10 ? "0" + minute : "" + minute,
//         hour < 10 ? "0" + hour : "" + hour,
//         days < 10 ? "0" + days : "" + days
//     ];
// }

/**
 * 
 * @param {节点} dom 
 * @param {事件类型} evetType   如click 
 * @param {时间返回函数} callback 
 * @param {选择器} selector 
 * 
 * 给节点加监听，并且进行事件委托
 */

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


/**
 * 
 * @param { domjson结构 } domJson 
 *  
 * 结构示例 : 
 * {
      type : "p",
      attr : {
            class : "hello"
      },
      html : "hello world"
}
 * 
 */

function createElement( domJson ){
      typeof domJson === "undefined" ?  domJson = {} : ""; 

      var ele = document.createElement( domJson.type ? domJson.type : "div" );
      for(var attr in domJson.attr ){
            ele.setAttribute(attr , domJson.attr[attr]); 
      }
      ele.innerHTML = domJson.html ? domJson.html : "";

      // 增加插入元素的功能; children;
      // 所有引用类型隐式数据类型转换为 true ;
      for(var i = 0, childEle ; domJson.children && (childEle = domJson.children[i++]) ;  ){
            // console.log(ele);
            childEle.nodeType === 1 ? ele.appendChild(childEle) : ele.appendChild( createElement(childEle) );
      }

      return ele;
}

function $(selector){
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
  }