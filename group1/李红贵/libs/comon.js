
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

















