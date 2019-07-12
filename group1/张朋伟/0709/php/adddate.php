<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>注册</title>
</head>

<body>
<!-- 提交数据到的php页面 -->
    <form action="adddate.php">
        <p><label>用户名<input type="text" name = "username"></label>
        <p><label>密码<input type="password" name = "password"></label>
        <p><button>注册</button></p>
    </form>
</body>
</html>


<?php
//  header("Content-type:text/html;charset=utf-8;");
$usr = @$_GET["username"];
$pwd = @$_GET["password"];
// echo $usr,$pwd;
$servername = "localhost";
$username = "root";
$password= "root";
$dbname = "goto";
$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("error in connect mysql".mysqli_connect_error());}
    else{
        echo "数据库连接成功";
        echo "</br>";

    }
// 插入数据是否为空
if("$usr" && "$pwd" ){
    //查重用户名
    $copyName =  "SELECT * FROM userlist where username = '$usr'";
    //mysqli_query返回要查找的数据集合
    $col = mysqli_query ($conn,$copyName);
    // echo ($copyName);
    //mysqli_num_rows 返回存在的数据集合的条数
    if(mysqli_num_rows($col)>0){
        //判断重名否？
        echo "'$usr'存在重名";
        return false;
    }
    //密码加密
    $pwd =md5($pwd);
    //插入数据库
    $sql_insert  = "INSERT INTO userlist (username,password)  VALUES ('$usr','$pwd')";
    if(mysqli_query($conn,$sql_insert)){
        echo "已经插入数据";
    }else{
        echo "不能插入数据";
    }
}
    else{
        echo "用户名和密码不能为空";
    }
mysqli_close($conn);
?>