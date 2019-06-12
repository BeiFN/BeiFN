
// for(var i=0;i++ < 100;){
//     console.log(i);
// }  //1-100

// for(var i=0;;){
//     i++;
//     console.log(i);
//     if(i===100) break;
// }

// var i = 0;
// while (i++ < 100) {
//     console.log(i);
// } //1-100

/**
 * 打印闰年
 * @param {开始年份} begin 
 * @param {结束年份} end 
 */


function run(begin, end) {
    var count = 0;
    for (var year = begin; year <= end; year++) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            document.write(year + " ");
            count++;
            if (!(count % 4)) {
                document.write("<br>");
            }
        }
    }
}


/**
 * 随机颜色
 * 返回rgba()字符串
 */

function randomRGBAColor() {
    var str = "rgba(";
    for (var i = 0; i < 3; i++) {
        str += Math.round(Math.random() * 255) + ",";
    }
    str += Math.random().toFixed(2)+")";
    return str;
}


/**
 * 计算器
 * @param {第一个数字} a 
 * @param {第二个数字} b 
 * @param {运算符} o 
 */

function calculator(a, b, o) {
    switch (o) {
        case "+":
            return Number(a) + Number(b);
            break;
        case "-":
            return a - b
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
        default:
            return "error";
    }
}

/**
 * 判断是不是数字
 * @param {*} arg 
 */

function isNumber(arg){
    return !isNaN(arg)
}

