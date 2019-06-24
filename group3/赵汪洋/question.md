#### 0611

1.什么空心菱形，当网页翻译成中文时，右边的腰会偏向左边？

浏览器是产品: 翻译成中文的时候 。  
谁影响了布局 ? 结构 , 样式。
结论 :  但浏览器翻译的时候，会给每个字符加上一个font标签，导致原始布局失效。


2.github使用不熟练，印象笔记使用不熟练 不能结合实际用来真正记笔记 做到方便快捷

解决 : 练 !练 !
诀窍 : 
1. 粗记 
    * 知识点
    * 截图 
    * 不会的地方 !!
2. 整理 
    * 分级 , 简单 (绿色) , 新知识 (黑色) , 重难点知识(标红) , 试图解决没有解决的(标红加粗); 


3.zcool网站里图片用超链接是啥意思？是保存网站里的图片直接用吗？怎么是叫做网站里的图片用超链接？

1. 线上网站 img 标签直接复制图片地址，直接应用
2. 背景图 , 找到背景图，然后open in new tab


#### 0614

1.for循环可以遍历对象吗？

不可以;遍历对象只能用for in。


2.用 for in 遍历对象时为什么用中括号取值而不用点取属性值。取属性值时哪种情况用点，哪种情况用中括号。

```javascript
    var obj = { a : 10 , b : 20};
    for (var attr in obj) {
        // attr => "a" , "b";
        obj[attr];
    }
    obj.a;
    obj["a"];

    obj.attr; // 有attr当成变量的能力么? 
    obj["attr"];
```


3.下面代码不太懂。

```javascript
    function foo(o){
        // 1. 先声明提升  var o;
        // 2. o 形参被 实参赋值 ;
        // o ==> 实参;
        console.log(o)
        o.a++;
        var o = {a : 20} // 对象②
        o.a ++;
    }
    var obj = {a : 10}; // obj 存的是地址; 对象①
    foo(obj);
    console.log(obj);            这个不太懂
```

>  声明提升优先于实参给形参赋值 ,如果同时存在声明提升和实参赋值的话,那么实参赋值有效。


4.闭包出现的内存泄漏问题应该如何解决？

控制一定的泄漏数量。 避免内存泄漏程序放在大型循环之中就可以了。


5.问题：如何求不确定位数的数，每个位数的值

// var arr1 = [1,2,3,4,5,6];
      // var arr2 = [
      //                   [1,2,3,4,5],
      //                   [],
      //                   [],
      //                   [],
      //                   []
      //             ];
      // console.log(arr2);
      
      // 第一次创建数组;

      // 1 ~ 5;        1 
      // 6 ~ 10;
      // 11 ~ 15

      // 5(n-1)+1, 5n;
      
      // var flag = false;
      // var arr = [];
      // for(var i = 0 ; i ++ < 5; ){
      //       var tempArr = []; // i ;
      //       if(flag){
      //             for(var k = 5*(i - 1); k ++ < 5 * i ; ){
      //                   // console.log(k)
      //                   tempArr.push(k);
      //             }
      //       }else{
      //             for(var k = 0 ; k ++ < 5; ){
      //                   tempArr.push(Math.round(Math.random() * 24) + 1);
      //             }
      //       }
      //       // 根据 i 去计算想要的结果;
      //       // console.log("--------"+i+"--------")
      //       // for(var k = 5*(i - 1); k ++ < 5 * i ; ){
      //       //       // console.log(k)
      //       //       tempArr.push(k);
      //       // }
      //       arr.push(tempArr);
      // }
      // console.log(arr);

      // function matrixArray(flag,n){
      //       // n 的默认参数是5;
      //       n = n ? n : 5;
      //       var arr = [];
      //       for(var i = 0 ; i ++ < n; ){
      //             var tempArr = []; // i ;
      //             if(flag){
      //                   for(var k = n*(i - 1); k ++ < n * i ; ){
      //                         tempArr.push(k);
      //                   }
      //             }else{
      //                   for(var k = 0 ; k ++ < n; ){
      //                         tempArr.push(Math.round(Math.random() * 24) + 1);
      //                   }
      //             }
      //             arr.push(tempArr);
      //       }
      //       return arr;
      // }

      // var arr = matrixArray(true);
      // // console.log(arr);
      // for(var i = 0 ; i < arr.length ; i ++){
      //       // 0 1 2 3 4  
      //       console.log("第"+i+"行");
      //       for(var k = 0 ; k <= i ; k++){
      //             console.log(arr[i][k]);
      //       }
      // }


