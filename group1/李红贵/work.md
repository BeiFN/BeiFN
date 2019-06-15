***JS day1
1.var 声明变量
2.alert("");    弹出警告框，会阻碍进程
3.document.write("打印信息显示在网页中");
4.document.writeln("自带\n的打印信息");

5.console.log("打印日志");   控制台打印信息
6.console.time("time");
<!-- 测试本段程序运行时间 -->
7.console.timeEnd("time");

8.parseInt(1.68); 转整数取整，舍弃小数。 
<!-- 转换规则: 从左到右依次检索遇到的每一个字符; 如果有任意一个不为数字的字符，会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN; 
parseInt(a,16); 表示把十六进制的a转为10进制数
-->

9.parseFloat(); 转小数。
<!-- 转换规则：从左到右依次检索遇到的每一个字符; 如果有字符破坏了数字规则,会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN;  //空格不算，可以有正负号 -->

10.Number();    进行整体的数据类型变换; 只要存在任何不符合数字规则的部分，那么会被转换成NaN;

11.isNan(); 返回bool值
<!-- > isNaN(NaN)
    > 1. 把传入的内容用 Number() 强制数据类型转换;
    > 2. 判定转换结果是否为NaN; -->

12.Infinity 无限大，表示无法表示的数字
        <!-- 一个数字最多有十六位(八个字节)
        1e+n 代表1后面有n个零
             -->

<!-- 数据类型 : 基本类型 => 1. 数字 2. 字符串  3. 布尔值  4. 特殊类型 : undefined null; -->

13.Math.pow(m, n); m的n次方
14.Math.PI π值
15.Math.round(3.546) 四舍五入取整
16.Math.random(); 随机数，（0,1）开区间的任意小数

17.toString(n);  十进制转n进制数
<!-- var str = 15;
str.toString(16);
alert(str.toString(16)); -->

18.toFixed(n); 保留n位小数，结果四舍五入
<!-- var num =2.446242342;
num = num.toFixed(2); // 输出结果为 2.45 -->



***JS day2
///
<!-- 多路开关 -->
 switch(a){
    case 1:{}break;
    ...
    default:{}break;
    <!-- break在switch语言里面阻止穿透 -->
} 
<!-- 判断、逻辑分支 -->
if()
if(){}else{}
if(){}else if(){}else{}
<!-- 循环结构 -->
while();  do{}while(){}; for(var i = 0; i ++ < n;>){};
<!-- break在循环语句中跳出循环，continue在循环语句中跳出本次循环，继续下一次循环 -->
///
break；
continue；结束本次循环，继续下一次循环
source 控制台断点




***JS day3 

1.function name(a, b, c...){}  具名函数声明,()中为形参，实际调用方法时传入实参
2.！+-*/%<(运算符)function(){} 立即执行的匿名函数
3.return a;  在函数体中返回运算结果，并结束该函数运行

//鼠标事件 给目标标签先设置id="name" 使用 name.onclick = function(){} 或者 document.getElementById("name").onclick = function(){}
1.onclick 点击事件
2.ondblclick 双击事件
3.onmousedown 鼠标按下
4.onmouseup 鼠标抬起
5.onmouseover 鼠标移入
6.onmouseout 鼠标移出
7.onmousemove 鼠标移动
//键盘事件

1.onkeydown 键盘按下
2.onkeyup 键盘抬起
3.onkeypress  按一次键盘

//元素事件，
1.onfocus 获取焦点
2.onblur 失去焦点
3.oninput 正在输入
4.onchange 已经改变

//窗口事件winidow窗口统一入口
1.onload 加载结束
2.onresize 窗口尺寸改变
3.onscroll 滚动条发生滚动



***JS day4  0614  对象 引用类型 递归 闭包 数组
<!-- 对象的本质是存数据 -->
<!-- 声明对象 -->
```javascript
var obj = {"key":value}; //字面量声明 key必须为英文字符串，value可以为任意值
var str = "key";
console.log(obj.key);//取值
// obj[str] === obj.key === obj["key"]
obj.key = "";//赋值


var obj2 = new Object();// 构造函数
obj2.a = 333;
obj2["cc"] = "string";
obj2[obj2["cc"]] = [1,2,3];

for(var key in obj2){
    console.log(key , obj2[key] );//打印所有key和值
}
// in  表示某个key是否存在于对象之中;
// console.log("a" in obj2);

// 删除delete
delete obj2.a;
```

