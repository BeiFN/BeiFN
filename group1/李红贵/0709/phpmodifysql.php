<?php
    header("Content-type:text/heml;charset=utf-8");//兼容中文

    $mainID = "localhost";//服务器主机名或id
    $username = "root";//设置用户名
    $password = "root";//密码
    $dbserver = "lhgservertest"; //服务器名

    // 连接服务器
    $conn = mysqli_connect($mainID,$username,$password,$dbserver);
    if(!$conn){//如果未连接成功
        die("connect error " +mysqli_connect_error());
    }

    // 创建表
    // $sql_create_table = "create table lhggp12test1 (
    //     name varchar(255),
    //     id int(5) not null auto_increment,
    //     primary key (id)

    // );";

    // if(mysqli_query($conn, $sql_create_table)){
    //     echo "success";
    // }else{
    //     echo mysqli_errou($conn);
    // };

    // 操作表

    // 增
    // $sql_insert = "insert into lhggp12test1(
    //     name
    // ) values (
    //     'a2'
    // ),(
    //     'a1'
    // ),(
    //     'a3'
    // ),(
    //     'a4'
    // ),(
    //     'a5'
    // );";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "success-40\n";
    // }else{
    //     echo mysqli_error($conn);
    // }


    // 删,一次删除所有相同项
    // $sql_delete = "delete from lhggp12test1 where name='a2'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "success--49\n";
    // }else{
    //     echo mysqli_error($conn);
    // }

    //// 改  设置为helloword   将a1
    // $sql_update = "update lhggp12test1 set name = 'helloword' where name='a1'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "success";
    // }else{
    //     echo mysqli_error($conn);
    // }


    // 查
    $sql_select = "select name from lhggp12test1";
    if($result = mysqli_query($conn,$sql_select)){
        // 查询有多少条数据
        echo "734\n";
        echo mysqli_num_rows($result);
        echo "\n";

        // // 遍历
        // $row = mysqli_fetch_assoc($result);
        // echo "79-$row\n";
        // echo var_dump($row);//查类型

        // $arr = mysqli_fetch_array($result);
        // echo "81-$arr\n";
        

        while($row = mysqli_fetch_assoc($result)){
            // 先给row赋值，再判断row是否存在
            echo json_encode($row);
            echo "84";

        }
    }else{
        echo "90";
        echo mysqli_error($conn);
    }

?>