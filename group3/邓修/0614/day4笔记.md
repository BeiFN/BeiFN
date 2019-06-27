# 对象

**JS万事万物皆对象**

> 关于控制台：如果控制台在未打开状态，会把所有的性能放在渲染上，放在js解析上，不会给控制台分配太多的性能，所以显示的日志都是比较笼统的数据。如果打开则会显示详细内容。

**对象的本质是存数据**

- 作用就是将同类别的数据放在一起集中管理

**运算符："."运算符和"[ ]"运算符**

1. "."  ==>  点后面的内容比较特殊，既不是变量又不是字符串。 而是直接写的字母，这个字母之基本表示对象之中的key值;

   ```javascript
   console.log(group1.a);
   ```
   
2. "[ ]"  ==> 中括号里面加上**字符串**

  ```javascript
  console.log(group1["a"]);
  ```

**遍历：取出所有值**

for in 循环：用来遍历对象或数组

```javascript
for(var i = 0 ; i < 10 ; i++){
}

for(var key in group1 ){
	console.log(key , group1[key] );
}
```

in关键字：表示某个属性是否存在于对象之中

```javascript
console.log("a" in group1);
console.log("f" in group1);
```

**tip：在for in 循环之中想要取得变量中字符串的key值，必须使用"[ ]"**

### 声明对象的两种方法

```javascript
var obj = {};  // 字面量声明;  
var obj2 = new Object();    // 构造函数;
// 带有 new 的函数调用是构造函数调用;
console.log(obj,obj2);
// 长得一样，但是他俩是否相等呢 ????? 	不相等，obj和obj2中存储的都是地址，是不同对象的地址
console.log(obj === obj2);
```

**删除对象中的值：delete**

```javascript
var obj = { a : 10};
delete obj.a;
console.log(obj);//输出为空
```

# 引用类型

**包含：函数、对象和数组**

**基本类型和引用类型的区别：**

- 基本类型在变量中存的是值；比对的时候是值比对；
- 引用类型存的是地址。

```javascript
var obj1 = {};
var obj2 = {};
var obj3 = obj1;
console.log(obj1 === obj3);//true

var n = 0;
n = n + 1;

function foo(o){
    // o 指向 {a : 10}
    o.a ++;
}
var obj = {a : 10};  // obj里面其实是这个对象的地址;
foo(obj); //传的是{a : 10}这个对象的地址
console.log(obj);

function foo(o){
    o.a++;
    o = {a : 20}
    o.a ++;
}
var obj = {a : 10};
foo(obj);
console.log(obj);// 11 
```

##### 总结

内存中的进出方式：

栈 :  FILO  先进后出

堆 :  FIFO  先进先出

------

一条数据 :  key : value 

hash 哈希关系; 表示唯一对应

------

引用类型：函数，对象，数组

# arguments

arguments 关键字 

```javascript
function foo(){
    console.log(arguments);
    // 伪数组;
}

foo();//Object
console.log(typeof {});//Object
console.log(typeof []);//Object
```

 **instanceof ：判定原产地；**

```javascript
console.log({} instanceof Array);//false，是对象
console.log([] instanceof Object);//true
function foo(){
}
console.log(foo instanceof Function);//true
```

**tip : instanceof 这个东西尽量别判断 Object，不准；**

**arguments是用来处理不定参 (不确定有几个参数的 )的**

```javascript
function foo(){
    console.log(arguments);
    // arguments : 参数们;
    // 如何访问 ? 
    //console.log(arguments[0]);
    var sum = 0;
    for(var index in arguments){
        console.log(arguments[index]);
        sum += arguments[index];
    }
    // 额外的一点小东西; for循环遍历数组;

    for(var i = 0 ; i < arguments.length ; i ++){
       	console.log(i);
       	console.log(arguments[i]);
    }

    // 高阶方法;

    // 特性 ;
    // var obj = {};
    // 访问对象 | 数组之中的某个下标|key的时候,如果该下标|key值没有声明，没有赋值,此时取得的值是undefined;
    // console.log(!!obj.a);

    // arguments[i++] == 0 || arguments[i] 
    for( var i = 0 , value ; value = arguments[i++] ;){
    	console.log(value);
    }

    return sum;
}
foo(1,2,3,45,6,7,8,9)
```

三元运算符：是 if else 的简写

`boolean ? trueValue : falseValue;`

**总结 :** 

1. 类型的判断：伪数组 ==> instanceOf ；
2. arguments 遍历；for in；for；for进阶写法；
3. arguments =*=>* 处理函数不定参的时候我们会使用；

**补充 :** 

