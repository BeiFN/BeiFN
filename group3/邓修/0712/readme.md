
## 接口文档

- 路径      : http://localhost/homework/coding_homework_exercise/group3/邓修/0712/homework2.php

- 请求方式   : POST 

- 参数(字段) : 

      username:"username",
      password:"password" 

- 返回值     : 
      ```
            {
                  state : "success|error",
                  stateCode : 0 , 
                  [,username : 用户名  [,password : md5加密后的密码]]
            }
      ```
      stateCode : 0 用户名或密码为空;
                  1 登录成功;
                  2 数据库链接失败;
                  3 用户名不存在;
                  4 密码错误;
                  5 注册用户名重名;
                  6 注册数据插入数据库失败;
                  7 注册成功;