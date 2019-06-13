//编写一个函数，计算两个数字的和差积商
// function calculator(num1, num2, opt) {
//     switch (opt) {
//         case "+":
//             return num1 + " + " + num2 + " = " + (num1 + num2);
//         case "-":
//             return num1 + " - " + num2 + " = " + (num1 - num2);
//         case "*":
//             return num1 + " × " + num2 + " = " + (num1 * num2);
//         case "/":
//             return num1 + " ÷ " + num2 + " = " + (num1 / num2);
//     }
// }
// console.log(calculator(5,3,"+"));

//编写函数，求圆的面积
// function circle(r){
//     return Math.PI*r*r;
// }
// console.log(circle(5));

//编写函数，判断一个字符串的内容是不是纯数字
// function isNumber(num){
//     num=Number(num);
//     return !(isNaN(num));
// }
// console.log(isNumber("123"));

//编写一个函数，计算三个数字的大小，按从小到大的顺序输出。
// function sort(a,b,c){
//     if(a<b && a<c){
//         if(b<c)
//             return a + " " + b + " " + c;
//         else
//             return a + " " + c + " " + b;
//     }
//     else if(b<a && b<c){
//         if(a<c)
//             return b + " " + a + " " + c;
//         else
//             return b + " " + c + " " + a;
//     }
//     else{
//         if(a<b)
//             return c + " " + a + " " + b;
//         else
//             return c + " " + b + " " + a;
//     }
// }
// console.log(sort(53,64,31));

//求m-n之间数字的和
// function sum(m,n){
//     if(m<n){
//         for(var i=m,temp=0; i<=n; i++){
//             temp+=i;
//         }
//         return temp;
//     }
//     else if(n<m){
//         for(var i=n,temp=0; i<=m; i++){
//             temp+=i;
//         }
//         return temp;
//     }
//     else
//         return 0;
// }
// console.log(sum(5,1));

//编写函数digit(num, k)，函数功能是：求整数num从右边开始的第k位数字的值，如果num位数不足k位则返回0。
// function digit(num,k){
//     var i=0;
//     i=parseInt(num%Math.pow(10,k)/Math.pow(10,k-1));
//     return i;
// }
// console.log("整数123456789从右边开始的第10位数字的值为" + digit(123456789,10));

//编写函数计算一个数字的长度
// function length(num){
//     for(var i=1,count=1; true; i++){
//         if(parseInt(num/Math.pow(10,i))){
//             count++;
//         }
//         else
//             break;
//     }
//     return count;
// }
// console.log("123456789的长度为" + length(123456789));

//编写一个函数，计算任意两个数字之间所能组成的奇数个数，数字必须是个位数。比如：计算0~3之间能组成的奇数是： 01、03、13、21、23、31
// function odd(num1,num2){
//     var count=0;
//     console.log("0~3之间能组成的奇数是：");
//     for(var i=num1; i<=num2; i++){
//         for(var j=num1; j<=num2; j++){
//             if(i!==j && j%2){
//                 console.log("" + i + j);
//                 count++;
//             }
//         }
//     }
//     return count;
// }
// console.log("0~3之间能组成的奇数个数为：" + odd(0,3));

/** 某个公司采用公用电话传递数据，数据是四位的整数，在传递过程中是加密的，
加密规则如下：每位数字都加上5,然后用除以10的余数代替该数字，再将第一位和第四位交换，
第二位和第三位交换，请编写一个函数，传入原文，输出密文*/
// function encryption(date){
//     var thousand=(parseInt(date/1000)+5)%10;
//     var hundred=(parseInt(date%1000/100)+5)%10;
//     var ten=(parseInt(date%100/10)+5)%10;
//     var bit=(date%10+5)%10;
//     return bit*1000+ten*100+hundred*10+thousand*1;
// }
// console.log("原文是2333，" + "密文是" +encryption(2333));

//编写一个函数，输入n为偶数时，调用函数求1/2+1/4+...+1/n,当输入n为奇数时，调用函数求1/1+1/3+...+1/n
// function even_or_odd(n){
//     var temp=0;
//     if(n%2){
//         for(var i=1; i<=n; i+=2){
//             temp+=1/i;
//         }
//     }
//     else{
//         for(var i=2; i<=n; i+=2){
//             temp+=1/i;
//         }
//     }
//     return temp;
// }
// console.log(even_or_odd(7));

//使用函数完成任意数字阶乘的计算
// function factorial(num) {
//     num=Number(num);
//     if(isNaN(num)){
//         console.log("输入错误！");
//         return 0;
//     }
//     for (var count = 0,temp = 1;count++ < num;) {
//         temp *= count;
//     }
//     // console.log(num + "的阶乘为" + temp);
//     return temp;
// }
// // document.write(factorial(10));

//创建一个对象，表示一个学生的信息
// var student={
//     "name": "邓修",
//     "ID": "430426xxxxxxxxxxxx",
//     "weight": 110,
//     "height": 175,
//     "grade": 60
// };
// document.write("姓名：" + student.name + "<br/>");
// document.write("身份证号：" + student.ID + "<br/>");
// document.write("身高：" + student.height + "<br/>");
// document.write("体重：" + student.weight + "<br/>");
// document.write("成绩：" + student.grade + "<br/>");