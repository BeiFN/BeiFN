---
title: jQuery学习之属性操作篇
date: 2019/07/16 12:30:00
updated: 2019/07/16 13:30:00
categories:
- jQuery
---

jquery的属性操作模块分为四个部分：html属性操作，dom属性操作，类样式操作和值操作

- html属性操作：是对html文档中的属性进行读取，设置和移除操作。比如attr()、removeAttr()
- DOM属性操作：对DOM元素的属性进行读取，设置和移除操作。比如prop()、removeProp()
- 类样式操作：是指对DOM属性className进行添加，移除操作。比如addClass()、removeClass()、toggleClass()
- 值操作：是对DOM属性value进行读取和设置操作。比如html()、text()、val()



<!--more-->



### jQuery属性操作方法

| 方法          | 描述                                     |
| :------------ | :--------------------------------------- |
| attr()        | 设置或返回匹配元素的属性和值。           |
| removeAttr()  | 从所有匹配的元素中移除指定的属性。       |
| hasClass()    | 检查匹配的元素是否拥有指定的类。         |
| addClass()    | 向匹配的元素添加指定的类名。             |
| removeClass() | 从所有匹配的元素中删除全部或者指定的类。 |
| toggleClass() | 从匹配的元素中添加或删除一个类。         |
| html()        | 设置或返回匹配的元素集合中的 HTML 内容。 |
| val()         | 设置或返回匹配元素的值。                 |
| text()        | 设置或返回所有匹配元素的内容。           |
| prop()        | 设置或返回被选元素的属性和值。           |
| removeProp()  | 删除由prop()方法设置的属性集。           |



### html属性操作

#### attr()

> attr() 方法设置或返回被选元素的属性值。

```javascript
$(selector).attr(attribute,value);  // 设置属性值
$(selector).attr(attribute)；  // 返回属性值
$(selector).attr(attribute,function(index,oldvalue));  // 使用函数来设置属性/值
```

#### removeAttr()

> removeAttr() 方法从被选元素中移除属性。

```javascript
$(selector).removeAttr(attribute)  // 被选元素中移除属性
```



### class类样式操作

#### hasClass()

>  hasClass() 方法检查被选元素是否包含指定的 class。

```javascript
$(selector).hasClass(class)
```

#### addClass()

> addClass() 方法向被选元素添加一个或多个类。
>
> 该方法不会移除已存在的 class 属性，仅仅添加一个或多个 class 属性。

```javascript
$(selector).addClass(class);  // 添加一个class类
$(selector).addClass(function(index,oldclass));  // 使用函数向被选元素添加class
```

#### removeClass()

> removeClass() 方法从被选元素移除一个或多个类。

```javascript
$(selector).removeClass(class);  // 移除指定class
$(selector).removeClass();  // 移除所有class
$(selector).removeClass(function(index,oldclass));  // 使用函数来移除class
```

#### toggleClass()

> toggleClass() 对设置或移除被选元素的一个或多个类进行切换。
>
> 该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果。
>
> 通过使用 "switch" 参数，能够规定是否添加(true)或移除(false)类

```javascript
$(selector).toggleClass(class,switch);
```

| 参数     | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *class*  | 必需。规定添加或移除 class 的指定元素。如需规定若干 class，请使用空格来分隔类名。 |
| *switch* | 可选。布尔值。规定是否添加或移除 class。                     |

```javascript
$(selector).toggleClass(function(index,class),switch);  // 使用函数来切换类
```



### 值操作

#### html()

> html() 方法返回或设置被选元素的内容 (inner HTML)。
>
> 如果该方法未设置参数，则返回被选元素的当前内容。

```javascript
$(selector).html();  // 返回元素内容
$(selector).html(content);  // 设置元素内容
$(selector).html(function(index,oldcontent));  // 使用函数来设置所有匹配元素的内容
```

#### val()

> val() 方法返回或设置被选元素的值。
>
> 元素的值是通过 value 属性设置的。该方法大多用于 input 元素。

```javascript
$(selector).val(value);  // 设置 Value 属性的值
$(selector).val();  // 返回 Value 属性
$(selector).val(function(index,oldvalue));  // 使用函数设置 Value 属性的值
```

#### text()

> html() 方法返回或设置被选元素的文本内容 (inner Text)。
>
> 如果该方法未设置参数，则返回被选元素的当前文本内容。

```javascript
$('#box').text();  // 返回元素文本内容
$(selector).text(content);  // 设置元素文本内容
$(selector).text(function(index,oldcontent));  // 使用函数来设置所有匹配元素的文本内容
```



### DOM属性操作

#### prop()

> prop() 方法设置或返回被选元素的属性和值。
>
> 当该方法用于**返回**属性值时，则返回第一个匹配元素的值。
>
> 当该方法用于**设置**属性值时，则为匹配元素集合设置一个或多个属性/值对。

#### removeProp()

> removeProp() 方法移除由 prop()方法设置的属性。
>
> **注意：**不要使用该方法来移除诸如 style、id 或 checked 之类的 HTML 属性。

```javascript
$(selector).removeProp(property); 
```



### 参考文献

* jQuery 参考手册 - 属性操作，<a href = "http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp">W3school</a>

* jQuery API - Attributes，<a href = "https://api.jquery.com/category/attributes/">jQuery</a>

