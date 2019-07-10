<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action = "./01test.php">
        <p>
            用户名:
            <input type = "text" name = "username">
        </p>
        <p>
            密码:
            <input type= "text" name = "password">
        </p>
        <button>提交</button>
    </form>
</body>
</html>

<?php
    header("Content-type: text/html; charset=utf-8");
    $username = $_GET["username"];
    $password = $_GET["password"];
    if($username === "1486960462" && $password === "123456"){
        echo "<script>
                    location.href =\"http:/www.baidu.com\";
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