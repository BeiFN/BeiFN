<?php
    header("Content-type:text/html;charset=utf-8");

    // 连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$dbname);
    // echo var_dump($conn);

    // 连接失败报出错误，一遍排查
    if(!$conn){
        die("Error in connect mySQL " + mysqli_connect_error());
    }


    // 创建表
    // $sql_create_table = "CREATE TABLE GPTEST (
    //     username varchar(255),
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // );";

    // if(mysqli_query($conn, $sql_create_table)){
    //     echo "成功";
    // } else {
    //     echo mysqli_error($conn);
    // }




    // 操作表： 增  删  改  查
    
    // 增
    // $sql_insert = "INSERT INTO GPTEST(
    //     username
    // ) VALUES
    // (
    //     '张三'
    // )
    // ";

    // if(mysqli_query($conn, $sql_insert)){
    //     echo "成功";
    // } else {
    //     echo mysqli_error($conn);
    // }


    // 删
    // $sql_delete = "DELETE FROM GPTEST WHERE username='hello'";
    
    // if(mysqli_query($conn, $sql_delete)){
    //     echo "成功";
    // } else {
    //     echo mysqli_error($conn);
    // }

    

    // 改
    // $sql_update = "UPDATE GPTEST SET username='boom' WHERE username='hahahaha'";

    // if(mysqli_query($conn, $sql_update)){
    //     echo "成功";
    // } else {
    //     echo mysqli_error($conn);
    // }


    // 查找，并拿出每条数据；
    $sql_select = "SELECT username FROM gptest";
    if($result = mysqli_query($conn, $sql_select)){
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
        }
    } else {
        echo mysqli_error($conn);
    }





?>