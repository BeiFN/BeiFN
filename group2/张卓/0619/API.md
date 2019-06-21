Date的五个API
1、Date.parse(时间字符串) 方法解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00  UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，如果该字符串无法识别，或者包含了不合法的日期数值（如：2015-02-31），则返回值为NaN。
例如 new Date('23/25/2014');// 包含无效值的非 ISO 格式字符串  
2、Date.valueOf()  从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期的毫秒数。和Date.getTime()效果一样。
3、Date.toTimeString()方法以人类易读形式返回一个日期对象时间部分的字符串，该字符串以美式英语格式化。返回的是时分秒还有时区  他会去掉年月  格式是14:39:07 GMT-0600 (PDT) 
4、Date.toString() 方法返回一个字符串，表示该Date对象，他覆盖了 Object 对象的 toString() 方法。返回的是Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)这种格式
5、Date.toJSON()返回一个 JSON 格式字符串，这个方法常用于 JSON序列化Date对象。
    Date -->JSON  dateObj.toJSON()
    JSON --> new Date(jsonDate); 将JSON格式的日期字符串放入new Date的参数