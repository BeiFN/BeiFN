// 编写一个函数，计算两个数字的和差积商


// function calculator(num1,num2,sign){
//          switch(sign){
//                   case "+" : console.log(num1+num2);     break;
//                   case "-" : console.log(num1-num2);        break;
//                   case "*" : console.log(num1*num2);        break;
//                   case "/" : console.log(num1/num2);        break;
//          }
// }


function calculator(a, b, sign) {
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
    switch (sign) {
        case "+":
            return add(a, b);
        case "-":
            return del(a, b);
        case "*":
            return mul(a, b);
        case "/":
            return div(a, b);
    }
}
// console.log(calculator(1, 2, "/"));





// 编写函数，求圆的面积

function S() {
    this.sircular = function (r) {
        return Math.PI * Math.pow(r, 2);
    }
}
// console.log(new S().sircular(5));


//答案 function circular(r){
//答案     return  Math.PI  * r  * r 
//答案 }


// 编写函数，判断一个字符串的内容是不是纯数字

// //isNaN
function isNumber(num) {
    return !isNaN(num);
}


// 编写一个函数，计算三个数字的大小，按从小到大的顺序输出。
function smNum() {
    var arr = [].slice.call(arguments);
    console.log(arr);
    for (var count = 0; count < arr.length - 1; count++) {
        var min = arr[count];
        var index = count;
        for (var i = count + 1; i < arr.length; i++) {
            if (min > arr[i]) {
                min = arr[i];
                index = i;
            }
        }
        arr[index] = arr[count];
        arr[count] = min;
    }

    console.log(arr);
}

// smNum(4,8,2,1);
// //穷举


// 编写一个函数，在页面上输出一个N行M列的表格，表格内容填充0~100的随机数字

// function print(n,m){
//     document.write("<table>");
//     for(var i=0; i<n; i++){
//         document.write("<tr>");
//         for(var j=0; j<m; j++){
//             document.write("<td>");
//             document.write( Math.round( Math.random()*100 ) );
//             document.write("</td>");
//         }
//         document.write("</tr>");
//     }
//     document.write("</table>");
// }


// 编写一个函数，生成4位数字的验证码


function rondomNum(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

//  console.log(rondomNum(1000,9999)) ;

// function checkcode(){
//         var num = parseInt(Math.random()*9000) + 1000;
//         return num;
// }

// function checkcode(){
//         var num = 0;
//         do{
//                 num = parseInt(Math.random()*10000);           
//         } while( num < 1000);
//         return num;
// }


// 求m-n之间数字的和

function sumnm(m, n) {
    var _sum = 0;
    for (var i = m; i <= n; i++) {
        // console.log(i);
        _sum += i;
    }
    console.log(_sum);
    return _sum;

}


// sumnm(1,5);


// function sum(m,n){
//         var sum = 0;
//         if(m>n){
//                 for(var i=n; i<=m; i++){
//                         sum += i;
//                 }
//         } else {
//                 for(var i=m; i<=n; i++){
//                         sum += i;
//                 }
//         }
//         return sum;
// }


// 编写函数digit(num, k)，函数功能是：求整数num从右边开始的第k位数字的值，如果num位数不足k位则返回0。

function digit(num, k) {
    for (var i = 0, temp = num; temp >= 1; i++) {
        temp /= 10;
        if (k === i + 1) {
            console.log(i + 1, parseInt(num % Math.pow(10, i + 1) / Math.pow(10, i)));
        }
    }
    if (k > i) {
        console.log(0);
        return 0;
    }
    console.log(i);
}

// digit(1234,1);
// function digit(num,k){
//         var knum = 0;
//         for(var i=1; i<=k; i++){
//                 knum = num%10;
//                 num = parseInt(num/10);
//         }
//         return knum;
// }


// 编写函数计算一个数字的长度

// digit(1234,1);  同上



// function getLength(num){
//         var count = 0;
//         while(num != 0){
//                 num = parseInt(num/10);
//                 count++;
//         }
//         return count;
// }

// function getLength(num){
//         return num.toString().length;
// }


// 编写一个函数，计算任意两个数字之间所能组成的奇数个数，数字必须是个位数。
// 比如：计算0~3之间能组成的奇数是： 01、03、13、21、23、31

function numberMaker(a, b) {
    for (var i = a; i <= b; i++) {
        for (var j = a; j <= b; j++) {
            if (i === j) continue;
            console.log(i + "" + j + "");
        }
    }
}
// numberMaker(1,3);



// function get(m,n){ 
//         var count = 0;
//         for(var i=n; i<=m; i++){
//                 for(var j=n; j<=m; j++){
//                         if(i==j) continue;
//                         if( (i*10+j)%2 != 0 ){
//                                 console.log(i*10+j);  
//                                 count++;
//                         }
//                 }
//         }
//         return count;
// }



// 某个公司采用公用电话传递数据，数据是四位的整数，在传递过程中是加密的，
// 加密规则如下：每位数字都加上5,然后用除以10的余数代替该数字，再将第一位和第四位交换，
// 第二位和第三位交换，请编写一个函数，传入原文，输出密文
function hash(num) {
    var n1 = (num % 10 + 5) % 10;
    var n2 = (parseInt(num % 100 / 10) + 5) % 10;
    var n3 = (parseInt(num % 1000 / 100) + 5) % 10;
    var n4 = (parseInt(num / 1000) + 5) % 10;
    return n1 * 1000 + n2 * 100 + n3 * 10 + n4;
}



// 编写一个函数，输入n为偶数时，调用函数求1/2+1/4+...+1/n,当输入n为奇数时，调用函数求1/1+1/3+...+1/n
function sumall(n) {
    var sum = 0;
    for (var i = n; i > 0; i -= 2) {
        // console.log(i);
        sum += 1 / i;
        // console.log(sum);
    }
    console.log(sum);
}
// sumall(9);




// 使用函数完成任意数字阶乘的计算

function jiecheng(num) {
    var temp=1;
    for (var i=1; i<=num;i++){
        console.log(i);
        temp*=i;
    }

    console.log(temp);
    return temp;
}

// jiecheng(5);

// 要求：页面输入任意数字，点击按钮后计算该数字的阶乘





// 创建一个对象，表示一个学生的信息
var student = {
    name: "zm",
    number: "666",
    gender: "男",
    age: 3
}