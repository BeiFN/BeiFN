## 1. 烟花程序中，Firework.prototype.fireworkBoom函数里的下段代码里的false不太理解

![QQ截图20190702075026.png](https://upload-images.jianshu.io/upload_images/2845301-f40f51658e80023b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- bind(this,arg1)  => 生成一个新函数 => 包含了 fire_boom 元素的引用;
- 因此可以在运动结束后让元素进行删除。

##### 问题解决：问了老师，问题得以解决



## 2.  原型链的调用顺序没弄明白

- 构造函数  
- 原型对象
- 实例对象

- 构造函数 和 原型对象之间的关系   伴生

  ```javascript
    function Foo(){}
    // 当一个函数出现的时候，JS会默认给他搭配一个原型对象;
    Foo.prototype
  ```

- 构造函数 和 实例对象之间的关系   创造  

  ```javascript 
    var instance  = new Foo();
    //   实例           构造函数;
  ```

- 原型对象和实例      指向

  ```javascript
    Foo.prototype => 用来储存数据,储存方法的地方
  
    var instace = new Foo();
  
    instance => {
        constructor : Foo ,         // 构造函数指针;
        __proto__   : Foo.prototype // 构造函数原型指针;
    }
  ```

- 最终目标 : 一套方法 可以重复使用,不需要多次声明。
- => 所有的方法都放在原型之中 ; 
- 实例就可以共享所有的方法了; 
- 有一个大的类别 : String | Array | Object | Number | Function | .....
- [].forEach() 
- 所有的对象都有原型指针 => 因为所有的对象都来自构造函数;
- 面向对象编程 
- 需要一个对象 , {} × new Foo() √;
- Foo{} => 自定义实例对象 ;

```javascript
{
    constructor : Foo,
    __proto__ : Foo.prototype
}
Foo{}.a 

// 1. 在 实例对象 Foo{} 里面查看是否存在 a 属性 , 如果存在返回结果 ,如果不存在沿着 __proto__ 去进行找寻。
// 2. Foo.prototype 里面查看是否存在 a 的属性, 同上
// 3. Object.prototype 里面查看是否存放  a 的属性。

```

##问题3 智哥,可否再捋一捋烟花的代码?

##### 问题解决：有同学问了老师，自己的问题也得以解决



## 3.烟花爆炸函数里面在for循环里面烟花移动，烟花是一个一个移动，因为for循环速度太快，所以才看上去是一起移动的吗？

- 异步 :

```javascript
  for(var i = 0 ; i < 10 ; i++){
      setInterval(function(){
            console.log(1)
      },200)
  }
```

for => 执行结束 => 异步队列之中的内容 => 200ms之后执行 => 回调函数;

同步循环执行结束之后再去执行move方法 => 所以看起来move方法是同时执行的(烟花同时运动);

## 4. class的默认参数怎么设置与使用呢？ 是在constructor方法小括号中默认了参数后，，再在函数内部进行赋值，是这样操作的吗？

```javascript
constructor({small_wrapper = ".small-img"}={}）{
  this.small_wrapper = static $(small_wrapper); 
}
```

## 5.这两种方式都可以让变量有初始值，哪种更好呢？

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

- 这两种默认值方式没有严格意义的好坏之分，只有使用场景的不同选择不同而已。
- 在函数内部使用变量时，这个时候两种方式没有区别。 区别在于传递实参的时候存在差别。
- 对象传参可以做到想要传递什么参数就传递什么参数，其余的参数可以不传。

## 6.一些概念理解考虑不到位

1. **贪婪规则** , **全局匹配修饰符**

- 贪婪 : 正则的特性之一 ,  只要符合规则 , 那么我们会尽可能多的拿到符合规则的内容。 
  - 触发贪婪的核心;
    *? 非贪婪模式
- 全局匹配 :  针对特殊方法 : 
  1. exec()  ; 如果存在修饰符 g : 在匹配一次结束后，下一次匹配在上一次结束的位置继续匹配。
  2. match (); 如果存在修饰符 g : 会多次匹配, 在得到第一次匹配之后再继续进行连续匹配并返回所有匹配结果。
  3. replace (); 如果存在修饰符 g : 会多次匹配 , 每次匹配到的结果都会进行替换操作;

##### 问题解决：参考同学们的问题，进行学习



##### 