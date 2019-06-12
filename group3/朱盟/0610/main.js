// 双斜线是JS的注释

// var x;
// var a,b,c;
// var 是声明变量的关键字

// js 最重要的两个数据类型是 对象 和数组
// 对象是名字 值的集合

// var student={ //对象是由花括号括起来的
//     name:"ZM" //name 的属性 值为:"ZM" 字符串
//     ,//每个属性的之间用 , 号来分开
//     isBoy:true //isBoy 是一个boolen 的值
// }
// x="o"
// !!x 等同于 Boolean(x)
// console.log(!!x);


// 访问对象  ①  .  或者 ② [“属性名称”] 来访问


// toString() 方法 

// var n=120;

// console.log(n.toString(2));//转二进制 
// console.log(n.toString(16));

// 小数处理
// n=123.456789;
// console.log(n.toFixed(2));//保留两位小数
// console.log(n.toExponential(3));// 转成指数形式
// console.log(n.toPrecision(2));// 转成指数形式

// console.log("第二参数可以选择转化参数指定的进制 为10进制 》二进制101111  转化",parseInt("101111",2));
// n=" 23.45 ";
// console.log("空格可以跳过",parseFloat(n));
// console.log("可以的",parseInt(n));
// n=" 23.45哈哈 ";
// console.log("文字忽略",parseInt(n));
// n=".23.45哈哈 ";
// console.log(".转不了",parseInt(n));
// n="$23.45哈哈 ";
// console.log("$也是没法弄",parseInt(n));


// n=[1,2,3,4,5]// 数组的toString
// console.log(n.toString()); // 加, 号拼接
// function testtoString(){ 
//     console.log("my fun");
// }
// console.log("函数的toString (正则相似)输出函数的定义:",testtoString.toString());
// console.log("时间 的toString",new Date(2019,6,9).toString());


// valueOf()

// console.log("时间对象的valueOf 方法 ，返回 1970 .1.1 以来的毫秒数",new Date().valueOf());


// console.log("数字加字符串",1+"1");
// console.log("数字相加",null+1+1);
// console.log("数字+数字+字符",1+1+"1");
// console.log("数字加字符串+数字",1+"1"+1);
// console.log("",1+"1"+"123");
// console.log("boolen",false);

// console.log("null==undefined", null == undefined);
// console.log("null typeof:", typeof null );
// console.log("null===undefined", null === undefined);
// console.log("undefined typeof:", typeof undefined);

// 华氏温度（80度）转换为摄氏度
//             提示：摄氏度与芈氏度的转换公式为：摄氏度 = 5/9.0*(华氏度-32)，保留3位末尾非0小数。

// console.log("一共是"+parseInt(89/24)+"天, 零"+89%24+"小时");
// console.log("华氏温度（80度）转换为摄氏度","摄氏度："+(5*(80-32)/9.0).toFixed(3)+" ，华氏温度：80度 ");

// var k = -99;
// var res = k-- * 2  + k ++ - ++ k + k * 3 % k --;

// 1.
// k -100 res=-200;
// 2. k=-99 res=-200-99=-299
// 3. k=-98 res=-299--98=-201
// 4. k= -99 res=-201+3=-198

// console.log(res);





//  task_1_ 入职薪水10K，每年涨幅5%，50年后工资多少？(预习循环)


function salary(o) {
    var salary = o;
    for (var i = 0; i < 50; i++) {
        salary *= 1.05;
        console.log("在第" + (i + 1) + "年的工资为:" + salary);
    }
    return salary;
}

//   测试
//   salary(10000);

// task_2 根据输入的数字，判断是否为闰年
function isLeapYear(y) {
    if (y % 400 === 0 || y % 4 === 0 && y % 100 !== 0) {
        console.log(y + "是闰年");
        return true;
    } else {
        console.log(y + "不是闰年！");
        return false;
    }
}

// isLeapYear(2000);

// task_3_根据输入的成绩，判定成绩的等级A\B\C\D  90 -100 A 90-80 B  80-60 C <60 D
function evalutionGrad(score) {
    if (score >= 90 && score <= 100) {
        console.log("您的分数是：" + score + "; 被评定为 A");
        return "A";
    } else if (score >= 80 && score < 90) {
        console.log("您的分数是：" + score + "; 被评定为 B");
        return "B";
    } else if (score >= 60 && score < 80) {
        console.log("您的分数是：" + score + "; 被评定为 C");
        return "C";
    } else if (score >= 0 && score < 60) {
        console.log("您的分数是：" + score + "; 被评定为 D");
        return "D";
    } else {
        console.log("您的分数是：" + score + "; 分数输入不正确");
        return "erro";
    }
}

//测试 
// for(var i =0; i<=101;i++){
//     evalutionGrad(i);
// }


// task_4 根据输入的数字，返回星期几

function numberToWeek(key) {
    switch (key) {
        case 1:
            console.log("周一");
            return "周一"
            break;
        case 2:
            console.log("周二");
            return "周二"
            break;
        case 3:
            console.log("周三");
            return "周三"
            break;
        case 4:
            console.log("周四");
            return "周四"
            break;
        case 5:
            console.log("周五");
            return "周五"
            break;
        case 6:
            console.log("周六");
            return "周六"
            break;
        case 7:
            console.log("周日");
            return "周日"
            break;
        case 0:
            console.log("周日");
            return "周日"
            break;
        default:
            console.log("检查您的书写");
            return "检查您的书写"
            break;
    }
}

//测试 
// for (var i = 0; i <= 7; i++) {
//     numberToWeek(i);
// }


