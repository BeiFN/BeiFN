# 常用API（应用、编程、接口）： 

#### document.write();
​	在浏览器中打印出内容。
​		eg：document.write("Hello World");

#### document.writeln();
​	在浏览器中打印出内容并换行。
​		ps：JS解析后的源代码换行，但打印出的实际内容并不换行。

#### alert();
​	alert代表警告，（）代表功能的执行。
​		ps：弹出警告框后，只要不点击确定，那么后面的代码就无法执行。（代码阻塞）

#### confirm();
​	返回值:	确定:true 取消:false
​	会根据用户的操作给我们程序一个反馈

#### prompt();
	弹出一个文本框。
​	会根据用户的操作给我们程序一个反馈

#### console.log();
​	在控制台打印出内容。
​		ps：document.wirte() 会覆盖页面原有的内容，因此我们平时测试，都会将信息输出到控制台  console.log(xxxxxx);

#### console.error();
​	显示红色报错并打印出内容。

#### .toString()；
​	变量.toString(需要转换成的进制数)；
​		将数字转换为指定的进制格式> toString(进制);
​			ps：只对number类型有效，对其他都无效，包括纯数字的字符串，会原样打印出来。

#### parseInt()
​	parseInt(具体的值或变量名)
​		作用: 把任何数据类型转换成整数类型;并且可以忽略数字后面的字符
​		强制将其他类型装换成数字的时候，如果该类型根据方法规则实在无法转换，这个时候方法会返回	NaN表示转换错误，但是我尽力了。
​		从左到右依次检索遇到的每一个字符; 如果有任意一个不为数字的字符，会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN;
​	parseInt(具体的值或变量名,进制)
​		字符串内值的进制 => 十进制
​		第二个参数表示第一个参数的原进制形式
​		转换形式与取整的用法相同，会从第一个数字或字符检索可以转换的数值（如果第二个参数为2，能检索到的只有0和1，其他都不能转换，以此类推8和16），如果第一个数字都不满足条件，返回NaN，如果第一个满足，会往后逐个检索，直到检索到不满足条件的那一个数字或字符为止，输出从第一个到检索到的最后一个满足条件的字符或数字转换成十进制的结果。
​		疑问：
var a = 0xaf;
console.log(parseInt(a, 16)); // 373

#### parseFloat()
​	允许原内容带小数点
​	从左到右依次检索遇到的每一个字符; 如果有字符破坏了数字规则,会删除掉这个字符及后面的全部内容。如果第一个字符就是非数字，那么返回 NaN

#### Number();
​	进行整体的数据类型变换; 只要存在任何不符合数字规则的部分，数值会被转换成NaN;
​		ps：只针对纯数字内容的字符串转换有效，且只对运行的结果有效，不会对原字符串的值和数据类型产生任何影响。

#### isNaN();
​	判断该变量或数值是否为NaN。

#### Math.pow(, )
​	Math.pow(7, 4)，表示7的4次方。

#### flag
​	标识变量。

#### typeof()
​	验证数据类型;

#### .toFixed();
​	保留n位小数。
​		变量.toFixed(n);
​		传统方法：num = parseInt(num * Math.pow(10, n)) / Math.pow(10, n);
​			
#### toDateString()
​	以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。

#### setInterval()
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

#### Element
​	Element是非常通用的基类，所有 Document对象下的对象都继承它. 这个接口描述了所有相同种类的元素所普遍具有的方法和属性。 这些继承自Element并且增加了一些额外功能的接口描述了具体的行为. 例如,  HTMLElement 接口是所有HTML元素的基础接口， 而 SVGElement 接口是所有SVG元素的基本接口.大多数功能在类的层次中进一步制定.
​	在web以外的语言,像 XUL 可以通过 XULElement 接口, 同样也实现了Element接口.

#### onfocus
​	概述:onfocus 属性用来获取或设置当前元素的focus事件的事件处理函数.
​	语法:element.onfocus = event handling code
​	备注:当前元素获得键盘焦点时会触发focus事件.
​		在IE中,几乎所有类型的元素都会触发focus事件, 但在Gecko中,只有少数几种类型的元素会触发focus事件.

