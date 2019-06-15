#pop   删除数组最后一个，并返回删除的元素值  array.prototype.pop();
#push  在数组最后一个添加，并返回数组中的长度  array.prototype.push("ssss",1,2,3);
#shift 删除第一个元素并返回第一个元素的值   array.prototype.shift();
#unshift 删除第一个元素并给第一个元素赋值 返回数组长度   array.prototype.unshift("33");
#splice 删除从下标为num1开始的num2个,并替换相应的内容，没替换的白删除了      array.prototype.splice(num1,num2，"string"); 
#若没有num2 则把从下表为num1开始的所有元素全部删除；
#concat 把两个或多个拼接起来  arr1.concat(arr2[,arr3...])
#join  把数组转换为字符串  array.join("something") 把数组合并成为字符串并用something连接
#toString 数组转换为字符串 与join不同的是括号里面不加东西
<!-- join不加东西|toString 默认连接符为  ，  -->
#indexof lastIndexof 查找莫格值在数组中的位置  indexof 从前往后找  lastIndexof 从后往前找
#slice 返回选定的数组  arr.slice(num1[,num2]) 从下标为num1 开始到num2 结束的数组，若没有num2 则默认到最后一个；若num1为负数，则为从后往前的顺序