//通过循环生成顺序为一个5×5的二维数组a 赋1到25的自然数，然后输出该数组的左下半三角。试编程。
// function arr(num) {
//     var a=new Array(num);       //定义一维数组
//     for (var i = 0, k = 1; i < num; i++) {
//         a[i]=new Array(num);    //将一维数组的元素定义为一维数组，组成二维数组
//         for (var j = 0; j < num; j++) {
//             a[i][j]=k++;
//         }
//     }
//     // console.log(a);
//     for(var row=0;row++<num;){  
//         for(var col=0;col++<row;){  //第几行就输出几个元素
//             document.write(a[row-1][col-1] + "&nbsp;&nbsp;&nbsp;");
//         }
//         document.write("<br/>");
//     }
// }
// arr(5);

//定义一个含有30个整型元素的数组，按顺序分别赋予从2开始的偶数；然后按顺序每五个数求出一个平均值，放在另一个数组中并输出。试编程。
// function average(){
//     var arr1=[],arr2=[],temp=0;
//     for(var i=2;arr1.length<30;i+=2){
//         arr1.push(i);
//     }
//     // console.log(arr1);
//     for(var j=0;j<arr1.length;j++){
//         temp+=arr1[j];
//         if((j+1)%5===0){
//             arr2.push(temp/5);
//             temp=0;
//         }
//     }
//     console.log(arr2);
// }
// average();

//随机点名程序，用到了闭包
// function randName() {
//     var namelist = ["杨怀智", "杨浩然", "曹海涛", "徐悦颖", "费殷植", "崔钰", "毛亚如", "田聪", "薛守江", "宛学", "王鲁平", "王鲁平", "王鲁平", "王鲁平", "王鲁平", "郭森", " 刘廷伟 ", "贺云皓", "郭文祥", "姚彬彬", "郑云鹏", "张子明", "郑凯旋", "郑军基", "田敬磊", "张博威", "周子正", "李佳佳", "赵毅雄", "王天元", "常征", "刘坤坤", "邵光耀", "朱世宇", "王海涛", "祖莹", "孙国庆", "李文豪", "徐良迎", "杜必平", "张宛宛", "赵倩", "刘顺杰", "许霞", "王浩", "王珑璇", "谢鑫鹏", "段长斌", "张媛媛", "钱广荣", "让金鹏", "夏明利", "何先清", "任权", "李金铭", "姜伟", "傅培钰", "汪鹏", "王正伟", "谢凯", "肖光瑞", "姬彩明", "高德宇", "郝婕宇", "滕云", "唐鑫", "龚鹏基", "谢海生", "丁鑫豪", "袁江明", "刘志", "金天琛", "仇明珠", "袁志敏", "崔婉悦"];
//     function rName(){
//         return namelist[parseInt(Math.random() * namelist.length)];
//     }
//     return rName;
// }
// console.log(randName()());

//请编写一个函数join，将数组的每一位按照指定字符链接起来 ，例如： join([1,2,3], "%")， 运行结果"1%2%3";
// function join(arr, char) {
//     if (arr instanceof Array) {     //判断是否是数组
//         for (var i = 0, result = []; i < arr.length; i++) {
//             result.push(arr[i] + "");
//             result.push(char);
//         }
//         result.pop();
//         return result;
//     }
//     else {
//         console.log("error:Not A Array!");
//         return 0;
//     }
// }
// console.log(join([1,2,3],"%"));

//编写函数map(arr) 把数组中的每一位数字都增加30%
// function map(arr) {
//     for (var i in arr) {
//         arr[i] *= 1.3;
//     }
//     return arr;
// }
// var list = [10000, 12000, 15000, 18000];
// console.log(map(list));

//编写函数has(arr , 60) 判断数组中是否存在60这个元素，返回布尔类型
// function has(arr,num){
//     for(var i in arr){
//         if(arr[i] === num)
//             return true;
//     }
//     return false;
// }
// var a=[1,2,3,4,5,6,60,7,8,9,10,11];
// console.log(has(a,60));

//编写函数norepeat(arr) 将数组的重复元素去掉，并返回新的数组
// function norepeat(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         for (var j = i + 1; j < arr.length; j++) {
//             if (arr[i] === arr[j])
//                 arr.splice(j, 1);
//         }
//     }
//     return arr;
// }
// console.log(norepeat([13, 14, 15, 13, 15, 20, 80, 21, 77, 14, 80, 21]));