<!-- 引用类型 
引用类型  函数，对象，数组  创建时回创建全新的存储空间，把当前空间的地址赋值给对象变量。
基本类型 在变量中存的 是值 ; 比对的时候是值比对;
引用类型存的是地址 ;  函数;对象; 数组; 是引用类型
栈：先进后出  堆：先进先出
-->
```javascript

function foo(a,b,c,d){
    console.log(arguments);//arguments用来处理函数（内部）的不定参 (不确定有几个参数的 );
    
    // boolean ? trueValue : falseValue;//三目运算符
}
// for(var i = 0 ; i < arguments.length ; i ++){
    //       // console.log(i);
    //       console.log(arguments[i]);
    // }

    // console.log({} instanceof Array);
    // console.log([] instanceof Object);

    // function foo(){

    // }
    // console.log(foo instanceof Function);

    // tip : instanceof 这个东西尽量别判断 Object ，不准;


```
<!-- 数组 方法-->
1.arr.pop();// pop 是删除数组最后一项的方法 ;  pop的返回值是删除掉的数据;
2.arr.push(); //是向数组后面新增数据的方法 ; push 的返回值是新数组的length ;  
3.arr.shift(); 是删除数组第一项的方法 ; shift的返回值是删除掉的数据;
4.arr.unshift(); 是新增数组第一项的方法 ; unshift的返回值是改变后数组长度;
5.arr.splice(index,length,value);//删除从index开始的length个数据，并用value替换，以数组形式返回删除的数据
6.arr1.concat(arr2,arr3);//将括号内元素每一项拼接 返回拼接后的数组，
7.arr.join("/");// 把数组转换成字符串，用（）中/字符连接，返回转换后的字符串
8.arr.toString()//转字符串原样返回
9.arr.indexOf(9);    //第一个 9 在数组之中的下标;
10.arr.lastIndexOf(9);//最后一个 9 在数组之中的下标;
11.arr.slice(2,9); // 拷贝子数组，不改变原数组 传入参数（star，end）起、止下标，只写一个下标拷贝到最后，包括star不包括end。
       


```javascript
        // 赋值，初始化  
        // var arr = [1,2,3,4,5,6,7,8,9,9,9,"hhh",true,function(){ alert("过分!!!!")} , {}];
        // arr[2] = 33;//静态赋值
        // console.log(arr);
        // arr[11]();
        // // pop 是删除数组最后一项的方法 ;  pop的返回值是删除掉的数据;
        // console.log(arr.pop());
        // console.log(arr);
        // // push 是想数组后面新增数据的方法 ; push 的返回值是新数组的length ;  
        // console.log(arr.push(8,9));
        // console.log(arr);
        // // shift 是删除数组第一项的方法 ; shift的返回值是删除掉的数据;
        // console.log(arr.shift());
        // console.log(arr);
        // unshift 是新增数组第一项的方法 ; unshift的返回值是改变后数组长度;
        // console.log(arr.unshift(10));
        // console.log(arr);
        // splice(index,length,value)删除从index开始的length个数据，并用value替换，以数组形式返回删除的数据
        // console.log(arr.splice(3,2))
        // console.log(arr);
        //可以替换删除掉的内容;
        // console.log(arr.splice(3,1,"hello world"));
        // console.log(arr);
        // 拼接;// Array.prototype.concat() 将括号内元素每一项拼接 返回拼接后的数组，
        // var arr1 = [1,2,3];
        // var arr2 = "jiushisisi";
        // var arr3 = [7,5,6];
        // console.log(arr1.concat(arr2,arr3));

        // 数组的转换功能 ;// 把数组转换成字符串，用（）中字符连接，返回转换后的字符串
        // Array.prototype.join()
        // var arr = [2019,6,14];
        // console.log(arr.join("/"))
        // // "2019/6/14"
        // console.log(arr.join("~"))
        // Array.prototype.toString()//转字符串原样返回
        // console.log(arr.toString());
        // "2019,6,14"

        // // 找某一值在数组之中的位置;
        // console.log(arr.indexOf(9));    //第一个 9 在数组之中的下标;
        // console.log(arr.lastIndexOf(9));//最后一个 9 在数组之中的下标;

        // 拷贝子数组，不改变原数组 传入参数（star，end）起、止下标，只写一个下标拷贝到最后，包括star不包括end。
        // Array.prototype.slice()
        // var array = arr.slice(5,9);
        // console.log(arr.slice(5));

```







