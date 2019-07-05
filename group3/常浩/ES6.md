###  数组的解构赋值
```javascript
    let [a,b,c] = [1,2,3]  //可以进行一对一的变量赋值
    let [a,,c] = [1,2,3,4] // c = 4
    //如果说是解构不成功的话 就会返回undefined
    let [a,b,c] = [1,2] // c 的值就是undefined；
    // 不完全解构
    let [a,[b],c]  = [1,[2,3],4]  //b 是2 c是4
    // 如果说右边的不是数组（不可遍历的解构 那么就会报错）
    let [a] = 1; //报错
    // 如果说右边的是一个函数  函数的返回值是一个数组的话 也是可以的； 因为它具有Iterator接口 （迭代器）；
```
#### 默认值
```javascript
    let [foo = true] = [];
    foo // true 
    let [x,y = "b"] = ["a"]; // x = "a" , y = "b"    
    let [x,y = "b"] = ["a",undefiend];  // y = "b" 因为y存在默认值 "b" 如果为undefined的话  默认值就会生效

    //  在ES6中判断一个位置是否有值  用的是 === 模式 也就意味着 null 不等于undefined；
    let [x = 1] = [ null ]; // x =  null; 不会触发默认值

    //如果说默认值是一个函数的话  ，那么这个函数就是一个惰性求值 ，只有当没有值、undefined的时候才会去进行运算。

    function f() {
        console.log('aaa');
    }

    let [x = f()] = [1];  // 此时的函数是没有进行运算求值的；因为x 是可以取到值得  1；
    let [x = f()] = []  // 此时的函数f才是会进行运算求值的。

    let [x = 1, y = x] = [];     // x=1; y=1 因为y的值是引用x的值   而x的值是1  所以y也等于1 
    let [x = 1, y = x] = [2];    // x=2; y=2 因为y得值是引用x的值  而x的值被重新赋值2 所以y也等于2
    let [x = 1, y = x] = [1, 2]; // x=1; y=2  也因为y这是是可以取到值得  所以y 是2
    let [x = y, y = 1] = [];     // ReferenceError: y is not defined  因为 x = y   此时的y还没有被声明 没有定义  所以是会报错的。

```

### 对象的解构赋值 (匹配模式的赋值)
* 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```javascript 
    let { foo, bar } = {foo:"aaa",bar : "bbb"}
    foo // "aaa"
    bar // "bbb"

    let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
    foo // "aaa"
    bar // "bbb"

    let {foo} = {bar: 'baz'};
    foo // undefined   因为没有同名的属性  所以解构失败  变量的值为undefined；
    
    

    //对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
    const { log } = console;
    log('hello') // hello
    let {  sin, cos } = Math;  //把Math对象的sin、cos 方法赋值到对应的变量上去。

    //如果是变量名与属性名不一致，也是可以进行以下的操作的
    let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa" 此时我们把“aaa”  赋给了 baz

    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    f // 'hello'
    l // 'world'

    //对象的解构赋值是下面形式的简写
    let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };


    let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa"
    foo // error: foo is not defined
    //foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。但是一旦父级foo匹配不到  就会报错

    let {foo: {bar}} = {baz: 'baz'};
```
#### 默认值
```javascript
    var {x = 3} = {};
    x // 3  x取不到值 触发默认值

    var {x, y = 5} = {x: 1};
    x // 1   
    y // 5

    var {x: y = 3} = {};
    y // 3  匹配模式的赋值  父级x没有匹配到  触发默认值的属性

    var {x: y = 3} = {x: 5};
    y // 5 

    var { message: msg = 'Something went wrong' } = {};
    msg // "Something went wrong"

    //由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
    let arr = [1,2,3];
    let {0:first,[arr.length - 1] : last} = arr;
    first //1
    last //2 
    //first 的父级是0  对应的是数字的下标 所以是第一个数字 1；
```
### 字符串的解构赋值
```javascript
    const [a, b, c, d, e] = "hello";
    a // "h"
    b // "e"
    //此时的字符串是被转成一个类似数组的对象了

    //类似于数组的对象都有一个 length属性
    let {length : len} = "hello";
    len  // 5  是代表的字符创的长度

```
### 数值和布尔值的解构赋值
>  没有搞懂