//  task_5 根据输入月份，输出每月天数
// 需要调用 Leapyear
function monthDay(m, y) {
    // console.log(arguments.length);
    var day31 = {
        m1: null,
        m3: null,
        m5: null,
        m7: null,
        m8: null,
        m10: null,
        m12: null
    }

    // 如果是大月
    if ("m" + m in day31) {
        console.log(m + "月-是大月31天");
        return 31;
    } else if (m === 2) {
        // 如果是二月
        if (arguments.length === 1) {
            console.log(m + "月-是28天 ,您可以输入第二个参数 看看闰年不是，更加准确哦！");
            return 28;
        } else {
            if (isLeapYear(y)) {
                console.log(y + "年，是闰年 ，" + m + "月-是29天");
                return 29;
            } else {
                console.log(y + "年，不是闰年 ，" + m + "月-是28天");
                return 28;
            }
        }

    } else {
        // 小月
        console.log(m + "月-是 小月30天");
        return 30;
    }

}
// 测试 
// for (var i = 1; i <= 12; i++) {
//     monthDay(i,2012);
// }


// task_6 判断一个整数，属于哪个范围：大于0；小于0；等于0

function ispositiveNumber(num) {
    if (num > 0) {
        console.log(num + "大于0");
        return true;
    } else if (num === 0) {
        console.log(num + "=0");
        return false;
    } else {
        console.log(num + "小于0");
        return false;
    }
}



// 测试 
// for (var i = -5; i <= 5; i++) {
//     ispositiveNumber(i);
// }

// task_7  判断一个整数是偶数还是奇数，并输出判断结果

function isEven() {
    return (arguments[0] % 2 === 0)
}


// 测试 
// for (var i = -5; i <= 5; i++) {
//     if (i===0) {
//         console.log(i + "不是奇数 也不是偶数");
//         continue;
//     } 
//     if (isEven(i)) {
//         console.log(i + "是偶数");
//     }else {
//         console.log(i + "是奇数");
//     };
// }


// task_8 根据一个数字日期，判断这个日期是这一年的第几天
function isDayinY(day) {
    day = day.toString();
    if (day.length != 8) return false;
    var y = parseInt(day / 10000); //隐式转换
    var m = day.substring(4, 6);
    var d = day.substring(6);
    var nowDate = new Date(y, m - 1, d);
    var yDate = new Date(y, 00, 01);
    // console.log(nowDate);
    // console.log(yDate);
    console.log((nowDate - yDate) / 1000 / 60 / 60 / 24 + 1);
    // console.log(y+"-"+m+"-"+d);
}
// 测试
// isDayinY(20160211);


// task_9 计算器案例


function isNa(a) {
    return /\d/.test(a)
}

function calculate(expression) {

    function add(a, b) {
        return a + b
    }

    function del(a, b) {
        return a - b
    }

    function mul(a, b) {
        return a * b
    }

    function div(a, b) {
        return a / b
    }


    // expression="";
    var ex = expression.split("");
    var exe = [];
    for (const key in ex) {
        const element = ex[key];
        exe.push(element);
        console.log(element + "  is  Na:" + isNa(element));
    }
}

// calculate("12+3+5+66*545/58+(22-5)");


//task_10 编写一个页面表单，使用JS判断输入内容是否合法

var nameE = document.getElementById("name");
var emsE = document.getElementById("ems");
var nationE = document.getElementById("nation");
var addressE = document.getElementById("address");
var phoneE = document.getElementById("phone");
var mailE = document.getElementById("mail");


nameE.onchange = handler;
emsE.onchange = handler;
nationE.onchange = handler;
addressE.onchange = handler;
phoneE.onchange = handler;
mailE.onchange = handler;

function handler(ev) {


    element = ev.target;
    switch (element.id) {
        case "name":
                // !?=\W /[!@#$%^&*()]|[a-zA-Z]{0,2}|[a-zA-Z]{9,}/.test(element.value)
          if(element.value.length>2){
            alert("用户名合法");
          }
          else{
            alert("用户名不合法");
          }

            console.log("name");
            break;
        case "ems":
                if(/[0-9]{6,6}/.test(element.value)){
                    alert("合法");
                  }
                  else{
                    alert("不合法");
                  }
            console.log("ems");
            break;
        case "nation":
                if(/^[\u4e00-\u9fa5]{2,}$/.test(element.value)){
                    alert("合法");
                  }
                  else{
                    alert("不合法");
                  }
            console.log("nation");
            break;
        case "phone":
                if(   /[0-9]{11,11}/.test(element.value)){
                    alert("合法");
                  }
                  else{
                    alert("不合法");
                  }
            console.log("phone");
            break;
        case "mail":
                if(   /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(element.value)){
                    alert("合法");
                  }
                  else{
                    alert("不合法");
                  }
             
            console.log("mail");
            break;
        case "address":
                if(/^[\u4e00-\u9fa5]{2,}$/.test(element.value)){
                    alert("合法");
                  }
                  else{
                    alert("不合法");
                  }
            console.log("address");
            break;
        default:
            console.log(ev.target.value);
            break;
    }

}

// els.forEach(element => {
//     console.log(element);
//     // element
//     // .addEventListener("onchange", function(){ alert("Hello World!"); });
// });



// console.log(name);
// name.onchange=function(){
// console.log(name.value);
// };

















// var x = 2;
// switch(x){
//      case 1 : console.log(1);
//      case 2 : console.log(2);
//      case 3 : console.log(3);
//      case 4 : console.log(3);
//      case 5 : console.log(3);
//      case 6 : console.log(3);
//     //  default : break;
// }
// 

// var x = 2;
// switch(x){
//      case 1 : console.log(1);
//      case 2 : console.log(2);
//      default : break;
//      case 3 : console.log(3);
// }这段小程序的输出结果是？ 2