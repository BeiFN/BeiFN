###单词表
onclick   鼠标点击
ondblclick 双击
onmousedown  按下
onmouseup 鼠标抬起
onmouseover 鼠标悬停,移入
onmouseout  鼠标移出
onmousemove 鼠标移动

keydown  按下键盘
keyup    键盘抬起
keypress  按一次键盘

onfocus  获取焦点
onblur  失去焦点
oninput  正在输入
onchange 已经改变

window.onload 加载结束
onresize  可视窗口尺寸改变
onscroll  滚动条发生滚动

Math.random()  生成随机数字 伪随机
Math.round()   四舍五入
Math.pow()     次方
Math.PI ()     π
Math.min ()    最小值   后面跟的是一组数值
Math.max ()    最大值
Math.cos ()    余弦函数
Math.floor()   向下取整


function  函数
continue  跳出当次循环
break     跳出循环；在switch中是阻止穿透的；



instanceof 判断原产地
object   对象
arguments  伪数组
Array   数组
length   长度
Arry.prototype.pop()  删除数组最后一项  返回值是删除掉的数据
push  在数组后面增加数据   返回值是新数组的length
shift 删除数组第一项   返回值是删除掉的数据
unshift 在第一项前添加  返回值是新数组的length
splice 删除再拼接  后面可以跟多个参数 （ 第几个， 删除几个，替换的内容 ）
concat  拼接数组
join 数组的转换 转换为字符串 可以选择拼接的符号 join（“/”）
toString   直接转换为字符串  原汁原味
indexOf    查询  //indexOf（3）  代表查找3在数组中的下标（从左至右）
lastIndexOf  查询  //lastIndexOf（3）  从右至左的查询 数字3的下标

slice 提取 后面两个参数（开始的位置包括在内，结束的位置不包括本身） //slice（2,4）提取的是下标为2,3的值。
      参数只写一个的话  代表的是开始位置直到结束；   返回值是截取的新数组  不写参数的话  是截取全部的数组创建的是新数组


字符串api
new String  是创建一个字符串对象  
charAt（）   获取第几个字符
chatCodeAt（）  获取某个字符的ascii码
formCharCode    将asclii转换为字符
indexOf       判断字符是否在字符串中  返回的是对应的下标  如果没有的话  就会返回-1；
split        将字符串以某个符号作为分隔符 转换为数组。
substring（star，end）包含star  但是不包含end  如果是负数的话  是把负数当作0；
slice（star，end）  包含star 不包含end  如果是负数的话  代表的是从右到左
trim         是去掉字符串左右两边的空格
replace（要替换的内容，替换后的内容）查找替换 g代表的是全局查找
concat  字符串的拼接 相当于+
repeat  重复字符串  兼容性不好
toString () 转换为字符串 任意类型都可以  还可以进行进制转换

日期对象
* valueOf  这个是返回的原始值   即为1970年1月吧1日到目标时间的毫秒数；  可以说是完全兼容的
* toJSON   把date对象返回成字符串  有一定的格式   YYYY-MM-DDTHH:mm:ss.sssZ   应该是格林威治的时间
* getTime   返回一个距离1970年到目标时间的差值  但是是毫秒数
* toString  把日期对象转为字符串   该 toString 方法总是返回一个美式英语日期格式的字符串。
get方法系列是获得时间戳的 
getFullyear  获取的是本地时间的年
getMonth     获取的是本地时间的月份减一  【注】month的数值是从0开始的  和中国的月份差一
getDate      获取的是本地时间的日
getDay       获取的是本地时间的周几
getHours     获取的是本地时间的小时
getMinutes   获取的是本地时间的分钟
getSeconds   获取的是本地时间的秒数
getMilliseconds   获取的是本地时间的毫秒数

getUTCFullYear 获取的是的年份
getUTC  系列是获取的的时间 

set系列方法是更改到目标时间的  获得是1970年到目标时间的毫秒数;返回值，只针对当前的时间对象有效


setInterval（） 定时器   后面跟两个参数  第一个是函数，第二个是以毫秒为单位的时间。  每隔多少毫秒浏览器帮忙调用一次函数。

clearInterval  清除定时器

setTimeout  延时器   这个只会执行一次

history  历史记录
history.back    向后（后退）
history.forward  向前（前进）
history.go        任意方向（正数是前进  负数是后退）


location  地址栏
port  端口
protocol 协议
href  链接地址
host  域名
hash  哈希值 #1 井号表示 


confirm  弹出确认取消窗口
prompt   弹出有输入框的窗口
alert    警告框
eval     可以把字符串当做js代码进行解析执行


scrollTop 滚动条垂直滚动的高度
scrollLeft  滚动条水平滚动的长度


getElementById  ID选择器
getElementsByTagName   标签选择器
getElementsByName    name选择器
getElementsByClassName   class选择器
querySelector        选择单个元素
querySelectorAll     选择多个重复的元素


createElement  创建一个元素
appendChild（） 向后插入
insertBefore    在前方插入

children 子元素
parentNode 父级元素

removeChild  删除某个元素  需要先选中这个元素或者父级元素  
remove 删除


innerHTML  获取内容    内容是被解析之后显示的
innerText             内容是被转义之后显示的  即为标签会保留 不会被解析


setAttribute（key，value）  创建属性
removeAttribute  删除属性 
getAttribute  获取对应属性的key值


offsetWidth    获取图片的宽高 offset（）
offsetTop      测量的是当前元素距离祖先集中的带有position属性的元素的高度  没有的话 就是距离body的距离
scrollIntoview   自动滚动到底部


节点
nodeType  辨别节点类型
nodeName  辨别元素节点类型
nodeValue 获取节点内的值

childNodes   子节点

fragment  文档碎片   createDocumentFragment 的创建

client  鼠标到可视窗口的距离
offset  鼠标到当前区域的距离
screen  到屏幕的距离
page    到文档的距离
event  事件
target  || srcElement   事件源

### ES5

use strict  严格模式
forEach    用来遍历数组的  参数是一个函数  arr.forEach( foo )
            会接受一个函数作为参数,并在方法内调用 *参数函数* 数组项数次; 而是 *参数函数* 的形参 
            function foo(item,index , arr)   其没有返回值 返回值为undefined

map     返回一个新数组，新数组之中装的是参数函数的返回值; 参数同上
filter   返回新数组.会根据参数函数的返回值判定是否该讲具体的项加入新数组;
some 判定数组中是否存在某个符合条件的；一旦函数返回true那么some机会终止循环，并且返回true
every 是判定数组中是否存在某个不符合条件的 ，发现有不符合的就会返回false，并且返回false。
reduce  是对数组中的每一项进行一个累计计算操作。
```javascript
         // var arr = [15000,20000,21000,26000,3000,2000,8000];

            // var res = arr.reduce(function(pre , now , index , arr){
            //       console.log(pre,now ,index);
            //       return pre + now;
            // })

            // console.log(res);   
```
flat  数组扁平化

Object.defineProperty   方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
```javascript
    var obj = {b:1}
    Object.defineProperty( obj , "a" , {
                  // 不可删除;
                  configurable : true,
                  // 不可枚举;
                  enumerable : true,
                  value : "hello world", //
                  writable : true //是否可以被赋值
    })
    Object.defineProperty( obj , "a" , {
                get : function(){
                  // this => obj 当前对象;
                  // console.log(this);
                  return this.$data.a;
                },
                set : function(val){
                  // val => 设置的参数
                  // console.log("hello");
                  // 因为在a设置值的时候已经被作为一个拦截器而进行set处理了,那么这时候我们不能给a直接赋值;
                  return this.$data.a = val;
                }
    })   


```