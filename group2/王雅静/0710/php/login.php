<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登陆页面</title>
</head>
<body>
<form>
        <p> 用户名：<input type="text" name = "username"> </p>
        <p> 密码：  <input type="text" name = "password"> </p>
        <button>登陆</button>
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
      echo ("连接失败" . mysqli_error($conn));//mysqli_error返回错误信息
}
echo "连接成功";


//判定数据库之中是否已经存在了;
      
$sql_select = "SELECT username,password FROM aaademo WHERE username='$usr'";
// 辨别查询结果之中有多少条数据


$res = mysqli_query($conn,$sql_select);

if(mysqli_num_rows( $res ) === 0 ) {
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