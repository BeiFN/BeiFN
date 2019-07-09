**问题1:**
给重力回弹小球添如下居中代码，
left: 50%;
margin-left: -20px; 
再使用 ball.style.left = ball.offsetLeft + speedX + "px";  
为什么设置偏移量时，会有20px速度的偏差，相当speedX加了个往左20px的速度。
margin-left属性和 offsetLeft属性有冲突吗？


**问题2：下面代码，按键控制盒子移动，为什么键盘持续按下的时候会先走30px，然后停顿0.5s后连贯移动，怎么回事？**
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        #p1 {
            width: 100px;
            height: 300px;
            position: absolute;
            top:450px;
            left: 0;
            background-image: url(./0.gif);
            transition: left .1s;
            background-color: yellowgreen;
        }
    </style>
</head>

<body>
    <div id="p1"></div>
    <div id="p2"></div>
    <script>
        var p1 = document.getElementById("p1");
        var p2 = document.getElementById("p2");
        var timer = null;
        var speed = 10;
        var speed2 = 30;
        var jumpFlag = 0;
        document.addEventListener("keydown", ctrl())
        function ctrl() {
            return function (evt) {
                var e = evt || window.event;
                var keyCode = e.keyCode;
                switch (keyCode) {
                    case 65: moveLeft(0, this); break;
                    case 68: moveLeft(1, this); break;
                    case 87: moveTop(200, this); break;
                    case 83: ; break;
                }
            }
        }
        function moveTop(target, dom) {
            clearInterval(dom.timer)
            if (!jumpFlag)
                jumpFlag = 1;
            dom.timer = setInterval(function () {
                if (p1.offsetTop - target <= speed) {
                    speed = -speed;
                } else {
                    p1.style.top = p1.offsetTop - speed + "px";
                    if (p1.offsetTop >= 450) {
                        jumpFlag = 0;
                        speed = - speed ;
                        clearInterval(dom.timer);
                    }
                }
            }, 12)
        }
        function moveLeft(bool,dom){
            if(bool)
            p1.style.left = p1.offsetLeft + speed2 + "px";
            else
            p1.style.left = p1.offsetLeft - speed2 + "px";
        }
    </script>
</body>

</html>

```


**问题4 小球速度损耗的问题,每次小球下降到底部时,速度会少加一次g,因此理论上速度损耗为g的值,但是当把g设置成带小数的值的时候,速度损耗有时看起来没有规律,是浏览器识别的最小单位为1的缘故吗?请智哥分析一波**
![重力小球.png](https://upload-images.jianshu.io/upload_images/18487325-a378dede0f4f21f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

//    1. 首先offset只获取元素的实际距离 (width | height | top | left) , 计算的时候有小数，会被忽略; 因为浏览器只识别1px;
//    2. 计算的时候尽可能对计算结果,元素赋值进行取证; 


**问题 5:那个重力回弹运动，为什么他的速度和高度每一次都会减小？**
>解决：因为他每一次的速度在快到的时候都会赋值为指定高度，会损失一部分的高度，g也会每次都减少，高度也在减少。

**问题 6轮播图下方数字按钮切换不会做。**
```javascript
//去到
Banner.prototype.toIndex = function (index) {
    //获取元素引用在数组中的索引也就是slides的下标
    this.nowIndex = index;
    console.log(this.nowIndex)
    // this.wrapper.style.left = -index*this.main.offsetWidth+"px"
    if (this.nowIndex == this.slides.length - 1) {
        this.state = "fenyeBug"
    }
}

