<?php

// 1、链接数据库,
// 2、检测链接是否成功
// 3、创建表，
// 4、检测表是否创建成功
// 5、清楚缓存，链接

header("Content-type:text/html;charset=utf-8;");

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "gp12";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if(!$conn){
    die("链接未成功：".mysql_connct_error());
}
// 创建表
// $sql_table = "CREATE TABLE Rable(
//                 id INT(5) AUTO_INCREMENT NOT NULL PRIMARY KEY,
//                 username VARCHAR(255) NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 email VARCHAR(255) NOT NULL
//             )";

// if(mysqli_query($conn,$sql_table)){
//     echo "创建成功";
// }else{
//     die("创建失败：".mysqli_error($conn));
// }

//增
// $sql_one = "INSERT INTO Rable(
//                 username
//                 )VALUES(
//                 'WOWO'
//             )";
// if(mysqli_query($conn,$sql_one)){
//     echo "添加成功";
// }else{
//     echo mysqli_error($conn);
// }

//删   内容相同的会全部删除
// $sql_delet = "DELETE FROM Rable WHERE username='nihao'";
// if(mysqli_query($conn,$sql_delet)){
//     echo "删除成功";
// }else{
//     echo mysqli_error($conn);
// }

//改
// $sql_update = "UPDATE Rable SET username = 'HELLO' WHERE username = 'HOLLO'";
// if(mysqli_query($conn,$sql_update)){
//     echo "修改成功";
// }else{
//     echo mysqli_error($conn);
// }

//查
$sql_select = "SELECT username FROM Rable";
$result = mysqli_query($conn,$sql_select);
if($result){
    while($row = mysqli_fetch_assoc($result)){
        echo json_encode($row);
    }
}else{
    echo mysqli_error($conn);
}
mysqli_close($conn);
?>