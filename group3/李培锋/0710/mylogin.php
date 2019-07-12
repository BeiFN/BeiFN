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
    #1.是否输入信息2.是否链接数据库3.用户名是否存在4.密码是否正确
    $usr = @$_GET["username"];
    $password = @$_GET["password"];
    #2.检测输入
    if(!$usr||!$password){
        die("");
    }
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";
    $conn = mysqli_connect($host,$username,$password,$dbname);
    #检测链接
    if(!$conn){
        die("数据库连接失败" . mysqli_error());
    }
    $sql_select="SELECT username,password FROM gpuserlist WHERE uesername='$usr'";
    $res = mysqli_query($conn,$sql_select);
    #检测用户名是否存在
    if(mysqli_num_rows( $res ) === 0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){ //遍历这一条数据
            if($row["password"] == md5($psw)){
                echo("登陆成功");
            }else{
                echo("密码输入错误");
            }
        }
    }

?>