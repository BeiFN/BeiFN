## 1. **可以一次给表添加(插入)多条数据(记录)吗？如果可以的话，该怎么添加呢？**

```mysql
   insert into 表 

      (字段 1 , 字段 2, 字段 3, 字段 4)

      values

     (200,'haha' , 'deng' , 'shenzhen'),

     (201,'haha2' , 'deng' , 'GD'),

     (202,'haha3' , 'deng' , 'Beijing');
```

```javascript
   // # 增
    $sql_insert = "INSERT INTO ANEWTAB(
        username,phonenum,id
    ) values (
        'Y','12345678901','1'
    ),(
        'H','123456789','2'
    ),(
        'L','45678901','3'
    ),(
        'X','1234567','4'
    );";
    if(mysqli_query($conn,$sql_insert)){
        echo "Insert Successfully ! \n";
    }else{
        echo mysqli_error($conn);
    }
```



##### 问题解决：问了老师，问题得以解决



## 2.  **##问题3 promise连缀那里听得不太明白，具体是咋运用，请智哥再讲一下。**

``` javascript
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

​    

\```



**## 类似问题  劳烦智哥讲解一下这种 promise 连缀**



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

## 

## 3.一些概念理解考虑不到位

1. php 中 . 的语法, $str .="str" ,是表示 加号 吗?   是的

   >   * 字符串 JS 之中的拼接 +  php 之中的字符串你拼接是 .

   >   \* "高级字符串" , '常规字符串'

   >   \* array(1,2,3,4,5,6); => php 之中的数组;

   >   \* array('a' => 'b') ; => php 之中的对象;  

**2. 智哥 能讲下TOKEN 与cookie 的关系，domain与path 的关系吗?**

>  token => 一种字符串加密和构成规范。 就是把 对象 里面的数据进行编码 。

> 证明你登陆了, 携带一些特殊的信息。

> cookie => 是一种浏览器端的本地存储技术。我们可以利用http去进行设置;

>  我们把token存在cookie之中。

>  domain 域 !  http://**www.baidu.com**

> path   路径  http://www.baidu.com**/error/page/1**

**3. 免登陆案例中，为什么修改了utils里面的代码，但在浏览器控制台sources里面，还是之前的utils代码，重启浏览器和服务器都一样，电脑重启后代码正常，是浏览器缓存原因吗？该怎么处理？**

\* 就是浏览器缓存 : 外联的文件都会缓存; 

\* 两次请求同一路径( js , css ) ; 

\* 解决方案 : 我们让浏览器感觉不一样就行了 http://www.baidu.com/script.js?_时间戳 可以避免缓存;

\* 手动清除缓存 ctrl + shift + delete 

**4.接口到底指什么？接口地址是什么？ **

* 接口其实就是返回数据的一个地址;

\* 这个地址通常指向一个后端语言编写的文件;

\* 接口是一个高级函数 => 传入参数 , 返回结果;

**5.ajax和jsonp的区别与联系。**

\* AJAX => 异步 的 JavaScript 和 XML;

\* 包含了 各种各样的请求;

​      \1. XHR 发起请求;  一个受同源策略但是浏览器原生支持的可以发送请求的对象。

​      \2. jsonp 利用script标签发起请求; 利用一个非官方提供的方式利用官方规则的漏洞发起请求的方式。

**6.网站上哪些是可以通过JSONP获取的数据？**

\* 观察接口返回的数据类型;

\```javascript

​      foo({})

\```

\* 携带发送数据的时候 存在  cb || callback 这样字段的接口也大概率是jsonp;

##### 问题解决：参考同学们的问题，进行学习



