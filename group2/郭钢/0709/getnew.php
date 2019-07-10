<?php
    header("Content-type:text/html;charset=utf-8");


    $username = $_GET["username"];
    $password = $_GET["password"];


    if($username==="hahaha"&&$password==="123"){
        echo "<script>
            location.href = \"http://www.baidu.com\"
        </script>";
    }else{
        echo "输入信息错误，请重新输入！";
        echo "<script>
        setTimeout(()=>{
            history.go(-1)
        },3000)
        </script> ";
    }
