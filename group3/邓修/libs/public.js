/**
 * version : 0.0.4;
 * author : dengxiu;
 * date : 2019.06.18;
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

/**
 * 返回当前时间
 */
setInterval(nowTime,500)
function nowTime(){
    var d=new Date();
    var year=d.getFullYear() + "/";
    var month=(d.getMonth()*1+1) + "/";
    var wday=d.getDate() + "&nbsp;&nbsp;";
    var hour=d.getHours();
    var minute=d.getMinutes();
    var second=d.getSeconds();
    hour=hour < 10 ? "0" + hour + "&nbsp;:&nbsp;" : "" + hour + "&nbsp;:&nbsp;";
    minute=minute < 10 ? "0" + minute + "&nbsp;:&nbsp;" : "" + minute + "&nbsp;:&nbsp;";
    second=second < 10 ? "0" + second : "" + second;
    return year+month+wday+hour+minute+second;
}
// nowTime();

/**
 * @param {年月日时分秒}
 * 返回当前时间到设置时间剩余的时间
 */
function getCountDown() {
    // 1. 只传年月日 ;
    // 2. 传年月日时分秒;
    var
        hour = 0,
        minute = 0,
        second = 0;
    var targetDate = new Date();
    targetDate.setFullYear(arguments[0]);               // 设置年份
    targetDate.setMonth(arguments[1] - 1);              // 设置月份
    targetDate.setDate(arguments[2]);                   // 设置日期

    // 根据参数不同,我们会进行不同的计算;
    if (arguments.length > 3) {
        hour = arguments[3];
        minute = arguments[4];
        second = arguments[5];
    }
    targetDate.setHours(hour);                          //设置小时
    targetDate.setMinutes(minute);                      //设置分钟
    var targetTime = targetDate.setSeconds(second);     //设置秒，并返回设置的时间戳
    var reduce = targetTime - Date.now();               //设置时间减当前时间得到剩余时间，单位为毫秒
    var second = parseInt(reduce / 1000 % 60);          //剩余时间的秒数除以60得到余数为要显示的秒数
    var minute = parseInt(reduce / 1000 / 60 % 60);     //剩余时间的秒数除以60再除以60得到余数为要显示的分钟数
    var hour = parseInt(reduce / 1000 / 3600);          //剩余时间的秒数除以3600得到要显示的小时数
    var days = hour > 24 ? parseInt(hour / 24) : 0;     //剩余时间如果超过24小时，就显示天数和除以24得到的余数
    hour = hour > 24 ? hour % 24 : hour;                //剩余时间如果超过24小时，就显示天数和除以24得到的余数
    if(days===0)
        days=null;
    else
        days+=" : ";
    return [
        hour < 10 ? "0" + hour + " : " : "" + hour + " : ",
        minute < 10 ? "0" + minute + " : " : "" + minute + " : ",
        second < 10 ? "0" + second : "" + second,
        days
    ];
}