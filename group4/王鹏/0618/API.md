## DATE API

(1)Date.now();
    返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
    ```
        var now = Date.now();
        console.log(now);
    ```

(2)getDate();
    返回指定日期对象在当前月份天数
    ```
        var time = new Date();
        var days = time.getDate();
        console.log(days);
        console.log(time);
    ```

(3)getDay();
    返回指定日期对象在一周内的第几天
    ```
        var time = new Date();
        var day = time.getDay();
        console.log(day);
        console.log(time);
    ```

(4)getFullYear();
    返回指定日期对象的年份
    ```
        var time = new Date();
        var year = time.getFullYear();
        console.log(year);
        console.log(time);
    ```

(5)getMonth();
    返回指定日期对象月份-1
    ```
        var time = new Date();
        var month = time.getMonth();
        console.log(month);
        console.log(time);
    ```

(6)getHours();
    返回指定日期对象的小时数
    ```
        var time = new Date();
        var hours = time.getHours();
        console.log(hours);
        console.log(time);
    ```

(7)getMinutes();
    返回指定日期对象的分钟数
    ```
        var time = new Date();
        var minutes = time.getMinutes();
        console.log(minutes);
        console.log(time);
    ```

(8)getSeconds();
    返回指定日期对象的秒数
    ```
        var time = new Date();
        var second = time.getSeconds();
        console.log(second);
        console.log(time);
    ```