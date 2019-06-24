<u>数组Word</u>

#pop   删除数组最后一个，并返回删除的元素值  array.prototype.pop();
#push  在数组最后一个添加，并返回数组中的长度  array.prototype.push("ssss",1,2,3);
#shift 删除第一个元素并返回第一个元素的值   array.prototype.shift();
#unshift 在数组前面添加一个元素 返回数组长度   array.prototype.unshift("33");
#splice 删除从下标为num1开始的num2个,并替换相应的内容，没替换的白删除了      array.prototype.splice(num1,num2，"string"); 
#若没有num2 则把从下表为num1开始的所有元素全部删除；
#concat 把两个或多个拼接起来  arr1.concat(arr2[,arr3...])
#join  把数组转换为字符串  array.join("something") 把数组合并成为字符串并用something连接
#toString 数组转换为字符串 与join不同的是括号里面不加东西
<!-- join不加东西|toString 默认连接符为  ，  -->
#indexof lastIndexof 查找莫格值在数组中的位置  indexof 从前往后找  lastIndexof 从后往前找
#slice 返回选定的数组  arr.slice(num1[,num2]) 从下标为num1 开始到num2 结束的数组，若没有num2 则默认到最后一个；若num1为负数，则为从后往前的顺序   大于等于num1  小于num2

<u>字符串Word</u>

split ：把数组切割成字符串  （“sym”）按sym切割  （“”）切成碎片  把字符串切成一个数组







toString（）提取成为字符串  如果为负值则从0开始

slice（）提取成为字符串  如果为负值则从右边开始







RegExp 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配。





String.fromCharCode 从utf-16返回对应的字符串

charCodeAt 返回utf-16编码

charAt（num）字符串中返回第num字符

endsWith （string 【，num】）是否以string为结尾  再第num位置是否以string结尾

startWith

indexOf  是否存在  返回第一个位置

padEnd(length,string)  在尾部填充到指定的length长度，如果有string则用string填充，若超出则填充部分

padStart填充到头部

repeat(num) 重复num次

replace(str1,str2)用str2替换str1

substring(num1,num2) 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

trim 清除左右空格



*toLocaleUpperCase/woLocaLelowerCase 大写小写*

*toLowerCase/to**Upper**Case   许多小语种之间会有差别*