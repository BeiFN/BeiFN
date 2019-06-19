Date.now() 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。 返回值类型为Number，因为 now() 是Date的一个静态函数，所以必须以 Date.now() 的形式来使用。没有参数。

getDate() 根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）。返回一个1到31的整数值，number类型。没有参数。

getDay() 方法根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天。返回一个整数值： 0 代表星期日， 1 代表星期一，2 代表星期二， 依次类推。没有参数。

getFullYear() 方法根据本地时间返回指定日期的年份。根据当地时间，返回一个对应于给定日期的年份数字。返回的值是绝对数。 对于1000到9999之间的日期，getFullYear()返回一个四位数字，如1995。使用此函数确保在2000年后兼容。

getHours() 方法根据本地时间，返回一个指定的日期对象的小时。getHours返回一个0 到 23之间的整数值。没有参数

getMilliseconds() 方法，根据本地时间，返回一个指定的日期对象的毫秒数。返回一个0 到 999的整数。没有参数。

getMinutes() 方法根据本地时间，返回一个指定的日期对象的分钟数。返回一个0 到 59的整数值。没有参数。
getMonth()根据本地时间，返回一个指定的日期对象的月份，为基于0的值（0表示一年中的第一月）。返回一个0 到 11的整数值： 0 代表一月份，1 代表二月份， 2 代表三月份，依次类推。没有参数。

getSeconds() 方法根据本地时间，返回一个指定的日期对象的秒数。该方法返回一个 0 到 59 的整数值。没有参数。

getTime() 方法返回一个时间的格林威治时间数值。返回值一个数值，表示从1970年1月1日0时0分0秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数。可以使用这个方法把一个日期时间赋值给另一个Date 对象。没有参数。

setDate(a) 方法根据本地时间来指定一个日期对象的天数。参数a表示一个整数，表示该月的第几天。如果 a超出了月份的合理范围，setDate 将会相应地更新 Date 对象。例如，如果为 a 指定0，那么日期就会被设置为上个月的最后一天。

setFullYear() 方法根据本地时间为一个日期对象设置年份。语法格式为dateObj.setFullYear(yearValue[, monthValue[, dayValue]])参数：yearValue指定年份的整数值，例如1995。monthValue一个0到11之间的整数值，表示从一月到十二月。dayValue一个1到31之间的整数值，表示月份中的第几天。如果你指定了 dayValue 参数，就必须同时指定 monthValue。

setHours() 方法根据本地时间为一个日期对象设置小时数，返回从1970-01-01 00:00:00 UTC 到更新后的 日期 对象实例所表示时间的毫秒数。语法格式为dateObj.setHours(hoursValue) hoursValue一个 0 到 23 的整数，表示小时。minutesValue是一个 0 到 59 的整数，表示分钟。secondsValue表示一个 0 到 59 的整数，表示秒数。如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。msValue是一个 0 到 999 的数字，表示微秒数，如果指定了 msValue 参数，则必须同时指定 minutesValue 和 secondsValue 参数。如果不指定 minutesValue，secondsValue 和 msValue 参数，则会使用getMinutes()，getSeconds() 和getMilliseconds() 方法的返回值。如果有一个参数超出了合理范围，setHours 会相应地更新日期对象中的日期信息。例如，如果为 secondsValue 指定了 100，则分钟会加 1，然后秒数使用 40。

setMilliseconds() 方法会根据本地时间设置一个日期对象的豪秒数。语法格式为dateObj.setMilliseconds(millisecondsValue)，参数millisecondsValue
是一个 0 到 999 的数字，表示豪秒数。如果指定的数字超出了合理范围，则日期对象的时间信息会被相应地更新。例如，如果指定了 1005，则秒数加 1，豪秒数为 5。

setMinutes() 方法根据本地时间为一个日期对象设置分钟数。语法格式为dateObj.setMinutes(minutesValue[, secondsValue[, msValue]])。参数：minutesValue
一个 0 到 59 的整数，表示分钟数。
secondsValue
一个 0 到 59 的整数，表示秒数。如果指定了 secondsValue 参数，则必须同时指定 minutesValue 参数。
msValue
一个 0 到 999 的数字，表示微秒数，如果指定了 msValue 参数，则必须同时指定 minutesValue 和secondsValue 参数。

setMonth() 方法根据本地时间为一个设置年份的日期对象设置月份。语法格式为：dateObj.setMonth(monthValue[, dayValue])。
monthValue
介于 0 到 11 之间的整数（表示一月到十二月）。
dayValue
从 1 到 31 之间的整数，表示月份中的第几天。
返回值！
基于 1 January 1970 00:00:00 UTC 开始计算的毫秒数
如果不指定 dayValue 参数，就会使用 getDate 方法的返回值。
如果有一个指定的参数超出了合理范围，setMonth 会相应地更新日期对象中的日期信息。例如，为 monthValue 指定 15，则年份会加 1，月份将会使用 3。

setSeconds() 方法根据本地时间设置一个日期对象的秒数。语法格式为dateObj.setSeconds(secondsValue[, msValue])。
参数：secondsValue
一个 0 到 59 的整数。
msValue
一个 0 到 999 的数字，表示微秒数。
如果没有指定 msValue 参数，就会使用 getMilliseconds() 方法的返回值。
如果一个参数超出了合理范围， setSeconds 方法会相应地更新日期对象的时间信息。例如，为 secondsValue 指定 100，则日期对象的分钟数会相应地加 1，秒数将会使用 40。

setTime() 方法以一个表示从1970-1-1 00:00:00 UTC计时的毫秒数为来为 Date 对象设置时间。语法格式为:dateObj.setTime(timeValue)。参数timeValue是一个整数，表示从1970-1-1 00:00:00 UTC开始计时的毫秒数。使用 setTime 方法用来把一个日期时间赋值给另一个 Date 对象。