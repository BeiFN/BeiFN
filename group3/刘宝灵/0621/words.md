Element.scrollIntoView() 方法让当前的元素滚动到浏览器窗口的可视区域内。
setTimeout()方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码.
clearTimeout()方法取消了先前通过调用setTimeout()建立的定时器。
nodeType ; 辨别节点类型的;
nodeName ; 辨别元素节点类型的;
nodeValue; 获取节点内部的值;
 1 : 元素节点; 
 2 : 属性节点;  => 是元素节点的子集;
 3 : 文本节点; 
 8 : 注释节点; 
 9 : document 节点; 
 11: 文档碎片; 
document.createTextNode()   创建一个新的文本节点.
document.createComment()    用来创建并返回一个注释节点.
removeAttribute()           从指定的元素中删除一个属性。
document.createDocumentFragment() 创建一个新的空白的文档片段
offsetParent  是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素。