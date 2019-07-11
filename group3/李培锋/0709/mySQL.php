<?php
    header("Content-type:text/html;charset=utf-8;");
    $root = "localhost";
    $username = "root";
    $password = "root";
    $dbname   = "gp12";

    $conn = mysqli_connect($root,$username,$password,$dbname);
    if(!$conn){
        die("error in connect mysql" + mysqli_connect_error());
    }
    //创建一个表
    $sql_create_table = "CREATE TABLE GPTSET(
        username varchar(255),
        id int(5) not null auto_increment,
        PRIMARY KEY (id)
    );";
    if(mysqli_query($conn,$sql_create_table)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    };
    
    $sql_insert = "INSERT INTO GPTEST(
        username
    ) VALUES
    (
        'hello world'
    )
    ";
    if(mysqli_query($conn,$sql_insert)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    }
    
?>