//分页随着事件不断变化
Banner.prototype.fenyeChange = function () {
    //首先让所有的分页元素的active样式都初始化
    for (var i = 0, fenyeEle; fenyeEle = this.fenye.children[i++];) {
        removeClassName(fenyeEle, "pagination-bullet-active");
    }
    var index = this.nowIndex;
    if (this.options.effect == "slide") {
        index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex;
        console.log(index, this.state)
        //bug问题 因为从后往前和从前往后  都会有这个this.slides.length-1
        if (index == 0 && this.state == "firstJian") {
            index = this.slides.length - 2
        }
        if (index == 0 && this.state == "lastJia") {
            index = 1
        }
    }
    this.fenye.children[index].className += " pagination-bullet-active"
}
```

**问题 7**
 ```java
   function handlerMouseMove(evt){
       var e = evt || window.event;
       if(!moving){
           ball.style.left = e.offsetX - 20 + "px";
           ball.style.top = e.offsetY - 20 + "px";
       }
   }
   .mask{width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 999;}
   //解决小球跟随鼠标移动鬼畜的问题，智哥你说除了添加遮罩层之外，还有另外一种方法，然后就没有然后了...
   //请问另外一种解决方法是什么？
   ```
```javascript 
    //解决
        var box = document.getElementById('box');
        var small = document.getElementById("small-box");
        var boxOffsetLeft = box.offsetLeft;
        var boxOffsetTop = box.offsetTop;

        box.onmousemove = function(evt){
            var e = evt || window.event;
            var small_x = e.clientX - boxOffsetLeft- 50;
            var small_y = e.clientY - boxOffsetTop - 50;
            small_x = small_x < 0 ? 0 : small_x;
            small.style.left = small_x  + "px";
            small.style.top  = small_y  + "px";
        }
```

**问题 8:在烟花中调用move方法时候，把判断条件改成为{ }空对象，无法执行**
![image.png](https://upload-images.jianshu.io/upload_images/18300474-41eb5ac96adaefa0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 判定对象为空的逻辑;  
* 1. for in 判定;
* 2. Object.keys() 判定;
* {} == "{}" 左边的值会toString()  => "[Object object]"


**问题 9 烟花程序中，Firework.prototype.fireworkBoom函数里的下段代码里的false不太理解，请智哥再讲解一下缘由。**
![QQ截图20190702075026.png](https://upload-images.jianshu.io/upload_images/2845301-f40f51658e80023b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* bind(this,arg1)  => 生成一个新函数 => 包含了 fire_boom 元素的引用;
* 因此可以在运动结束后让元素进行删除。

**问题 10 原型链的调用顺序没弄明白，请指教。**

* 构造函数  
* 原型对象
* 实例对象

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

* 最终目标 : 一套方法 可以重复使用,不需要多次声明。

* => 所有的方法都放在原型之中 ; 
*    实例就可以共享所有的方法了; 
*    有一个大的类别 : String | Array | Object | Number | Function | .....
*    [].forEach() 
*    所有的对象都有原型指针 => 因为所有的对象都来自构造函数;

* 面向对象编程 
* 需要一个对象 , {} × new Foo() √;
* Foo{} => 自定义实例对象 ;
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

**问题 11 智哥,可否再捋一捋烟花的代码?**
* ok


**问题 12 new*创造*新对象,赋值给table1 , table1为实例 , 怎么理解构造函数中的this指向实例 table1 , table1不是存的是地址!;**

```javascript
    // 创建实例table1
    // 可以理解为 table1调用new Table();方法吗？
    var table1 = new Table("btn-list", "content-list");

    // 1.  构造函数创建实例;

    // 如何得到实例  : 
    // ① 构造函数的返回值;
    // ② 构造函数中的this;
