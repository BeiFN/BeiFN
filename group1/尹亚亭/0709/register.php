<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>注册</title>
</head>
<body>
    <form action="http://localhost/yyt/0709/register.php">
        <p>用户名：<input type="username" name="username"></p>
        <p>密码  ：<input type="password" name="password"></p>
       <button>注册</button>
    </form>
</body>
</html>

<?php
    
    $usr  = @$_GET["username"];
    $pwd  = @$_GET["password"];
    if(!$usr|| !$pwd){
        die("");
    }

    #注册
    $servername = "localhost:3306";
    $username   = "root";
    $password   = "root";
    $dbname     = "ting";  

    # Resource 资源类型
    $conn = mysqli_connect($servername,$username,$password,$dbname);

    if(!$conn){
        die("Connection failed:" .mysqli_connect_error());
    }
    // echo "链接成功";

    
    $pwd = md5($pwd);
    echo $pwd;
    $sql_insert = "INSERT INTO GPUSERLIST(username,password)VALUES('$usr','$pwd');";
    #验证是否注册成功
    if (mysqli_query($conn,$sql_insert)) {
        echo "用户注册成功";
    }else{
        echo "Error insert userdata:" .mysqli_error($coon);
    }

?>