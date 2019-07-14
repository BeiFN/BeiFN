<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <form>
            <p>用户名：<input type="text" name="username"></p>
            <p>密码：<input type="text" name="password"></p>
            <button>注册</button>
        </form>
    </body>
</html>
<?php
    // 获取值，终止逻辑，若没有用户提交数据则终止代码
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }


    // 连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";
    // 连接失败处理
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    // echo var_dump($conn);
    if(!$conn){
        die("Connection failed".mysqli_connect_error());
    }


    // 判定用户是否重名
    // SQL查询语句
    $sql_select = "SELECT username FROM gpuserlist WHERE username='$usr'";
    // 数据查找结果不为0则重名
    // mysqli_query执行查询语句，针对成功的 SELECT、SHOW、DESCRIBE 或 EXPLAIN 查询，将返回一个 mysqli_result 对象。针对其他成功的查询，将返回 TRUE。如果失败，则返回 FALSE
    $res = mysqli_query($conn, $sql_select);
    if($res){
        if(mysqli_num_rows($res) > 0){
            die("用户名已被使用");
        }
    } else {
        die("Error select userdata".mysqli_error($conn));
    }


    
    // 插入用户数据
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO gpuserlist (
        username, password
        ) VALUES (
            '$usr', '$pwd'
    )";

    if(mysqli_query($conn, $sql_insert)){
        echo "注册成功";
    } else {
        die("注册失败");
    }






?>


