#### 第一周问题总结
**0611**
无
**0612**
无
**0613**
无
**0615**
1. 闭包出现的内存泄漏问题应该如何解决？
    控制一定的泄漏数量。
    避免内存泄漏程序放在大型循环之中。
**0616**
无


#### 第二周问题总结
**0617**
1. 问题：简要说一下接下来几周的教学纲，应该预习什么？
    脚踏实地好好学习。
**0618**
1. 页面加载时，进度条是根据什么获得到底加载了多少百分比的？
    实际中使用ajax技术加载数据，其中有两个参数，一个数据总数total，一个已经下载的文件数load，相除的比值得到数据加载的百分比
    现在是使用进度条内子元素的宽度比进度条总宽来实现进度条。
**0619**
1. 如果一个div固定了宽高，改变div之内的字体大小，会引发回流吗？
    分情况而定，回流会重建DOM树
        1. GUI：重新渲染元素排列，DOM树描述的是层级结构关系。
        2. 虚拟DOM：diff=>重构局部DOM树进行重新渲染

2. onmouseover/onmouseout和onmouseenter/onmouseleave这两组有什么区别?
    如：mouseover 会重复触发子集事件
        mouseenter 不会；

3. ```javascript
   (function(){ 
       ...
   }());

   (function(){  alert("我是匿名立即函数的一种写法, 外面的括号让我变成了一种计算")}())
   ```
   这种写法是什么意思？
    这是匿名函数的一种自运行写法，()也是一种运算；

4. 如何给一个元素添加多个事件(处理函数???)？
    直接写即可
    ```javascript
        dom.onclick = hanlderClick;
        dom.onmouseover = handlerMouseOver;
    ```
    > addEventListener

5. ```javascript
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

**0621**
无



  