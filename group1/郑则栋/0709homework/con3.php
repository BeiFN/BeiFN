<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="con2.php">
        <label for="">用户名</label> <input type="text" name="username">
        <label for="">密码</label> <input type="password" name="password">
        <button>gogogo</button>
    </form>
</body>
</html>
<?php
$user=@$_GET["username"];
$pass=@$_GET["password"];
$localhost='localhost';
$username='root';
$password='';
//连接数据库
$conn=mysqli_connect($localhost,$username,$password);
//创建数据库flower
$create="create database  if not exists flower default character set utf8 default collate utf8_general_ci";
$res=mysqli_query($conn,$create);
//应用数据库
$query='use flower';
//创建列flowers
mysqli_query($conn,$query);
$query="create table if not exists flowers(
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    id int not null auto_increment,
    primary key(id)
)
engine=innodb";
mysqli_query($conn,$query);
//插入数据库
$query="insert into  flowers (username,password) values ('$user','$pass')";
//查找
$query1='select * from flowers';
$res=mysqli_query($conn,$query1);
while($row=mysqli_fetch_assoc($res)){
    //判断是否有值,如果有，die
    // if($row['username']===$user){
    //     echo "<script>alert('username is be used .Go out of here bitch!!!!!!!Please do it earnest,ok?') </script>";
    //     die();
    // }
    $ne=json_encode($row);
    if($row['username']===$user){
        echo "<script>alert('username is be used .Go out of here bitch!!!!!!!Please do it earnest,ok?') </script>";
         die();
    }
}
//如果没有，插入
mysqli_query($conn,$query);

mysqli_close($conn);


?>