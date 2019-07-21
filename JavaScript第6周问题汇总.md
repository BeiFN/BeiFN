**问题1  使用代理跨域和CORS跨域都必须在服务器上运行吗？**

* 代理跨域 => 利用服务器帮我发请求。
* CORS跨域 => 请求服务器，服务器给相应，http头部加入特殊允许标识。

> 服务器其实给我们的提供的是一个 http 服务。

* jsonp 无论你在本地环境还是服务器环境 , src 可以无条件发起http请求。 
tip : 你写的所有的前端程序很少很少很少直接在本地跑。


**问题2  解决瀑布流bug时，sort()图片排版方法是在屏幕宽度改变方法执行之前的，是必须在changeContainerWidth方法中重新调用sort方法吗？可不可以省略sort方法调用？**
* 不可以;
```javascript
//宽度改变
changeContainerWidth(){
      let cWidth = document.documentElement.clientWidth;
      this.count = parseInt(cWidth / 250);//每行显示图片数
      console.log(this.count);
      //     图片父节点宽度改变
      this.container.style.width = this.count * 250 + "px";  
      // //重新排序
       this.sort();
}
```


**问题3 请智哥捋一遍分页的封装的js**

* 获取数据
   * 服务器代理跨域获取数据(反向代理) => nginx;    
   * 数据存放在实例之中供后续使用。
* 渲染页面
   * 渲染部分的裁切;
      - 页码  1
      - 当前显示多少; 5;
      计算 => 应有的下标;
      0 ~ 4
      5 ~ 9
      10~ 14
* 事件委托;
    * 点击获取下标;
    * 利用下标设置页码重新渲染;


**问题4 智哥，phpstudy服务器启动不了，卸载了重装也不行**。

* 重启下电脑试试;
* 断点五分钟试试;
* 重装个系统试试;

  1.端口被占用; 
  2. 配置写错了; 
  3. 记得查看错误日期 ; nginx/log/error.txt


**问题5  jQuery选择器设置css属性不受权重影响，只根据就近原则来设置样式吗？**
* 这是JS设置样式啊 => 行内样式 => 覆盖形设置没有权重关系。只和执行顺序有关。


**问题6 详细讲一下函数节流和函数去抖。**

* 函数节流  执行频率降低; 

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

* 函数去抖 

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

##问题7 jQuery如何加载字符串模板数据，下面html和text方法都不行，是用错方法了吗？
```javascript
    // 渲染按钮;
    let html = "";
    for(var i = 0 ; i < total ; i ++){
          if(i + 1 === this.pageNo) {
                html += "<span class=active>${i+1}</span>";
          }else{
                html += "<span>${i+1}</span>";
          }
    }
    this.page_wrapper.html(html)//??????
    //一定一定多看文档 , 我不是文档。
```


**问题8  ## 千锋教师团队最靓的智仔，在jQuery库中，我不是很理解这里传入的window。**
```javascript
      (function(window) {
            window.jQuery
      //...

      })(window);
```
* 用于节省性能 , 因为jQuery插件之中大量存在jQuery变量的引用，所以传入window可以让解释器少找寻一次作用域。


**问题9  能不能给咱整整这句话的意思**
```javascript
      jQuery.extend = jQuery.fn.extend = function(){
      //.....
      }
      // 
```

* 给两个属性进行赋值赋值为同一个函数。
* extend 方法 期中有一个功能 直接向构造函数或原型合并对象。
* 就是在这个函数调用的时候想要有两种this;
```
      $.xxx    this => 构造函数;
      $().xxx; this => 实例对象;
```


