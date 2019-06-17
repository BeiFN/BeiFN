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

