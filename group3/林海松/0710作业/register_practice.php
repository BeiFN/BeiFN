<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>用户注册</title>
</head>
<body>
    <form action="./register_practice.php">
        <p>
            用户名:<input type="text" name="username">
        </p>
        <p>
            密 码:<input type="text" name="password">
        </p>
        <button>用户登录</button>
    </form>
</body>
<?php
    $user = @$_GET["username"];
    $pwd  = @$_GET["password"];
    if(!$user || !$pwd){
        die("");
    }
    $localhost = "localhost";
    $username  = "root";
    $password  = "root";
    $dbname    = "gp12";
    $conn      = mysqli_connect($localhost,$username,$password,$dbname);
    if(!$conn){
        die("链接成功");
    }
    //是否有相同的数据
    $select    = "SELECT username FROM GP12LIST WHERE username='$user'";
    $res       = mysqli_query($conn,$select);
    if(mysqli_num_rows($res)>0){
        die("重复的用户名");
    }
    //插入数据
    $pwd      = md5($pwd);//MD5加密
    $sql_insert = "INSERT INTO GP12LIST(
        username , password
    ) VALUES ('$user' , '$pwd');";//需要为字符串形式，不然会报错(真的蠢，这都能错)
    if(mysqli_query($conn,$sql_insert)){
        die("注册成功");
    }
    else{
        die("注册失败");
    }
    mysqli_close($conn);
?>
</html>