**问题10 怀智小哥哥，把jQueryajax的type改为post后报如下错误该怎么解决呢？**
![image.png](https://upload-images.jianshu.io/upload_images/18464133-0ec266ea2769c163.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```javascript
    $.ajax({
            url: "practice06.json",
            type: "POST"
        })
```
* 用合适的方法去做合适的事情。 
* 服务器配置问题


**问题11  购物车最后的事件监听没懂，没太理解添加监听方法中传入type，"changeNum"的作用是什么？**

*  因为在更新 localStorage 数据的时候 , 要同时跟新视图。
   
    更新购物车视图功能在 index.js  模块之中
    更新数据的功能在     carts.js  模块之中 
    
    耦合无法处理;   跨模块;  
    模块的实例对象上添加一个属性;
    设计模式 : 观察者模式 ;

    carts 模块添加了订阅和发布功能;
    
    订阅者 : 购物车视图更新功能;
    发布者 : carts内部的事件  ;


**问题12 智哥，这个地方这个type是干嘛的呀**
![image.png](https://upload-images.jianshu.io/upload_images/18300474-f161f2a7fe2b1f03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 为啥非得加 type ?  
  
  以后有没有可能再多加一个功能，更新列表。
  对以后可能增加的功能进行合理的划分做准备。
  存数据 , 需要取出数据的时候。


**问题13  智哥，对模块化的概念不是很清楚，能再理一遍嘛？**

* 为什么  :  因为浏览器随缘加载JS导致JS执行顺序不可控,因为咱们编写的JS可能依赖非常多的插件。 只能用一个可靠的加载方式进行加载。 于是require.js 出现了;

* 是什么  :  一个JS加载器 。 但是因为JS的特征 , 引入script之后就会立即执行JS代码 。 于是requirejs就给使用者定义了一套规范 。 AMD 。  require | define

* 怎么用  :  利用 deinfe 定义模块, 利用 require 加载模块。 


* 注意事项 : 依赖 ， 耦合;

            依赖处理原则 : 使用之前进行加载, 依赖前置。
            耦合关系     : 以前都是以类以方法进行划分的随着程序的复杂度变得更大，我们需要以模块的形式对程序进行耦合关系处理。 
            让我们不仅可以进行优秀的耦合关系处理，更可以在开发过程之中高效高速定位需要更新的js文件。
            

**问题14 智哥，为什么用livesever运行你的购物车代码，ajax请求返回的数据是对象，用自己的服务器返回的是字符串。**
![image.png](https://upload-images.jianshu.io/upload_images/18464133-c087f1a73c1c51c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/18464133-31b9bf88b2ea7168.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* liveserver版本问题, 需要在 $.ajax 里面加上 dataType 。


**问题15 再讲讲requireJS**

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

* 根据jQuery的代码我们了解到只要jQuery被加载了 那么就会在全局创建一个 jQuery 构造函数的引用 即 $;
* jQuery 也遵从AMD规范 在程序的末尾 返回了 $ , jQuery ;


**问题16 需要讲一下ES6模块化拆分案例，ES6模块化需要在标签<script type="module"></script>里面引入，所有耦合处理得放到HTML文件里面吗？**

* 购物车
* 所有耦合处理得放到HTML文件里面吗 => 不一定 , index 业务逻辑模块; 


**问题17 购物车的cart模块，在减少购物车中商品数量时，使用jQuery的each会报错，循环会进行到已被删除的项的下标那，导致取到undefined；而使用forEach不会报错,请问智哥这是为什么呢？**
![image.png](https://upload-images.jianshu.io/upload_images/18464133-e92e19ebc9b2ab56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/18464133-b60542cb01b1413c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* forEach 的原理大概是  
```javascript
      for(var i = 0 ,item ;  item = arr[i++] ; ){

      }
```
如果取出来的值是 undefined 压根不执行循环;

* $.each 
```javascript
      var len = arr.length; 
      for(var i = 0 ; i < len ; i++){

      }
```
在$.each 之中增删数组都可能会导致循环内部出现问题。
-解决方案 : 报错是因为item是undefined 所以判定 if(item === undefined) return ;


**问题18 智哥 ， 帮忙分析一下上面代码**
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



* super()        => 父类.call(this) 对象的一个继承;
* super.prop     => 父类上的属性;  父级原型上的属性 prop ;
  - super.prop = xxx ;  此时super指向 this; 子类;
  - super.prop       ;  此时super指向 父类.prototype.属性;
1. 构造函数 A ; 
   this.x  ; 加工实例对象,添加x属性;
   A.prototype 里面啥都没有空空如也;
   
2. 构造函数 B ; 
   B extends A;
   super(); // B的实例对象放入A的constructor之中进行加工 ; B{x : 1}  


