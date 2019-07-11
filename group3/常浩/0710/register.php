<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="">
        <p>
            用户名：
            <input type="text" name="username">
        </p>
        <p>
            密码：
            <input type="text" name="password">
        </p>
        <button>注册</button>
    </form>
</body>
</html>
<?php
    $usr = @$_GET["username"];
    $psd = @$_GET["password"];
    if(!$usr || !$psd){
        die();
    }
    //连接数据库
    $root = "localhost";
    $uesernamer = "root";
    $password   = "root";
    $dbname     = "changhao";

    $conn = mysqli_connect($root,$uesernamer,$password,$dbname);

    if(!$conn){
        die("数据库连接失败");
    }
    //查询用户名是否重名
    $select = "SELECT username FROM CHTEST  WHERE username='$usr'";

    $res = mysqli_query($conn,$select);
    if (mysqli_num_rows($res)>0){
        die("用户名重名，请重新输入");
    }

    //如果不重复的话  添加到数据库
    $insert = "INSERT INTO CHTEST(
        username,passwords
    )VALUES(
        '$usr','$psd'
    )";
    if(mysqli_query($conn,$insert)){
        echo "注册成功，请登录";
    }


?>