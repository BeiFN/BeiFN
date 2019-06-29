Element.attributes
返回一个该元素所有属性的NameNodeMap集合，不是数组


element.getAttribute("")
返回该元素指定属性的属性值

element.getAttributeNames()
返回该元素的所有属性名


element.getAttributeNode("")
返回该元素的指定属性和属性值


[1]element.setAttribute("属性","属性值" )
增加属性和属性值， 改变属性的值


[2]document.createAttribute("")
创建一个属性
attr.nodeValue给属性加上属性值
element.setAttributeNode(一个完整属性（id="haha"）)

[1]和[2]是相等的

element.removeAttribute("")移除一个属性
element.removeAttributeNode()移除一个属性节点


node.nodeType 返回节点类型
node.nodeName 返回节点名称 
node.nodeValue 属性返回或者设置当前节点的值

node.childNodes 返回指定实时的子节点集合
node.parentNode 返回指定节点的父节点

node.cloneNode（deep） 返回节点的一个副本,若 deep = true:后代全被克隆，false 只克隆当前