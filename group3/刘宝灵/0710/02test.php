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
            <p>用户名: <input type="text" name="username"> </p>
            <p>密码  :<input type="text" name="password"> </p>
            <button>提交用户名</button>
      </form>

</body>
</html>

<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }

    $root     = "localhost";
    $username = "root";
    $password = "123456";
    $dbname   = "gp12";

    $conn = mysqli_connect($root,$username,$password,$dbname);

    if(!$conn){
        die("数据库连接失败" . mysqli_error());

    }

    $sql_select = "SELECT username,password FROM jkl WHERE username='$usr'";
    $res = mysqli_query($conn,$sql_select);
    if(mysqli_num_rows($res) === 0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                die("登陆成功");
            }
        }
        echo "密码错误";
    }
?>