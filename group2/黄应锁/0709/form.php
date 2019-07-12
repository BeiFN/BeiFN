<?php
    header("Content-type: text/html; charset=utf-8");
    $username = $_GET["username"];
    $password = $_GET["password"];

    if($username === "hys" && $password === "1234"){
        echo "<script>
            location.href = \"http://www.baidu.com\";
        </script>";
    }else{
        echo "账号或密码错误";
        echo "<script>
            setTimeout(()=>history.go(-1),2000);
        </script>";
    }

?>