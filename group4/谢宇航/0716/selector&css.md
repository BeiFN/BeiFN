---
title: jQuery学习之选择器篇
date: 2019/07/15 22:00:00
updated: 2019/07/15 23:30:00
categories:
- jQuery
tags:
- CSS选择器
---

页面的任何操作都需要节点的支撑，开发者如何快速高效的找到指定的节点也是前端开发中的一个重点。jQuery提供了一系列的选择器帮助开发者达到这一目的，让开发者可以更少的处理复杂选择过程与性能优化，更多专注业务逻辑的编写。jQuery几乎支持主流的css1~css3选择器的写法，jQuery 元素选择器和属性选择器允许您通过标签名、属性名或内容对 HTML 元素进行选择。



<!--more-->



### jQuery选择器

#### #id 选择器

> 根据给定的ID匹配一个元素。
>
> 使用任何的元字符作为名称的文本部分， 它必须被两个反斜杠转义：\\\\。

```html
<div id="notMe"><p>id="notMe"</p></div>
<div id="myDiv">id="myDiv"</div>
<span id="foo[bar]"></span>
```

```html
<!-- 查找 ID 为"myDiv"的元素 -->
$("#myDiv");
<!-- 输出 -->
<div id="myDiv">id="myDiv"</div>
```

```html
 <!-- 查找含有特殊字符的元素 -->
$("#foo\\[bar\\]");
<!-- 输出 -->
<span id="foo[bar]"></span>
```

#### element元素选择器

> 根据给定的元素标签名匹配所有元素。

```html
<div>DIV1</div>
<div>DIV2</div>
<span>SPAN</span>
```

```html
 <!-- 查找一个div元素 -->
$("div");
<!-- 输出 -->
<div>DIV1</div>, <div>DIV2</div> 
```

#### .class 类选择器

> 根据给定的css类名匹配元素。

```html
<div class="notMe">div class="notMe"</div>
<div class="myClass">div class="myClass"</div>
<span class="myClass">span class="myClass"</span>
```

```html
 <!-- 查找所有类是 "myClass" 的元素 -->
$(".myClass");
<!-- 输出 -->
<div class="myClass">div class="myClass"</div>
<span class="myClass">span class="myClass"</span> 
```

#### *通配符

> 匹配所有元素。多用于结合上下文来搜索。

```html
<div>DIV</div>
<span>SPAN</span>
<p>P</p>
```

```html
 <!-- 找到每一个元素 -->
$("*");
<!-- 输出 -->
<div>DIV</div>, <span>SPAN</span>, <p>P</p> 
```

#### selector1, selector2, ··· , selectorN 群组选择器

> 指定任意多个选择器，并将匹配到的元素合并到一个结果内。

```html
<div>div</div>
<p class="myClass">p class="myClass"</p>
<span>span</span>
<p class="notMyClass">p class="notMyClass"</p>
```

```html
 <!-- 找到匹配任意一个类的元素 -->
$("div,span,p.myClass");
<!-- 输出 -->
<div>div</div>, <p class="myClass">p class="myClass"</p>, <span>span</span> 
```

#### ancestor descendant 后代选择器

> 在给定的祖先元素下匹配所有的后代元素。

```html
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />
```

```html
 <!-- 找到表单中所有的 input 元素 -->
$("form input");
<!-- 输出 -->
<input name="name" />, <input name="newsletter" /> 
```

#### parent > child 子选择器

> 在给定的父元素下匹配所有的子元素。

```html
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />
```

```html
 <!-- 匹配表单中所有的子级input元素 -->
$("form > input");
<!-- 输出 -->
<input name="name" /> 
```

#### prev + next 相邻兄弟选择器

> 匹配所有紧接在 prev 元素后的 next 元素。

```html
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />
```

```html
 <!-- 匹配所有跟在 label 后面的 input 元素 -->
$("label + input");
<!-- 输出 -->
<input name="name" />, <input name="newsletter" />
```

#### prev ~ siblings 兄弟选择器

> 匹配 prev 元素之后的所有 siblings 元素。

```html
<form>
  <label>Name:</label>
  <input name="name" />
  <fieldset>
      <label>Newsletter:</label>
      <input name="newsletter" />
 </fieldset>
</form>
<input name="none" />
```

```html
 <!-- 找到所有与表单同辈的 input 元素 -->
$("label ~ input");
<!-- 输出 -->
<input name="none" />
```

#### : 伪类选择器

