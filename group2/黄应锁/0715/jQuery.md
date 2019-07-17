引入类库：
 1.下载到本地，本地进行使用。 
  2.CDN加速 => <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>

简单的选择器：
设置css属性：
    $(".box").css({
        background: "#ccc"
    })
$() 选择器 选出来的是实例

document.querySelector(".box") === document.querySelector(".box") // true;
 $(".box") === $(".box") //false
进阶选择器：
    后代选择器： $("ul li"); $("ul>li");
    群组选择器： $("li a,li span, li strong").css({   });
    统配选择器 $(" li * ").css({}),//慎用，如果要用一定要限制范围

高级选择器： 后代，兄弟选择器，子选择器

后代选择器： $("ul li").find("span");
除了find之外的所有方法，不传参数默认为*;

直接子选择器；
$(".list").children().children("span").css({});
连缀式编程模式：.next() 下一个
$("box").css({
    background:"yellowgreen"
})
.next().css({
    background: "red"
})
$(".box").parent().css({}) //父级
$(".box").parents().css({}) //祖先们
$（".box"）.parentUntil("body").css({})//父级直到body,

选择器-过滤器：

$("li:odd").css({ }) //奇数行变色
$("li:even").css({ }) // 偶数行变色
$("li:first").css({ }) //第一个li变色
$("li:last").css({ }) //最后一个li变色
//精准的选择某一个
$("li:eq(2)").css({ })//第三个li变色，下表为2 ，第三个
//排除选择
$("li:not(.box)").css({ }) //除了.box外
//包含：
$("li:has(span)").css({ })
$("li:gt(2)").css({}) //下标大于2的li；
$("li:lt(2)").css({}) //下标小于2的li；



$("label + input") //匹配所有跟在 label 后面的 input 元素

$("form ~ input")//找到所有与表单同辈的 input 元素

$(":header").css("background", "#EEE");//给页面内所有标题加上背景色

animated


:contains(text)



:empty //匹配所有不包含子元素或者文本的空元素

[attribute ^= value];


[attribute $= value];


[selector1][selector2][selectorN] //复合属性选择器，需要同时满足多个条件时使用。


$("li:first-child");


:nth-child 下标从一开始


:only-child //如果某个元素是父元素中唯一的子元素，那将会被匹配
如果父元素中含有其他元素，那将不会被匹配

attr  设置属性：
$("img").attr("src");

removeAttr(name)..移除属性
$("img").removeAttr("src");
将文档中图像的src属性删除

addClass(class|fn)：

$("p").addClass("selected");
为匹配的元素加上 'selected' 类

removeClass([class|fn])
$("p").removeClass("selected");
从匹配的元素中删除 'selected' 类










