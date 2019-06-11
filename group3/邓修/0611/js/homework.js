//打印100以内所有偶数的和
// var count=0;
// var temp=0;
// while((count+=2) <= 100){
//     temp+=count;
//     // console.log(count);
// }
// console.log(temp);

//打印图形
// 直角三角形
// var count_row=0;
// while(count_row ++ < 10){
//     var count_col=0;
//     while(count_col ++ < count_row){
//         document.write("✵");
//     }
//     document.write("<br/>");
// }
// 倒的直角三角形
// var count_row=0;
// while(count_row ++ < 10){
//     var count_col=0;
//     while(count_col ++ < 11-count_row){
//         document.write("✵");
//     }
//     document.write("<br/>");
// }
// 正的等腰三角形
// var count_row = 0;
// while (count_row++ < 5) {
//     var count_space = 0;
//     while (count_space++ < 5 - count_row) {
//         document.write("&nbsp;&nbsp;&nbsp;");
//     }
//     var count_col = 0;
//     while (count_col++ < count_row * 2 - 1) {
//         //实心菱形
//         document.write("✵");
//         //空心菱形
//         // if(count_col === 1 || count_col === count_row*2-1){
//         //     document.write("✵");
//         // }
//         // else{
//         //     document.write("&nbsp;&nbsp;&nbsp;");
//         // }
//     }
//     document.write("<br/>");
// }
// //倒的等腰三角形
// count_row--;
// while (count_row-- > 1) {
//     var count_space = 0;
//     while (count_space++ < 5 - count_row) {
//         document.write("&nbsp;&nbsp;&nbsp;");
//     }
//     var count_col = 0;
//     while (count_col++ < count_row * 2 - 1) {
//         //实心菱形
//         document.write("✵");
//         //空心菱形
//         // if(count_col === 1 || count_col === count_row*2-1){
//         //     document.write("✵");
//         // }
//         // else{
//         //     document.write("&nbsp;&nbsp;&nbsp;");
//         // }
//     }
//     document.write("<br/>");
// }

//打印100–200之间所有能被3或者7整除的数
// var count=99;
// while(count ++ < 200){
//     if(!(count % 3) || !(count % 7)){
//         console.log(count);
//     }
// }

//计算100的阶乘 100!
// function factorial(num) {
//     var count = 0;
//     var temp = 1;
//     while (count++ < num) {
//         temp *= count;
//     }
//     console.log(temp);
//     return temp;
// }
// factorial(100);

//计算1+3+5+...+99的和
// var count=-1;
// var temp=0;
// while((count+=2) < 100){
//     temp+=count;
//     // console.log(count);
// }
// console.log(temp);

//99乘法表
// var count_row=0;
// while(count_row ++ < 9){
//     var count_col=0;
//     while(count_col ++ < count_row){
//         document.write(count_col + "×" + count_row + "=" + count_col*count_row + "&nbsp;&nbsp;");
//     }
//     document.write("<br/>");
// }

//求100-999之间的水仙花数。abc = a^3 + b^3 + c^3
// var count=99;
// var bit=0;
// var ten=0;
// var hundred=0;
// while(count ++ < 999){
//     bit=count % 10;
//     ten=parseInt(count % 100 / 10);
//     hundred=parseInt(count / 100);
//     if(count === Math.pow(hundred,3) + Math.pow(ten,3) + Math.pow(bit,3)){
//         console.log(count);
//     }
// }

//输出100-200之间所有的素数
// var count=99;
// while(count ++ < 200){
//     var flag=true;
//     var count1=1;
//     while(count1 ++ < count-1){
//         if(count % count1 === 0){
//             flag=false;
//         }
//     }
//     if(flag === true){
//         console.log(count);
//     }
// }

//求s=a+aa+aaa+aaaa+….+aa...a的值，其中a是一个数字。例如2+22+222+2222
// var n = 5;
// var count = 10;
// var sum = 0;
// for(var i=0; i<count; i++){
//         var num = 0;
//         for(var j=0; j<i; j++){
//                 num += n*Math.pow(10,j);
//         }
//         console.log(num);
//         sum += num;
// }
// console.log(sum);

//求1+2!+3!+...+5!的值
// var count=0;
// var temp=0;
// while(count ++ < 5){
//     temp+=factorial(count);
// }
// console.log(temp);

//打印出1-100里所有的偶数
// var count=0;
// while((count+=2) <= 100){
//     console.log(count);
// }

//打印出1-100里所有的奇数
// var count=-1;
// while((count+=2) < 100){
//     console.log(count);
// }

//求出1/1-1/2+1/3-1/4…..1/100的和 var i=1;  i*-1*-1
// var count=0;
// var symbol=-1;
// var temp=0;
// while(count ++ < 100){
//     temp+=1/count*Math.pow(symbol,count-1);
// }
// console.log(temp);

//输出20-80之间能被3整除的整数，每5个一行
// for(var count1=19,count2=0;count1 ++ < 80;){
//     if(!(count1 % 3)){
//         count2 ++;
//         document.write(count1 + "&nbsp;&nbsp;");
//     }
//     if(count2 === 5){
//         document.write("<br/>");
//         count2=0;
//     }
// }

//打印出1000-2000年中所有的闰年，并以每行四个数的形式输出
// for(var year=999,count=0;year ++ < 2000;){
//     if(year % 400 === 0 || year % 4 ===0 && year % 100 !==0){
//         count ++;
//         document.write(year + "&nbsp;&nbsp;");
//     }
//     if(count === 4){
//         document.write("<br/>");
//         count=0;
//     }
// }

//操场上 100 多人排队 ,3 人一组多 1 人 ,4 人一组多 2 人 ,5 人一组多 3 人 , 共多少人
// var count=99;
// while(count ++ < 199){
//     if(count % 3 === 1 && count % 4 === 2 && count % 5 === 3){
//         console.log(count);
//     }
// }

//两个自然数相除 , 商 3 余 10, 被除数 , 除数 , 商 , 余数的和是 163, 求被除数 , 除数 * 
// for(var num1,num2=1;;num2++){
//     num1=150-num2;
//     if(num1 === num2*3+10){
//         console.log(num1,num2);
//         break;
//     }
// }

/* 假设某人有 100,000  现金。 每经过一次路口需要进行一次交费。 交费规则为当他现金大于50,000  时每次需要交 5%
如果现金小于等于 50,000  时每次交 5,000 。 请写一程序计算此人可以经过多少次这个路口*/
// var cash=100000;
// var count=0;
// while(true){
//     if(cash>50000){
//         cash*=0.95;
//         count++;
//     }
//     else if(cash>=5000 && cash<=50000){
//         cash-=5000;
//         count++;
//     }
//     else{
//         break;
//     }
// }
// console.log("可以经过这个路口" + count + "次");

/* 《张丘建算经》 成书于公元 5  世纪， 作者是北魏人． 书中最后一道题堪称亮点， 通常也被称为 “ 百钱买百鸡 ” 问题，
 民间则流传着县令考问神童的佳话书中原文如下：
今有鸡翁一， 值钱五； 鸡母一， 值钱三； 鸡雏三， 值钱一； 百钱买鸡百只， 问鸡翁、 母、雏各几何？ */
// var cock=-1;
// while(cock ++ < 20){
//     var hen=-1;
//     while(hen ++ < 33){
//         if(cock * 5 + hen * 3 + (100-cock-hen)/3 === 100){
//             console.log(cock,hen,100-cock-hen);
//         }
//     }
// }