| 伪类选择器      | 描述                                       | 示例                     |
| :-------------- | :----------------------------------------- | ------------------------ |
| :first          | 获取第一个元素                             | $('li:first')            |
| :last           | 获取最后个元素                             | $('li:last')             |
| :not(selector)  | 去除所有与给定选择器匹配的元素             | $("input:not(:checked)") |
| :even           | 匹配所有索引值为偶数的元素，从 0 开始      | $("li:even")             |
| :odd            | 匹配所有索引值为奇数的元素，从 0 开始      | $("li:odd")              |
| :eq(index)      | 匹配一个给定索引值的元素                   | $("li:eq(1)")            |
| :gt(index)      | 匹配所有大于给定索引值的元素               | $("tr:gt(0)")            |
| :lt(index)      | 匹配所有小于给定索引值的元素               | $("tr:lt(2)")            |
| :lang(language) | 选择指定语言的所有元素。                   | $("p:lang(en)")          |
| :header         | 匹配如 h1, h2, h3之类的标题元素            | $(":header")             |
| :animated       | 匹配所有正在执行动画效果的元素             | $("div:not(:animated)")  |
| :focus          | 匹配当前获取焦点的元素                     | $("a:focus")             |
| :root           | 选择该文档的根元素                         | $(":root")               |
| :empty          | 匹配所有不包含子元素或者文本的空元素       | $("td:empty")            |
| :has(selector)  | 匹配含有选择器所匹配的元素的元素           | $("div:has(p)")          |
| :parent         | 匹配含有子元素或者文本的元素               | $("td:parent")           |
| :hidden         | 匹配所有不可见元素，或者type为hidden的元素 | $("tr:hidden")           |
| :visible        | 匹配所有的可见元素                         | $("tr:visible")          |

#### 属性选择器

| 属性选择器         | 描述                               | 示例                        |
| ------------------ | ---------------------------------- | --------------------------- |
| [attribute]        | 匹配包含给定属性的元素             | $("div[id]")                |
| [attribute=value]  | 匹配给定的属性是某个特定值的元素   | $("input[name='usr']")      |
| [attribute!=value] | 匹配所有不含有或不等于值指定的属性 | $("input[name!='usr']")     |
| [attribute^=value] | 匹配给定的属性是以某些值开始的元素 | $("input[name^='news']")    |
| [attribute$=value] | 匹配给定的属性是以某些值结尾的元素 | \$("input[name$='letter']") |
| [attribute*=value] | 匹配给定的属性是以包含某些值的元素 | $("input[name*='man']")     |

补充：\[selector1]\[selector2][selectorN]

> 复合属性选择器，需要同时满足多个条件时使用。
>
> 示例：\$("input\[id][name$='man']")

#### 结构伪类选择器

| 结构伪类选择器    | 描述                                           | 示例                      |
| ----------------- | ---------------------------------------------- | ------------------------- |
| :first-child      | 匹配所给选择器( :之前的选择器)的第一个子元素   | $("ul li:first-child")    |
| :first-of-type    | 匹配父元素的第一个指定类型的孩子               | $("span:first-of-type")   |
| :last-child       | 匹配所给选择器( :之前的选择器)的最后一个子元素 | $("ul li:last-child")     |
| :last-of-type     | 匹配父元素的最后一个指定类型的孩子             | $("span:last-of-type")    |
| :nth-child()      | 匹配其父元素下的第N个子或奇偶元素              | $("ul li:nth-child(2)")   |
| :nth-last-child() | 匹配从最后一个开始算索引的元素                 | $("li:nth-last-child(2)") |
| :nth-of-type(n)   | 匹配父元素中同类型中的第n个元素                | $("li:nth-of-type(odd)")  |
| :only-of-type     | 匹配是它的父级元素的唯一一个相同类型的子元素   | $("span:only-of-type")    |
| :only-child       | 匹配元素是它的父元素的唯一 一个子元素          | $("ul li:only-child")     |

#### 其他伪类选择器

| 选择器    | 描述                                     | 示例           |
| --------- | ---------------------------------------- | -------------- |
| :enabled  | 匹配所有激活的 input 元素                | $(":enabled")  |
| :disabled | 匹配所有禁用的 input 元素                | $(":disabled") |
| :selected | 匹配所有被选取的 input 元素              | $(":selected") |
| :checked  | 匹配所有被选中的 input 元素              | $(":checked")  |
|           |                                          |                |
| :input    | 匹配所有 \<input> 元素                   | $(":input")    |
| :text     | 匹配所有 type="text" 的 \<input> 元素    | $(":text")     |
| :password | 匹配所有 type="password" 的\<input> 元素 | $(":password") |
| :radio    | 匹配所有 type="radio" 的 \<input> 元素   | $(":radio")    |
| :checkbox | 匹配所有 type="checkbox" 的\<input> 元素 | $(":checkbox") |
| :submit   | 匹配所有 type="submit" 的\<input> 元素   | $(":submit")   |
| :reset    | 匹配所有 type="reset" 的 \<input> 元素   | $(":reset")    |
| :button   | 匹配所有 type="button" 的\<input> 元素   | $(":button")   |
| :image    | 匹配所有 type="image" 的\<input> 元素    | $(":image")    |
| :file     | 匹配所有 type="file" 的\<input> 元素     | $(":file")     |



### 参考文献

* jQuery 参考手册 - 选择器，<a href = "http://www.w3school.com.cn/jquery/jquery_ref_attributes.asp">W3school</a>

* jQuery API - Selectors，<a href = "https://api.jquery.com/category/selectors/">jQuery</a>

