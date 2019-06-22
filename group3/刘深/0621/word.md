节点三剑客：

nodeType:辨别节点类型；

nodeName:辨别元素节点类型；

nodeValue:获取节点内的值；

createComment（）创建并返回一个注释节点；

creatTextNode（）创建文本节点；

creatDocumentFragment()创建文档碎片；

creatAttribute()创建属性节点；

获取所有子节点：childNodes

1：元素节点；

2：属性节点；

​    元素节点才有属性节点；是元素节点的子集；

3：文本节点；

8：注释节点；

9：document节点；

11：文档碎片；

​	offsetTop 测量的方案: 

1. 所有直至body的祖先级元素, 在这些元素中如果没有position属性,那么当前offset会测量元素距离文档顶部的值;

2. 如果父级元素有position , 属性那么则会返回当前具有position属性元素到当前元素的距离;

