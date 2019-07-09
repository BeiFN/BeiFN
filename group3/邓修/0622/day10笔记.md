# 事件

**事件 : 用户触发的浏览器交互操作**

**事件对象 : 用于储存事件发生时所有信息的对象**

- 事件对象分成几种形式存在;对象还是那个对象，拿到引用的方式不一样;

1. 浏览器调用时 ,直接给事件处理函数传递一个参数; 这是 chrome 的处理方式
2. 浏览器执行事件时，会给全局中的event对象复制当前事件的参数; 这是 FireFox 的处理方式

- 事件对象获取的兼容;

  `var e = evt || event;`

  **TIP: 如果我们处理取值类的兼容性问题,那么我们通常使用 || 运算实现全部功能。**

- 事件对象里面储存的数据

  1. 你按下了哪个键;	

     ```javascript
     window.onmousedown=function(evt){
     	var e=evt||window.event;
     	console.log(e.button);//0代表鼠标左键，1代表鼠标滚轮，2代表鼠标右键
         console.log(e.buttons);//1代表左键，2代表右键，4代表滚轮或中键，辨别多个键位同时按下，比如为3代表左右键同时按下，计算规则为按照二进制进行按位或运算
     }
     ```

  2. 鼠标当前所在的位置;
  
     ```javascript
     // client , offset , screen , page 
     // 可视窗口 , 当前区域 , 屏幕 , 文档;
     console.log("clientX:"+e.clientX , ",offsetX:" + e.offsetX , ",screenX:" + e.screenX, ",pageX:"+  e.pageX);
     // page => client + scroll 
     ```
  
  3. 发生事件的起始点; => 事件源
  
     ```javascript
     // target || srcElement 
     console.log(e.target , e.srcElement);
     // 事件发生在哪个元素上事件源就是什么;
     ```

[案例-会跳的小恐龙](..\随堂\0622\02会跳的小恐龙.html)

[案例-打字游戏](..\随堂\0622\03打字游戏.html)