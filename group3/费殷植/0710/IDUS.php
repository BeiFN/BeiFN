<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<?php
    // 
    $servername = "localhost";
    $username = "root";
    $password = "123";
    $db = "phptest";

    $conn = mysqli_connect($servername,$username,$password,$db);
    // //创建表
    // $sql_createDB = "create table userInfo (id int(5) not null auto_increment, username varchar(255) not null,password varchar(255) not null,PRIMARY KEY(id))";
    // $res = mysqli_query($conn,$sql_createDB);
    // echo var_dump($res);
    // if($res){
    //     echo("创建表成功");
    // }else{
    //     die("语法错误");
    // }
    //增
    // $sql_insert = "insert into userInfo(username,password) values ('zhangsan','123')";
    // $insertRes = mysqli_query($conn,$sql_insert);
    // if($insertRes){
    //     echo("插入数据成功");
    // }else{
    //     die("插入的语法不正确");
    // }

    // //删
    // $sql_delete = "delete  from userInfo where username = 'zhangsan'";
    // $deleteRes = mysqli_query($conn,$sql_delete);
    // if($deleteRes){
    //     echo "删除语法正确";
    // }else{
    //     die("删除的语法不正确");
    // }

    //改
    // $sql_update = "update userInfo set(username = 'lisi') where username = 'zhangsan'";
    // $updateRes = mysqli_query($conn,$sql_update);
    // if($updateRes){
    //     echo "修改成功";
    // }else{
    //     die("修改语法错误");
    // }

    // 查
    $sql_select = "select * from userInfo where username = 'zhangsan'";
    $selectRes = mysqli_query($conn,$sql_select);
    if($selectRes){
        while($row = mysqli_fetch_assoc($selectRes)){
            echo json_encode($row);
        }
    }else{
        die("查询语法错误");
    }
?>