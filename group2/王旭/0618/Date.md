**Date.setFullYear()**：根据本地时间为一个日期对象设置年份。

语法：dateobj,setFullYear(yearValue[,monthValue[,dayValue]])

**参数：**

yearValue:指定年份的整数值

monthValue；一个0到11之间的整数值，表示从一月到十二月

dayVakue:一个1到31之间的整数值，表示月份中的第几天。如果你指定了dayValue参数，就必须同时指定monthValue

**描述**

如果没有指定 `monthValue` 和`dayValue` 参数，将会使用 `getMonth` 和`getDate` 方法的返回值。

如果有一个参数超出了合理的范围，`setFullYear` 方法会更新其他参数值，日期对象的日期值也会被相应更新。 例如，为 `monthValue `指定 15， 则年份会加1，月份值会为3。

例：

var now = new Date();

now.setFullYear (2019);

**兼容性：**兼容性良好



**Date.setDate()**：根据本地时间来指定一个日期对象的天数

**语法：**dateObj.setDate(dayValue)

**参数：**daValue:一个整数，表示该月的第几天

**描述：**如果dayValue超出了月份的合理范围，setDate将会相应的更新Date对象。例如，如果为dayValue指定为0，那么日期就会被设置为上个月的最后一天

例;

var now = new Date(2019,6,18);  //2019-06-18

now.setDate(20);      //2019-06-20

now.setDate(33);      //2019-07-01

**兼容性**：兼容性良好



**Date.setMonth()**：根据本地时间为一个日期对象设置月份。

语法：dateobj,setMonth(monthValue[,dayValue]])

**参数：**

monthValue；一个0到11之间的整数值，表示从一月到十二月

dayVakue:一个1到31之间的整数值，表示月份中的第几天。

**返回值！**   基于1 January 1970 00:00:00 UTC 开始计算的毫秒数

**描述**  如果不指定 `dayValue` 参数，就会使用 getDate方法的返回值。如果有一个指定的参数超出了合理范围，`setMonth` 会相应地更新日期对象中的日期信息。例如，为 `monthValue` 指定 15，则年份会加 1，月份将会使用 3。

例：

var now = new Date();

now.setMonth (6);

**兼容性：**兼容性良好



**Date.setTime():** 以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为 `Date` 对象设置时间。

**语法：**dateObj.setTime(timeValue)

**参数：**timeValue：一个整数，表示从1970-1-1 00:00:00 UTC开始计时的毫秒数。

**描述：**使用 `setTime` 方法用来把一个日期时间赋值给另一个 `Date `对象。

例：

```html
var theBigDay = new Date("July 1, 1999");
VAR sameAsBigDay = new Date();
sameAsBigDay.setTime(theBigDay.getTime());
```

**兼容性：**兼容性良好



**Date.toString():**方法返回一个字符串，表示该Date对象

**语法：**dateObj.toString()

**描述;** Date对象覆盖了 Objet 对象的 `toString() `方法；它不是继承自 Object.prototype.toString().对于 Date对象，`toString()` 方法返回一个表示该对象的字符串。该 `toString` 方法总是返回一个美式英语日期格式的字符串。

当一个日期对象被用来作为文本值或用来进行字符串连接时，`toString` 方法会被自动调用。

`toString() `是通用函数。如果不是Date实例，则 返回"Invalid Date"。

例：

下例把一个Data对象的 `toString` 返回值赋给 `myVar：`

```js
var x = new Date();
myVar = x.toString(); // 把类似于下面格式的值赋给 myVar，
// Fri Apr 26 2019 11:46:17 GMT+0800 (中国标准时间)
```

**兼容性：**兼容性良好

























