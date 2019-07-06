function log() {
    console.log.apply(false, arguments)
}
// ES6 加强了对 Unicode 的支持
// log("\u0061");
// 这种表示法只限于码点在\u0000~\uFFFF之间的字符

// log("\uD842\uDFB7");

// 超过了 ？？？？？ 
// log("\u20BB7");
// \u20BB是一个不可打印字符
// 只会显示一个空格，后面跟着一个7。
// ↓ 
// ↓ 
// ↓ 
// ↓ 
// 将码点放入大括号，就能正确解读该字符
// log("\u{20BB7}"); //正常显示
// "𠮷"
// log("\u{41}\u{42}\u{43}");
// "ABC"

// let hello = 123;
// hell\u{6F} 
//  在浏览器可以哦  \u{6F} = o


// 大括号表示法与四字节的 UTF-16 编码是等价
// log('\u{1F680}' === '\uD83D\uDE80');



// So  JavaScript 共有 6 种方法可以表示一个字符
// log('\z' === 'z');
// log('\172' === 'z');
// log('\x7A' === 'z');
// log('\u007A' === 'z');
// log('\u{7A}' === 'z');
// true
// true
// true
// true
// true



//  ES6 为字符串添加了遍历器接口 
// for...of
// 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

let text = String.fromCodePoint(0x20BB7);

// for (let i = 0; i < text.length; i++) {
//     console.log(text[i]);
// }
// " "
// " "

// for (let i of text) {
//     console.log(i);
// }

// "𠮷"



// for (let i of "我爱你 xg") {
//     console.log(i);
// }

// 我
// 爱
// 你
// 
// x
// g


// JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式\u4e2d，两者是等价的。

// log('\u4e2d' + "国");

// JavaScript 规定有5个字符，不能在字符串里面直接使用
// U+005C：反斜杠（reverse solidus)
// U+000D：回车（carriage return）
// U+2028：行分隔符（line separator）
// U+2029：段分隔符（paragraph separator）
// U+000A：换行符（line feed）
// log("反斜杠", '\u005c');
// log("回车", '\u000D');
// log("行分隔符", '\u2028');
// log("段分隔符", '\u2029');
// log("换行符", '\u000A');



// 规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）
// const json = '"\u2028"';
// JSON.parse(json); // 可能报错

// ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

// log(JSON.stringify('\u{D834}'));
// // ""\\uD834""
// log(JSON.stringify('\uDF06\uD834'));
// ""\\udf06\\ud834""



// ES6 引入了模板字符串
// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。


// 普通字符串

// log(`In JavaScript '\n' is a line-feed.`);
// // 多行字符串
// log(`In JavaScript this is
// not legal.`);

// console.log(`string text line 1
// string text line 2`);

// // 字符串中嵌入变量
// let name = "ZM",
//     time = "today";
// log(`Hello ${name}, how are you ${time}?`);

// 模板字符串之中还能调用函数。

// log(
//     `
//     函数调用 ：
//     ${
//      (function(){
//            return "函数返回值";
//        })() 
//     }
//     `
// );


// 由于模板字符串的大括号内部，就是执行 JavaScript 代码，因此如果大括号内部是一个字符串，将会原样输出。

// log(`Hello ${'World'}`);
// 如果需要引用模板字符串本身，在需要时执行，可以写成函数。


// let func = (name) => `Hello ${name}!`;
// log(func('zm'));

// 使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。
let list = `
<ul>
<% for(var i =0 ; i<5 ;i++) { %>
<li><%=i%></li>   
<%}%>
</ul>
`;

// 标签模板其实不是模板，而是函数调用的一种特殊形式

// alert`123`
// // 等同于
// alert(123)


// 在传入参数时
// 第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推。

// 看哈啊 啥意思 ？
// function foo() {
//     console.log(arguments);
// }

// let [a,b]=[1,5];
// foo`你好${a*b},我好${a+b}`;
// 函数实际上以下面的形式调用。
// foo(["你好", ",我好", ""],5,6)
// 0: (3) ["你好", ",我好", "", raw: Array(3)]
// 1: 5
// 2: 6



// >为哈理解他了？    看下面分解

let money = 30;
let msg = passthru `You need to pay ${money} yuan (saved ${money*0.15} yuan)`;

function passthru(literals) {
    let result = '';
    let i = 0;
    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }
    return result;
}
// passthru函数采用 rest 参数的写法如下。
function passthru(literals, ...values) {
    let output = "";
    let index;
    for (index = 0; index < values.length; index++) {
        output += literals[index] + values[index];
    }

    output += literals[index]
    return output;
}
//   上面这个例子展示了，如何将各个参数按照原来的位置拼合回去。
log(msg);

// 输出相同
// '\u004F\u030C'
// "Ǒ"
// '\u01D1'
// "Ǒ"
// 但是 JavaScript 不能识别
// ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

// '\u01D1'.normalize() === '\u004F\u030C'.normalize()
// // true

// normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下。

// NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
// NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
// NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
// NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

// 实例方法：
// includes()
// startsWith()
// endsWith()
// 传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。


// repeat方法返回一个新字符串，表示将原字符串重复n次。

// 参数如果是小数，会被取整。

// 'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。

// 如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。



// padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

// 'abc'.padStart(10, '0123456789')
// '0123456abc'

// 如果省略第二个参数，默认使用空格补全长度。

// 'x'.padStart(4) // '   x'
// 'x'.padEnd(4) // 'x   '

// ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

// 实例方法：matchAll()
// matchAll()方法返回一个正则表达式在当前字符串的所有匹配，详见《正则的扩展》的一章。

// log();
// log();
// log();
// log();
// log();
// log();