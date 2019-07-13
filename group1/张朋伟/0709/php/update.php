<?php
header("Content-type:text/html;charset=utf-8;");
$servername = "localhost";
$username = "root";
$password= "root";
$dbname = "goto";

$conn = mysqli_connect($servername,$username,$password,$dbname);
// echo $conn;
if(!$conn){
    die("error in connect mysql" + mysqli_connect_error());}
    else{
        echo "成功";
    }
// 修改数据
$sql_update  = "update userlist set username='hhah' where username ='张三'";
if(mysqli_query($conn,$sql_update)){
    echo "已经修改数据";
}else{
    echo "不能插入数据";
    // echo mysqli_error($conn);
}
?>