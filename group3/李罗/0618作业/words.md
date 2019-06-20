事件：
鼠标：onclick;点击
ondblclick;双击
onmousedown;鼠标按下
onmouseup；鼠标抬起
onmouseover;鼠标移入
onmouseout;鼠标移出
onmousemove;鼠标移动
键盘事件：onkeydown键盘按下
onkeyup键盘抬起
onkeypress键盘按一次
元素事件：获取焦点：ID.onfouse
失去焦点ID.onblur
正在输入ID.oninput
已经改变ID.onchange
窗口事件：Window窗口的统一入口
window.onload加载结束时
window.onsize窗口尺寸改变
window.onscroll 滚动条发生滚动
数组关键字：
1.改 ;var arr = [1,2,3,4,5,6];arr[0] = 10;console.log(arr);
2. 删除之后重新赋值 ;  数组 API , 专门为数组类型创建的API，仅对数组有效;
 Array.prototype.pop():删除数组最后一项的方法；其中pop的返回值是删掉的数据
    console.log(arr.pop());
    console.log(arr);
3.Array.prototype.push():是向数组的后面新增数据的方法；push的返回值是新数组的length           console.log(arr.push(8,1,2,3,4,5,6,6,8,9,9));
    console.log(arr);
4.Array.prototype.shift():是删除数组第一项的方法；shift的返回值是删除掉的数据
一是 删除对应位置的内容 ;console.log(arr.shift());console.log(arr.unshift(10));
 splice (index,2)；console.log(arr.splice(3,2))；console.log(arr);
二是可以替换删除掉的内容;console.log(arr.splice(3,1,"hello world"));console.log(arr);
5.Array.prototype.unshift（）；
6.Array.prototype.splice()；
7.Array.prototype.concat();是有拼接的功能
             Array.prototype.concat()
             var arr1 = [1,2,3];
             var arr2 = [4,5,6];
             var arr3 = [4,5,6];
             console.log(arr1.concat(arr2,arr3));
8.Array.pototype.join();把数组转换为字符串
            Array.prototype.join()
            var arr = [2019,6,14];
             "2019/6/14"
            console.log(arr.join("/"))
            console.log(arr.join("~"))
            Array.prototype.toString()
            console.log(arr.toString());
9.查 ：遍历;（for in；for循环）
            for(var index in arr){
                  console.log(arr[index]);
             }
 10.找某一项在数组之中的位置;
            console.log(arr.indexOf(3));    // 3 在数组之中的下标;
            console.log(arr.lastIndexOf(3));// 3 在数组之中的下标;
            Array.prototype.indexOf()；：从左到右(判断这个元素在不在数组中)
            Array.prototype.lastIndexOf()；：从右到左
11.Array.prototype.slice():返回一个新的数组对象(由begin开始，但是不包括end)
            arr.slice();// [0, end]
            arr.slice(begin);// [begin, end]（一直到数组末尾）
            arr.slice(1, 4);// [begin, end)（1.2.3）
12.新学的API
valueOf() 方法返回一个 Date 对象的原始值。返回值从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。与 Date.prototype.getTime() 方法一样。
var x=new Date(44,6,17);
var myVar=x.valueOf();//-803466000000
toString() 方法返回一个字符串，表示该Date对象。返回一个美式英语日期格式的字符串。toString() 是通用函数。如果不是Date实例，则 返回"Invalid Date"。
var x=new Date();
myVar=x.toString();//把类似于下面格式的值赋给 myVar
toTimeString() 方法以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。
var d=new Date(1997,6,30,14,39,7);
console.log(d.toString());//Wed Jul 30 1997 14:39:07 GMT+0800 (中国标准时间)
console.log(d.toTimeString());//14:39:07 GMT+0800 (中国标准时间)
toLocaleTimeString() 方法返回该日期对象时间部分的字符串，该字符串格式因不同语言而不同。
var date=new Date(Date.UTC(1997,,6,30,5,2,44));
alert(date.toLocaleTimeString());//下午1:02:44if run in en-US locale with time zone America/Los_Angeles

[@@toPrimitive](hint) 方法可以转换一个 Date 对象到一个原始值。根据传入参数的不同，可以返回 string 或 number 类型。如果 hint 是 "string" 或 "default"，[@@toPrimitive]() 将会调用 toString。如果 toString 属性不存在，则调用 valueOf。如果 valueOf 也不存在，则抛出一个TypeError。

如果 hint 是 "number"，[@@toPrimitive]() 会首先尝试 valueOf，若失败再尝试 toString。