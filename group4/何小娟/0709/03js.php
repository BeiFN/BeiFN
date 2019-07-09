<?php
      header("Content-type: text/html; charset=utf-8");
      
      $user = @$_GET["username"];
      $pwd = @$_GET["password"];

      echo "$user $pwd";
      if($user === "hxj" && $pwd === "123"){
            echo "<script>
                        location.href = \"http://www.baidu.com\";
                  </script>";
      }else{
            echo "账号或者密码错误";
            echo "<script>
                        setTimeout(function(){
                              history.go(-1);
                        },2000)
                  </script>";
      }

?>