#### 三组问题汇总 

小组成员 `李罗` ,`刘宝灵` ,`赵汪洋` ,`朱盟` ,`仇明珠` ,`邓修` , `林海松` ,`蒿倩` ,`常浩` ,`李培峰` ,`李嵩` ,`刘深` ,`浦文卓` , 组长 `郭振宁`

**已解决问题**

1.智哥智哥，飞机大战游戏开始的时候，当我的飞机出来，如果不动鼠标的话他会一直在下面的中间发射子弹，能不能让飞机刚创建的时候就获取到鼠标的位置定位到鼠标上呢？

* 初始定位;
* Core里面获取鼠标坐标;
```javascript
      // 在 Core 之中 ,获取当前鼠标的位置。

       createPlane(){
            let ele = document.createElement("div");
            let cWidth = document.documentElement.clientWidth;
            ele.className = "plane";
            ele.style.cursor = "none";
            document.body.appendChild(ele);
            ele.style.left = this.boundary(Core.mousePosition.x,Core.mousePosition.y,ele).x + "px";
            Plane.x = ele.offsetLeft;
            Plane.y = ele.offsetTop;
            return ele;
       }

       boundary(x,y,ele){
            let minX =  this.mainSize.left;
            let maxX =  this.mainSize.left + this.mainSize.width - (this.eleSize ? this.eleSize.width : ele.offsetWidth)  ;
            x = x < minX ? minX : x;
            x = x > maxX ? maxX : x;

            y = y < 0 ? 0 : y;
            return {
                  x ,
                  y 
            }
       }    

```

2.飞机大战缩小窗口后，飞机的位置会跑出背景的限定范围，该怎么解决？

* resize 去改变窗口改变改变的值;

3.接口到底指什么？接口地址是什么？

* 接口其实就是返回数据的一个地址;
* 这个地址通常指向一个后端语言编写的文件;
* 接口是一个高级函数 => 传入参数 , 返回结果;

4.ajax和jsonp的区别与联系。

* AJAX => 异步 的 JavaScript 和 XML;

* 包含了 各种各样的请求;
      1. XHR 发起请求;  一个受同源策略但是浏览器原生支持的可以发送请求的对象。
      2. jsonp 利用script标签发起请求; 利用一个非官方提供的方式利用官方规则的漏洞发起请求的方式。

5.onreadystatechange事件处理函数中使用了xhr对象，那可以使用this吗？

      * 试一试 ; 
 
  ``` javascript
      this === xhr  // true;
      xhr.onreadystatechange = function(){
            this  === xhr 
      }     
  ```

6.cookie和token的关系。

* token => 一种字符串加密和构成规范。 就是把 对象 里面的数据进行编码 。
证明你登陆了, 携带一些特殊的信息。

* cookie => 是一种浏览器端的本地存储技术。我们可以利用http去进行设置;
我们把token存在cookie之中。