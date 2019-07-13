<?php
    # 字符utf-8
    header("Content-type:text/html; charset=utf-8");

    # 定义变量
    $root     = "localhost:3306";
    $username = "root";
    $password = "root";
    $dbname   = "ting";

    # 链接数据库
    $conn = mysqli_connect($root,$username,$password,$dbname);
    // echo var_dump($conn);

    # 如果链接为空，就报错，便于排查
    if(!$conn){
        die("Error In Connect mySQL:" + mysqli_connect_error($conn));
    }

    // # 创建一个表
    $sql_create_tab = "CREATE TABLE ANEWTAB(username varchar(255),phonenum int(12),id int(5) not null auto_increment,PRIMARY KEY(id));";
    #验证是否创建表成功
    if (mysqli_query($conn,$sql_create_tab)) {
        echo "Creating Table Successes !";
    }else{
        echo "Creating Table Failed:" + mysqli_error($conn);
    }

    # 对表格的操作：增删改查
    # 增
    // $sql_insert_one = "INSERT INTO ANEWTAB(
    //         username,phonenum,id
    //    )  VALUES
    //    (
    //     'Y','1234567','1'
    //    )
    //     ";
    //  if(mysqli_query($conn,$sql_insert_one)){
    //         echo "成功";
    //   }else{
    //         echo mysqli_error($conn);
    //   };

    #删
    // $sql_delete = "DELETE FROM ANEWTABLE WHERE username='Y'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    #改
    // $sql_update = "UPDATE ANEWTABLE SET username='yinyating' WHERE username='Y'";
    // if(mysqli_query($conn,$sql_update)){
    //         echo "成功";
    // }else{
    //         echo mysqli_error($conn);
    // };
  
    #查
    // $sql_select = "SELECT id FROM ANEWTABLE";
    // if($result = mysqli_query($conn,$sql_select)){
    //     while ($row = mysqli_fetch_assoc($result)) {
    //         echo json_encode($row);
    //     }
    // }else{
    //     echo mysqli_error($conn);
    // };

?>