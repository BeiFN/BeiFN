<?php
      //防止数据出现乱码
      header("Content-type: text/html; charset=utf-8");
      # 将用户输入的数据放入到mySQL之中; 进行数据的存储;
      // 表单数据提交;
      // echo $_GET["username"]; 
      // echo $_GET["password"];
      // 记得加@，不加会报错
      $username = @$_GET["username"];
      $password = @$_GET["password"];
      //因为只有js可以操作浏览器页面
      //一定要注意语法的严谨性
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
