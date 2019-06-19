####收集五个新的date相关API

**1.Date.toLocaleString()方法返回该日期对象的字符串，该字符串格式因不同语言而不同。**

```javascript
var event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// /英式英语使用日-月-年顺序，24小时不使用AM/PM
console.log(event.toLocaleString('en-GB', { timeZone: 'UTC' }));
// output: 20/12/2012, 03:00:00

// 韩语使用年-月-日 ，上午/下午12小时
console.log(event.toLocaleString('ko-KR', { timeZone: 'UTC' }));
// output: 2012. 12. 20. 오전 3:00:00

// 第一个参数表示地区，使用default是表示默认地区的日期显示格式
console.log(event.toLocaleString('default', { timeZone: 'UTC' }));
// output: 2012. 12. 20. 오전 3:00:00
```

**2.Date.toLocaleString()方法返回该日期对象的字符串，该字符串格式因不同语言而不同。**

和toLocaleString()类似，方法返回该日期对象`时间部分`的字符串，该字符串格式因不同语言而不同。

```javascript
console.log(event.toLocaleTimeString('en-US'));
// expected output: 1:15:30 AM

console.log(event.toLocaleTimeString('it-IT'));
// expected output: 01:15:30

console.log(event.toLocaleTimeString('ar-EG'));
// expected output: ١٢:١٥:٣٠ ص
```

**3.Date.toDateString() 方法以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。**

```js
var d = new Date(1993, 6, 28, 14, 39, 7);

console.log(d.toString());     // Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
console.log(d.toDateString()); // Wed Jul 28 1993
```

**4.Date.toISOString() 方法返回一个 ISO格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是UTC（协调世界时），加一个后缀“Z”标识。**

```js
var today = new Date("05 October 2011 14:48 UTC");
alert(today.toISOString()); // 返回2011-10-05T14:48:00.000Z
```

**5.Date.toTimeString()方法以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。**

```js
var d = new Date(1993, 6, 28, 14, 39, 7);

console.log(d.toString());     // Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
console.log(d.toTimeString()); // 14:39:07 GMT-0600 (PDT)
```