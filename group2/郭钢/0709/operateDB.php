<?php
    header("Content-type:text/html;charset=utf-8;");

    $root = "localhost:3306";
    $username = "root";
    $password = "root";
    $dbname = "gp12";


    $conn = mysqli_connect($root,$username,$password,$dbname);
    if(!$conn){
        die("CONNECT ERROR ".mysqli_connect_errno($conn));
    }


    // 创建表
    // $sql_create_table = "CREATE TABLE HAHA(
    //     username varchar(50),
    //     password varchar(50),
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // )";

    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    // 表中增加数据
    // $sql_insert = "INSERT INTO haha(
    //     username,password
    // )VALUES(
    //     'hello','23123321'
    // )";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "插入成功";
    // }else{
    //     echo mysqli_error($conn);
    // }
    


    // 表中删除数据
    // $sql_delete = "DELETE FROM haha WHERE username = 'hs'"; //为什么表中没有这个username也提示删除成功呢？
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "删除成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    
    // 表中修改数据
    // $sql_update = "UPDATE  haha set username = 'haha' WHERE username = 'hello'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "更新成功";
    // } else{
    //     echo mysqli_error($conn);
    // }


    // 查找表中的数据

    $sql_search = "SELECT username FROM haha";
    if($result = mysqli_query($conn,$sql_search)){
        // echo mysqli_num_rows($result);

        // $row = mysqli_fetch_assoc($result);
        // echo var_dump($row) ;
        while ($row = mysqli_fetch_assoc($result)) {
            echo json_encode($row);
        }
    }else{
            echo mysqli_error($conn);
        }

?>