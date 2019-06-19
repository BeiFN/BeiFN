getTimezoneOffset()

语法：dateObj .getTimezoneOffset（）

描述：时区偏移是从本地时间到UTC的差异（以分钟为单位）。请注意，这意味着如果本地时区落后于UTC，则偏移量为正，如果前置，则偏移量为负。

返回值：一个数字，表示从基于当前主机系统设置的日期到UTC的时区偏移量（以分钟为单位）。

toDateString()

语法：dateObj.toDateString()

描述：以下面的格式以空格分隔英语对象的日期部分：

1. 工作日名称的前三个字母
2. 月份名称的前三个字母
3. 每月两位数的日期，如果需要，在左边填充零
4. 四位数年份（至少），如果需要，在左边填充零

返回值：表示美式英语中人类可读形式的给定对象的日期部分的字符串。

toJSON()

语法：dateObj.toJSON()

描述：给定日期的字符串表示形式。

返回值：调用toJSON()返回toISOString()表示Date对象值的字符串（使用）。默认情况下，此方法通常用于Date在JSON序列化期间有用地序列化对象。

toLocaleString()

语法：dateObj .toLocaleString（[ locales [，options ]]）

描述：方法返回一个字符串，其中包含该日期的语言敏感表示。new locales和optionsarguments允许应用程序指定应使用其格式约定的语言，并自定义函数的行为。在忽略locales和options参数的旧实现中，使用的语言环境和返回的字符串形式完全取决于实现。

返回值：根据特定于语言的约定表示给定日期的字符串。

valueOf()

语法：dateObj.valueOf()

描述：方法返回Date对象的原始值。

返回值：1970年1月1日00:00:00 UTC与给定日期之间的毫秒数。