#### onblur
​	概述:onblur属性用来获取或设置当前元素的onBlur事件的事件处理函数
​	语法:element.onblur = function;
​		function 是一个函数名, 没有括号()和任何参数,也可以是一个匿名函数,如下:
​		element.onblur = function() { alert("检测到onblur事件!"); };
​	备注:当一个元素失去焦点时会触发blur事件.
​		在IE中,几乎所有类型的元素都可以触发blur事件,但在基于gecko的浏览器中,大部分元素都不能触发blur事件.

#### onload
​	GlobalEventHandlers mixin 的 onload 属性是一个事件处理程序用于处理Window, XMLHttpRequest, <img> 等元素的加载事件，当资源已加载时被触发。
​	语法:window.onload = funcRef;
​		当 window  load  事件触发时，funcRef 方法会被调用。
​	Value:funcRef 是窗口加载事件触发时调用的处理函数。

#### slice()
	提取一个字符串或数组的一部分，并返回一新的字符串或数组。
	slice(1,4)表示[1,4)

#### splice()
	通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
	var months = ['Jan', 'March', 'April', 'June'];
	// 增
	months.splice(1, 0, 'Feb');
	console.log(months); // Array ['Jan', 'Feb', 'March', 'April', 'June']
	// 改
	months.splice(4, 1, 'May');
	console.log(months); // Array ['Jan', 'Feb', 'March', 'April', 'May']

#### offsetWidth
	HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。一个典型的（译者注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。

#### insertBefore()
	在参考节点之前插入一个拥有指定父节点的子节点。
	如果给定的子节点是对文档中现有节点的引用，insertBefore()会将其从当前位置移动到新位置(在将节点附加到其他节点之前，不需要从其父节点删除该节点)。

#### eval()
	会将传入的字符串当做 JavaScript 代码进行执行。
	语法:eval(string)
	参数:string:表示JavaScript表达式，语句或一系列语句的字符串。表达式可以包含变量以及已存在对象的属性。
	返回值:执行指定代码之后的返回值。如果返回值为空，返回undefined

#### scrollIntoView

#### focus

#### blur

#### setInterval

#### clearInterval

#### setTimeOut

#### clearTimeOut

#### time()

#### timeEnd()

#### clientHeight
	获取可视窗口的高度。
	var clientHeight = document.documentElement.clientHeight;
	这个属性是只读属性，对于没有定义CSS或者内联布局盒子的元素为0，否则，它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。
	clientHeight 可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.
	语法:var h = element.clientHeight;
	返回整数 h，表示 element 的 clientHeight（单位像素）。
	clientHeight 是只读的.

#### transform
	CSStransform属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。

#### transition
	指定某个元素让他的移动有个具体过程。
	transition: all 0.5s;

#### fromCharCode()
	静态 String.fromCharCode() 方法返回由指定的UTF-16代码单元序列创建的字符串。

#### toLocaleLowerCase()
	toLocaleLowerCase()方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。
	toLocaleLowerCase()方法返回调用该方法的字符串被转换成小写之后的值，转换规则根据任何本地化特定的大小写映射。toLocaleLowerCase()并不会影响字符串自身的值。在大多数情况下，该方法产生的结果和调用toLowerCase()的结果相同，但是在某些本地环境中，比如土耳其语，它的大小写映射并不遵循在Unicode中的默认的大小写映射，因此会有一个不同的结果。

#### offsetTop
	HTMLElement.offsetTop 为只读属性，它返回当前元素相对于其 offsetParent 元素的顶部的距离。

#### offsetParent
	HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的

#### pushState(state, title, url)
	无刷新的向浏览器 历史最前方 加入一条记录。
	state(any) 需要保存的数据，这个数据在触发popstate事件时保存在event.state上。
	title(string)：
	url(string) 需要更改的url地址。
	ps：pushState 需要至少两个参数。

#### encodeURI("")
	通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

#### substring()
	返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
	语法:str.substring(indexStart[, indexEnd])
	参数:indexStart:需要截取的第一个字符的索引，该字符作为返回的字符串的首字母。
		indexEnd:可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。
	返回值:包含给定字符串的指定部分的新字符串。
	如果省略 indexEnd，substring 提取字符一直到字符串末尾。

#### Math.min()
	Math.min() 返回零个或更多个数值的最小值。

#### indexOf()
	返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

#### push()
	将一个或多个元素添加到数组的末尾，并返回该数组的新长度。