<?php
    header("Content-type: text/html; charset=utf-8");
    $username = $_GET["username"];
    $password = $_GET["password"];

    if($username === "liushen" && $password === "123456"){
        echo "<script>
                    location.href = \"https://www.baidu.com\";
             </script>";
  
    }else{
        echo "账号或密码错误";
        echo "<script>
                    setTimeout(function(){
                        history.go(-1);
                    },2000)
            </script>";
    }
?>