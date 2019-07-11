<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登录</title>
</head>
<body>
    <form>
        用户名:
        <input type="text" name = "username">
        密码：
        <input type="password" name = "password">
        <input type = "submit">
    </form>
</body>
</html>

<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }

    $host = "localhost";
    $username = "root";
    $password = "miemie8389";
    $db = "gp12";

    $conn = musqli_connect($host, $username, $password, $db);

    if(!$conn){
        die("数据库连接失败".mysqli_error($conn));
    }

    $sql_select = "SELECT username, password FROM GPUSERLIST WHERE username = '$usr';";






?>