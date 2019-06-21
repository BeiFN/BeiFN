1. padStart() 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。
2. comfirm()确认对话框；
3. prompt() 输入文本对话框；
查询---------

document.getElementById()    通过ID号查找元素
document.getElementsByTagName()    通过标签名称查找元素
document.getElementsByName()      通过name属性来查找元素
document.getElementsByClassName()   通过class属性来查找元素
增---------

document.createElement()   创建一个DOM元素
box.appendChild(target)    将target元素追加到box元素的内部，此时浏览器才能正确加载并显示元素
parent.insertBefore(newnode, oldnode)   将newnode元素插入到parent元素的内部，同时放在oldnode元素的前面

删除---------
parent.removeChild(child)    将child元素删除，parent是child元素的父亲
node.remove();

改------------    
box.style.background = "red";
innerHTML 不转义 直接解析对应的标签；
innerText 转义为字符串；

获取一个自定义属性的值
box.getAttribute("index")
修改~~~
box.index = 99;
box.setAttribute("index",99)

