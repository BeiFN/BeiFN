1.toDateString()=>返回日期对象日期部分的字符串
```javascript
var time=new Date(2019,3,24,5,57,32);
console.log(time.toString())//Wed Apr 24 2019 05:57:32 GMT+0800 (中国标准时间)
```
2.toJSON()=>返回Date对象的字符串形式
```javascript
var time=new Date('August 20, 1937 17:10:24 UTC')
console.log(time.toJSON());//1937-08-20T17:10:24.000Z
```
3.Date.parse()=>一个表示从1970-1-1 00:00:00 UTC到给定日期字符串所表示时间的毫秒数的数值。如果参数不能解析为一个有效的日期，则返回NaN
```javascript
var time= Date.parse('01 Jan 1970 00:00:00 GMT');
console.log(time)// 315532800000
```
4.toString()=> 返回一个字符串，表示该Date对象
```javascript
var time= new Date('August 19, 1975 23:15:30');
console.log(time.toString());//Tue Aug 19 1975 23:15:30 GMT+0800 (中国标准时间)
```
5.valueOf()=>返回一个 Date 对象的原始值
```javascript
var time = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
console.log(time.valueOf());//823230245000
```