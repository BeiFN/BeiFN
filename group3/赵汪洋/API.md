document.write();
	在浏览器中打印出内容。
		eg：document.write("Hello World");



document.writeln();
	在浏览器中打印出内容并换行。
		ps：JS解析后的源代码换行，但打印出的实际内容并不换行。



alert();
	alert代表警告，（）代表功能的执行。
		ps：弹出警告框后，只要不点击确定，那么后面的代码就无法执行。（代码阻塞）



console.log();
	在控制台打印出内容。
		ps：document.wirte() 会覆盖页面原有的内容，因此我们平时测试，都会将信息输出到控制台  console.log(xxxxxx);



console.error();
	显示红色报错并打印出内容。



.toString()；
	变量.toString(需要转换成的进制数)；
		将数字转换为指定的进制格式> toString(进制);
			ps：只对number类型有效，对其他都无效，包括纯数字的字符串，会原样打印出来。



parseInt()
	parseInt(具体的值或变量名)
		作用: 把任何数据类型转换成整数类型;并且可以忽略数字后面的字符
		强制将其他类型装换成数字的时候，如果该类型根据方法规则实在无法转换，这个时候方法会返回	NaN表示转换错误，但是我尽力了。
		从左到右依次检索遇到的每一个字符; 如果有任意一个不为数字的字符，会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN;
	parseInt(具体的值或变量名,进制)
		字符串内值的进制 => 十进制
		第二个参数表示第一个参数的原进制形式
		转换形式与取整的用法相同，会从第一个数字或字符检索可以转换的数值（如果第二个参数为2，能检索到的只有0和1，其他都不能转换，以此类推8和16），如果第一个数字都不满足条件，返回NaN，如果第一个满足，会往后逐个检索，直到检索到不满足条件的那一个数字或字符为止，输出从第一个到检索到的最后一个满足条件的字符或数字转换成十进制的结果。
		疑问：
var a = 0xaf;
console.log(parseInt(a, 16)); // 373



parseFloat()
	允许原内容带小数点
	从左到右依次检索遇到的每一个字符; 如果有字符破坏了数字规则,会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN



Number();
	进行整体的数据类型变换; 只要存在任何不符合数字规则的部分，那么会被转换成NaN;
		ps：只针对纯数字内容的字符串转换有效，且只对运行的结果有效，不会对原字符串的值和数据类型产生任何影响。



isNaN();
	判断该变量是否为NaN。
		isNaN(变量名);



Math.pow(, )
	Math.pow(7, 4)，表示7的4次方。



flag
	标识变量。



typeof()
	验证数据类型;



.toFixed();
	保留n位小数。
		变量.toFixed(n);
		传统方法
			

toDateString()

​	以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。



setInterval()

```html
let intervalID = window.setInterval(func, delay[, param1, param2, ...]);
let intervalID = window.setInterval(code, delay);
```

​	重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟。返回一个 intervalID。

​	`intervalID` 是此重复操作的唯一辨识符，可以作为参数传给`clearInterval``()`。

- `func` 是你想要重复调用的函数。
- `code` 是另一种语法的应用，是指你想要重复执行的一段字符串构成的代码(使用该语法是**不推荐**的，不推荐的原因和[eval()](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval#Don't_use_eval!)一样)。
- `delay` 是每次延迟的毫秒数 (一秒等于1000毫秒)，函数的每次调用会在该延迟之后发生。和[setTimeout](https://developer.mozilla.org/en-US/docs/DOM/window.setTimeout#Minimum_delay_and_timeout_nesting)一样，实际的延迟时间可能会稍长一点。

getElementById()
	Document的方法getElementById()返回一个匹配特定 ID的元素. 由于元素的 ID 在大部分情况下要求是独一无二的，这个方法自然而然地成为了一个高效查找特定元素的方法。
	如果需要查找到那些没有ID 的元素，你可以考虑通过CSS选择器使用 querySelector()。
	语法:var element = document.getElementById(id);
	参数:element是一个 Element 对象。如果当前文档中拥有特定ID的元素不存在则返回null.
		id是大小写敏感的字符串，代表了所要查找的元素的唯一ID.
	返回值:返回一个匹配到 ID 的 DOM Element 对象。若在当前 Document 下没有找到，则返回 null。

Element
	Element是非常通用的基类，所有 Document对象下的对象都继承它. 这个接口描述了所有相同种类的元素所普遍具有的方法和属性。 这些继承自Element并且增加了一些额外功能的接口描述了具体的行为. 例如,  HTMLElement 接口是所有HTML元素的基础接口， 而 SVGElement 接口是所有SVG元素的基本接口.大多数功能在类的层次中进一步制定.
	在web以外的语言,像 XUL 可以通过 XULElement 接口, 同样也实现了Element接口.

onfocus
	概述:onfocus 属性用来获取或设置当前元素的focus事件的事件处理函数.
	语法:element.onfocus = event handling code
	备注:当前元素获得键盘焦点时会触发focus事件.
		在IE中,几乎所有类型的元素都会触发focus事件, 但在Gecko中,只有少数几种类型的元素会触发focus事件.

onblur
	概述:onblur属性用来获取或设置当前元素的onBlur事件的事件处理函数
	语法:element.onblur = function;
		function 是一个函数名, 没有括号()和任何参数,也可以是一个匿名函数,如下:
		element.onblur = function() { alert("检测到onblur事件!"); };
	备注:当一个元素失去焦点时会触发blur事件.
		在IE中,几乎所有类型的元素都可以触发blur事件,但在基于gecko的浏览器中,大部分元素都不能触发blur事件.

onload
	GlobalEventHandlers mixin 的 onload 属性是一个事件处理程序用于处理Window, XMLHttpRequest, <img> 等元素的加载事件，当资源已加载时被触发。
	语法:window.onload = funcRef;
		当 window  load  事件触发时，funcRef 方法会被调用。
	Value:funcRef 是窗口加载事件触发时调用的处理函数。