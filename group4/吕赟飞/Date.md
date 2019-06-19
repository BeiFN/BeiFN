`**getTime()**` 方法返回一个时间的格林威治时间数值。

`**setTime()**` 方法以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为 `Date` 对象设置时间。

创建一个拥有相同时间值的日期对象。

```js
var birthday = new Date(1991, 9, 17);
var copy = new Date();
copy.setTime(birthday.getTime());
```



`**toDateString()**` 方法以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。

```js
var d = new Date(1993, 6, 28, 14, 39, 7);

println(d.toString());     // prints Wed Jul 28 1993 14:39:07 GMT-0600 (PDT)
println(d.toDateString()); // prints Wed Jul 28 1993
```



**toJSON()** 方法返回 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date) 对象的字符串形式。

```js
var date = new Date();
console.log(date); //Thu Nov 09 2017 18:54:04 GMT+0800 (中国标准时间)

var jsonDate = (date).toJSON();
console.log(jsonDate); //"2017-11-09T10:51:11.395Z"
```



**Date.now()** 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。

`**valueOf()**` 方法返回一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date) 对象的原始值。

var date1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));

console.log(date1.valueOf());
// expected output: 823230245000