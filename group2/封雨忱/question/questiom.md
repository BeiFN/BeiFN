* 问题一：var targetTime = targetDate.setSeconds(0);这个方法怎么会是获取毫秒数，不懂。

  ![](https://upload-images.jianshu.io/upload_images/18300474-34a9170ac971381b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> API 记忆 : 
>           Date 方法的 set 系列API, 返回值是什么 ? 
>           1970,1,1 ~ 设定的时间的毫秒数;

* 问题 ：var a = null;
  console.log(a instanceof Object)
  console.log(typeof a)

<<<<<<< HEAD
  为什么typeOf null 是Object  而null instansof  Object 为false？
=======
  为什么typeof null 是 Object  而 null instansof  Object 为false？

> 语言本身的bug ， null 是表示空的独立类型。  
> 1. null 属于object类型;
> 2. null 不可能被 Object 构造函数构建;

* 构造函数和普通函数有啥区别 ; 构造函数是new调用的，普通函数直接调用。
>>>>>>> 09edf89d90f31e8b91bff981ca42a8b33fc07fd3

  ![](https://upload-images.jianshu.io/upload_images/18300474-e809b1b293e29163.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)