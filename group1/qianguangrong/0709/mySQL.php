<?php
    header("Content-type:text/html;charset=utf-8");

    $root = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "GP12";
    $conn = mysqli_connect($root,$username,$password,$dbname);

    //是否存在
    if(!$conn){
        die("error in connect mysql" + mysqli_connect_error());
    }

    // //创建一个表  CREATE TABLE GPTEST()
    // $sql_create_table = "CREATE TABLE GPTEST(
    //     username  varchar(255),
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // )";

    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "success ";
    // }else{
    //     echo mysqli_error($conn);
    // }

    #增 INSERT INTO GTTEST(username) VALUE('HELLO WORLD')
    // $sql_insert = "insert into GPTEST(username)
    //     VALUE('HELLO WORLD')";
    // if(mysqli_query($conn,$sql_insert)){
    //       echo "SUCCESS";
    // }else{
    //       echo mysqli_error($conn);
    // };


    // #删 DELETE FROM GPTEST WHERE username='HELLO WORLD' 
    // $sql_delete = "DELETE FROM GPTEST WHERE username='HELLO WORLD'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "success";
    // }else{
    //     echo mysqli_error($conn);
    // }//我去username='HELLO WORLD' 全删了呀;



    // #改 UPDATE gptest SET username='gaimingzile' WHERE username='HELLO WORLD'
    // $sql_update = "update gptest set username='gaimingzile' WHERE username='HELLO WORLD'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "success";
    // }else{
    //     echo ysqli_error($conn);
    // };

    // #查 SELECT username FROM GPTEST
    // $sql_select = "SELECT username FROM GPTEST";
    //     if($result = mysqli_query($conn,$sql_select)){
    //         //拿出每一条数据;
    //         while($row = mysqli_fetch_assoc($result)){
    //             echo json_encode($row);
    //         }
    //     }else{
    //             echo mysqli_error($conn);
    //     };





?>