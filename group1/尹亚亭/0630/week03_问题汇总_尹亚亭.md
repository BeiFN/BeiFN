## 1. 提问在图中 代码如下

1. ![image.png](https://upload-images.jianshu.io/upload_images/12728563-ebac1f33e890622d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   > 递归时我们去进行区分，是外部调用 ; 还是内部递归用。 根据两种情况进行区分操作。

   ```
    	<script>
               var arr = [[1,2,3,4,5],[3,4,5,6,7],5,6];
               function flat(arr){
                     if(arguments.length === 1){	//
                           flat.res = [];
                     }
                     
                     for(var i = 0 ; i<arr.length;i++){
                           if( !(arr[i] instanceof Array) ){
                                 flat.res.push(arr[i]);
                           }else{
                                 flat(arr[i],false);	//加个参数
                           }
                     }
                     return flat.res;
               }	
               var arr2 = [1,2,3,4]
               console.log(flat(arr));
               console.log(flat(arr2));
         
        </script>
   ```

   

   ##### 问题解决：问了老师，问题得以解决，数组的扁平化不再有数据缓存



## 2.  在高级查找之中，如何清除上次查找的高亮标记？


    <script>
           var content = document.getElementById("content");
           var search = document.getElementById("search");
           
           search.addEventListener("keydown" , function(evt){
               var e = evt || window.event;
               var keyCode = e.keyCode || e.which;     
               if(keyCode === 13){
                    heighLight();
                }	
            })
            
            function heighLight(){
                  var value = search.value ; 
                  var contentText = content.innerHTML;
                  var nowReg = new RegExp("("+value+")","g");
                  // 在替换之前先把文本中的span标签去掉
                  var regSpan = /<\/?span>/g
                  content.innerHTML = contentText.replace(regSpan  , "")
                  content.innerHTML = content.innerHTML.replace(nowReg  , "<span> $1 </span>")
            }
      </script>
##### 问题解决：有同学问了老师，自己的问题也得以解决，再次查找时不会再有上次的高亮标记



## 3.一些概念理解考虑不到位

**(1) 跳转页面时，什么时候用open(),什么时候用location.href = ""；?**

	> location.href   原页面改变
	>
	> open   打开新页面;。

**(2)  bind指向对象传false该怎么理解？是说它不固定指向吗？**

	> 传入 false 就是不改变 this 指向。

**(3) 正则表达式中的全局修饰符g和贪婪匹配的关系，有全局修饰符，一定是贪婪吗？  **

> 贪婪      是和量词有关的。  +  *  ?  
>
> 尽可能多的匹配符合规则的字符。   一次尽可能匹配更多;
> 修饰符 g  驱动方法多次匹配;      在整条字符串上多次进行匹配;

**(4)为什么类型判断的时候不能用Number判断呢?**

>instance => 实例;
>of        
>实例 : new Number(); => 构造函数构造出来的对象。
>基本类型和构造函数构造出来的类型。
>基本类型 : 是一个纯数据;  不存在太多高级引用关系。	----typeof
>构造出来的基本类型 : 因为是一个对象，所以具备所有js对象的特征，比较复杂。 ---instanceof

##### 问题解决：参考同学们的问题，进行学习



## 4.获得一些新的对于知识的理解

**(1) bind怎么使用?**

      // 1. 具名函数bind用法 :
    
      function foo(){}
    
      var newFoo = foo.bind();
    
      // 2. 匿名函数bind用法
    
      var foo = function(){
    
      }.bind()
**(2) bind封装的柯里化?**

> 函数嵌套，函数调用函数。

     function myBind( fn , _this ){
            return function(){
                  fn.call(_this)
            }
      }
**(3) offsetLeft 、client、offset、screen、page 的总结**

- offsetLeft , offsetTop 获取元素距离可视区域的left值和top值; 是否有存在position属性的父级;
- client 可视区到鼠标点的x轴距离。
- offset 事件源到鼠标点的x轴距离。
- screen 屏幕到鼠标点x轴距离。
- page   文档到鼠标点x轴距离。

**(4) toString能实现数组只有字符串的扁平化.**

> var arr = [1,[2,3,4,5],6];
> arr.toString().split(",");

* 因为数组在调用 toString 的过程中,会忽略数组的结构,把所有的数据以 `,` 为间隔拼接成一个字符串;

##### 问题解决：

**(5)柯里化和闭包有什么区别和联系？**

- 柯里化为什么存在 ？ 创建时改变函数特征(参数,this指向);
- 闭包            ？ 1. 延长变量声明周期 2. 保密
- 区别 : 在于最终目的和编程导向。
- 联系 : 柯里化使用闭包机制。

##### 问题解决：参考各组同学们的问题，进行学习总结