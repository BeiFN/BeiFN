## 常用的一些数组API：

1. Array.prototype.concat();    合并两个或多个数组   返回值：一个新数组
2. Array.prototype.join();    把所有元素连成一个字符串    返回值：字符串（一串连在一起的字符 | 加有，的字符串，或是加有~、_、等分隔符的字符串）
3. Array.prototype.indexof();  找出数组下标对应的元素   返回值：在数组之中的下标对应的元素值 （从前往后找）
4. Array.prototype.lastIndexof();     找出数组下标对应的元素   返回值：在数组之中的下标对应的元素值 （从后往前找）
5. Array.prototype.pop();   删除数组最后一项    返回值:删除掉的数据元素
6. Array.prototype.push();    向数组（最后一项）后面新增数据   返回值:新数组的长度(length)
7. Array.prototype.shift();   删除数组第一项    返回值:删除掉的数据元素
8. Array.prototype.unshift();   向数组（第一项）前面新增数据   返回值:新数组的长度(length)
9. Array.prototype.slice();     剪切数组（浅复制）  返回值：含有提取元素的新的数组对象  （参数:start end 规定了提取的起止位置）
10. Array.prototype.sort();     用原地算法对数组元素排序    返回值：新的排序后的数组
11. Array.prototype.splice();   删除或替换现有元素或者原地添加新的元素来修改数组    f返回值：数组形式返回被修改的内容。   
    （1）删除对应位置的内容    （2）可以替换删除掉的内容
12. Array.prototype.toString();   表示指定的数组及其元素  返回值：返回一个字符串。

## 常用的一些字符串API：

1.String.prototype.charAt()    返回特定位置的字符

2.String.prototype.charCodeAt()	返回表示给定索引的字符的Unicode的值

3. String.prototype.concat()   连接两个字符串文本，并返回一个新的字符串。

4. String.prototype.includes()   判断一个字符串里是否包含其他字符串

5. String.prototype.endsWith()  判断一个字符串的结尾是否包含其他字符串中的字符

6. String.prototype.indexOf()  从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1

7. String.prototype.lastIndexOf()  从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1

8. String.prototype.padEnd() 在当前字符串尾部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串

9. String.prototype.padStart()  在当前字符串头部填充指定的字符串， 直到达到指定的长度。 返回一个新的字符串

10. String.prototype.repeat() 返回指定重复次数的由元素组成的字符串对象

11. String.prototype.replace() 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串

12. String.prototype.slice() 摘取一个字符串区域，返回一个新的字符串

13. String.prototype.split() 通过分离字符串成字串，将字符串对象分割成字符串数组

14. String.prototype.startsWith()  判断字符串的起始位置是否匹配其他字符串中的字符

15. String.prototype.substring()  返回在字符串中指定两个下标之间的字符

16. String.prototype.toLocaleLowerCase() 根据当前区域设置，将符串中的字符转换成小写。对于大多数语言来说，toLowerCase的返回值是一致的

17. String.prototype.toLocaleUpperCase() 根据当前区域设置，将字符串中的字符转换成大写，对于大多数语言来说，toUpperCase的返回值是一致的。

18. String.prototype.toString() 返回用字符串表示的特定对象。重写Object.prototype.toString方法

19. String.prototype.trim()  从字符串的开始和结尾去除空格

    ## 常用的一些Date内置对象API：

    #### get系列：

1.Date.prototype.getDate() 根据本地时间返回指定日期对象的月份中的第几天（1-31）

2.Date.prototype.getDay() 根据本地时间返回指定日期对象的星期中的第几天（0-6）

3.Date.prototype.getFullYear() 根据本地时间返回指定日期对象的年份（四位数年份时返回四位数字）

4.Date.prototype.getHours() 根据本地时间返回指定日期对象的小时（0-23）

5.Date.prototype.getMilliseconds() 根据本地时间返回指定日期对象的毫秒（0-999）

6.Date.prototype.getMinutes()  根据本地时间返回指定日期对象的分钟（0-59）

7.Date.prototype.getMonth() 根据本地时间返回指定日期对象的月份（0-11）

8.Date.prototype.getSeconds() 根据本地时间返回指定日期对象的秒数（0-59）

9.Date.prototype.getTime() 返回从1970-1-1 00:00:00 UTC（协调世界时）到该日期经过的毫秒数，对于1970-1-1 00:00:00 UTC之前的时间返回负值

####   set系列：

1.Date.prototype.setDate() 根据本地时间为指定的日期对象设置月份中的第几天

2.Date.prototype.setFullYear() 根据本地时间为指定日期对象设置完整年份（四位数年份是四个数字）

3.Date.prototype.setHours() 根据本地时间为指定日期对象设置小时数

4.Date.prototype.setMilliseconds() 根据本地时间为指定日期对象设置毫秒数

5.Date.prototype.setMinutes() 根据本地时间为指定日期对象设置分钟数

6.Date.prototype.setMonth() 根据本地时间为指定日期对象设置月份

7.Date.prototype.setSeconds()  根据本地时间为指定日期对象设置秒数

8.Date.prototype.setTime() 通过指定从 1970-1-1 00:00:00 UTC 开始经过的毫秒数来设置日期对象的时间，对于早于 1970-1-1 00:00:00 UTC的时间可使用负值

#####   其他的一些：

1.Date.prototype.toDateString() 以人类易读（human-readable）的形式返回该日期对象日期部分的字符串

2.Date.prototype.toString() 返回一个表示该日期对象的字符串。覆盖Object.prototype.toString()方法

3.Date.prototype.toJSON() 使用 toISOString()返回一个表示该日期的字符串。为了在 JSON.stringify()方法中使用