```


**问题 13 实例调用原型的init属性方法的流程是什么样的？原型是构造函数的原型，还是实例的原型？**
* 实例 | this => 访问init => 实例中没有 => 沿着原型链向上找寻 => 找到原型上的init => 得到访问结果;

**问题 14 如下注释的理解正确吗？ 请大家帮忙找出理解错误的地方。**
```javascript
// 构造函数创建
        function Table(btnSe, contSe){
            // this是指向实例对象，使用Table构造的对象，即 Table{} ,
            // 给实例对象添加btns属性，存放所有目标元素
            this.btns = document.getElementById(btnSe).children;
            this.conts = document.getElementById(contSe).children;
        }
        // 原型添加方法属性, 初始化init, 实例调用初始化方法
        // table1.init(); table1调用了init方法，所以init方法里面this指向实例table1 √;
        Table.prototype.init = function(){
            // 从实例对象中获取目标元素添加绑定事件，并让this指向实例对象
            for(var i=0,btn; btn= this.btns[i];i++){

                // btn.addEventListener("click",this.handlerContent);
                // 面向对象编程中所有的函数内部this指向都指向实例对象 √;

                btn.addEventListener("click",this.handlerContent.bind(this,i));
                // 实例对象中的目标元素，调用原型的属性方法，并使用bind方法将指向btn的指针this指向实例

                btn.addEventListener("click",this.changeColor.bind(this,i));
            }
        }
        // 给原型对象添加事件处理方法属性，在绑定事件时固定了this指向，所以下方法中this指向实例table1
        Table.prototype.handlerContent = function(index,evt){
            var e = evt ||window.event;
            var target = e.target ||e.srcElement;
            for(var i=0,cont; cont = this.conts[i++];){
                cont.className = "";
            }
            this.conts[index].className = "active";

        }

        Table.prototype.changeColor = function(index,evt){
            var btn = this.btns[index];
            btn.style.backgroundColor = "#"+Math.round(parseInt("ffffff",16)*Math.random()).toString(16).padStart(6,"0");
        }

        //构 建函数方法使用
        // 创建实例table1

        //可以理解为 table1 调用new Table();方法吗？ × 
        // 你调用的 Table 不是table1;
        var table1 = new Table("btn-list", "content-list");
        table1.init();
```


**问题 15 烟花爆炸函数里面在for循环里面烟花移动，烟花是一个一个移动，因为for循环速度太快，所以才看上去是一起移动的吗？**
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


**问题 16 轮播图从5到1后，点击页码往左滚动bug，如何修复？**
```javascript
    /**
 * 实现的目标 :
 *    1. 点击按钮翻页;
 *    2. 点击分页器翻页;
 *    3. 多种动画效果;
 *    4. 自动播放;
 *  */

 // 程序之中必须要有 ,表示当前显示图片的坐标;  nowIndex;
 // 下一页 上一页 到达某页;

 // 1. 得有元素绑定事件 ;

 // 2. options => effect : fade | slide 
 //    1. 影响基础布局;
 //    2. 影响动画效果;


 Banner.prototype.toIndex = function(index){

      // 显示为假的第一张,点击真的第一张; 
      if(this.nowIndex === this.sliders.length - 1 && index == 0){
            return false;
      }
       
      this.nowIndex = index;
      // 显示为假的第一张 ,点击其他的内容;
      if(this.nowIndex !== 0 && this.nowIndex === this.sliders.length - 1){
            this.state = "changePage";
      }else{
            this.state = "normal";
      }
      
 }
 Banner.prototype.slide = function(){
     // 动画特殊处理 => toIndex 动画; 
      if(this.state === "changePage"){
            this.wrapper.style.left = 0;
            this.wrapper.style.transition = "top 1s";
      }
      switch(this.state){
            // 增加BUG解决动画;
            case "changePage":
                  setTimeout(function(){
                        this.wrapper.style.transition = "left 1s";
                        this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
                  }.bind(this) ,0) 
                  break;
            case "normal" : 
                  this.wrapper.style.left = 0;
                  this.wrapper.style.transition = "left 1s";
                  setTimeout(function(){
                        this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px"
                  }.bind(this) , 0) 
                  break;
            case "changeFirst":
                  this.wrapper.style.transition = "top 1s";
                  this.wrapper.style.left = 0;
                  setTimeout(function(){
                        this.nowIndex ++;
                        this.state = "normal";
                        this.slide();
                  }.bind(this),0);
                  break;
            case "changeLast" :
                  this.wrapper.style.transition = "top 1s";
                  this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
                  setTimeout(function(){
                        this.nowIndex --;
                        this.state = "normal";
                        this.slide();
                  }.bind(this),0)
      }

 }

