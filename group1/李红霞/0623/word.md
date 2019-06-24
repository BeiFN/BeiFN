1.fromCharCode()

2.fromCodePoint()

3.charAt()

4.charCodeAt()

5.codePointAt()

6.concat()

7.endsWith()

8.startsWith()

9.includes()

10.indexOf()

11.lastIndexOf()

12.localeCompare()

13.padEnd()

14.padStart()

15.repeat()

16.slice()

17.substring()

18.split()

19.toLocaleLowerCase() 20.toLowerCase()

21.toLocaleUpperCase() 22.toUpperCase()

23.trim()

24.trimRight()

25.trimLeft()

26.toString()

***JS day7 0618

**Math对象

**Date日期 1.Date.UTC(96, 1, 2, 3, 4, 5) 2.Date.now() 3.Date.parse()

4.getDate()<!-- 根据本地时间对象，返回一个指定的日期对象为一个月中的哪一日（从1--31）。 -->

5.getDay()

6.getFullYear()

7.getHours()

8.getMilliseconds()

9.getMinutes()

10.getSeconds()

11.getTime()

12.getTimezoneOffset() 13.getUTCDate()

14.getUTCDay() 15.getUTCFullYear() 16.getUTCHours() 17.getUTCMilliseconds() 18.getUTCMinutes() 19.getUTCMonth() 20.getUTCSeconds() 21.getYear()

22.setDate()

22.setFullYear() 23.setHours() 24.setMilliseconds() 25.setMinutes() 26.setMonth() 27.setSeconds() 28.setTime()

29.setUTCDate() 30.setUTCFullYear() 31.setUTCHours() 32.setUTCMilliseconds() 33.setUTCMinutes() 34.setUTCMonth() 35.setUTCSeconds() 36.setYear()

37.toDateString() Date.prototype.toGMTString() Date.prototype.toISOString() Date.prototype.toJSON() Date.prototype.toLocaleDateString() Date.prototype.toLocaleFormat()

.toLocaleString()

toLocaleTimeString()

Date.prototype.toSource()

.toString()

.toTimeString()

Date.prototype.toUTCString()

Date.prototype.valueOf() Date.prototype[@@toPrimitive]

setInterval

clearInterval

setTimeout clearTimeout

***JS day8 0619 dom对象 1.document.getElementById("IDName");

2.document.getElementByClass("className");

3.document.getElementByTagName("div");

4.document.getElementsByName("hello")；

5.document.querySelector(".box");

6.document.querySelectorAll(".box");

7.var div = document.createElement("div");

8.document.body.appendChild(div);

9.children

10.document.body.insertBefore( div , document.body.children[0] );

11.removeChild()

12.parentNode

13.dom.innerHTML

14.innerText

15.setAttribut(属性名，属性值)

16.getAttribute(属性名)

17.removeAttribut(属性名)

18.getComputedStyle 获取元素完整的css列表

***JS day9 0621 dom节点

1.chileNoes

2.nodeType

3.nodeName

4.nodeValue

5.box.attributes[0]; 获取第0个属性节点

6.createAttribute 创建一个属性节点

7.createTextNode 创建文本节点

8.createComment 创建一个注释

***JS day10 0622 事件

1.event

2.clientX clientY clientWidth clientHeight 在可视窗口的坐标x值和y值，宽 高 

3.screenX screenY screenWidth screenHeight 屏幕坐标 x和y 

4.offsetX offsetY offsetWidth offsetHeight 当前区域位置 

5.pageX pageY pageWidth pageHeight 文档位置（包括滚动区域）