4.Date.prototype.toTimeString() 以人类易读格式返回日期对象时间部分的字符串

## 常用的一些Math内置对象API：

1.Math.PI 圆周率，一个圆的周长和直径之比，约等于 3.14159.

2.Math.abs(x) 返回x的绝对值.

3.Math.ceil(x) 返回x向上取整后的值.

4.Math.floor(x)返回小于x的最大整数

5.Math.cos(x) 返回x的余弦值.

6.Math.sin(x)返回正弦值.

7.Math.max([x[,y[,…\]]])   返回0个到多个数值中最大值.

8.Math.min([x[,y[,…\]]]) 返回0个到多个数值中最小值.

9.Math.pow(x,y) 返回x的y次幂.

10.Math.random()  返回0到1之间的伪随机数.

11.Math.round(x)  返回四舍五入后的整数.

## 常用的一些window的API：

##### 	方法

1.Window.alert()  显示警报对话框

2.Window.open() 打开一个新窗口

3.Window.close() 关闭当前窗口

4.Window.confirm()  显示一个对话框，其中包含用户需要响应的消息

5.Window.find()  在窗口中搜索给定的字符串。

6.Window.focus()  将焦点设置在当前窗口上

7.Window.blur()  将焦点设置在远离窗口的位置

8.Window.minimize()（仅限顶级XUL窗口）最小化窗口

#####   事件

1.error当资源无法加载或无法使用时触发。例如，如果脚本有执行错误或无法找到图像或无效。
也可通过onerror获得

2.resize 窗口调整大小后触发。也可通过onresize获得

3.load  在整个页面加载时触发，包括样式表图像等所有相关资源。也可通过onload获得

4.unload 在卸载文档或子资源时触发。也可通过onunload获得



#### 之前整理的一些比较新的API：

关于String.prototype :

1.endswith( ) 用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的

​						结果返回 `true` 或 `false`。

   语法：  str.endsWith(searchString[, length])

​					searchString：要搜索的子字符串	length：`str` 的长度

 	注：这个方法是大小写敏感的。

示例：

```js
var str = "To be, or not to be, that is the question.";

alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true    //"To be, or not to be"的长度是19
```

2. startsWith( )  用来判断当前字符串是否以另外一个给定的子字符串开头

   ​				根据判断结果返回 `true` 或 `false`。

     语法：  str.startsWith(searchString[, position])

   ​					searchString：要搜索的子字符串	

   ​				position：`在 `str` 中搜索 `searchString` 的开始位置，

   ​									默认值为 0，也就是真正的字符串开头处。

    注：此方法是区分大小写的。

   ```js
   var str = "To be, or not to be, that is the question.";
   
   alert(str.startsWith("To be"));         // true
   alert(str.startsWith("not to be"));     // false
   alert(str.startsWith("not to be", 10)); // true  //下标10正是n，故为true
   ```

3. includes( ) 用于判断一个字符串是否包含在另一个字符串中

​						结果返回 `true` 或 `false`。

   语法：  str.includes(searchString[, position])

​					searchString：要在此字符串中搜索的字符串。

​					position：从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。

 	注：这个方法是大小写敏感的，即`includes()` 方法是区分大小写的。

​			例：'Blue Whale'.includes('blue');     // returns **false**

示例：

```
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false	// 若是从0开始检索，则为true
console.log(str.includes('TO BE'));       // false
```





关于String.prototype :

1. Array.from( ); 从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例.

   ​				返回值：一个新的数组实例

   语法：Array.from(arrayLike[, mapFn[, thisArg]])

   ​				arrayLike：想要转换成数组的伪数组对象或可迭代对象。

   ​				mapFn (可选参数):如果指定了该参数，新数组中的每个元素会执行该回调函数。

   ​				thisArg (可选参数):可选参数，执行回调函数 `mapFn` 时 `this` 对象。

   示例：

   ```js
   console.log(Array.from('foo'));
   // output: Array ["f", "o", "o"]
   
   console.log(Array.from([1, 2, 3], x => x + x));
   //  output: Array [2, 4, 6]
   
   let s = new Set(['foo', window]); 
   Array.from(s); 
   // ["foo", window]
   
   let m = new Map([[1, 2], [2, 4], [4, 8]]);
   Array.from(m); 
   // [[1, 2], [2, 4], [4, 8]]
   
   function f() {
     return Array.from(arguments);
   }
   f(1, 2, 3);
   // [1, 2, 3]
   
   function combine(){ 
       let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
       return Array.from(new Set(arr));
   } 
   var m = [1, 2, 2], n = [2,3,3]; 
   console.log(combine(m,n));  
     // [1, 2, 3]					//似懂非懂，看结果能理解，但自己解释不了。
   ```

   

2. fill( )  用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。**不包括终止索引**。

   ​			返回值：修改后的数组

   语法：arr.fill(value[, start[, end]])        即  [ 起始索引, 终止索引  )  范围内被替换乘value

   ​				   value：用来填充数组元素的值。

   ​					`start` 可选：起始索引，默认值为0。

   ​									如果 `start` 是个负数, 则开始索引会被自动计算成为 `length+start`

   ​					`end` 可选：终止索引，默认值为 `this.length`。

   ​									如果 `end` 是个负数, 则结束索引会被自动计算成为 `length+end`。

   示例：

   ```js
   [1, 2, 3].fill(4);               // [4, 4, 4]
   [1, 2, 3].fill(4, 1);            // [1, 4, 4]
   [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
   [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
   [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
   [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
   [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
   [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
   Array(3).fill(4);                // [4, 4, 4]
   [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
   
   // Objects by reference.
   var arr = Array(3).fill({}) // [{}, {}, {}];  //数组内有三个{ }
   arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
   ```

   