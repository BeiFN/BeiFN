#### 三组问题汇总 

小组成员 `李罗` ,`刘宝灵` ,`赵汪洋` ,`朱盟` ,`仇明珠` ,`邓修` , `林海松` ,`蒿倩` ,`常浩` ,`李培峰` ,`李嵩` ,`刘深` ,`浦文卓` , 组长 `郭振宁`

**已解决问题**

1.智哥，能再捋一下构造函数，原型和实例之间的关系吗？
* 捋过了,见一组;

2.烟花爆炸函数里面在for循环里面烟花移动，烟花是一个一个移动，因为for循环速度太快，所以才看上去是一起移动的吗？

* 异步 :
```javascript
  for(var i = 0 ; i < 10 ; i++){
      setInterval(function(){
            console.log(1)
      },200)
  }
```
for => 执行结束 => 异步队列之中的内容 => 200ms之后执行 => 回调函数;

同步循环执行结束之后再去执行move方法 => 所以看起来move方法是同时执行的(烟花同时运动);

3.智哥，可以再讲一遍烟花吗？

* 提出具体的点;

4.这里两个函数分别改变了this指向，为什么最终指向的是实例？
![image.png](https://upload-images.jianshu.io/upload_images/18442274-cfdbcb792366c2c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/18442274-763af1f8f15ecb84.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 因为在使用bind方法时，这时候会创建一个新函数 ， 并且将传入函数的this固定。因所能操作的函数，都不再是原函数了，而是包裹着原函数的调用的匿名函数。
```javascript
      function bind(callback,_this){
            return function(){      
                  callback.call(_this);
            }  
      }
```

5.这两种方式都可以让变量有初始值，哪种更好呢？
![image.png](https://upload-images.jianshu.io/upload_images/18464133-2583b5911d7b91ff.jpg?imageMogr2/auto-orient/)

```javascript

      function foo( hello = "hello" ){
            console.log(hello)
      }

      function foo( hello = "hello" , { a = 1 , b = 2 , c = 3 } = {}){
            console.log(hello , a , b ,c, )
      }
      foo("world");

```

* 这两种默认值方式没有严格意义的好坏之分，只有使用场景的不同选择不同而已。
* 在函数内部使用变量时，这个时候两种方式没有区别。 区别在于传递实参的时候存在差别。
* 对象传参可以做到想要传递什么参数就传递什么参数，其余的参数可以不传。

6.轮播图思路
* banner

- **构造函数**统筹全局,作为整个程序的开始; 
      1. 接受参数;
      2. 初始各种dom对象，变量...,调用核心方法;.
-  初始化功能(init) 
      * 处理耦合关系。 调用各个方法;
      1. 调用;
      2. 事件;
-  初始布局
      1. layoutAnimate 
       因为布局本身分成两种，一种是position所有slide集中在一起的布局。另外一种是大长条布局。
            - this.options.effect 核心逻辑;
            1. slide => 大长条布局;
            2. fade  => 集中布局
            tip : switch 的使用是因为当前程序可以具备相当优秀的扩展性。
      2. layoutPagnination 
       创建页面分页器小按钮的功能。
            - 分页器是否存在 , 存在继续创建，不存在就停止;
            - 根据需求拼接分页器字符串,放入对应的位置;
-  控制下标 
      * this.nowIndex 
      * this.state 
            1. normal      => 正常情况;
            2. changeLast  => 从第一张切换到最后一张;
            3. changeFirst => 从最后一张切换到第一张;
            4. changePage  => 在最后一张假的第一张图片调用toIndex方法实现特殊bug解决
      1. prevIndex
            本身是一个循环变量的逻辑,因为slide动画需求,所以在prevIndex里面创建一个state属性用来记录特殊值;
            * this.state => changeLast
      2. nextIndex
            同上
      3. toIndex
            同上;
-  控制动画
      * fade      
            清空其余效果，给this.nowIndex元素增加效果;
      * slide
            this.nowIndex 
            1. changePage : 解决bug;
            2. normal     : 根据this.nowIndex 改变left值;
            3. changeFirst: 先挪过去,再动画;
            4. changeLast : 同上;
- 控制分页器按钮显示
      * handlerPaginationClick
            点击按钮的下标记录;
      * changePagination
            根据 this.nowIndex 结合 this.options.effect 判定应该如何显示;

