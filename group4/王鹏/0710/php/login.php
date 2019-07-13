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
            <button>登录</button>
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


    // 判定用户密码是否正确
    $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
    $res = mysqli_query($conn, $sql_select);

    if(mysqli_num_rows($res) === 0){
        die("用户名不存在");
    } else {
        // $row = mysqli_fetch_assoc($res);
        // echo var_dump($row);
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                die("登录成功");
            }
        }
        echo "密码错误";
    }
    
?>


