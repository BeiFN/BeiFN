// 通过循环生成顺序为一个5×5的二维数组a 赋1到25的自然数，然后输出该数组的左下半三角。试编程。

// 1. 首先输出 5*5的二维数组

function task1(r, c) {


    var arr = new Array(); //声明数组的第一层
    var count = 0; //数组元素的生成
    for (var i = 0; i < r; i++) {
        arr[i] = new Array(); //循环生成数组，并生成第二层数组
        for (var j = 0; j < c; j++) {
            count++;
            arr[i][j] = count; //遍历数组，并赋值
            if (j <= i) console.log(arr[i][j]); //输出左三角的数，等于 输出 列<=行的情况；
        }
    }
    console.log(arr);
}

//  task1(5,5);



// 定义一个含有30个整型元素的数组，按顺序分别赋予从2开始的偶数；然后按顺序每五个数求出一个平均值，放在另一个数组中并输出。试编程。

function task2() {
    var iArr = []; //保存偶数的数组
    var oArr = []; // 保存输出的数组
    var _temp = 0; // 临时的求平均数变量
    var count = 0; // 记录第几次求平均数
    for (var i = 0; i++ < 30;) {
        iArr[i] = i * 2; //偶数存入数组
        _temp += i * 2; // 临时记录累加
        if (!(i % 5)) { //如果到了该求的时候，如果除以5 余数为0，那么就求平均
            oArr[count] = _temp / 5; //存入求平局结果 （average）
            count++; // 记录次数增加
            _temp = 0; //清空 average 器
        };
    }
    console.log(oArr);
}

// task2();


//答案 var list = [];
//答案 for(var i=2; i<=100000; i+=2){
//答案      if(list.push(i) == 30) break;
//答案 }
//答案 var newlist = [];
//答案 var count = 0;
//答案 var sum = 0;
//答案 for(var i in list){
//答案      sum += list[i];
//答案      if( ++count == 5){
//答案           newlist.push(sum/5);
//答案           count = sum = 0;
//答案      }
//答案 }


// 随机点名程序

// 随机数的生成函数

function randomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

// 测试 true
// for(var i=0;i++<100;){
//     console.log(randomNumber(0,10));
// }

var nameList = ["杨怀智", "杨浩然", "曹海涛", "徐悦颖", "费殷植", "崔钰", "毛亚如", "田聪", "薛守江", "宛学", "王鲁平", "王鲁平", "王鲁平", "王鲁平", "王鲁平", "郭森", " 刘廷伟 ", "贺云皓", "郭文祥", "姚彬彬", "郑云鹏", "张子明", "郑凯旋", "郑军基", "田敬磊", "张博威", "周子正", "李佳佳", "赵毅雄", "王天元", "常征", "刘坤坤", "邵光耀", "朱世宇", "王海涛", "祖莹", "孙国庆", "李文豪", "徐良迎", "杜必平", "张宛宛", "赵倩", "刘顺杰", "许霞", "王浩", "王珑璇", "谢鑫鹏", "段长斌", "张媛媛", "钱广荣", "让金鹏", "夏明利", "何先清", "任权", "李金铭", "姜伟", "傅培钰", "汪鹏", "王正伟", "谢凯", "肖光瑞", "姬彩明", "高德宇", "郝婕宇", "滕云", "唐鑫", "龚鹏基", "谢海生", "丁鑫豪", "袁江明", "刘志", "金天琛", "仇明珠", "袁志敏", "崔婉悦"]


// 根据随机数对应相应的名字
function randomName() {
    return nameList.splice(randomNumber(0, nameList.length - 1), 1)[0];
    //splice  切出数组的一部分，并返回数组切掉的一部分；
}

// function randName(){
//      return  namelist[parseInt(Math.random()*namelist.length)];
// }

function task3() {
    console.log(randomName());
}
// task3();
// document.onclick=task3;



// a-z：97-122

// A-Z：65-90

// 0-9：48-57

