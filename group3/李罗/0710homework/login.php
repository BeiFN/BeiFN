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
// 登录流程
//1.用户输入用户名密码
//2.提交表单
//3.php捕获数据，通过数据库进行对比

//终止逻辑，如果用什么也没有提交，则终止代码
$usr=@$_GET["username"];
$pwd=@$_GET["password"];
if(!$usr || !$pwd){
    die ("");
}
//链接数据库
$host="localhost:3306";
$username="root";
$password="root";
$dbname="gp12";

$conn=mysqli_connect($host,$username,$password,$dbname);
if(!$conn){
    die("数据库连接失败" . mysqli_error());
}
//查找数据进行对比
$sql_select="SELECT username, password FROM GPUSERLIST WHERE username='$usr'";
//辨别一下查询到的数据有多少条
$res=mysqli_query($conn,$sql_select);
if(mysqli_num_rows($res)===0){
    die("用户名不存在");
}else{
    while($row = mysqli_fetch_assoc($res)){
        if($row["password"] ==($pwd)){
            die("登陆成功");
        }
    }
    echo "密码错误";

    }
?>