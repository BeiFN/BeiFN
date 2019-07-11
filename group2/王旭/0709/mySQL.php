<?php

    header("Content-type:text/html;charset=utf-8;");
    $root = "localhost:3306";
    $username = "root";
    $password = "root";
    $dbname ="gp12";
    $conn = mysqli_connect($root,$username,$password,$dbname);
    if(!$conn){
        die("error in connect mysql" + mysqli_connect_error());
    }

    //创建一个表
    // $sql_create_table = "CREATE TABLE GPTEST(
    //     username varchar(255),
    //     password varchar(255),
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // )";
    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    // //增
    $sql_insert = "INSERT INTO GPTEST(
        username,password
    )VALUES(
        'hello world','321456'
    )";
    if(mysqli_query($conn,$sql_insert)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    }

    //删
    // $sql_delete = "DELETE FROM GPTEST WHERE username = 'hello world'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "删除成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //查
    $sql_select = "SELECT username FROM  GPTEST";
    if($result = mysqli_query($conn,$sql_select)){
        //查看存在多少条数据
        //echo mysqli_num_rows($result);
        //$row = mysqli_fetch_assoc($result);
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
        }
    }else{
        echo mysqli_error($conn);
    }

?>