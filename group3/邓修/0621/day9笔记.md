# DOM
[案例-聊天对话](..\随堂\0621\01案例-聊天对话.html)
[案例-隔行变色](..\随堂\0621\02案例-隔行变色.html)
[案例-延时二级菜单](..\随堂\0621\03案例-延时二级菜单-延时隐藏.html)
### 节点
**节点分类**
 1. 元素节点
 2. 属性节点
 3. 文本节点
 4. 注释节点
 5. document节点
 6. 文档碎片节点

**节点的三个重要属性**
 1. nodeType：辨别节点类型的，其实是节点类型的代码
    - 1 : 元素节点
    - 2 : 属性节点  => 是元素节点的子集
    - 3 : 文本节点
    - 8 : 注释节点
    - 9 : document 节点
    - 11: 文档碎片
 2. nodeName：辨别元素节点类型的
 3. nodeValue：获取节点内值的

**获取节点**

 - dom.childNodes : 获取所有子节点
 - dom.attributes : 获取属性节点

**创建设置节点**

 - document.createAttribute() : 创建属性节点
 - dom.setAttributeNode() : 设置属性节点 
 - document.createTextNode() : 创建文本节点
 - document.createComment() : 创建注释节点

**文档碎片节点**
 作用 : 作为一个虚拟节点存储要添加到页面上的子节点，减少冗余
```javascript
var fragment = document.createDocumentFragment();
for(var i = 0  ;i < 10000; i ++){
	var div = document.createElement("div");
	div.innerHTML = "hello world" + i * 3;
	div.style.color = "yellowgreen";
	fragment.appendChild(div);           
}
document.body.appendChild(fragment);
console.time("loaded");
window.onload = function(){
	console.timeEnd("loaded");
}
```
### offset系列
 - 测量方案 : 
   1. 所有直至body的祖先级元素, 在这些元素中如果没有position属性,那么当前offset会测量元素距离文档边缘的值
   2. 如果父级元素有position , 属性那么则会返回当前具有position属性元素到当前元素的距离
 - 获取元素根据页面的绝对定位
   ```javascript
   function getPosition(ele){
      // 初始值是当前元素的offset值;
      var res1 = ele.offsetTop;
      var res2 = ele.offsetLeft;
      // 如果当前定位元素不是body,去累加;
      while(ele.offsetParent !== document.body){
         ele = ele.offsetParent;
         res1 += ele.offsetTop;
         res2 += ele.offsetLeft;
      }
      return [res1,res2];
   }
   console.log(getPosition(box));
   ```
### todolist案例
 [todolist案例](..\随堂\0621\09todolist.html)