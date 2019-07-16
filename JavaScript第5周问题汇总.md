**问题1: 咋一看代码，看似都明白，细细思量，似懂非懂，自己写起来，啥都忘了，满脑袋空白，一脸懵逼。不看一眼代码，或者三四五六眼，根本想不起来，该怎么改善？**
**程序的构建过程**
1. 咋一看代码，看似都明白 。 
   
- 代码不是用来让你看的，是用来让机器看的。
- 问一下自己每一行的思路来由你都清晰么 ? 不要说代码是什么 !  要说代码为什么 ! 
  
2. 自己写起来，啥都忘了，满脑袋空白，一脸懵逼

- 先思路再代码 
- 伪代码 

```javascript
      获取银河系所有生物 
      遍历所有银河系生物
      在遍历之中判定性别种类

      for(var i = 0 ; i < 银河系生物的数量; i++){
            switch(性别){
                  case 性别1 : 
                        归类;
                        break;
                  ...
            }
      }
```
```javascript
      // 核心
      // 1. 选择难度;
      // 2. 创建动画;
      // 3. 游戏开始;

      // 战机
      // 1. 跟随鼠标移动
      // 2. 开火

      // 子弹
      // 1. 创建定时器;
      // 2. 创建子弹列表;
      // 3. 子弹统一运动;
      // 4. 子弹销毁;

      // 敌机
      // 1. 创建定时器;
      // 2. 创建敌机列表;
      // 3. 敌机统一运动;
      // 4. 敌机销毁;

```


3. 不看一眼代码，或者三四五六眼，根本想不起来，该怎么改善

- 你想要和我写一样的代码不可能 ! 代码表述都有细微的差别。
- 你写 BUG 才是正常的。 在坑里跌倒了，才能真的在坑里站起来。 


**问题2:静态方法和属性可以在别的类中被使用,但是飞机大战核心部分里的创建元素函数只在Core类中使用,是出于什么原因设置成静态的呢?什么时候适合用静态方法和静态属性呢?**
* 为了教你们用这个东西。
* 在类之间进行耦合设计的时候。


**问题3: 飞机大战进入游戏前，飞机往右飞的加载图 怎么使用网络图片设置？**
* 用数组承载图片的路径，在飞的时候遍历数组就可以了;


**问题4: 智哥,js是基于对象而不是面向对象的这种说法该怎么理解?**
* 基于对象 => 原型链机制,这是JS面向对象编程的核心功能;
- 构造函数 ， 原型 ，实例
* 面向对象 => 严格意义上来说, JS不具备类 , 多态 。  
- 同一思想，不同问题解决方案。


**问题5: 智哥智哥，飞机大战游戏开始的时候，当我的飞机出来，如果不动鼠标的话他会一直在下面的中间发射子弹，能不能让飞机刚创建的时候就获取到鼠标的位置定位到鼠标上呢？**
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


**问题6: 飞机大战缩小窗口后，飞机的位置会跑出背景的限定范围，该怎么解决？**
* resize 去改变窗口改变改变的值;


