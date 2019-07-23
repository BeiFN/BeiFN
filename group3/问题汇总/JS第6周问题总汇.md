#### 三组问题汇总 

小组成员 `李罗` ,`刘宝灵` ,`赵汪洋` ,`朱盟` ,`仇明珠` ,`邓修` , `林海松` ,`蒿倩` ,`常浩` ,`李培峰` ,`李嵩` ,`刘深` ,`浦文卓` , 组长 `郭振宁`

**已解决问题**

1.怀智小哥哥，把jQueryajax的type改为post后报如下错误该怎么解决呢？
![image.png](https://upload-images.jianshu.io/upload_images/18464133-0ec266ea2769c163.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```javascript
    $.ajax({
            url: "practice06.json",
            type: "POST"
        })
```
* 用合适的方法去做合适的事情。 
* 服务器配置问题
2.智哥，为什么用livesever运行你的购物车代码，ajax请求返回的数据是对象，用自己的服务器返回的是字符串。
![image.png](https://upload-images.jianshu.io/upload_images/18464133-c087f1a73c1c51c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/18464133-31b9bf88b2ea7168.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* liveserver版本问题, 需要在 $.ajax 里面加上 dataType 。