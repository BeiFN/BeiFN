<?php
    header("Content-type:text/html;charset=utf-8;");
    // header("Content-type:text/html;charset = utf-8;");
    $user = $_GET["username"];
    $pwd  = $_GET["password"];
    if(!$user || !$pwd){
        die("");
    }

    // 连接数据库
    $servername = "localhost";
    $username   = "root";
    $password   = "root";
    $dbname     = "mydate";
    // 返回一个资源类型
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    if(!$conn){
        die("conect error:" . mysqli_connect_error());
    }
    // echo "连接成功";

    // $sql_create_table = "CREATE TABLE GP12 (
    //     username varchar(255) not null,
    //     password varchar(255) not null,
    //     id int(5) auto_increment,
    //     PRIMARY KEY(id)
    // );";
    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "创建成功";
    // }
    // else{
    //     die("Error create table:" . mysqli_error());
    // }

    // $sql_insert = "INSERT INTO GP12(
    //     username,password
    // )VALUES(
    //     'xiedawen','123456'
    // )";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "插入成功";
    // }
    // else{
    //     die("Error insert date:" . mysqli_error());
    // }
    
    // $sql_update = "UPDATE GP12 SET username = 'Leslie' WHERE username = 'xiedawen'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "修改成功";
    // }
    // else{
    //     die("Error update date:" . mysqli_error());
    // }


    $sql_select = "SELECT username FROM GP12";
    $col = mysqli_query($conn,$sql_select);
    if($col){

        echo mysqli_num_rows($col);
        // while($res = mysqli_fetch_assoc($col)){
        //     echo (JSON_encode($res));
        //     // if(JSON_encode($res) == $user){
        //     //     die("用户重名");
        //     // }
        //     // else{
        //     //     echo "注册成功";
        //     // }
        // }
    }
    else{
        die("Error select userdate:" .mysqli_error());
    }

    // $sql_select = "SELECT username FROM USERLIST WHERE username = '$user'";
    // $col = mysqli_query($conn,$sql_select);
    // if($col){
    //     echo "查询语法对咯！";
    //     if(mysqli_num_rows($col) > 0){
    //         die("用户重名");
    //     }
    // }
    // else{
    //     die("Error select userdate:" .mysqli_error());
    // }
    // $sql_insert = "INSERT INTO USERLIST(
    //  username , password   
    // )VALUES (
    //     '$user' , '$pwd'
    // );";

    // if(mysqli_query($conn,$sql_insert)){
    //     echo "注册成功";
    // }
    // else{
    //     echo "Error insert userdate:" . mysqli_error($conn);
    // }

    mysqli_close($conn);
?>