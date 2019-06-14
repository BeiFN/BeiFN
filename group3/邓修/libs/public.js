/**
 * version : 0.0.3;
 * author : dengxiu;
 * date : 2019.06.12;
 */


 /**
  * 返回随机颜色
  */
function randomRGBAColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var a = Math.random().toFixed(2);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

/**
 * @param {最小值}
 * @param {最大值}
 * 返回最小值到最大值之间的随机整数
 */
function randomNum(num1,num2){
    return num1+Math.round(Math.random()*(num2-num1));//修改错误，num2 ==> num2-num1
}