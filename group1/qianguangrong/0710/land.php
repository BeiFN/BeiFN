<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form > 
        <p>用户名: <input type="text" name="username"> </p>
        <p>密码 :<input type="text" name="password"> </p>
        <button>登陆</button>
      </form>
</body>
</html>

<?php
$usr = @$_GET["username"];
$pwd = @$_GET["password"];
if(!$usr || !$pwd){
    die("");
}
#链接数据库
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "gp12";
$conn = mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
    die ("数据链接错误". mysqli_error());
}
#判断是否存在;
$sql_select = "selecst username from gpuserlist where username='$usr'";
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