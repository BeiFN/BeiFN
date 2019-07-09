# 事件触发
 **事件触发分三步：**
 1. 捕获阶段
 2. 目标阶段
 3. 冒泡阶段

**两套关注流程：**
 1. IE:冒泡; 目标阶段 => 冒泡阶段
 2. NetSpace : 捕获; 捕获阶段 => 目标阶段
 **tip : 节点.on+事件名 = 只允许存在一个事件处理函数**

**高级事件的绑定模式 => 监听**
 1. 基本使用
 ```javascript
 box1.addEventListener( "click" , handlerBox1Click )
 function handlerBox1Click(){
    alert("i'm 紫色");
 }
 ```
 2. 监听可以同时存在多个事件处理函数
 ```javascript
var box1 = document.getElementById("box1");
var box5 = document.getElementById("box5");
box1.addEventListener("click",randomBoxColor);
box1.addEventListener("click",alertTip);
function randomBoxColor(){    
    // console.log(this); // 调用全局函数和box1咋扯上的关系?
	this.style.background ="#" + Math.round(Math.random() * 	parseInt("ffffff",16)).toString(16).padStart(6,"0"); 
}
function alertTip(){
	var mask = document.createElement("div");
    var content = document.createElement("div");
    mask.style.cssText = "width:100%;height:100%;background:rgba(0,0,0,.3);position:absolute;z-index:999;left:0;top:0";
    content.innerHTML = "hello world";
    content.style.cssText = "width:20%;height:20%;line-height:20%;text-align:center;position:absolute;left:0;top:0;bottom:0;right:0;margin:auto;background:#fff;";
    document.body.appendChild(mask);
    mask.appendChild(content);
    mask.addEventListener("click",function(){
        this.remove();
    });
}
 ```
 **tip : 注意请不要给一个事件监听太多的事件处理函数! 20个以下**
 **移除事件监听**
 - dom.removeEventListener() 接受的参数必须是两个
 - 1.事件名 , 2. 事件处理函数的地址;

 [案例-假链接](..\随堂\0623\04假链接.html)
 [案例-模拟select框](..\随堂\0623\05模拟select框.html)
 [案例-拖拽](..\随堂\0623\06拖拽.html)

 **bind/call/apply**
 1. bind:用来在定义函数时改变函数内部的this指向用的,一旦函数被bind了,意味着所有函数的this指向规则对其都失效,永远被锁定为当初建立时设定的this指向;
      - 还有固定参数的功能
      - 固定具体一个形参,把正常的参数顺序延后
 2. call/apply:在函数调用时改变函数this指向
 3. call和apply的区别:
      - call 小括号中第1个参数之后的参数与形参一一对应赋值
      - apply 小括号中第1个参数之后的参数是对arguments逐个的赋值

 **柯里化**
   - 柯里化的含义:函数内套函数调用
   - bind的封装
   ```javascript
   function foo(){
      console.log(this,"i'm foo");
   }
   function myBind( fn , _this ){
      return function(){
         console.log("新函数");
         fn.call(_this);
      }
   }
   // console.log( myBind() );
   foo = myBind(foo , {name : "吴彦祖"});
   foo();
   ```
   - 封装bind的实际内容:函数包裹函数，内部函数调用你的方法，并在调用时绑定this指向

 [案例-音量调节拖拽](..\随堂\0623\09音量调节拖拽.html)
 [案例-自定义右键菜单](..\随堂\0623\11自定义右键菜单.html)

 **Tip:默认事件是浏览器必不可少的，但是有时候会给我们带来以下负面的体验，于是我们就消除默认事件**
 **事件封装**
 ```javascript
 function on(dom,eventType,callback){
   // 底层是否优雅  , 兼容性是否良好。
   // addEventListener 低版本IE; 
   // IE6; 
   // addEventListener => attachEvent; IE;
   // dom.addEventListener(eventType,callback,false)
   // 极低版本的IE只能用onxxx 这种形式进行事件绑定;
   if(dom.addEventListener){
      dom.addEventListener(eventType , callback);
   }else if(dom.attachEvent){
      dom.attachEvent("on" + eventType, callback);
   }else{
      dom["on" + eventType] = callback;
   }
 }
 ```