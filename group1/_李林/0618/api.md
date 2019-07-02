1.Date.toJSON()  返回Date字符串，与toString()没有太大区别，toString()返回美式英语格式，toJSON()返回中文格式

2.Date.getTimezoneOffset()  返回当前时区与标准时区的差值，以分钟数表示，正数表示晚于标准时间，负数反之。

3.Date.toLocaleDateString()  toLocaleDateString(locales [,options])返回哪种语言以及返回内容,若输入语言不合法就会输出RangeError

4.Date.valueOf()  返回从1970年1月1日0时0分0秒到该日期对象所代表时间的毫秒数

5.Date()[Symbol.toPrimitive](参数) javascript自动调用的方法，返回字符串或数字，实在转不了就返回TypeError;