
/**
 * 求 a - b 范围内的随机数
 * @param {整数1} a 
 * @param {整数2} b 
 * 
 * 返回随机数Number
 */

function randomNum(a, b) {
    if (parseInt(a) != a || parseInt(b) != b) {
        throw new Error("请输入整数参数");
    }
    return Math.min(a, b) + Math.round(Math.random() * Math.abs(a - b));
}



// function randomColorRGBA() {

// }

/**
 *
 * @param {数字一} a
 * @param {数字二} b
 * @param {运算符} o
 *
 * 简易计算器
 */
// function calculator(a, b, o) {
//     switch (o) {
//         case "+": return 0; break;
//     }
// }


/**
 * 判断是否为闰年
 * @param {年份数字} year 
 * 
 * 返回 Boolean
 */

function isLeapYear(year) {
    if(parseInt(year) != year) {
        throw new Error("请输入正确的年份");
    }
    if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return true;
    } else {
        return false;
    }
}





