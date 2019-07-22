#### 四组问题汇总 

小组成员 `吕赟飞`，`肖光瑞` ,`王鹏` , `谢鑫鹏` ,`祖莹` ,`郭森` ,`何小娟`，组长 `谢宇航`

**目前存在问题**

1. ```java
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

   

2.略过一帧渲染** : 在代码执行的时候因为JS的解析线程是最最优先的，所以在给dom设置样式的时候 left = 0; 其实浏览器渲染进行还没有反应，JS解析进程到最后执行异步队列之中的功能。 浏览器才想起来渲染，但是这个时候js之中异步队列之中的值又重新对left进行了赋值，所以略过了一帧渲染。

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

3. ```javascript
   Banner.prototype.autoPlay = function () {
       var evt = new Event("click");    
       setInterval(function () {
           this.nextBtn.dispatchEvent(evt);
       }.bind(this), 3000)
   }
   //为什么new Event的事件无法显示自动轮播，但是可以改变nowIndex的值，如果使用下面注释的那种方法，就可以实现自动轮播？
   
   --------------------------------------------------------------------
   
   var evt = new Event("click", {
           bubbles   : true, //是否冒泡
           cancelable: true //表明该事件是否可以被取消默认行为
    })
   //var evt = new Event("click");   
   //这样触发的事件是没有冒泡的;
   //其实所有动画效果都在main的事件上, 点击nextBtn的事件其实只是this.nowIndex 改变功能;
   ```

   4. BUG1
   

```javascript
//BUG: 放大镜功能在边缘时移动会造成右边的big-img继续随着鼠标移动。
//原因：在给Big-img做定位时传入的参数为没有经过边缘检测(boundary)修正过得x, y
//解决：将第63行代码
var big_img_position = this.getBigPosition(x, y);
//修改为
var big_img_position = this.getBigPosition(cube_position.x,cube_position.y);
//即可
```

5. BUG2

   ```javascript
   //BUG: 移除className时，会造成前面的空格没有删除
   //原因：构造正则表达式时转义字符被消除,并且空格字符应为\s(小写)
   function removeClassName(dom , className){
         return dom.className = dom.className.replace(new RegExp("\S?"+className), "" );
    }
   //解决：将\和?进行转义，并且修改为小s，即可
   new RegExp("\S?"+className)  = >   new RegExp("\\s\?"+className)
   ```

   

6.**历史遗留问题**

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

- 全局函数  ;
- 声明提升  ;
- 原型对象  ;
- 实例对象  ;
- 运算优先级;