```javascript
function foo(){

    console.log(arguments);

    //callee 指向函数本身;

    console.log(arguments.callee);

    arguments.callee();

}

foo();
```

# 闭包

**考试系统问题：** 

```javascript
(function(){
    var answer = { "1" : "A" , "2" : "B" , "3" : "C"};
    function foo(){
        // 这里面的代码;
        console.log(answer);
        // 都是不可更改的 , 这里的逻辑代码都是绝对保密的;
    }
    foo();
})();
```

作用域链；

变量的隐私性；

局部变量的生命周期延长了；

```javascript
var foo = (function(){
    var answer = { "1" : "A" , "2" : "B" , "3" : "C"};
    function foo(){
    	console.log(answer);
    }
    return foo;
})();
foo();
document.onclick = foo;
```

**前提 : 函数嵌套；**

1. 外部函数声明的变量,在内部函数被引用了；
2. 内部函数被返回到了全局，进行随时的引用。

闭包的故事：

> ​            有人问我年龄，我告诉他 undefined；
>
> ​            偷我身份证；送了我一直猫(间谍猫)；
>
> ​            给了他我家的钥匙；
>
> ​            借着看猫的名义来查看我的年龄。

```javascript
function home(){
    var ID = 16;
    var cat = function(){
        for(var i = 0 ;  i < ID ;  i++){
        	console.log("喵");
        }                        
    }
    return cat;
}
var key = home();
key();
```

**总结：声明提升会先提升局部(变量声明)，再提升整体(函数声明)；**

# 数组

```javascript
// 数组; 
// 一组数据 , 有序数列;
// 1. 数组声明方式的不同，有什么不同么 ? 
// var arr1 = [10];
// console.log(arr1);
// 构造函数如果只传递一个参数的话，那么意味着当前构造的数组有参数值个空项; 
// var arr2 = new Array(10);
// console.log(arr2);
// 对 数组结构实现 增删改查;
// 增 ;
var arr = [1,2,3,4,5,9,7,8,9,"hhh",true,function(){ alert("过分!!!!")} , {}];
console.log(arr);
arr[11]();
foo(1)(2)(3)(4);
function foo(a){
    return function(b){
        return function(c){
            return function(d){
            	console.log(a + b + c + d);
            }
        }
    }
}           
// 删除 ; 
// 1. 清空 ;
// arr.length = 0;
// console.log(arr);
// 2. 清空;
// arr = [];

// ***改 ;
var arr = [1,2,3,4,5,6];
// 对项的修改
// 1. 静态赋值;
// arr[0] = 10;
// console.log(arr);
// 2. 删除之后重新复制 ;  数组 API , 专门为数组类型创建的API，仅对数组有效;

// Array.prototype.pop()
// Array.prototype.push()
// Array.prototype.shift()
// Array.prototype.unshift()
// Array.prototype.splice()

// pop 是删除数组最后一项的方法 ;  pop的返回值是删除掉的数据;
// console.log(arr.pop());
// console.log(arr);
// push 是想数组后面新增数据的方法 ; push 的返回值是新数组的length ;  
// console.log(arr.push(8,1,2,3,4,5,6,6,8,9,9));
// console.log(arr);
// shift 是删除数组第一项的方法 ; shift的返回值是删除掉的数据;

// ① 删除对应位置的内容 ;
// console.log(arr.shift());
// console.log(arr.unshift(10));
// splice (index,2)
// console.log(arr.splice(3,2))
// console.log(arr);
// ② 可以替换删除掉的内容;

// console.log(arr.splice(3,1,"hello world"));
// console.log(arr);

// 拼接;
// Array.prototype.concat()
// var arr1 = [1,2,3];
// var arr2 = [4,5,6];
// var arr3 = [4,5,6];
// console.log(arr1.concat(arr2,arr3));
// 数组的转换功能 ;
// 把数组转换成字符串;
// Array.prototype.join()
// var arr = [2019,6,14];
// // "2019/6/14"
// console.log(arr.join("/"))
// console.log(arr.join("~"))
// // Array.prototype.toString()
// console.log(arr.toString());
// 查 
// 遍历;
var arr = [1,2,3,4,5,3,6];
// for in  for ;

for(var index in arr){
	console.log(arr[index]);
}
// 找某一项在数组之中的位置;
console.log(arr.indexOf(3));    // 3 在数组之中的下标;
console.log(arr.lastIndexOf(3));// 3 在数组之中的下标;
// Array.prototype.indexOf()
// Array.prototype.lastIndexOf() 
// Array.prototype.slice()
// slice();
// 概述 : 根据传入参数截取原数组，返回新数组;
// 参数 : slice([start,[end]])
// 返回值 : 截取之后的新数组;
```

