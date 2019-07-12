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
    // 查找数据
    $sql_select  = "select * from userlist where username = 'John'";
    
    if($res = mysqli_query($conn,$sql_select)){
        echo "已经找到数据";
        echo ("</br>");
        //拿出一条数据
        while($row = mysqli_fetch_assoc($res)){
            echo json_encode($row);
            echo ("</br>");
        }
        //遍历查query找到的
        echo ("数量为：");
        echo mysqli_num_rows($res);
        // echo json_encode($res);
    }else{
        echo "不能找到数据";
    }
    mysqli_close($conn);
    ?>