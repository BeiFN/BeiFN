
JS专门为img提供了一个构造函数/该构造函数的结果和img标签效果一样
let  img  = new  Image();

img存在一个特性，只要设置了src不用放入浏览器就可以发送一个请求。








jQuery  3个版本  
###使用：
***引入类库
    官网下载 =>下载到本地，本地进行使用。
    CDN加速  => 1.浏览器会缓存，利用别人的缓存进行高速加载。
                2.关乎服务器性能的；
****一共提供了一个API
     jQuery 构造函数;
          1. 原型方法; => 给实例访问的;
          2. 静态资源方法; jQuery构造函数上的方法; => jQuery.each 是作为纯工具使用的。

***所有的jQuery 事件都是事件监听。 可以绑定n个事件处理函数;




1.jQuery选择器选择出来的实例；不是DOM对象，所以和原生的API不通用。
2.如果想要获得被包裹的DOM对象，可以利用下标去获取。
3.jQuery的实例 和原生的DOM对象有联系，也有区别。
4.

连缀编程方法 ：
$(".box").css({
    background:"red";
}).next().css({   //next会返回当前元素
    background:"red";
}).next().css({   //next会返回当前元素
    background:"red";
})


##选择器
id选择器    
tag标签选择器
.class选择器
*通配选择器  (使用时注意限制范围)
后代选择器eg : $("li a")
群组选择器eg("li a,li b,li  i")

高级选择器
后代选择器  $("ul li").find("span") 表示li下的span

子元素选择器 $("ul ").children()  表示ul下的（直接）所有子集

$(".box).next() 表示下一个
        .nextAll() 表示下边所有元素
        .nextUtils()表示区间之间的元素
    括号内都可以添加内容用来当做限制条件
兄弟选择器  







过滤器 ：
:first  第一个
:not(selector)  除了selector
:even
:odd
:eq(index)
:gt(index)
:lt(index)
:last
:focus
:contains(text)
:has(selector)
:parent
:hidden
:visible