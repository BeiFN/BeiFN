<?php
    header("Content-type:text/html;charset=utf-8;");
    $servername="localhost";
    $username="root";
    $password="root";
    $dbname="GP12";
    $conn=mysqli_connect($servername,$username,$password,$dbname);
    if(!$conn){
        die("数据库连接失败".mysql.error());
    }else{
        echo"连接成功";
    }
    //创建表
    // $sql_create_table="CREATE TABLE GPTEST (
    //     username varchar(255),
    //     password varchar(255),
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY(id)
    // );";
    // if(mysqli_query($conn,$sql_create_table)){
    //     echo"表创建成功";
    // }else{
    //     echo mysqli_error($conn);
    //     // echo"表创建失败";
    // }
    // //增加
    // $sql_insert="INSERT INTO GPTEST(username,password) VALUES('123','12345');";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo"数据添加成功";
    // }else{
    //     echo mysqli_error($conn);
    // }
    // //改
    // $sql_update="UPDATE GPTEST SET password='1111' WHERE username='123'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "数据更改成功";
    // }else{
    //     echo mysqli_error($conn);
    // }
    //查
    // $sql_select="SELECT * FROM GPTEST WHERE username='123'";
    // if($result=mysqli_query($conn,$sql_select)){
    //     while($row = mysqli_fetch_assoc($result)){
    //         echo json_encode($row);
    //     }
    // }
    //删
    $sql_delete="DELETE  FROM GPTEST WHERE username='123'";
    if(mysqli_query($conn,$sql_delete)){
        echo "数据删除成功";
    }else{
        echo mysqli_error($conn);
    }
        
?>