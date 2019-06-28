# 数组排序方法

### 冒泡排序

```javascript
var arr = [3,1,5,7,9,2,4,8];
// 1. 循环排序次数;
var index = 0;
for(var count = 0 ; count < arr.length - 1; count ++){// 排序的时候我们会排序数组length-1次;
    //2. 两两比对;
    for(var i = 0 ; i  < arr.length - 1 - count; i ++){
        index ++;
        if(arr[i] < arr[i + 1]){// 将较大的数往前排（从大到小）
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
}
console.log(index);
```

### 选择排序

```javascript
var arr = [3,1,5,7,9,2,4,8];
for(var count = 0 ; count < arr.length - 1; count++){
    var min = 0;
    var index = count;//假设当前项为最小值
    for(var i = count + 1 ; i < arr.length; i ++){
        if(arr[i] < arr[index]){//碰到更小的值，将这个值的位置存到index中
            index = i;
        }
    }
    //换位
    min = arr[index];
    arr[index] = arr[count];
    arr[count] = min;
}
console.log(arr);
```

### 桶排序

```javascript
// 一个严重偏科的排序;
// 速度;
// var arr = [];
// arr[100] = 10;
// console.log(arr);
var arr = [1000,1000,2000,500,400,3000];
var bocket = [];
// 向对应的桶里装水;
for(var i = 0 ; i < arr.length; i++){
	bocket[arr[i]] = 1;
}
console.log(bocket);
arr.length = 0;
for(var index in bocket){
    // console.log(1);
    // console.log(Number(index));
    arr.push(Number(index));
}
console.log(arr);
```

### 快速排序

```javascript
function quickSort(arr){
    // 2. 终止条件;
    if(arr.length <= 1){return arr;}
    // 1. 找中点分左右;
    var midIndex = parseInt(arr.length / 2);
    var mid = arr[midIndex];
    // 创建左右数组;
    var leftList = [];
    var rightList = [];
    for(var i = 0 ; i < arr.length ; i ++){
        if(i === midIndex) continue;
        arr[i] > mid ? rightList.push(arr[i]) : leftList.push(arr[i]); 
    }
    // console.log(leftList,mid,rightList);
    return quickSort(leftList).concat([mid],quickSort(rightList));
}
console.log(quickSort(arr));
```

# 数组去重

```javascript
var arr = [1,2,3,3,4,4,4,4,4,5,3,4,5,5,4,23,23,2,32,3,3,3,4,4,4];
arr.indexOf(1); // 0 ;
arr.indexOf(3); // 2
arr.indexOf(7); // -1
var _temp = [];
for(var i = 0 ; i < arr.length ; i ++){
    if(i === 0 || _temp.indexOf(arr[i]) === -1){
        _temp.push(arr[i])
    }
}
console.log(_temp);
// 一句话去重;
// new Set(arr) : ES6 的新结构 ; key:key , value:value ;
// Set 结构是不允许重复的一个数据结构;
// 桶排序,可以去重;
// ES6 去重;
// Array.from () : 将伪数组转换成真数组;
console.log(Array.from(new Set(arr)));
```

# 伪数组转换成真数组

```javascript
function foo(){
	console.log(arguments);
	console.log(mySlice(arguments));
}
foo(1,2,3,4,5,6,7,8);
// slice();
// 概述 : 根据传入参数截取原数组，返回新数组;
// 参数 : slice([start,[end]])
// 返回值 : 截取之后的新数组;
var arr = [4,3,2,1];
var temp = arr.slice(1,2);
console.log(temp);
function mySlice(targetArray,start,end){
	var arr = [];
	for(var i = start ? start : 0; i < ( end ? end : targetArray.length) ; i++){
		arr.push(targetArray[i]);
	}
	return arr;
}
console.log(mySlice([1,2,3,3,4,5,6,7]))
// 伪数组挺好的为啥要转换成真数组呢 ? 		答：因为数组的API只有真数组才能使用
```

# sort()函数排序

缺点：如果数组中出现大于10的数，会按照第1位数进行比较排序

解决方法：

```javascript
var arr = [2,33,10,2,23,4,5,26,77,80];
console.log(arr.sort());	//输出10,2,2,23,26,33,4,5,77,80
arr.sort( function(a,b){
	// console.log(a,b);
	return b - a;
});
```

