
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



/**
 * 京东倒计时函数封装
 * @param {year, mouth, day [, hour, minute, second]} 
 * 可输入  时,分,秒 | 年,月,日,时,分,秒
 * 
 * 返回值：  [day, hour, minute, second]
 */
function getCountDown() {
    var day = 0;
        hour = 0;
        mouth = 0;
        second = 0;
        targetDate = new Date();
    targetDate.setFullYear(arguments[0]);
    targetDate.setMonth(arguments[1] - 1);
    targetDate.setDate(arguments[2]);
    if(arguments.length > 3) {
        var hour = arguments[3];
        var minute = arguments[4];
        var second = arguments[5];
    }
    targetDate.setHours(hour);
    targetDate.setMinutes(minute);
    var targetTime = targetDate.setSeconds(second);
    var diffTime = targetTime - Date.now();
    second = parseInt(diffTime / 1000 % 60);
    minute = parseInt(diffTime / 1000 / 60 % 60);
    hour = parseInt(diffTime / 1000 / 3600);
    day = hour > 24 ? parseInt(diffTime / 1000 / 3600 / 24) : 0;
    hour = hour > 24 ? hour % 24 : hour;

    return [
        day,
        hour < 10 ? "0" + hour : hour,
        minute < 10 ? "0" + minute : minute,
        second < 10 ? "0" + second : second
    ];
}



