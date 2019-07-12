###AJAX

* AJAX是指  Asynchronous   Javascript  And  XML
解释为异步的javascript 和 XML    是一个计数合集。

* 为啥用AJAX??????
 
 1. 优化用户体检；传统表单提交一旦进行数据发送页面会刷新。ajax实现了无刷新加载页面。可以在提交数据过程中添加更多的优化。
 2. 我们利用了ajax实现前后端分离的开发模式提高了开发效率。  1 ： 4比例配置前端控制开发时效性。


 * AJAX 的一些缺点

 1. SEO优化相当差 。  不执行JS无法让数据渲染到页面上，导致程序SEO优化差。比如京东在商品列表渲染时为了更优的SEO优化，规避使用ajax。
 2. 没有 history 没法回退或者前进。 可以通过技术手段进行弥补；
 兼容性问题。 ie8+ 浏览器支持

 *AJAX是哪里来的

 1. 来自于ie的插件， ActiveX ，被大牛封装成ajax。

 *AJAX的用法 ；
 1. 获取到ajax对象；
 ```javascript
        let xhr = new XMLHtttpRequest();

 ```
 2. 配置ajax对象
 ```javascript
        xhr.open(method [GET | POST] , url , 是否启用异步[true | false])
        注：默认为true  ajax没异步无法正常工作
 ```
 3. 发送ajax请求 ；=》利用xhr对象驱动浏览器发送一个请求；
 ```javascript
      xhr.send(要发送的数据)；
 ```
4. 事情监听  ；=》 监听xhr对象的状态变化
    * onreadystatechange => 当准备状态发生改变的时候。
```javascript
       xhr.onreadystatechange = function(){

       }
 ```

####TCP/UDP传输协议；
* TCP => 可靠协议  验证链接的可靠性。 再去进行数据传入 。验证数据完整性，断开链接。

- TCP经过了大牛封装HTTP   无状态数据传输协议。

HTTP在传输数据之前会测试可靠性  ，三次握手。

HTTP 四次挥手断开链接。

无状态，无论是谁都可以访问。

HTTP 报文头 ： 报文头中理论上可以放任何信息，我们可以配置我们想要放入的东西。





* UDP => 不可靠协议；








### Response  Request

* response    相应；  Server  => Browser
* request     请求；  Browser => Server

http状态码   状态码可以在自己的项目中自定义。

###请求方式

* GET
   1. 简单轻便效率高效
   2.  发送信息的功能，数据放在请求地址上   ?进行划分以key=value 的形式传递一组数据以 & 间隔每组数据。  导致数据不能过大，4~10kb数据发送上限，我们限定为4kb为最大传输数据。
   3. 主要用来获取数据。
   4. get的所有数据放在了地址栏上，导致数据曝光风险较大。数据存在一定安全隐患。



* POST
    1. 发送数据大小严格意义上来说不受限制。
    2. 数据不会曝光。
    3. POST把数据放在了body之中。
    4. 主要用来发送数据。