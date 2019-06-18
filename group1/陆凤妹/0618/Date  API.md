

1、setFullYear() 方法根据本地时间为一个日期对象设置年份。
       
        语法：
            dateObj.setFullYear(yearValue[, monthValue[, dayValue]])

        参数：
            yearValue  指定年份的整数值，例如1995。

            monthValue 一个0到11之间的整数值，表示从一月到十二月。

            dayValue  一个1到31之间的整数值，表示月份中的第几天。如果你指定了 dayValue 参数，就必须同时指定 monthValue。
        
        描述：如果没有指定 monthValue 和dayValue 参数，将会使用 getMonth 和getDate 方法的返回值。

             如果有一个参数超出了合理的范围，setFullYear 方法会更新其他参数值，日期对象的日期值也会被相应更新。 例如，为 monthValue 指定 15， 则年份会加1，月份值会为3。

        例子：
        
        var nowDay = new Date();
        nowDay.setFullYear(1997);
        console.log(nowDay);//Wed Jun 18 1997 21:54:11 GMT+0800 (中国标准时间)



2、toJSON() 方法返回 Date 对象的字符串形式。

        语法：dateObj.toJSON()

        描述： Date 实例引用一个具体的时间点。 调用 toJSON() 返回一个 JSON 格式字符串(使用 toISOString())，表示该日期对象的值。默认情况下，这个方法常用于 JSON序列化Date对象。

        例子：

        var date = new Date();
        console.log(date); //Tue Jun 18 2019 21:33:21 GMT+0800 (中国标准时间)

        var jsonDate = (date).toJSON();
        console.log(jsonDate); //18 2019-06-18T13:33:21.063Z

        var backToDate = new Date(jsonDate);
        console.log(backToDate); //21 Tue Jun 18 2019 21:33:21 GMT+0800 (中国标准时间)

3、setDate() 方法根据本地时间来指定一个日期对象的天数。
       
        语法：
                dateObj.setDate(dayValue)

        参数：
        dayValue：一个整数，表示该月的第几天。

        描述：如果 dayValue 超出了月份的合理范围，setDate 将会相应地更新 Date 对象。例如，如果为 dayValue 指定0，那么日期就会被设置为上个月的最后一天。

        例子：
                var nowDay = new Date(2019, 6, 18); // 2019-6-18
                nowDay.setDate(24);  // Wed Jul 24 2019 00:00:00 GMT+0800 (中国标准时间)
                console.log(nowDay);
                nowDay.setDate(32);  // Thu Aug 01 2019 00:00:00 GMT+0800 (中国标准时间)
                console.log(nowDay);

4、getDate() 方法根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）。

        语法：dateObj.getDate()

        参数：无
        
        描述：getDate() 返回一个1 到 
        
        例子：
           
                var nowDay = new Date("June 18 ,2019 22:04:00");
                nowDay.getDay(1997);
                console.log(nowDay);//Tue Jun 18 2019 22:04:00 GMT+0800 (中国标准时间)

5、setMonth() 方法根据本地时间为一个设置年份的日期对象设置月份。

         语法：dateObj.setMonth(monthValue[, dayValue])

         参数：monthValue  介于 0 到 11 之间的整数（表示一月到十二月）。
              dayValue从 1 到 31 之间的整数，表示月份中的第几天。
              返回值！  基于 1 January 1970 00:00:00 UTC 开始计算的毫秒数

         描述：如果不指定 dayValue 参数，就会使用 getDate 方法的返回值。

              如果有一个指定的参数超出了合理范围，setMonth 会相应地更新日期对象中的日期信息。例如，为 monthValue 指定 15，则年份会加 1，月份将会使用 3。
          
          例子：
           var nowDay = new Date();
           nowDay.setMonth(6);
           console.log(nowDay);//Thu Jul 18 2019 22:10:15 GMT+0800 (中国标准时间)
