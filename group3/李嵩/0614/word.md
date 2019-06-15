1. Array.prototype.pop() 删除数组最后一项的方法 ; pop的返回值是删除掉的数据
2. Array.prototype.push() 向数组后面新增数据的方法 ;push的返回值是新数组的length
3. Array.prototype.shift() 删除数组第一项的方法 ; shift的返回值是删除掉的数据
4. Array.prototype.unshift() 向数组第一项前新增数据的方法 ; unshift的返回值是新数组的length
5. **Array.prototype.splice() 可以删除指定的某一项（包括这一项）之后的n项，还可以替换删除的内容
     例：console.log(arr.splice(3,1,"hello world"));从第三项开始删除一项，用"hello world" 代替；
6. Array.prototype.contact() 拼接数组
7. Array.prototype.join() 数组的转换功能 ; 把数组转换成字符串,并在其中用指定字符连接
8. Array.prototype.toString() 把数组转换成字符串
9. Array.prototype.indexOf() 找某一项在数组中出现的位置(从前往后找)
10. Array.prototype.lastIndexOf() 找某一项在数组中出现的位置(从后往前找)
11. Array.prototype.slice() 返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
   arr.slice();// [0, end]
   arr.slice(begin);// [begin, end]
   arr.slice(begin, end);// [begin, end)
     例：var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
         console.log(animals.slice(2));从[2]到最后一个 // expected output: Array ["camel", "duck", "elephant"]
         console.log(animals.slice(2, 4));从[2]到[3]  // expected output: Array ["camel", "duck"] 
         console.log(animals.slice(1, 5));从[1]到[4]  // expected output: Array ["bison", "camel", "duck"，"elephant"]
12. instanceof 判定原产地，即判定类型, 尽量别判断 Object ，不准;
13. arguments.callee 指向函数本身