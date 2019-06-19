##### 鼠标事件

​	onclick：鼠标点击

​	ondblclick：双击

​	onmousedown：按下鼠标

​	onmouseup：释放鼠标

​	onmouseover：移动鼠标

​	onmouseout：移出鼠标

​	onmousemove：移动鼠标

##### 键盘事件

​	keydown：按下键盘

​	keyup：抬起键盘

​	keypress：按一次键盘

##### 元素事件

​	onfocus：获取焦点

​	onblur：失去焦点

​	oninput：正在输入

​	onchange：已经改变

##### 窗口事件

​	onload：加载结束之后

​	onresize：可视区窗口尺寸改变

​	onscroll：滚动条发生滚动



/************************************************2019/6/18*************************************************************/

1、toDateString

​	作用：以美式英语和人类易读的形式返回一个日期对象日期部分的字符串

​	语法：dateObj.toDateString()

​	例：

```js
var d = new Date(1993, 6, 28, 14, 39, 7);

println(d.toString());     // prints Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
println(d.toDateString()); // prints Wed Jul 28 1993
```

​	使用：和toString区别，toString输出完整日期的字符串（包括小时分秒时区等），toDateString输出年月日部分的字符串

2、toISOString

​	作用：返回一个ISO格式的字符串（YYYY-MM-DDTHH:mm:ss.sssZ），时区总是UTC，加一个后缀“Z"标识

​	语法：dateObj.toISOString()

​	例：

```js
var today = new Date("05 October 2011 14:48 UTC");
alert(today.toISOString()); // 返回2011-10-05T14:48:00.000Z
```

​	兼容性：该方法在ECMA-262第5版中被标准化。对于那些不支持此方法的JS引擎可以通过加上下面的代码实现：

```js
if ( !Date.prototype.toISOString ) {
  ( function() {
    
    function pad(number) {
      if ( number < 10 ) {
        return '0' + number;
      }
      return number;
    }
 
    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad( this.getUTCMonth() + 1 ) +
        '-' + pad( this.getUTCDate() ) +
        'T' + pad( this.getUTCHours() ) +
        ':' + pad( this.getUTCMinutes() ) +
        ':' + pad( this.getUTCSeconds() ) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };
  
  }() );
}
```

3、toLocaleString

​	作用：返回该日期对象的字符串，该字符串格式因不同语言而不同

​	语法：dateObj.toLocaleString([locales [, options]])

​	参数（旧版本浏览器会忽略这两个参数）：

​		locale：定使用哪种语言格式化规则

​		options：定制该方法的表现

​	返回值：根据语言规则返回一个字符串

​	例：

```js
var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));

// toLocaleString 不包含参数的返回值取决于实现,
// 默认的区域(locale),和默认的时区(time zone)
date.toLocaleString();
// → 如果是在en-US区域和America/Los_Angeles时区运行返回值为"12/11/2012, 7:00:00 PM"
```

4、toTimeString

​	作用：以美式英语和人类易读的形式返回一个日期对象时间部分的字符串

​	语法：dateObj.toTimeString()

​	例：

```js
var d = new Date(1993, 6, 28, 14, 39, 7);

println(d.toString());     // prints Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
println(d.toTimeString()); // prints 14:39:07 GMT-0600 (PDT)
```

​	使用：和toDateString一样，只返回时间部分的字符串

5、toUTCString

​	作用：使用UTC时区将时间转化为字符串

​	语法：dateObj.toUTCString()

​	返回值：使用UTC时区将时间转化为字符串

​	例：

```js
var today = new Date();
var UTCstring = today.toUTCString();
// Mon, 03 Jul 2006 21:44:38 GMT
```