```


**问题 17 为什么第一次点击左侧按钮打印不出0，也就是为啥第一次进不去if判断？**
![image.png](https://upload-images.jianshu.io/upload_images/2845301-d3f1b315c2fb8968.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```javascript
    后面有操作index的for循环删除掉就好了;
```


**问题 18 智哥，能再捋一下代码吗?  能再讲一下分页器之后的吗?**

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



**问题 19**

```javascript
Banner.prototype.slide = function(){
    switch(this.state){
        case "normal" :
            this.wrapper.style.left = 0; // 将wrapper的left设为0
            this.wrapper.style.transition = "left 1s"; // 添加了渐变属性
            setTimeout(function(){
                this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px" 
                // 如果这时候nowIndex为3时，将wrapper的left又设为了第四张图片的的位置，那么中间transition的过程不应该是由0到第四张图片的位置吗？
                // 而看到的是第三张到第四张的移动过程
            }.bind(this) , 0) 
            break;
        case "changeFirst":
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = 0;
            setTimeout(function(){
                this.nowIndex ++;
                this.state = "normal";
                this.slide();
            }.bind(this),0);
            break;
        case "changeLast" :
            this.wrapper.style.transition = "top 1s";
            this.wrapper.style.left = -(this.sliders.length - 1)* this.main.offsetWidth + "px";
            setTimeout(function(){
                this.nowIndex --;
                this.state = "normal";
                this.slide();
            }.bind(this),0)
    }
}
```
**略过一帧渲染** : 在代码执行的时候因为JS的解析线程是最最优先的，所以在给dom设置样式的时候 left = 0; 其实浏览器渲染进行还没有反应，JS解析进程到最后执行异步队列之中的功能。 浏览器才想起来渲染，但是这个时候js之中异步队列之中的值又重新对left进行了赋值，所以略过了一帧渲染。


**问题 20**
 ```javascript
   Banner.prototype.autoPlay = function () {
       var evt = new Event("click");    
       setInterval(function () {
           this.nextBtn.dispatchEvent(evt);
       }.bind(this), 3000)
   }
   //为什么new Event的事件无法显示自动轮播，但是可以改变nowIndex的值，如果使用下面注释的那种方法，就可以实现自动轮播？
   --------------------------------------------------------------------
   var evt = new CustomEvent("click", {
           bubbles   : true, //是否冒泡
           cancelable: true //表明该事件是否可以被取消默认行为
    })
   ```
* var evt = new Event("click");   
这样触发的事件是没有冒泡的;
其实所有动画效果都在main的事件上, 点击nextBtn的事件其实只是this.nowIndex 改变功能;

**问题 21: 第二个let声明的i不是只在块级块级作用域里有效吗? 可不可以认为是for循环里构成闭包了，内部引用了i ，所以一直都存在?**

* 理解正确;
```javascript
      var a =[];
      for(var i = 0; i<10;i++){
            a[i] = function(){
                  console.log(i);
            };
      }
      a[2]();
      console.log(a);
      console.log(a[2]) ;

      var a =[];
      for(let i = 0; i<10;i++){
            a[i] = function(){
                  console.log(i);
            };
      }
      a[2]();
      console.log(a)
      console.log(a[2]) ;
```


**问题 22 京东的小图标怎么获取？**
* iconfont


**问题 23: 事件委托后，获取事件下标的方法有几种，烦请智哥讲解一下**

```javascript
      // 找父级, 父级之中找子集。

      // this => 委托的元素;
      var res = 0;
      Array.from(this.parentNode.children).forEach(function( ele , index){
            if(this === ele){
                  res = index;
            }
      }.bind(this))

      // 给每一个元素直接标记;
      Array.from(this.parentNode.children).forEach( function(ele, index){     
            ele.index = index;
      })
      // ele => ele.index ;

      // 闭包;
      // 在封装委托的底层进行处理;
