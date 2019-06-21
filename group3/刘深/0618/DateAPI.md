var d = new Date();

​            d.setFullYear(1998);//设置 Date 对象中的年份（四位数字）

​            d.setMonth(1);//  设置 Date 对象中月份 (0 ~ 11)。

​            d.setDate(29);//设置 Date 对象中月的某一天 (1 ~ 31)。

​            d.setMinutes(40);//设置 Date 对象中的分钟 (0 ~ 59)。

​            d.setSeconds(59);//     设置 Date 对象中的秒钟 (0 ~ 59)。

​            d.setMilliseconds(1000);//设置 Date 对象中的毫秒 (0 ~ 999)。

​            d.setTime(10000);//以毫秒设置 Date 对象。

​            d.toTimeString()//把 Date 对象的时间部分转换为字符串。

​            d.DateString();//把 Date 对象的日期部分转换为字符串。

​            console.dir(d);