6. 判定一个数字有几位; => 无论数字有几位;
      var num = 123456789;
      // count => 第n位;
      for(var count = 0,temp=num; temp >= 1; (temp = temp / 10 ) && count ++){
            // console.log(count);
            // num % 10 / 1
            // num % 100 / 10 
            // num % 1000 / 100 
            var _no = parseInt(num % Math.pow(10,count + 1) / Math.pow(10 , count));
            console.log(_no);
      }

      // 1. 根据数字位数进行循环;
      // 2. 获取到对应的count;
      // 3. 根据公式求得结果;


#### 0616

1.问题 ：var a = null;
  console.log(a instanceof Object)
  console.log(typeof a)
  为什么typeOf null 是Object  而null instansof  Object 为false？

> 语言本身的bug ， null 是表示空的独立类型。  
> 1. null 属于object类型;
> 2. null 不可能被 Object 构造函数构建;


2.构造函数和普通函数有啥区别 ; 

构造函数是new调用的，普通函数直接调用。



#### 0618

1. 页面加载时，进度条是根据什么获得到底加载了多少百分比的？

> 1. ajax加载;  => 数据加载 ;   1. total 总数 : loaded 已经下载的数量;
>   带宽 , 网速;
> 2.  宽度的比值 ;    盒子 100 px / 条 20; 



#### 0619

1.获取输入框value值时，为什么onkeydown和onkeypress获取的总是少一位，而onkeyup能够正常获取。

> 事件的执行顺序问题;


2.现在上完课基本有三方面的事情要做，一是消化练习上课讲的内容，二是做作业，三是整理笔记，如果当天自习时间不够的话，相对来说哪个环节可以往后放一放？

> 以当天学习内容为主;
> 可以把整理笔记任务简化, 20分钟以内完成。 
> 利用周四周日时间把笔记细化整理。


还是不懂3.
```javascript
    function foo(){
                  // arguments.indexOf(1);
                  // var arg = mySlice(arguments);
                  // console.log(arg.indexOf(1));
                  // 1. 记住他;
                  console.log([].slice.call(arguments));
                  // 2. 
                  console.log(slice().call(arguments));  (这两种方法有什么区别吗？)
            }           
            // 反柯里化;
            function slice(){
                  // console.log(Array.prototype.slice)
                  return Array.prototype.slice;
            }                                          (这种方法看不懂)  
```

4. **如果一个div固定了宽高，改变div之内的字体大小，会引发回流吗？**

> 分情况;
> 回流重建DOM树: 
>     1. GUI => 重新渲染元素排列;  DOM树描述的是层级结构关系。
>     2. 虚拟DOM => diff => 重构局部DOM树进行重新渲染;


5. **onmouseover/onmouseout和onmouseenter/onmouseleave这两组有什么区别?**

> mouseover 会重复触发子集事件;
> mouseenter 不会;
> 一组一组用 ! 


6. ```javascript
   (function(){ 
       ...
   }());
   ```
   这种写法是什么意思？

(function(){  alert("我是匿名立即函数的一种写法, 外面的括号让我变成了一种计算")}())


7. **如何给一个元素添加多个事件(处理函数???)？**

    ```javascript
        dom.onclick = hanlderClick;
        dom.onmouseover = handlerMouseOver;
    ```
    > 可以同时触发,如果一个事件多个函数的话可以dom.onclick = function (evt) {hanlderClick(evt);hanlderClick2(evt)};
    > 也可以用addEventListener。

还是不懂8. ```javascript
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