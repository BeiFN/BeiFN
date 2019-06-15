### 事件
**鼠标事件：**
* onclick 单击
* ondblclick 双击
* onmousedown 鼠标按下
* onmouseup 鼠标抬起
* onmouseover 鼠标移入
* onmouseout 鼠标移出
* onmousemove 鼠标移动

**键盘事件：**
* onkeydown 键盘按下
* onkeyup 键盘抬起
* onkeypress 按一次键盘

**元素事件：**
* onfocus 获取焦点
* onblur 失去焦点
* oninput 正在输入
* onchange 已经改变

**窗口事件：**
window 窗口的统一入口
* onload 加载结束
* onresize 窗口尺寸改变
* onscroll 滚动条滚动
* onsubmit 表单提交


### 数组
* Array.prototype.pop()
  方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

* Array.prototype.push()
  方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

* Array.prototype.shift()
  方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

* Array.prototype.unshift()
  方法将一个或多个元素添加到数组的开头，并返回该数组的新长度。

* Array.prototype.splice()（开始的索引，删除的个数）

  方法通过删除或替换现有元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

  * 删除对应位置的内容，返回删除的内容
  * 不写位数删除index之后所有
  * 可以替换删除掉的内容

* Array.prototype.concat()

  方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

  ```javascript
  array1.concat(array2);
  ```

* Array.prototype.join()
  方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

  ```javascript
  var a = ['Wind', 'Rain', 'Fire'];
      var myVar1 = a.join();      
  // myVar1的值变为"Wind,Rain,Fire"
      var myVar2 = a.join(', ');  
  // myVar2的值变为"Wind, Rain, Fire"
      var myVar3 = a.join(' + '); 
  // myVar3的值变为"Wind + Rain + Fire"
      var myVar4 = a.join('');    
  // myVar4的值变为"WindRainFire"
  
  ```

* Array.prototype.indexOf()
  方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

  ```javascript
  var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];   console.log(beasts.indexOf('bison'));
  // expected output: 1
  // start from index 2
      console.log(beasts.indexOf('bison', 2));
  // expected output: 4   console.log(beasts.indexOf('giraffe'));
  // expected output: -1
  
  ```

* Array.prototype.lastIndexOf()
  方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

* Array.prototype.sort()
  方法用原地算法对数组的元素进行排序，并返回数组。排序算法现在是稳定的。默认排序顺序是根据字符串Unicode码点。

* Array.prototype.slice()
  方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变.

  ```javascript
  var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
  console.log(animals.slice(2));
  // expected output: Array ["camel", "duck", "elephant"]
  console.log(animals.slice(2, 4));
  // expected output: Array ["camel", "duck"]
  console.log(animals.slice(1, 5));
  // expected output: Array ["bison", "camel", "duck", "elephant"]
  
  ```

  