---
title: jQuery学习之操作CSS篇
date: 2019/07/15 23:50:00
updated: 2019/07/15 23:50:00
categories:
- jQuery
tags:
- CSS
---

通过 jQuery，可以很容易地对 CSS 元素进行操作。jQuery的css() 方法返回或设置匹配的元素的一个或多个样式属性。



<!--more-->



### css() 方法

#### 返回 CSS 属性值

返回第一个匹配元素的 CSS 属性值。

**注释：**当用于返回一个值时，不支持简写的 CSS 属性（比如 "background" 和 "border"）。

```jQuery
$(selector).css(name)
```

| 参数   | 描述                                             | 示例                 |
| :----- | :----------------------------------------------- | -------------------- |
| *name* | 规定 CSS 属性的名称。该参数可包含任何 CSS 属性。 | $("p").css("color"); |

#### 设置 CSS 属性

设置所有匹配元素的指定 CSS 属性。

```jQuery
$(selector).css(name,value)
```

| 参数    | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| *name*  | 规定 CSS 属性的名称。该参数可包含任何 CSS 属性，比如 "color"。 |
| *value* | 可选。规定 CSS 属性的值。该参数可包含任何 CSS 属性值，比如 "red"。<br>如果设置了空字符串值，则从元素中删除指定属性。 |

示例：将所有段落的颜色设为红色：

```jQuery
$("p").css("color","red");
```

#### 设置多个 CSS 属性/属性值

把“名/值对”对象设置为所有匹配元素的样式属性。

```jQuery
$(selector).css({property:value, property:value, ...})
```

| 参数               | 描述                                    |
| :----------------- | :-------------------------------------- |
| {*property:value*} | 规定要设置为样式属性的“名称/值对”对象。 |

示例：

```jQuery
$("p").css({
  "color":"white",
  "background-color":"#98bf21",
  "font-family":"Arial",
  "font-size":"20px",
  "padding":"5px"
  });
```

#### 使用函数来设置 CSS 属性

设置所有匹配的元素中样式属性的值。

此函数返回要设置的属性值。接受两个参数，index 为元素在对象集合中的索引位置，value 是原先的属性值。

```jQuery
$(selector).css(name,function(index,value))
```

| 参数                    | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| *name*                  | 规定 CSS 属性的名称。该参数可包含任何 CSS 属性，比如 "color"。 |
| *function(index,value)* | 规定返回 CSS 属性新值的函数。<br> index - 可选。接受选择器的 index 位置<br>oldvalue - 可选。接受 CSS 属性的当前值。 |

示例：

```jQuery
$("button").click(function(){
    $("p").css("color",function(){return "red";});
    });
```



### offset() 方法

> offset() 方法返回或设置匹配元素相对于文档的偏移（位置）。

#### 返回偏移坐标

返回第一个匹配元素的偏移坐标。

该方法返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。

```jQuery
$(selector).offset();
$(selector).offset().left/$(selector).offset().right;
```

#### 设置偏移坐标

设置所有匹配元素的偏移坐标。

```jQuery
$(selector).offset(value)
```

| 参数    | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| *value* | 规定以像素计的 top 和 left 坐标。<br>值对，比如 {top:100, left:0}<br>带有 top 和 left 属性的对象 |

#### 使用函数来设置偏移坐标

```jQuery
$(selector).offset(function(index,oldoffset))
// 选择器的 index 位置
// 选择器的当前坐标
```

```jQuery
$("button").click(function(){
    $("p").offset(function(n,c){
        newPos=new Object();
        newPos.left=c.left+100;
        newPos.top=c.top+100;
        return newPos;
    });
});
```



### offsetParent() 方法

> offsetParent() 方法返回最近的祖先定位元素。
>
> 定位元素指的是元素的 CSS position 属性被设置为 relative、absolute 或 fixed 的元素。

```jQuery
$(selector).offsetParent()
```



### width() 方法

> width() 方法返回或设置匹配元素的宽度。

#### 返回宽度

返回第一个匹配元素的宽度。

如果不为该方法设置参数，则返回以像素计的匹配元素的宽度。

```jQuery
$(selector).width()
```

#### 设置宽度

设置所有匹配元素的宽度。

```jQuery
$(selector).width(length)
```

#### 使用函数来设置宽度

```jQuery
$(selector).width(function(index,oldwidth))
```

### height() 方法

> height() 方法返回或设置匹配元素的高度。

#### 返回高度

返回第一个匹配元素的高度。

如果不为该方法设置参数，则返回以像素计的匹配元素的高度。

```jQuery
$(selector).height()
```

#### 设置高度

设置所有匹配元素的高度。

```jQuery
$(selector).height(length)
```

#### 使用函数来设置高度

```jQuery
$(selector).height(function(index,oldheight))
```



### position() 方法

> position() 方法返回匹配元素相对于父元素的位置（偏移）。
>
> 该方法返回的对象包含两个整型属性：top 和 left，以像素计。

```jQuery
$(selector).position()
```



```jQuery
$(".btn1").click(function(){
  x=$("p").position();
  $("#span1").text(x.left);
  $("#span2").text(x.top);
});
```



### scrollLeft() 方法

> scrollLeft() 方法返回或设置匹配元素的滚动条的水平位置。
>
> 滚动条的水平位置指的是从其左侧滚动过的像素数。当滚动条位于最左侧时，位置是 0。

#### 返回水平滚动条位置

返回第一个匹配元素的水平滚动条位置。

```jQuery
$(selector).scrollLeft()
```

#### 设置水平滚动条位置

```jQuery
$(selector).scrollLeft(position)
```



### scrollTop() 方法

> scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
>
> scroll top offset 指的是滚动条相对于其顶部的偏移。

#### 返回垂直滚动条位置

返回第一个匹配元素的垂直滚动条位置。

```jQuery
$(selector).scrollTop()
```

#### 设置垂直滚动条位置

```jQuery
$(selector).scrollTop(position)
```



### innerHeight()方法

> 获取第一个匹配元素内部区域高度（包括补白、不包括边框）。

```jQuery
$(selector).innerHeight()
```



### innerWidth()方法

> 获取第一个匹配元素内部区域宽度（包括补白、不包括边框）。

```jQuery
$(selector).innerWidth()
```



### outerHeight([options])方法

> 获取第一个匹配元素外部高度（默认包括补白和边框）。
>
> options设置为 true 时，计算边距在内。

```jQuery
$(selector).outerHeight()   //不计算边距
$(selector).outerHeight(true);  //计算边距
```



### outerWidth([options])方法

> 获取第一个匹配元素外部宽度（默认包括补白和边框）。
>
> 设置为 true 时，计算边距在内。

```jQuery
$(selector).outerWidth()   //不计算边距
$(selector).outerWidth(true);  //计算边距
```



### 参考文献

* jQuery 参考手册 - CSS，<a href = "http://www.w3school.com.cn/jquery/jquery_css.asp">W3school</a>

* jQuery API - CSS，<a href = "https://api.jquery.com/category/css/">jQuery</a>