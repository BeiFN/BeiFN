function pay(salary, year) {
    for (var i = 0; i < 50; i++) {
        salary *= 1.05;
    }
    return salary;
}

function leapYear(year) {
    if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
        console.log(year + "年是闰年。");
    }
    else {
        console.log(year + "年不是闰年。");
    }
}

function cGrade(grade) {
    if (grade >= 90 && grade <= 100) {
        console.log("成绩为A");
    }
    else if (grade >= 70 && grade < 90) {
        console.log("成绩为B");
    }
    else if (grade >= 60 && grade < 70) {
        console.log("成绩为C");
    }
    else if (grade < 60) {
        console.log("成绩为D");
    }
    else {
        console.log("错误的成绩！");
    }
}

function weekday(day) {
    switch (day % 7) {
        case 1:
            console.log("这天是星期一");
            break;
        case 2:
            console.log("这天是星期二");
            break;
        case 3:
            console.log("这天是星期三");
            break;
        case 4:
            console.log("这天是星期四");
            break;
        case 5:
            console.log("这天是星期五");
            break;
        case 6:
            console.log("这天是星期六");
            break;
        default:
            console.log("这天是星期日");
            break;
    }
}

function monthDays(year, month) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            console.log(year + "年" + month + "月是31天。");
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            console.log(year + "年" + month + "月是30天。");
            break;
        case 2:
            if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
                console.log(year + "年" + month + "月是29天。");
            }
            else {
                console.log(year + "年" + month + "月是28天。");
            }
            break;
        default:
            console.log("错误的输入");
    }
}

function range(int) {
    if (int < 0) {
        console.log(int + "小于0");
    }
    else if (int === 0) {
        console.log(int + "等于0");
    }
    else {
        console.log(int + "大于0");
    }
}

function odd_or_even(int) {
    if (int % 2 === 0) {
        console.log(int + "是偶数");
    }
    else {
        console.log(int + "是奇数");
    }
}

function weight(height, weight) {
    var _temp = 0;
    _temp = (height - 108) * 2;
    if (weight >= _temp - 10 && weight <= _temp + 10) {
        console.log("体重是合适的");
    }
    else {
        console.log("体重是不合适的");
    }
}

function whichDay(day) {
    day = day.toString();
    var year = day.substring(0, 4);
    var month = day.substring(4, 6);
    var wday = day.substring(6);
    if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
        if (month == 1) {
            console.log(day + "是这一年的第" + wday + "天");
        }
        if (month == 2) {
            console.log(day + "是这一年的第" + (wday * 1 + 31) + "天");
        }
        if (month == 3) {
            console.log(day + "是这一年的第" + (wday * 1 + 60) + "天");
        }
        if (month == 4) {
            console.log(day + "是这一年的第" + (wday * 1 + 91) + "天");
        }
        if (month == 5) {
            console.log(day + "是这一年的第" + (wday * 1 + 121) + "天");
        }
        if (month == 6) {
            console.log(day + "是这一年的第" + (wday * 1 + 152) + "天");
        }
        if (month == 7) {
            console.log(day + "是这一年的第" + (wday * 1 + 182) + "天");
        }
        if (month == 8) {
            console.log(day + "是这一年的第" + (wday * 1 + 213) + "天");
        }
        if (month == 9) {
            console.log(day + "是这一年的第" + (wday * 1 + 244) + "天");
        }
        if (month == 10) {
            console.log(day + "是这一年的第" + (wday * 1 + 274) + "天");
        }
        if (month == 11) {
            console.log(day + "是这一年的第" + (wday * 1 + 305) + "天");
        }
        if (month == 12) {
            console.log(day + "是这一年的第" + (wday * 1 + 335) + "天");
        }
    }
    else {
        if (month == 1) {
            console.log(day + "是这一年的第" + wday + "天");
        }
        if (month == 2) {
            console.log(day + "是这一年的第" + (wday * 1 + 31) + "天");
        }
        if (month == 3) {
            console.log(day + "是这一年的第" + (wday * 1 + 59) + "天");
        }
        if (month == 4) {
            console.log(day + "是这一年的第" + (wday * 1 + 90) + "天");
        }
        if (month == 5) {
            console.log(day + "是这一年的第" + (wday * 1 + 120) + "天");
        }
        if (month == 6) {
            console.log(day + "是这一年的第" + (wday * 1 + 151) + "天");
        }
        if (month == 7) {
            console.log(day + "是这一年的第" + (wday * 1 + 181) + "天");
        }
        if (month == 8) {
            console.log(day + "是这一年的第" + (wday * 1 + 212) + "天");
        }
        if (month == 9) {
            console.log(day + "是这一年的第" + (wday * 1 + 243) + "天");
        }
        if (month == 10) {
            console.log(day + "是这一年的第" + (wday * 1 + 273) + "天");
        }
        if (month == 11) {
            console.log(day + "是这一年的第" + (wday * 1 + 304) + "天");
        }
        if (month == 12) {
            console.log(day + "是这一年的第" + (wday * 1 + 334) + "天");
        }
    }
}

var uname = document.getElementById("userName");
var eMail = document.getElementById("email");
var pNum = document.getElementById("phoneNum");
var dAddress = document.getElementById("address");
var pCode = document.getElementById("postalCode");
var uCountry = document.getElementById("country");