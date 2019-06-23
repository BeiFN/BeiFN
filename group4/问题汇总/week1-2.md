#### 四组问题汇总 

小组成员 `吕赟飞`，`肖光瑞` ,`王鹏` , `谢鑫鹏` ,`祖莹` ,`郭森` ,组长 `谢宇航`

**目前存在问题**

1. **明天中午吃什么？**

   > ​	食堂, 喝汤。 

2. **闭包出现的内存泄漏问题应该如何解决？**

   > 控制一定的泄漏数量。 避免内存泄漏程序放在大型循环之中就可以了。

3. **页面加载时，进度条是根据什么获得到底加载了多少百分比的？**

   > 1. ajax加载;  => 数据加载 ;   1. total 总数 : loaded 已经下载的数量;
   >    带宽 , 网速;

   > 2. 宽度的比值 ;    盒子 100 px / 条 20; 

4. **如果一个div固定了宽高，改变div之内的字体大小，会引发回流吗？**

   > 分情况;
   > 回流重建DOM树: 
   >
   >     1. GUI => 重新渲染元素排列;  DOM树描述的是层级结构关系。
   >        2. 虚拟DOM => diff => 重构局部DOM树进行重新渲染;

5. **onmouseover/onmouseout和onmouseenter/onmouseleave这两组有什么区别?**

   > mouseover 会重复触发子集事件;
   > mouseenter 不会;
   > 一组一组用 ! 

6. ```javascript
   (function(){ 
       ...
   }());
   
   (function(){  alert("我是匿名立即函数的一种写法, 外面的括号让我变成了一种计算")}())
   这种写法是什么意思？
   ```

7. **如何给一个元素添加多个事件(处理函数???)？**

   > addEventListener

8. ```javascript
   var a = 10; // 全局变量 a;  window.a = 10;
   var obj = {
       a: 20,  // obj.a == 20;
       b: function () {
           console.log(this) // obj;
           setTimeout(function () {
               console.log(this.a); // window   ==> window.a
           }, 0)
       },
       c: function () {
           console.log(this.a);
       }
   }
   obj.b(); //10;
   obj.c(); //20;
   为什么？
   ```

   > 就近原则;   =>  this指向只看最近的一个函数;

   

