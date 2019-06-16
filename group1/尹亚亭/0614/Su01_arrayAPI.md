# 常用的一些数组API：

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