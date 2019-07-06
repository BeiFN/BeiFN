以前我们经常用var来声明变量，但是用var声明存在声明提升，在ES6中我们用let声明变量，用const来声明常量。
let生命的变量：
    1.有块级作用域的概念。（大括号作用域）
    2.不允许声明提升了。
    3.暂时性死区。

let使作用域的创造更加自然了，不再使用匿名函数作为作用域，而是使用大括号直接作为作用域。减少了匿名函数的使用频率。

暂时性死区：在变量声明时，变量之前所有的空间，不允许使用这个变量。
tip：在同一作用域之中，不允许重复声明变量。

const定义之后不可赋值。



解构赋值：

数组赋值：let[a,b,c,d] = [1,2,3,4,5,6,7] 赋值形式为：a=1，b=2， c=3， d=4
剩余运算符：let[a,b,c,...d] = [1,2,3,4,5,6,7] 赋值形式为：a=1，b=2,c=3,d=[4,5,6,7]

对象复制：
let obj = { a : 10};
let { a } = obj ; //相当于 var a = obj.a ;
console.log(a);//输出结果为10；


数组的方法都放在数组的原型之中；
var slice = Array.prototype.slice;
var concat = Array.prototype.concat;
console.log(slice,concat);
用ES6的方法来写：
let{ slice, concat} = Array.prototype;

改名机制：{ 原有属性：新变量名}
例如：我们想去的slice，但是上面中有let slice了，所以我们要进行改名；

let { slice : mySlice , concat} = Array.prototype;

默认参数：

带有默认参数的赋值：

let { a = 10 , b = 20 , c = 50 } = { a : 30 , b : 40}
console.log(a,b,c);// 30 40 50

函数中默认参数的写法：
function Banner( { a= 10 , b = 20} = {  }){
    console.log（a , b）；// 40 20
}
new Banner({ a : 40})



总结：
对象解构赋值：

    1.基本结构：对象的解构赋值要求左右两侧必须均为大括号，否则报错。
    let {} = {};
2.基本使用 : 变量声明  属性赋值

let { a , b } = { a : 1 , b : 2};
声明了变量a和b，并且给变量赋值为对象.a 和 对象.b

3.变量别名  给c 变量赋值对象.a 的属性值；
let { a : c , b } = { a : 1 , b : 2}; 

4.默认参数： let { } =  { } ；
像我们之前做的轮播图默认参数可以优化为：

function Foo({effect = "slide" , pagibation = ".pagination" } = { }){
}
new Foo({ effect : "slide"});

















