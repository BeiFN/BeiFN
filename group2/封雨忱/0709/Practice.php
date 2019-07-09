<?php
header("Content-type:text/html;charset=utf-8");
// $usr=$_GET['username'];
// $pas=$_GET['password'];
// echo $usr , $pas;
$root="localhost";
$username="root";
$password="root";
$dbname="gp12";
$conn=mysqli_connect($root,$username,$password,$dbname);
// echo var_dump($conn);
if(!$conn){
    die("error in connect mysql"+ mysqli_connect_error());
};

//创建一个表
// $sql_create_table="CREATE TABLE NEWLIST(
//     username varchar(255),
//     age varchar(3),
//     id int(5) not null auto_increment,
//     PRIMARY KEY(id)
//     );";
//     if(mysqli_query($conn,$sql_create_table)){
//         echo "成功";
//     }else{
//         echo mysqli_error($conn);
//     };

//删除一个表
// $sql_delete_table="DELETE FROM NEWLIST WHERE username='liming'";
// if(mysqli_query($conn,$sql_delete_table)){
//     echo "成功";
// }else{
//     echo mysqli_error($conn);
// };

//增
// $sql_insert="INSERT INTO NEWLIST(
//     username, age
// )   VALUE(
//     'liming', '12'
// )
// ";
// if(mysqli_query($conn,$sql_insert)){
//     echo "成功";
// }else{
//     echo mysqli_error($conn);
// }

//改
// $sql_update="UPDATE NEWLIST SET username='xiaoming' WHERE username='liming'";
// if(mysqli_query($conn,$sql_update)){
//     echo "成功";
// }else{
//     echo mysqli_error($conn);
// }

//查
// $sql_select="SELECT username='xiaoming' FROM NEWLIST";
// if($main=mysqli_query($conn,$sql_select)){
//     echo "成功";
//     // echo mysqli_num_rows($main);
//     // $row=mysqli_fetch_assoc($main);
//     // echo var_dump($row);
//     while($row=mysqli_fetch_assoc($main)){
//         echo json_encode($row);
//     }
// }else{
//     echo mysqli_error($conn);
// }
?>