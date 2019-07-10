<?php

    header("Content-type:text/html;charset=utf-8");
    //创建表单  进行增删改查
    //首先连接数据库
    $root = "localhost";
    $username = "root";
    $password = "root";
    $dbname   = "changhao";

    //连接数据库
    $conn = mysqli_connect($root,$username,$password,$dbname);
    if($conn){
        echo "连接成功";
    }else{
        die("发生错误"+ mysqli_connect_error());
    }
    //成功连接之后 进行表单的创建
    //创建一个表
    // $table ="CREATE TABLE CHTEST(
    //     username varchar(255) not null,
    //     passwords varchar(255) not null,
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY(id)
    // )";

    // 是否加入到库的查询  用到的API mysqli_query 
    // if(mysqli_query($conn,$table)){
    //     echo "创建成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //创建成功  进行增加操作
    //数据的添加 可以是一组一组的   一组key   一组value    哈希对应
    // $insert = "INSERT INTO CHTEST(
    //     username,passwords
    // )VALUES(
    //     'changhao3','1234567'
    // )";

    // if(mysqli_query($conn,$insert)){
    //     echo "添加成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    //数据的删除  数据的删除  可以根据不同的字段进行删除  删除的时候数据是整条删除的
    // $sql_delete = "DELETE FROM CHTEST WHERE passwords='1234567'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "删除成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //数据的更改  
    //注意事项：更新的时候线数据在前   旧数据在后
    // $update = "UPDATE CHTEST SET username='changhao3' WHERE username='changhao2'";
    // if(mysqli_query($conn,$update)){
    //     echo "更新成功";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //数据的查询  也是可以一次查询多个数据的  uesername,passwords;
    // $select = "SELECT username,passwords FROM CHTEST";
    // if($result = mysqli_query($conn,$select)){
    //     // echo mysqli_num_rows($result);  //返回的是数据的条数   1
    //     // $row =mysqli_fetch_assoc($result);
    //     // echo var_dump($row);//array(1) { ["username"]=> string(9) "changhao3" }  返回的是伪数组
    //     // echo json_encode($row);//{"username":"changhao3"} 返回的是json对象类型的数据

    //     //通过遍历来取出每一条数据
    //     while($row = mysqli_fetch_assoc($result)){
    //         echo json_encode($row);
    //     }
    // }else{
    //     echo mysqli_error($conn);
    // };

    // $insert = "INSERT INTO CHTEST(
    //     passwords
    // )VALUES(
    //     '123456'
    // ) ";

    // if(mysqli_query($conn,$insert)){
    //     echo "添加成功";
    // }else{
    //     echo mysqli_error($coon);
    // };

    $update = "UPDATE CHTEST SET username='changhao5',passwords='123' WHERE username='changhao4'";
    if(mysqli_query($conn,$update)){
        echo "修改成功";
    }else{
        echo mysqli_error($conn);
    }
?>