**问题7: MySQL创键数据库时，连接名是用来干嘛的？只是个单纯分组吗？**
![image.png](https://upload-images.jianshu.io/upload_images/2845301-bcccfe89f42d841d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>* 你可能会链接很多的数据库, 用仓库名区分链接的是哪个数据库。


**问题8： 数据库遍历while循环中的=号怎么理解？ 感觉赋值 和 判断等于都不太像。**
```javascript
      $sql_select = "SELECT username FROM gptest";

      if($result = mysqli_query($conn,$sql_select)){
            // 查看存在多少条数据;
            // echo mysqli_num_rows($result);

            // 拿出每一条数据;
            while($row = mysqli_fetch_assoc($result)){
                  echo json_encode($row);
            }

      }else{
            echo mysqli_error($conn);
      };
```
* 赋值

- 如果说一个方法的返回值既要判断又要在后面编程之中进行使用，那么这个时候我们通常用一个小技巧来处理这样的问题;

* 基本模型
```javascript
      let a ; 
      if( a = foo() ){
            console.log(a);
      }
```


**问题 9： 下面出错的原因是什么呀？**
![image.png](https://upload-images.jianshu.io/upload_images/18300474-02d8c1e332ca968e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/18300474-32e4337f948c8745.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 语法  :  varchar(255) 


**问题10： 智哥,下图if判断只是判断语法是否成立而不能判断是否删除吧,就算我的表里没有数据,仍然会提示成功**

![image.png](https://upload-images.jianshu.io/upload_images/18300474-1ebc1b577c0775aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 删除操作不报错就挺好。


**问题11：智哥，有没有可以格式化php代码的插件，强迫症不优雅的代码有点难受。。**
* phpfmt 


**问题12：如果想要创建一个表名是纯数字的表，用sql语句如何实现。**
*  CREATE TABLE '1'( A , B , C ) VALUES ( 2, 3, 4)


**问题13：智哥，关于mysql语句中行的概念不是很清楚，以及SELECT语句中 * 和 where的用法**
   * 一条关联数据;    * 所有字段 ;  where 条件 name=女朋友|男朋友 ; 


**问题14：php 中 . 的语法, $str .="str" ,是表示 加号 吗**
   * 字符串 JS 之中的拼接 +  php 之中的字符串你拼接是 .
   * "高级字符串" , '常规字符串'
   * array(1,2,3,4,5,6); => JS之中的数组;
   * array('a' => 'b') ; => JS之中的对象;


**问题15： 可以一次给表添加(插入)多条数据(记录)吗？如果可以的话，该怎么添加呢？**
```mysql
      insert into 表 
      (字段 1 , 字段 2, 字段 3, 字段 4)
      values
      (200,'haha' , 'deng' , 'shenzhen'),
      (201,'haha2' , 'deng' , 'GD'),
      (202,'haha3' , 'deng' , 'Beijing');
```


#问题16:  php解析器位于什么地方,是和js解析器一样在浏览器里吗?还是在服务器里?
* 都不是
* PHP 是一个独立的环境。 
* 只不过 服务器碰到 .php 后缀的请求会调用 cgi 去使用php解析器解析代码;


**问题17: ajaxpost封装，报405不允许错误的原因，没理解， 老师源码在我本地换个路径也这样，而其他请求都正常。**
ajaxpost.html:41 POST http://localhost/0710/data.txt?data=1 405 (Not Allowed)
>post请求没法获取JSON数据


**问题18 请老师讲一下promise封装在ajax**
```javascript
     // IE8 + ;

            // type => GET | POST 
            // payload ; => form data ; key:value
            // url  => 
            // callback  干掉;
            // function ajax(  url , callback , data, type  ){
            //       // 如果type 为 get 那么data拼接在url上 
            //       // 如果type 为 post 1. 设置请求头  2. 把data放在send里; 
            //       var xhr = null;
            //       if(XMLHttpRequest){
            //             xhr = new XMLHttpRequest();
            //       }else{
            //             xhr = new ActiveXObject("Mricosoft.XMLHTTP");
            //       }
            //       if(xhr === null) throw "浏览器不支持ajax";

            //       xhr.open( type ? type : "GET" , url );
            //       type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"): "";
            //       xhr.send( null );
            //       xhr.onreadystatechange = function(){
            //             if(xhr.readyState === 4 && xhr.status === 200){
            //                   callback(xhr.responseText);
            //             }
            //       }
            // }
            // ajax();

            // data版本剖析

            // function ajax(  url , callback , data, type  ){
            //       // data  key=value&key2=value2;
            //       //     => {key:value,key2:value2};
            //       var dataStr = "";
            //       for(var attr in data){
            //             dataStr += `${dataStr.length > 0 ? "&" : ""}${attr}=${data[attr]}`;
            //       }
            //       // GET 
            //       url += (/\?/.test(url) ? '&' : "?") + dataStr;
            //             // console.log(url);
            //       // POST 
            //       xhr.send(dataStr);
            // }
            // ajax("http://www.baidu.com",2, {key:"value",key2:"value2"});

            // 合并版;
            // function ajax(  url , callback , data, type  ){
            //       // 如果type 为 get 那么data拼接在url上 
            //       // 如果type 为 post 1. 设置请求头  2. 把data放在send里; 
            //       var xhr = null;
            //       if(XMLHttpRequest){
            //             xhr = new XMLHttpRequest();
            //       }else{
            //             xhr = new ActiveXObject("Mricosoft.XMLHTTP");
            //       }
            //       if(xhr === null) throw "浏览器不支持ajax";

            //       var dataStr = "";
            //       for(var attr in data){
            //             dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" + data[attr];
            //       }

            //       type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + dataStr : "";

            //       xhr.open( type ? type : "GET" , url );
            //       type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"): "";
            //       xhr.send( type === "POST" ? dataStr : null );
            //       xhr.onreadystatechange = function(){
            //             if(xhr.readyState === 4 && xhr.status === 200){
            //                   callback(xhr.responseText);
            //             }
            //       }
            // }


            // promise 封装之前要做的事;

            function ajax(url  , data, type){
                  return new Promise( function(resolve , reject){

                        var xhr = null;
                        if(XMLHttpRequest){
                              xhr = new XMLHttpRequest();
                        }else{
                              xhr = new ActiveXObject("Mricosoft.XMLHTTP");
                        }
                        if(xhr === null) throw "浏览器不支持ajax";

                        var dataStr = "";
                        for(var attr in data){
                              dataStr += (dataStr.length > 0 ? "&" : "") + attr + "=" + data[attr];
                        }

                        type === "GET" ? url += (/\?/.test(url) ? "&" : "?") + dataStr : "";

                        xhr.open( type ? type : "GET" , url );
                        type === "POST" ? xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"): "";
                        xhr.send( type === "POST" ? dataStr : null );
                        xhr.onreadystatechange = function(){
                              if(xhr.readyState === 4 && xhr.status === 200){
                                    resolve(xhr.responseText);
                              }
                        }

                        // 设置超时;
                        setTimeout(function(){
                              reject(xhr,"timeout");
                        },8000)
                  })
            }

            ajax()
            .then()

```

**问题19：BUG**

```javascript
//04观察者模式的代码
// 移除订阅功能;
this.list = { 
    12 : [],
    18 : [],
    all: []
};  //  数据结构
unsubscribe(type,obs){ 
    this.list[type].splice(this.list[type].indexOf(obs),1);  
    //this.list是对象，不可以直接indexOf
}
>解决
// solution 
unsubscribe(obs){ 
    this.list["all"].splice(this.list["all"].indexOf(obs), 1);  // all中删除
    if(obs.age >= 12 && obj.age <= 18){
        this.list["12"].splice(this.list["12"].indexOf(obs), 1);// 12 中删除
    }else if(obj.age >= 18){
        this.list["18"].splice(this.list["18"].indexOf(obs), 1);// 18 中删除
    }
}

```


**问题20: 后台服务器可以获取前端传过去的key值吗？ 后台写的固定key值'callback'，那封装中的cb_fild是不是可以省略？**

* 什么是服务器 ? http服务 ;  nginx , apache , iis , nodejs , ...
```javascript
      http://www.baidu.com/v2/search?wd=hello&p=10#aaa
      协议  
             域名 
                          query(告知服务器路径)
                                     search(GET协议携带的数据) 
                                                   hash(前端用的页面传值)
```
* 解析数据 (字段值) 语言解析器来做的。
      协议携带的数据 > GET | POST 
* 后台写的固定key值'callback'，那封装中的cb_fild是不是可以省略
      可以这么操作但是不建议, 因为你的jsonp封装是面向所有使用场景的。
```php
<?php
      $cbname = $_GET['callback'];
      $data = "hello world";
      echo "$cbname('$data')";
?>
```
```javascript
function jsonp(url,cb_fild,callback){
      var GLOBAL_CB = "foo"
      // 1.全局函数;
      window[GLOBAL_CB] = function (res){
	//声明一个任意的全局函数,去调用我们需要调用的回调函数callback,该函数运行没有任何结果，只是用来传值
            callback(res)
      }
      // 2. 发送请求; 
      var script = document.createElement("script");
      url += /\?/.test(url) ? "&" : "?";
      script.src = url + cb_fild + "=" + GLOBAL_CB;
console.log(url + cb_fild + "=" + GLOBAL_CB);
      script.onload = function(){
            this.remove();
      }
      document.body.appendChild(script);
}
```


**问题21 能否通过传入具名函数，获取到它的函数名字符串，如果可以这样的话，是不是可以省去设置全局函数调用回调函数的步骤？**

* 高内聚 ， 低耦合 ;
* 严重耦合全局函数，封装的功能不独立。
  
```javascript
function trueCallback(res){
    console.log(22,res);
    console.log(arguments);
}
jsonpl("http://localhost/BaseServer/0711/jsonptruedata.php","trueCallback");

function jsonpl(url,calback){
    var script = document.createElement("script");
    url += /\?/.test(url) ? "&":"?";
    console.log(url);
    url = url + "fooname"+"="+calback;
    console.log(url);
    script.src = url;
    script.onload = function(){
        this.remove();
    }
    document.body.appendChild(script);
}
```

**问题22 promise连缀那里听得不太明白，具体是咋运用，请智哥再讲一下。**
```javascript
      let promise = new Promise( (resolve , reject) => {
            setTimeout( a => {
                  console.log(1);
                  resolve();
            },1000)
      })
      // promise Promise resolver 
      let promise2 = promise.then( res => {
            return new Promise( ( resolve , reject ) => {
                  setTimeout( a => {
                        console.log(2);
                        resolve();
                  },1000)
            })
      })
      // 返回值是一个新的状态机 ;
      promise2.then( res => {

      })
```

**问题23  实际开发中，如果是和后台联调，服务器不在本机时，使用ajax请求时，如何让本地代码和后台服务器同源**
 * nginx 

 
**问题24 劳烦智哥讲解一下这种 promise 连缀**

```javascript
function next(n) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(n);
    }, 1000);
  });
}
next(1) // promise1;
  .then(function(res) {
    console.log(res);
    return next(2); 
  })
  // promise2 ;
  .then(function(res) {
    console.log(res);
    return next(3);
  })
  .then(function(res) {
    console.log(res);
    return next(4);
  })
  .then(function(res) {
    console.log(res);
  });
```

**问题25 问题在图中，是一个小bug**
![image.png](https://upload-images.jianshu.io/upload_images/18300474-7af4628697d4862f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```javascript
    function foo(type){
        // type = type ? type : "GET";
        type || type = "GET" ;
    }
```
 

**问题26 接口到底指什么？接口地址是什么？**

* 接口其实就是返回数据的一个地址;
* 这个地址通常指向一个后端语言编写的文件;
* 接口是一个高级函数 => 传入参数 , 返回结果;


**问题27 ajax和jsonp的区别与联系。**
* AJAX => 异步 的 JavaScript 和 XML;

* 包含了 各种各样的请求;
      1. XHR 发起请求;  一个受同源策略但是浏览器原生支持的可以发送请求的对象。
      2. jsonp 利用script标签发起请求; 利用一个非官方提供的方式利用官方规则的漏洞发起请求的方式。


**问题28 onreadystatechange事件处理函数中使用了xhr对象，那可以使用this吗？**
      * 试一试 ; 
 
  ``` javascript
      this === xhr  // true;
      xhr.onreadystatechange = function(){
            this  === xhr 
      }     
  ```

**问题29 网站上哪些是可以通过JSONP获取的数据？**
* 观察接口返回的数据类型;

```javascript
      foo({})
```
* 携带发送数据的时候 存在  cb || callback 这样字段的接口也大概率是jsonp;


**问题30  智哥 能讲下TOKEN 与cookie 的关系，domain与path 的关系吗?**
* token => 一种字符串加密和构成规范。 就是把 对象 里面的数据进行编码 。
> 证明你登陆了, 携带一些特殊的信息。

* cookie => 是一种浏览器端的本地存储技术。我们可以利用http去进行设置;
> 我们把token存在cookie之中。

* domain 域 !  http://*www.baidu.com*
* path   路径  http://www.baidu.com*/error/page/1*


**问题31  免登陆案例中，为什么修改了utils里面的代码，但在浏览器控制台sources里面，还是之前的utils代码，重启浏览器和服务器都一样，电脑重启后代码正常，是浏览器缓存原因吗？该怎么处理？**
* 就是浏览器缓存 : 外联的文件都会缓存; 
* 两次请求同一路径( js , css ) ; 
* 解决方案 : 我们让浏览器感觉不一样就行了 http://www.baidu.com/script.js?_时间戳 可以避免缓存;
* 手动清除缓存 ctrl + shift + delete 


**问题32 如下图,图片里框柱的东西导致请求发不出去**
![123.png](https://upload-images.jianshu.io/upload_images/18300474-00b5055d08e9d695.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 考虑代码问题 ;   浏览器是对协议进行了完整封装，你可以进行配置但是普遍不需要。 在遇到发送问题的时候，优先考虑代码层面再去考虑协议层面。




