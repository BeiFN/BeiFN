<?php
    header("Content-type:text/html;charset=utf-8;");
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $db = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$db);
    if(!$conn){
        die("Connecy Error");
    }
    // 创建一个表;
    //   $sql_create_table = "CREATE TABLE list (
    //         username varchar(255),
    //         password varchar(255),
    //         id int(5) not null auto_increment,
    //         PRIMARY KEY (id)
    //   );";
    //   //一定要有这一句
    //  mysqli_query($conn,$sql_create_table);


    //数据库的增加操作
    // $insert = "INSERT INTO list(
    //     username,password
    // )VALUES(
    //     'ffff','wfffforfdsd'
    // )";
    // if(mysqli_query($conn,$insert)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //数据库的删除操作
    // $delete = "DELETE FROM list WHERE username='hello'";
    // if(mysqli_query($conn,$delete)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // }
    

    //数据库的修改
    // $update = "UPDATE list SET username='hys'  WHERE username='sfd'";
    // $update1 = "UPDATE list SET password='123'  WHERE password='worfdsd'";
    // if(mysqli_query($conn,$update)&&mysqli_query($conn,$update1)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // }


    //数据库的查询
    $select = "SELECT username FROM list WHERE username='hys'";
    $result = mysqli_query($conn,$select);
    echo mysqli_num_rows($result);
    while($row = mysqli_fetch_assoc($result)){
        echo json_encode($row);
    }
   
?>