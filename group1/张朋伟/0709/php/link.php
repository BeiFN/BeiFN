<?php
header("Content-type:text/html;charset=utf-8;");
$servername = "localhost";
$username = "root";
$password= "root";
$dbname = "goto";

$conn = mysqli_connect($servername,$username,$password,$dbname);
// echo $conn;
if(!$conn){
    die("error in connect mysql".mysqli_connect_error());}
    else{
        echo "成功";
    }
// 插入数据
$sql_insert  = "INSERT INTO userlist (username,password) 
VALUES ('Z','123456')";


if(mysqli_query($conn,$sql_insert)){
    echo "已经插入数据";
}else{
    echo "不能插入数据";
}
mysqli_close($conn);
?>



<!-- <?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "goto";
 
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 检测连接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
 
$sql = "INSERT INTO userlist (username, password)
VALUES ('John', 'Doe')";
 
if (mysqli_query($conn, $sql)) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
 
mysqli_close($conn);
?> -->