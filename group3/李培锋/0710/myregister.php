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
        <p>用户名<input type="text" name = "username"></p>
        <p>密码<input type="text" name = "password"></p>
        <button>提交用户名</button>
    </form>
</body>
</html>

<?php
#1.连接服务器2.获取用户名3.数据库中是否存在？已存在||注册4.存入用户名，密码
    #提交时用户未输入
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];  #@屏蔽掉错误
    if(!$usr || !$pwd){
        die("");
    }
    #链接数据库
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";

    $conn = mysqli_connect($host,$username,$password,$dbname);
#链接是否成功
    if(!$conn){
        die("数据库连接失败" . mysqli_error());
    }
    #选择判断
    $sql_select = "SELECT username FROM gpuserlist WHERE username='$usr'";
    #查询
    $res = mysqli_query($conn,$sql_select);
    if(mysqli_num_rows($res)>0){
        die("用户名已存在");
    }
    #原来没有，插入数据库，注册成功
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO gpuserlist(
        username,password
    ) VALUES(
        '$usr','$pwd'  
    )";
    #成功检测
    if(mysqli_query($conn,$sql_insert)){
        echo "注册成功";
    }else{
        die("注册失败");
    }


?>