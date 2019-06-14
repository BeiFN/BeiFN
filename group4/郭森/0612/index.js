
// 编写一个函数，计算两个数字的和差积商
function math(num1, operator, num2) {
    var res;
    switch (operator) {
        case "+": res = Number(num1) + Number(num2); break;
        case "-": res = num1 - num2; break;
        case "*": res = num1 * num2; break;
        case "/": res = num1 / num2;
    }
    return num1 + operator + num2 + "=" + res;
}
$("#math").on("click", () => {
    $("#num3").text(math($("#num1").val(), $("#operator").val(), $("#num2").val()));
    $("#num1").val("");
    $("#num2").val("");
});

// 编写函数，求圆的面积
var circule = function (r) {
    return "半径：" + r + "  面积:" + Math.round(r * r * Math.PI * 100) / 100;
}
$("#radius").on("input", () => {
    var text=$("#radius").val()
    if (isNaN(Number(text))) return;
    $("#area").text(circule(text));
});

// 编写函数，判断一个字符串的内容是不是纯数字
function isnumber(a) {
    if (!a) return "";
    return isNaN(Number(a)) ? "不是纯数字" : "是纯数字";
}
$("#number").on("input", () => {
    $("#isnumber").text(isnumber($("#number").val()));
});

// 编写一个函数，计算三个数字的大小，按从小到大的顺序输出。
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    var midIndex = parseInt(arr.length / 2);
    var mid = arr[midIndex];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (mid === arr[i]) {
            continue;
        }
        if (mid < arr[i]) {
            right.push(arr[i]);
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat([mid], quickSort(right));
}
console.log("编写一个函数，计算三个数字的大小，按从小到大的顺序输出： " + quickSort([15, 128, 3.3,]));

// 编写一个函数，在页面上输出一个N行M列的表格，表格内容填充0~100的随机数字
var ranDom = function (n) {
    return Math.round(Math.random() * n);
}
function tablenm(n, m) {
    document.write("<h5>// 编写一个函数，在页面上输出一个N行M列的表格，表格内容填充0~100的随机数字</h5><table border=1 cellspacing=0 style='text-align:center;'>")
    for (var i = 0; i < n; i++) {
        document.write("<tr>")
        for (var k = 0; k < m; k++) {
            document.write("<td>" + ranDom(100) + "</td>");
        }
        document.write("</tr>");
    }
    document.write("</table><br>")
}
tablenm(6, 5);

// 编写一个函数，生成4位数字的验证码
var verificationCode = function (n) {
    var res = "";
    for (i = 0; i < n; i++) {
        res += ranDom(9);
    }
    return res;
}
$("#verificationCode").text(verificationCode(4));
$("#verificationCode").on("click", () => {
    $("#verificationCode").text(verificationCode(4));
})

// 求m - n之间数字的和
function differenceValue(m, n) {
    var max = m;
    var min = m;
    var res = 0;
    m > n ? min = n : max = n;
    for (i = 0; i <= max - min; i++) {
        res += i + min;
    }
    return res;
}
console.log("求m - n之间数字的和： 6 - 0:  " + differenceValue(6, 0));

// 编写函数digit(num, k) ，函数功能是：求整数num从右边开始的第k位数字的值，如果num位数不足k位则返回0。
var digit = function (num, k) {
    return parseInt(num / 10 ** (k - 1) % 10);
}
console.log("求整数num从右边开始的第k位数字的值，如果num位数不足k位则返回0： digit(11225, 4): " + digit(11225, 4));

// 编写函数计算一个数字的长度
function numwidth(num) {
    for (var i = 0; num > 0; i++) {
        num = parseInt(num / 10);
    }
    return i;
}
console.log("编写函数计算一个数字的长度:  numwidth(6245):  " + numwidth(6245));


// 编写一个函数，计算任意两个数字之间所能组成的奇数个数，数字必须是个位数。
// 比如：计算0~3之间能组成的奇数是： 01、03、13、21、23、31
var oddNum = function (m, n) {
    var max = m;
    var min = m;
    var sum = 0;
    m > n ? min = n : max = n;
    for (var i = 0; i <= max - min; i++) {
        if ((min + i) % 2 !== 0) {
            for (var k = 0; k <= max - min; k++) {
                if (i === k) {
                    continue;
                }
                sum++;
                console.log("" + (min + k) + (min + i));
            }
        }
    }
    return sum;
}
console.log("编写一个函数，计算任意两个数字之间所能组成的奇数个数，数字必须是个位数: oddNum(3, 0): " + oddNum(3, 0));

// 某个公司采用公用电话传递数据，数据是四位的整数，在传递过程中是加密的，
// 加密规则如下：每位数字都加上5, 然后用除以10的余数代替该数字，再将第一位和第四位交换，
// 第二位和第三位交换，请编写一个函数，传入原文，输出密文
function passWord(num) {
    var ge = parseInt(num % 10);
    var shi = parseInt(num / 10 % 10);
    var bai = parseInt(num / 100 % 10);
    var qian = parseInt(num / 1000);
    ge = (ge + 5) % 10;
    shi = (shi + 5) % 10;
    bai = (bai + 5) % 10;
    qian = (qian + 5) % 10;
    return "" + ge + shi + bai + qian;
}
console.log(`// 某个公司采用公用电话传递数据，数据是四位的整数，在传递过程中是加密的，
// 加密规则如下：每位数字都加上5, 然后用除以10的余数代替该数字，再将第一位和第四位交换，
// 第二位和第三位交换，请编写一个函数，传入原文，输出密文: passWord(5624): `+ passWord(5624));

// 编写一个函数，输入n为偶数时，调用函数求1 / 2 + 1 / 4 +...+1 / n, 当输入n为奇数时，调用函数求1 / 1 + 1 / 3 +...+1 / n
var fractionSum = function (num) {
    if(num<1) return "";
    var k = 2;
    if (num % 2) {
        k = 1;
    }
    var sum = 1/k;
    var math="1/"+k;
    for (var i = k+2; i <= num; i += 2) {
        sum += 1 / i;
        math+="+1/"+i;
    }
    return math+"="+Math.round(sum * 100) / 100;
}
$("#fractionSum_num").on("input",(e)=>{
    var text = $("#fractionSum_num").val();
    if (isNaN(Number(text))) return;
    $("#fractionSum").text(fractionSum(text));
})

// 使用函数完成任意数字阶乘的计算
function factorial(num) {
    if (num < 1) return "";
    var product = 1;
    for (var i = 1; i <= num; i++) {
        product *= i;
    }
    return product;
}

// 要求：页面输入任意数字，点击按钮后计算该数字的阶乘
$("#factorial_num").on("input", () => {
    var text = $("#factorial_num").val();
    if (isNaN(Number(text))) return;
    $("#factorial").text(factorial(text));
});

// 创建一个对象，表示一个学生的信息
var student = {
    name: "gs",
    sex: "men",
    edge: 18,
    id: 9567
}
console.log("创建一个对象，表示一个学生的信息: ");
console.log(student);