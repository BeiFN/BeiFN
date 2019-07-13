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
        <p>用户名: <input type="text" name="username"></p>
        <p>密码: <input type="text" name="password"></p>
        <button>注册</button>
    </form>
</body>
</html>

<?php


// - 注册 

//       * 用户输入用户名密码;
//       * 提交表单 (数据从浏览器 提交到 服务器逻辑语言上)
//       * php捕获数据 , 数据库比对重复代码, 存入数据库。

    //终止逻辑,如果没有用户提交的数据
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if (!$usr || !$pwd) {
         die("内容不能为空");
    }
    //链接数据库
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";

    $conn = mysqli_connect($host,$username,$password,$dbname);
    if(!$conn){
        die("数据库连接失败".mysqli_error());
    }
    echo "链接成功";
    //判定数据库之中是否已经存在了;
    $sql_select = "SELECT username FROM gpuserlist WHERE username='$usr'";
    $res = mysqli_query($conn,$sql_select);
    // echo var_dump ($res);
    // print_r($res);
    if(mysqli_num_rows($res)>0){
        die("用户名重名");
    }

    //插入数据
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO gpuserlist(
        username,password
        ) VALUES (
        '$usr','$pwd'
        )";
        if(mysqli_query($conn,$sql_insert)){
            echo "注册成功";
        }else{
            die("注册失败");
        }
?>