```

**24 BUG1解决**

```javascript
//BUG: 放大镜功能在边缘时移动会造成右边的big-img继续随着鼠标移动。
//原因：在给Big-img做定位时传入的参数为没有经过边缘检测(boundary)修正过得x, y
//解决：将第63行代码
var big_img_position = this.getBigPosition(x, y);
//修改为
var big_img_position = this.getBigPosition(cube_position.x,cube_position.y);
//即可
```
* 点赞;

**25 BUG2解决**

```javascript
//BUG: 移除className时，会造成前面的空格没有删除
//原因：构造正则表达式时转义字符被消除,并且空格字符应为\s(小写)
function removeClassName(dom , className){
      return dom.className = dom.className.replace(new RegExp("\S?"+className), "" );
 }
//解决：将\和?进行转义，并且修改为小s，即可
new RegExp("\S?"+className)  = >   new RegExp("\\s\?"+className)
```

* 点赞;

**问题 26**
```javascript

function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();                      
getName();                          
Foo().getName();                    
getName();                          
new Foo.getName();                  
new Foo().getName();  //              
new new Foo().getName();   //
```


```javascript
// 声明提升;
var getName;
function getName() {
    console.log(5);
}
// 声明提升;

function Foo() {
    getName = function () {
        console.log(1);
    };
    // this ?  => Foo() => window;
    // new Foo()        => Foo{};
    return this;
}
// 引用类型 (函数) 函数上增加了一个getName方法;  Foo.getName;
Foo.getName = function () {
    console.log(2);
};
// 原型上增加了getName 方法;   new Foo().getName => 
Foo.prototype.getName = function () {
    console.log(3);
};
// 全局声明的赋值;
getName = function () {
    console.log(4);
};

Foo.getName();       // 2;                
getName();           // 4          
Foo().getName();     // 1  getName = function(){console.log(1)}    window.getName();      
getName();            // 1       
new Foo.getName();    // 2;             
new Foo().getName();  // 3;          
new new Foo().getName();   //Foo{}.getName();  3;
```

* 全局函数  ;
* 声明提升  ;
* 原型对象  ;
* 实例对象  ;
* 运算优先级;
**问题 27 这里两个函数分别改变了this指向，为什么最终指向的是实例？**
![image.png](https://upload-images.jianshu.io/upload_images/18442274-cfdbcb792366c2c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 因为在使用bind方法时，这时候会创建一个新函数 ， 并且将传入函数的this固定。因所能操作的函数，都不再是原函数了，而是包裹着原函数的调用的匿名函数。
```javascript
      function bind(callback,_this){
            return function(){      
                  callback.call(_this);
            }  
      }
```

![image.png](https://upload-images.jianshu.io/upload_images/18442274-763af1f8f15ecb84.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**问题 28 这两种方式都可以让变量有初始值，哪种更好呢？**
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


**问题 29**
**贪婪规则** , **全局匹配修饰符**
* 贪婪 : 正则的特性之一 ,  只要符合规则 , 那么我们会尽可能多的拿到符合规则的内容。 
    +  触发贪婪的核心;
    *? 非贪婪模式

* 全局匹配 :  针对特殊方法 : 
    1. exec()  ; 如果存在修饰符 g : 在匹配一次结束后，下一次匹配在上一次结束的位置继续匹配。
    2. match (); 如果存在修饰符 g : 会多次匹配, 在得到第一次匹配之后再继续进行连续匹配并返回所有匹配结果。
    3. replace (); 如果存在修饰符 g : 会多次匹配 , 每次匹配到的结果都会进行替换操作;
   

**问题30**
 ```javascript
    str = str.replace(/\//g,"\/");
   //模板引擎中的这句话是不是多余的呀？  '/'不是转义字符
   ```
* 是多余的，为了保证之前BUG修复多加的一句话忘了删除了。
