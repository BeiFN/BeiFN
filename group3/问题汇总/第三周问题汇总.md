#### 三组问题汇总 

小组成员 `李罗` ,`刘宝灵` ,`赵汪洋` ,`朱盟` ,`仇明珠` ,`邓修` , `林海松` ,`蒿倩` ,`常浩` ,`李培峰` ,`李嵩` ,`刘深` ,`浦文卓` , 组长 `郭振宁`

**目前存在问题**

1.bind怎么使用。

```javascript
      // 1. 具名函数bind用法 :

      function foo(){}

      var newFoo = foo.bind();

      // 2. 匿名函数bind用法

      var foo = function(){

      }.bind()

```

2.拖拽里面的柯里化再讲一遍。

* bind封装的柯里化;
* 函数嵌套，函数调用函数。
```javascript
      function myBind( fn , _this ){
            return function(){
                  fn.call(_this)
            }
      }
```

3.https://github.com/embaobao/webstudy/tree/master/2019.6.24._2.js.EventBubble/work-favoriteMuse
为什么移动回放的时候 没有回到原来的位置？

* 第一次记录位置时，元素位置已经发生改变。因为记录的地点在move事件之中。

4.toString为什么能实现数组只有字符串的扁平化.
> 扁平化的骚操作;
> var arr = [1,[2,3,4,5],6];
> arr.toString().split(",");

* 因为数组在调用 toString 的过程中,会忽略数组的结构,把所有的数据以 `,` 为间隔拼接成一个字符串;

5.表单验证事件处理函数为什么要用bind.

* 因为要传递参数 

6.正则表达式什么时候用小括号，什么时候用中括号？

* () 组;       => 需要获取到匹配字符;
* [] 元字符;   => 匹配多个或的时候使用元字符; 

7.浅拷贝和深拷贝的区别.

* 见问题汇总文件夹下0628文件夹；

8. offsetLeft , offsetTop,   事件对象 e.clientX; e.clintY, e.offsetX,e.offsetY, e.screenX,e.pageY;
   
* offsetLeft , offsetTop 获取元素距离可视区域的left值和top值; 是否有存在position属性的父级;
* client 可视区到鼠标点的x轴距离。
* offset 事件源到鼠标点的x轴距离。
* screen 屏幕到鼠标点x轴距离。
* page   文档到鼠标点x轴距离。

9. 事件委托封装时候 在执行循环之前判断点击了父元素，是否会有优化？
   ![img.png](https://upload-images.jianshu.io/upload_images/15342731-18eb18d581aadfa8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 减少循环执行次数性能一定优化，优化逻辑提前去根据需求定制。

10.  Object ,新方法 设置的时候，如果属性多的话，难到要一个个设置吗？ 有没有简写什么的？

```javascript
      Object.defineProperties( {
            "a":{
                  get : function(){},
                  set : function(){}
            },
            "b":{

            }
      } )
```

11.  计时器如果作为独立的异步方法 ，那他是怎么访问到函数中的局部变量的？过程不太清楚

```javascript
      function foo(){
            var a = 10;
            setInterval(function(){
                  console.log(a);
            },20)
      }

      var a = 10;
      setInterval(function(){
            console.log(a);
      },20)
```
12.  Object ,中的this 指向，说过后，还是不太清楚。

* this指向当前属性所属的obj;

13.  todolist事件委托的事件类型为change，这样input里面内容不变时，就不能触发函数了，怎么解决

* 给 input 绑定独立的事件;

```javascript
    todolist高级封装里面的这段代码看不懂
     // 判定是否存在子集;
     // 利用短路运算节省性能 , 如果没有传递 domJson.children 属性，那么我们直接跳出for循环不进行其他判断操作;
     // domJson.children && (childNode = domJson.children[i++]);
      for(var i = 0 , childNode ; domJson.children && (childNode = domJson.children[i++]);){
            // childNode => 子节点;
            // 函数的使用者定义的参数; 
            // 1. 元素节点; => 直接插入父级
            // 2. 结构对象; => 创建成元素 再插入父级;
            childNode.nodeType === 1 ? ele.appendChild(childNode) : ele.appendChild( createElement(childNode) )
      }
      return ele ;
}
```