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
