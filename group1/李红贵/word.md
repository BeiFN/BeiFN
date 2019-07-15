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

11.isNaN(); 返回bool值
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
8.onmouseenter 鼠标穿透
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


var obj2 = new Object({"key":value});// 构造函数方式初始化
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

***JS day5  0615 数组排序
1.innerHTML 盒子内容文字修改
2.value input值修改
3.sort  数组系统排序方法arr.sort(function(a,b)){return a-b;}


***JS day6  0617 字符串系统方法

1.fromCharCode() 
<!-- 根据传入ascii码,返回对应的字符 并 组成字符串（传入多个ascii码），该方法不能单独获取在高代码点位上的字符 -->

2.fromCodePoint()
<!-- 根据传入ascii码，返回对应的字符并组成字符串，该方法能获取在高代码点位上的字符 -->

3.charAt() 
<!-- 获取对应位置字符，超出返回空字符 -->

4.charCodeAt()
<!-- 获取对应位置字符及对应的ascii码，超出返回NaN -->

5.codePointAt()
<!-- 获取对应位置字符对应的ascii码，可以获取高代码点位上字符-->

6.concat()
<!-- 字符串拼接，拼接括号内字符 -->

7.endsWith()
<!-- 判断字符串结尾 -->

8.startsWith()
<!-- 判断字符串开头 -->

9.includes()
<!-- 判断是否包含字串 -->

10.indexOf()
<!-- 字符首次出现位置 -->

11.lastIndexOf()
<!-- 字符最后出现位置,加2表示从下标2开始往前找 -->

12.localeCompare()
<!-- 字符判断大小 -->

13.padEnd()
<!-- 用参数2在末尾重复补充字符串到参数1长度,参数二不填用空格补齐,参数1小于目标长度则不变 -->

14.padStart()
<!-- 用参数2在开头重复补充字符串到参数1长度,参数二不填用空格补齐,参数1小于目标长度则不变 -->

15.repeat()
<!-- 构建新字符串返回,参数为重复次数 -->

16.slice()
<!-- 拷贝字串以新字符串返回 参数可为负数，负数表示从右边开始-->

17.substring()
<!-- 拷贝子字符串 包括前值,不包含后值 ，负数为0-->

18.split()
<!-- 查找字符串中的字符，并返回找到的前 个分割元素（splits） 转数组返回-->

19.toLocaleLowerCase()
20.toLowerCase()
<!-- 转小写 -->

21.toLocaleUpperCase()
22.toUpperCase()
<!-- 转大写 -->

23.trim()
<!--  清两边空格-->

24.trimRight()
<!--  清右空格-->

25.trimLeft()
<!-- 清左空格 -->

26.toString()
<!-- 方法返回指定对象的字符串形式,还可以转其他进制数 -->




***JS day7  0618 

**Math对象


**Date日期
1.Date.UTC(96, 1, 2, 3, 4, 5)<!-- 到目标UTC时间的毫秒数 世界原子时 -->
2.Date.now()<!-- Date.now() 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。 -->
3.Date.parse()<!-- 解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，日期格式不合法返回NaN -->

```javascript
var d = new Date();//日期对象默认时间是系统时间
console.log(d.getDate());
console.log(d.getDay());
```
4.getDate()<!-- 根据本地时间对象，返回一个指定的日期对象为一个月中的哪一日（从1--31）。 -->

5.getDay()<!-- 根据本地时间对象，获取星期几 -->

6.getFullYear()<!-- 获取年份 -->

7.getHours()<!-- 获取小时 -->

8.getMilliseconds()<!-- 获取毫秒数 -->

9.getMinutes()<!-- 获取分钟 -->

10.getSeconds()<!-- 获取秒 -->

11.getTime()<!-- 获取一个时间到格林威志时间毫秒数 -->


12.getTimezoneOffset()<!-- getTimezoneOffset() 方法返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。-->
13.getUTCDate()<!-- 以世界时为标准，返回一个指定的日期对象为一个月中的第几天 -->

14.getUTCDay()
15.getUTCFullYear()
16.getUTCHours()
17.getUTCMilliseconds()
18.getUTCMinutes()
19.getUTCMonth()
20.getUTCSeconds()
21.getYear()

22.setDate()<!-- 根据本地时间来指定一个日期对象的天数。 -->

22.setFullYear()
23.setHours()
24.setMilliseconds()
25.setMinutes()
26.setMonth()
27.setSeconds()
28.setTime()<!-- 方法以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为 Date 对象设置时间。 -->

29.setUTCDate()
30.setUTCFullYear()
31.setUTCHours()
32.setUTCMilliseconds()
33.setUTCMinutes()
34.setUTCMonth()
35.setUTCSeconds()
36.setYear()<!-- 和setFullYear()一样，已废弃 -->


37.toDateString()<!-- 以特定的格式显示周几、月、日、年 -->
Date.prototype.toGMTString()
Date.prototype.toISOString()
Date.prototype.toJSON()
Date.prototype.toLocaleDateString()
Date.prototype.toLocaleFormat()

.toLocaleString()<!-- 已当地时间格式返回日期 -->

toLocaleTimeString()<!-- 已当地时间格式返回时分秒 -->

