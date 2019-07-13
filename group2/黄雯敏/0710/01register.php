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
        <p>
            用户名：<input type="text" name="username">
        </p>
        <p>
           密码：<input type="text" name="password">
        </p>
        <button>注册</button>
    </form>
</body>
</html>
<?php
    $user = @$_GET["username"];
    $pwd =  @$_GET["password"];
 
    //如果用户没有提交数据，就会终止代码执行
    if(!$user || !$pwd){
        die("");
    }
    
    //连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "haha";
    
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    //检测数据库是否链接成功
    if(!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    //判断数据库里是否已经有这个用户了
    //先辨别数据库里有多少条数据：
    $sql_select = "SELECT * FROM user WHERE username='$user'";
    //执行针对数据库的查询语句
    $res = mysqli_query($conn,$sql_select);

    if(mysqli_num_rows($res) > 0){
        die("用户名有重");
    }

    //插入数据
    //md5()是对密码进行加密
    $pwd = md5($pwd);
    
    $sql_insert = "INSERT INTO user(
        username,password
    ) VALUES (
        '$user','$pwd'
    )" ;
    if(mysqli_query($conn,$sql_insert)){
        echo "注册成功";
    } else{
        die("注册失败");
    }




?>