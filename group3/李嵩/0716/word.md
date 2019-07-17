1.选择器

end()回到最近的一个"破坏性"操作之前。即，将匹配的元素列表变为前一次的状态。

2.效果

.hide();
.show();
显示隐藏 ;  toggle    $("div").toggle(3000);



fade
.fadeOut("slow");
.fadeIn("slow");
.fadeOut(3000);
.fadeIn(3000);

.fadeToggle(3000);

slide => slideDown  slideUp slideToggle;

$("div").fadeTo(3000,0.3);


.animate 自定义动画;

stop终止动画及队列; $(".box").stop(true);
