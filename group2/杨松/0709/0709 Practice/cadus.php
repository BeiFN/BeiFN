<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
       $root     = "localhost";
       $username = "root";
       $password = "root";
       $dbname   ="test";
       $conn =mysqli_connect($root,$username,$password,$dbname);
       //创建表

    //    $sql_create_table ="create table test(
    //         `username` varchar(255) not null,
    //         `password` varchar(255) not null,
    //         `email` varchar(255) not null,
    //         `phone` varchar(255) not null,
    //         `id` int(20) not null auto_increment,
    //          primary key (`id`)
    //    )";
    //    if(mysqli_query($conn,$sql_create_table)){
    //         echo "success";
    //    }else{
    //        echo mysqli_error($conn);
    //    }


       //增
//        $sql_insert = "insert into test
//             (`username`,`password`,`email`,`phone` )
//                 values
//             ('yangsong','123456','1601149683@qq.com','13657981968')";
//        if(mysqli_query($conn,$sql_insert)){
//              echo "success";
//    }else{
//        echo mysqli_error($conn);
//    };


     // 改
    //  $sql_update = "update test set username ='songsong' where username='yangsong'";
    //  if(mysqli_query($conn,$sql_update)){
    //     echo "success";
    //  }else{
    //      echo mysqli_error($conn);
    //  };


     //删
    //  $sql_delete ="delete from test where id='2' ";
    //  if(mysqli_query($conn,$sql_delete)){
    //     echo "success";
    //  }else{
    //      echo mysqli_error($conn);
    //  };


     //查
    //  $sql_select ="select username from test";
    //     // 查看有多少条数据
    //     $res = mysqli_query($conn,$sql_select);
    //     $row = mysqli_fetch_assoc($res);
    //     echo var_dump($row);

    //  if($res){
    //      //拿出一条数据
    //     while($row = mysqli_fetch_assoc($res)){
    //         echo json_encode($row);
    //     }
    //  }else{
    //      echo mysqli_error($conn);
    //  }


    //向已有数据表中插入新的一列数据
    $sql_alter = "alter table test add new_data varchar(255) not null";
    if(mysqli_query($conn,$sql_alter)){
        echo "success";
    }else{
        echo mysqli_error($conn);
    }
    ?>
</body>
</html>