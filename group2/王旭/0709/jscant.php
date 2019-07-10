<?php
      header("Content-type: text/html; charset=utf-8");
      // echo "hello world";
      # 将用户输入的数据放入到mySQL之中; 进行数据的存储;
      # php可以处理前端发送给我们的数据 ? 

      # 1. 获取到 ;
      # 2. 处理;
      # 3. 返回结果;

      # url 路径上的 ? 后的数据是给php的数据;
      # PHP 专门提供了获取数据的API; $_GET["名称"] ; $_POST["名称"] ; $_REQUEST["名称"];

      // 表单数据提交;
      // echo $_GET["username"]; 
      // echo $_GET["password"];

      $username = $_GET["username"];
      $password = $_GET["password"];
      
      if($username === "yanghuaizhi" && $password === "123456"){
            echo "<script>
                        location.href = \"http://www.baidu.com\";
                  </script>";
      }else{
            echo "账号或者密码错误 ";
            echo "<script>
                        setTimeout(function(){
                              history.go(-1);
                        },2000)
                  </script>";
      }

?>
