#### 四组问题汇总 

小组成员 `吕赟飞`，`肖光瑞` ,`王鹏` , `谢鑫鹏` ,`祖莹` ,`郭森` ,`何小娟`，组长 `谢宇航`

**目前存在问题**

1. 详细讲一下函数节流和函数去抖。

   - 函数节流  执行频率降低; 

   - for 循环执行时长300ms  3000000 次程序执行 ;
   - 如果函数执行则要执行3000000次运算。 有多少是必要运算 ? 
   - 60 fps => 16.66ms 刷新一次;
   - 100ms 执行一次;

   ```javascript
   
         // 高频执行函数 => foo
         function foo(){
               // 刷新页面;
         }
         // 定时器执行频率不变;
         setInterval( foo , 1 );
         // 做一个函数的预处理;
   
         function foo(){
   
         }
   
         // 函数节流 ;
   
         // 基本结构不好用;
         // var timer = null;
         // function throttle(cb){
         //       // 只要没达到标准,就不执行foo函数;
         //       setTimeout( cb , 16 )
         // }
   
         function throttle( foo , delay){ // fn2 
               var timer = null;
               return function(){ // 
                     if(timer !== null) return false;
                     timer = setTimeout( ()=>{
                           foo()
                           timer = null;
                     } , delay )
               }
         }
         setInterval( throttle(foo , 16) )
   ```

   - 函数去抖 

   无论你执行多少次,我都在最后一次执行延时n ms之后执行。

```javascript
      // 函数高频次执行 持续5s ，实际我需要的渲染次数只有一次;
      function foo(){}
      let timer = setInterval( foo , 1 );
      setTimeout(()=> {
            clearInterval(timer)
      } , 5000)

      // 如果在一定时间之内还有下一次执行, 那么取消本次执行;
      function debounce( cb , delay ){
            let timer = null;
            return function(){
                  clearInterval(timer);
                  timer = setInterval(()=> {
                        cb();
                  },delay)
            }
      }

      //更新;
      function foo(){}
      let timer = setInterval( debounce( foo , 200 ) , 1 );
      setTimeout(()=> {
            clearInterval(timer)
      } , 5000)
```

2. 

**问题**：再讲讲requireJS

> 疑问：我看到有几个js文件里的define数组虽然写上了”jquery“，但是并没有在后面的function上对应的位置写上参数, 是忘记写了还是这种存在链式引用关系不需要重新在调用jquery.js等之前已经调用过得js文件

```javascript
// carts.js

window.$ = window.jQuery = function(){

}
return window.jQuery ;

define(['jquery',], function($) {
    'use strict';
    .....
}
       
// render.js
define(['jquery',"./loaddata"], function() {
      'use strict';
    .....
}
```

- 根据jQuery的代码我们了解到只要jQuery被加载了 那么就会在全局创建一个 jQuery 构造函数的引用 即 $;
- jQuery 也遵从AMD规范 在程序的末尾 返回了 $ , jQuery ;

3. 

```javascript
class A {
  constructor() {
    // this.x = 1;
  }

  get x(){
    console.log("x get");
  }
}


class B extends A {
  constructor() {

  }
}

let b = new B();
```

<!-- 智哥 ， 帮忙分析一下上面代码 -->

- super()        => 父类.call(this) 对象的一个继承;
- super.prop     => 父类上的属性;  父级原型上的属性 prop ;
  - super.prop = xxx ;  此时super指向 this; 子类;
  - super.prop       ;  此时super指向 父类.prototype.属性;

1. 构造函数 A ; 
   this.x  ; 加工实例对象,添加x属性;
   A.prototype 里面啥都没有空空如也;
2. 构造函数 B ; 
   B extends A;
   super(); // B的实例对象放入A的constructor之中进行加工 ; B{x : 1}  