

<?php
header("Content-type:text/html ; charset=utf-8");
$user = $_GET["username"];
$psw = $_GET["password"];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "gp12";

$conn = mysqli_connect($servername,$username,$password,$dbname);
    if(!$conn){
        die("Connect Error :" .mysqli_connet_error());
    }
if(!$user && !$psw){
    die("用户名或密码不能为空");
}
$psw = md5($psw);
$sql_insert = "INSERT INTO GPUSERLIST(username,password)VALUES('$user','$psw')";

if(mysqli_query($conn,$sql_insert)){
    echo "注册成功";
}else{
    die("Register Error : ".mysqli_error($conn));
}
?>