### 函数参数的解构赋值
```javascript
    function add([x, y]){
        return x + y;
    }

    add([1, 2]); // 3

    //默认值
    function move({x = 0, y = 0} = {}) {
        return [x, y];
    }

    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]
    //此时的参数是一个对象  让后对对象进行解构赋值  如果是解构失败 那么久触发默认值


    function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
    }

    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, undefined]
    move({}); // [undefined, undefined]
    move(); // [0, 0]


    //这种写法是将函数的参数固定然后指定默认值，  当不传参数的时候是undefined  是会触发默认的值   一旦传入参数 就会进行解构赋值  匹配不到的话就是会返回undefined。
```
## 解构赋值的用途
* 交换变量的值
```javascript
    let x = 1;
    let y = 2;

    [x, y] = [y, x];
```
* 从函数返回多个值
```javascript
    //函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

    // 返回一个数组

    function example() {
        return [1, 2, 3];
    }
    let [a, b, c] = example();

// 返回一个对象

    function example() {
        return {
            foo: 1,
            bar: 2
        };
    }
    let { foo, bar } = example();

```
* 函数参数的定义
> 解构赋值可以方便地将一组参数与变量名对应起来。
```javascript
    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3]);

// 参数是一组无次序的值
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1});
```
* 提取JSON数据
```javascript
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]
```
* 函数参数的默认值
```javascript
     function move({x = 0, y = 0} = {}) {
        return [x, y];
    }

    function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
    }
```

##字符串的新增方法
> padStart()，padEnd() 补齐长度
```javascript
    //padStart()，padEnd()
    'abc'.padStart(10, '0123456789') // '0123456abc'  如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。


    'x'.padStart(4) // '   x'
    'x'.padEnd(4) // 'x   '
    //如果省略第二个参数，默认使用空格补全长度。

    '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
    //其中一个用途是提示字符串格式。
```
> trimStart()，trimEnd()  消除空格
```javascript
    const s = '  abc  ';

    s.trim() // "abc"
    s.trimStart() // "abc  "
    s.trimEnd() // "  abc"

    //浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。 其效果用途是一致的；
```

### 正则的扩展
* RegExp 构造函数
> 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
```javascript
    var regex = new RegExp('xyz', 'i');
    // 等价于
    var regex = /xyz/i;
```
> 第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
```javascript
    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;
```
>但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错。
```javascript
    var regex = new RegExp(/xyz/, 'i');
    // Uncaught TypeError: Cannot supply flags when constructing one RegExp from another
```
>ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
```javascript
    new RegExp(/abc/ig, 'i').flags
    // "i"
```

*  u修饰符 
> ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
> 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
```javascript
    var s = '𠮷';

    /^.$/.test(s) // false
    /^.$/u.test(s) // true
```
> i 修饰符   有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
```javascript
    /[a-z]/i.test('\u212A') // false
    /[a-z]/iu.test('\u212A') // true
```
### 数值的扩展
* 指数运算  （**）
```javascript
   2 ** 2 // 4
   2 ** 3 // 8 

   //这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
   // 相当于 2 ** (3 ** 2)
    2 ** 3 ** 2    // 2的9次方
    // 512
```
*   赋值运算符 **=
```javascript
    let a = 1.5;
     **= 2;
    // 等同于 a = a * a;

    let b = 4;
    b **= 3;
    // 等同于 b = b * b * b;    
```

### 函数的扩展
> 一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
```javascript
    let x = 99;
    function foo(p = x + 1) {
        console.log(p);
    }

    foo() // 100

    x = 100;
    foo() // 101

    //上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。
```