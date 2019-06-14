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
