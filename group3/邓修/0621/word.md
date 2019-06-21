1. scrollIntoView() 滚动到可视区域
2. dom.nodeType 辨别节点类型
3. dom.nodeName 区分元素节点类型 **元素节点、属性节点(元素节点的子集)、文本节点、注释节点、document 节点、文档碎片
4. dom.nodeValue 获取节点内值
5. dom.childNodes 获取所有子节点
6. createAttribute() 创建属性节点
7. setAttributeNode() 给元素节点设置属性节点
8. createTextNode() 创建文本节点
9. createComment() 创建注释节点
10. createDocumentFragment() 创建文档碎片
11. dom.offsetTop   
    1. 所有直至body的祖先级元素, 在这些元素中如果没有position属性,那么当前offset会测量元素距离文档顶部的值;
    2. 如果父级元素有position , 属性那么则会返回当前具有position属性元素到当前元素的距离;
12. dom.offsetParent 获取计算offset属性用来参照的父节点