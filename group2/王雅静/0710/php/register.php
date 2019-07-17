<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>注册页面</title>
</head>
<body>
    <form>
        <p> 用户名：<input type="text" name = "username"> </p>
        <p> 密码：  <input type="text" name = "password"> </p>
        <button>注册</button>
    </form>
</body>
</html>

<?php
//判断用户输入是否正确


 $usr = @$_GET["username"];
 $pwd = @$_GET["password"];
 //echo $usr;
 //echo $pwd;

 if(!$usr || !$pwd){
     die("aaaa");
 }
 //echo "abba";
 //连接数据库
 $host     = "localhost";//默认3306，修改的话自己写个：3307;
 $username = "root";
 $password = "root";
 $dbname   = "0709test";

 $conn = mysqli_connect($host,$username,$password,$dbname);


 if(!$conn){
       echo ("数据库连接失败" . mysqli_error($conn));//mysqli_error返回错误信息
 }
 echo "连接成功";
//去重
//选出来
 $sql_select = "SELECT username FROM aaademo WHERE username = '$usr' ";
//查出来
$res = mysqli_query($conn,$sql_select);

//将查询到的结果返回到记录数，若记录数> 0，则用户已存在
if(mysqli_num_rows($res) > 0){
    // die("用户已存在");
}

//确定无重复用户后，将注册信息插入到数据库
///进行加密
$pwd = md5($pwd);

$sql_insert = "INSERT INTO aaademo (
    username,password
)VALUES(
    '$usr','$pwd'
)";

//检查是否插入成功

if(mysqli_query($conn,$sql_insert)){
    echo "注册成功";
}
else{
    die("注册失败");
}



?>