Date.prototype.toSource()

.toString()<!--  以字符串格式返回日期对象 方法返回一个字符串，表示该Date对象。-->

.toTimeString()<!-- 返回日期对象的时分秒 -->

Date.prototype.toUTCString()

Date.prototype.valueOf()
Date.prototype[@@toPrimitive]

setInterval
<!-- 设置定时器 -->

clearInterval
<!-- 清除定时器 -->

setTimeout
clearTimeout




    1 toDateString()    以特定的格式显示周几、月、日、年
    2 toTimeString()    以特定的格式显示时、分、秒和时区
    3 toLocaleDateString()  以特定的格式显示周几、月、日和年
    4 toUTCString       以特定的格式显示完整的UTC日期
    5 valueof           返回毫秒数，等同于getTime




***JS day8  0619 dom对象
1.document.getElementById("IDName");  
<!-- 根据id获取元素，得到单个标签元素 -->

2.document.getElementByClass("className");
<!-- 根据class名获取元素，得到的是伪数组 -->

3.document.getElementByTagName("div");
<!-- 根据标签名获取标签，用伪数组返回所有div -->

4.document.getElementsByName("hello")；
<!-- <div name="hello"></div> 根据name属性值获取标签 -->

5.document.querySelector(".box");<!-- 根据class获取单个元素 -->

6.document.querySelectorAll(".box");<!-- 获取所有class为box的元素 -->

7.var div = document.createElement("div");
<!-- 创建一个div -->

8.document.body.appendChild(div);
<!-- 把创建的div添加到body末尾 
// * 如果 appendChild 操作的元素是已经存在于页面上的元素，那么appendChild会做两件事.
// 1. 删除掉页面上的这个元素;
// 2. 重新对元素进行插入。
// document.body.appendChild(div);-->


9.children  
<!-- 表示所有子元素 -->

10.document.body.insertBefore( div , document.body.children[0] );
<!-- insertBefore 插入元素到指定位置，0是最前面 -->

11.removeChild()  
<!-- 删除子元素dom -->

12.parentNode
<!-- 找到父级节点 -->

```javascript
// var box = document.getElementById("box");
 // console.log(box);
 // document.body.removeChild(box);
 // 简化写法;
 // parentNode => 找到父级节点;
 // console.log(box.parentNode); 
 // box.parentNode.removeChild(box);
 // 语法升级;
 // box.remove();
```

13.dom.innerHTML
<!-- 字符串转标签显示 -->

14.innerText
<!-- 字符串原样显示 -->

15.setAttribut(属性名，属性值)
<!-- 设置属性名和值 -->

16.getAttribute(属性名)
<!-- 获取属性值 -->

17.removeAttribut(属性名)
<!-- 删除属性 -->

18.getComputedStyle  获取元素完整的css列表




***JS day9  0621 dom节点
```javascript
// 总结 : 其实页面中所有你能看到的东西都是节点,这些节点普遍都可创建; 这些节点都是以对象形式存在的; 
var box = document.getElementById("box");
    // console.log(box.childNodes);
    for(var i = 0 ; i < box.childNodes.length ; i ++){
        // console.log(box.childNodes[i]);
        console.log(box.childNodes[i].nodeType);
}
```

1.chileNoes
<!-- 用伪数组 返回所有子节点，-->


2.nodeType
<!-- 判断节点类型 返回节点类型代码 1元素节点  3文本节点 -->

3.nodeName
<!-- 辨别元素节点类型,另外获取属性key值 -->

4.nodeValue
<!-- 获取节点内值，属性值 -->

5.box.attributes[0];  获取第0个属性节点

6.createAttribute  创建一个属性节点

7.createTextNode   创建文本节点

8.createComment     创建一个注释





***JS day10  0622 事件

1.event
<!-- 浏览器接收当前事件的全局对象 -->

2.clientX clientY clientWidth clientHeight 在可视窗口的坐标x值和y值，宽 高
3.screenX screenY screenWidth screenHeight 屏幕坐标 x和y
4.offsetX offsetY offsetWidth offsetHeight 当前区域位置
5.pageX pageY pageWidth pageHeight 文档位置（包括滚动区域）


***JS day11  0624 高级事件
1.addEventListener  添加监听
2.removeEventListener 移除监听事件
3.stopPropagetion 阻止冒泡
4.dom.cloneNode(true) 复制节点方法,返回一个新的dom对象
5.e.preventDefault 阻止默认事件 
6.var cloneEle = null; 阻止右键弹出框 


***JS day12  0625 es5新增
1."use strict"  严格模式
2.forEach 遍历数组，参数为函数
3.map 返回一个新数组，新数组之中装的是参数函数的返回值;
4.filter返回新数组.会根据参数函数的返回值判定是否该讲具体的项加入新数组;返回原数组满足条件的值
5.some 判断是否有满足条件的值
6.every 判断是否都满足
7.reduce 累计方法
8.flat es6方法，数组扁平化

9.Object.definePropertie()  扩展部分对象里的方法
10.configurable:true,  	不可删除 
11.enumerable: true,  不可枚举 
12.value:  设置值
13.writable: true  可写入
14.get  获取属性的时候添加方法
15.set 设置属性的时候添加方法;












