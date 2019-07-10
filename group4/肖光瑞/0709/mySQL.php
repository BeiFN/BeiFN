<?php
    header("Content-type:text/html;charset=utf-8;");
    $root = "localhost:3306";
    $username = "root";
    $password = "root";
    $dbname   = "xgrdata";

    $conn = mysqli_connect($root, $username,$password,$dbname);
    if(!$conn){
        die("error in connect mysql " + mysqli_connect_error());
    }

    //创建一个表
    // $sql_create_table = "CREATE TABLE XGRHEHE (
    //     username varchar(255) not null,
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // );";
    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    // 增
    // $sql_insert = "INSERT INTO XGRHEHE(username) VALUES ('awslo.o')";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    // 删
    // $sql_delete = "DELETE FROM XGRHEHE WHERE username='awsl' ";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    // 改
    $sql_update = "UPDATE XGRHEHE SET username='awsl-.o' WHERE username='awslawsl'";
    if(mysqli_query($conn,$sql_update)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    };

    //查
    $sql_select = "SELECT username FROM XGRHEHE";
    if($result = mysqli_query($conn,$sql_select)){
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
        }
    }else{
        echo mysqli_error($conn);
    }
?>