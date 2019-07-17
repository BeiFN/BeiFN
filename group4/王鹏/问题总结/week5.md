#### 四组问题汇总 

小组成员 `吕赟飞`，`肖光瑞` ,`王鹏` , `谢鑫鹏` ,`祖莹` ,`郭森` ,`何小娟`，组长 `谢宇航`

**目前存在问题**

1. ```java
   绑定在构造函数上的方法和绑定在原型上的方法使用起来有什么不同,什么情况下使用static
   class Foo1 {
       constructor() {}
       show() {
           console.log("show1");
       }
       static show() {
           console.log("show2");
       }
   }
   <<<<<<< HEAD
let foo1=new Foo1();
   foo1.show();
   Foo1.show();
   这两种情况有什么不同？
   =======
   let foo1=new Foo1();  
   // 这是foo1 : 是私有的，只有在编程或者实例的时候我们才可以访问。
   Foo1{
       constructor : class Foo1,
       __proto__   : Object (Foo1的原型)
   }
   foo1.show(); // 原型上的show; 
   // 这是Foo1.prototype 
   Object{
       show : fn , 
       __proto__ : Object
   }
   
   // 我们把类Foo1本身理解为一个引用类型; 
   // Foo1.show = function(){};
   // Foo1 是一个全局变量,是任何人都可以访问的,所以我们要把公开的，需要给别人使用的东西去放在 这个公开的地方。 static ;
   Foo1.show();
   
   这两种情况有什么不同？
   
   // 取值方式不同;
   // 使用上对于数据的储存有所不同。
   ```
   

2. 智哥，有没有可以格式化php代码的插件，强迫症不优雅的代码有点难受。。

- phpfmt 

3. 如果想要创建一个表名是纯数字的表，用sql语句如何实现。

- CREATE TABLE '1'( A , B , C ) VALUES ( 2, 3, 4)

4. 智哥，关于mysql语句中行的概念不是很清楚，以及SELECT语句中 * 和 where的用法

- 一条关联数据;    * 所有字段 ;  where 条件 name=女朋友|男朋友 ; 

5. php 中 . 的语法, $str .="str" ,是表示 加号 吗

- 字符串 JS 之中的拼接 +  php 之中的字符串你拼接是 .
- "高级字符串" , '常规字符串'
- array(1,2,3,4,5,6); => JS之中的数组;
- array('a' => 'b') ; => JS之中的对象;

6. 网站上哪些是可以通过JSONP获取的数据？

- 观察接口返回的数据类型;

```javascript
      foo({})
```

- 携带发送数据的时候 存在  cb || callback 这样字段的接口也大概率是jsonp;