// a = {
//     min: 97,
//     max: 122
// }
// A = {
//     min: 65,
//     max: 90
// }
// Zero = {
//     min: 48,
//     max: 57
// }
// 点击按钮，生成数字字母验证码
function randomChar(o) {
    // 单字符生成
    switch (o) {
        case "a":
            return String.fromCharCode(randomNumber(97, 122));
            break;
        case "A":
            return String.fromCharCode(randomNumber(65, 90));
            break;
            break;
        case "0":
            return String.fromCharCode(randomNumber(48, 57));
            break;

        default:
            return o;
            break;
    }

}

// 格式化生成验证码  A 代表大写字母 随机生成数字，并转化层所对应Ascll 码对应的随机字母，根据字母和数字的范围来生成
function randomChars(express) {

    var str = "";
    for (const key in express) {
        // console.log(key);
        // console.log(randomChar(express[key]));
        str += randomChar(express[key]);
    }
    return str;
}
// console.log(randomChar("A"));
// console.log(randomChars("AA-AA-aa-0000")); 


// document.onclick=function(){
//     console.log(randomChars("AA00-aa00-0000")); 
// }

// var list = ['1','2','3','4','5','6','7','8','9','0','a','b','c'];



// 请编写一个函数join，将数组的每一位按照指定字符链接起来 ，例如： join([1,2,3], "%")， 运行结果"1%2%3";

// self
function ijoin(arr, symbol) {
    var str = "";
    for (const key in arr) {
        // console.log(key);
        str += (key === "0" ? "" : symbol) + arr[key]
    }
    console.log(str);
    return str;
}
// ijoin([1,2,3],"^");



//答案 function join(arr, sp){
//答案         var str = "";
//答案         for(var i=0; i<arr.length; i++){
//答案                 if(i==(arr.length-1)){
//答案                         str += arr[i];     
//答案                 } else {
//答案                         str += (arr[i]+sp);
//答案                 }
//答案         }
//答案 }


// 随机生成一个五位以内的数，然后输出该数共有多少位，每位分别是什么

// method1
// var i= randomChars("00000");
// console.log(i) ;
// for (const key in i) {
//     console.log(i[key]) ;
// }

//  // 判定一个数字有几位; => 无论数字有几位;
//  var num = 123456789;
//  // count => 第n位;
//  for(var count = 0,temp=num; temp >= 1; (temp = temp / 10 ) && count ++){
//        // console.log(count);
//        // num % 10 / 1
//        // num % 100 / 10 
//        // num % 1000 / 100 
//        var _no = parseInt(num % Math.pow(10,count + 1) / Math.pow(10 , count));
//        console.log(_no);
//  }
function numberDigit(number) {
    str = "";
    for (var i = 0, temp = number; temp >= 1; i++) {
        str += parseInt(number % Math.pow(10, i + 1) / Math.pow(10, i));
        temp /= 10;
    }
    console.log(str);
    console.log(i);
    return i;
}

// numberDigit(15596);






function printEachNum(num) {
    var arr = []; //数组保存每位数
    num = num >= 0 ? num : -num; //将num变为正数
    do {
        arr.unshift(num % 10); //头插法保存每位数保证顺序存储
        num = Math.floor(num / 10); //去掉最后一位并向下取整
    } while (num); // 终止条件为num = 0 并且num = 0时保证执行一次
    console.log(arr, arr.length);
}
// printEachNum(-123456);
// printEachNum(123456);
// printEachNum(0);





// 编写函数map(arr) 把数组中的每一位数字都增加30%

function up30(arr) {
    for (const key in arr) {
        arr[key] *= 1.3;
    }
    console.log(arr);
}
// up30([1,2,3]);

// var list = [10000, 12000, 15000, 18000];


// 编写函数has(arr , 60) 判断数组中是否存在60这个元素，返回布尔类型

function has(arr, num) {
    var has = false;
    for (const key in arr) {
        if (arr[key] === num) has = true;
    }
    return has;
}
// console.log(has([1,2,3],5)) ;


// 编写函数norepeat(arr) 将数组的重复元素去掉，并返回新的数组

var list = [13, 14, 15, 13, 15, 20, 80];

//ES6 去重

// console.log(Array.from(new Set(list))) ;

// 糖豆去重
function noRepeat(arr) {

    var _temp = [];
    for (var i = 0; i < arr.length; i++) {
        if(i===0||_temp.indexOf(arr[i])===-1){
            _temp.push(arr[i]);
        }
    }
    return _temp;
}

