<?php
    header("Content-type:;text/html;charset=utf-8;")
    $root="localhost:3306";
    $username="root";
    $password="root";
    $dbname="gp12";

    $conn = mysqli_connect($root , $username , $password, $dbname);
    //$conn=>链接数据返回的数据库连接信息
    //echo  var_dump($conn);
    // 如果链接返回值为空那么则认为链接失败，报出错误便于排查；

    if(!$conn){
        die("error in connect mysql "+ mysqli_connect_reeor());
    }
    //创建一个表，用sql语句执行对应功能
    //创建一个表；

    $sql_create_table ="CREATE TABLE GPTSET(
        username varchar(255),
        id int(5) not null auto_increment,
        PRIMSRY KEY (id)
    );";
    if(mysqli_query($conn,$sql_create_table)){
        echo "成功";
    }else{
        echo mysql_error($conn);
    };

    //操作表；增删改查
    //增
    $sql_insert="INSERT INTO GPTEST(
        username
    ) VALUES
    (
        "hello world"
    )";
    if(mysqli_query($conn,$sql_insert)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    };

    // 删除
    $sql_delect="DELECT FROM GPTEST WHERE username='hello world'";
    if(mysqli_query($conn,$sql_insert)){
        echo "成功";
    }else{
        echo mysqli_error($conn);
    };

    // 改
    $sql_update = "UPDATE GPTEST SET username='lowha' WHERE username='hello world'";

      if(mysqli_query($conn,$sql_insert)){
            echo "成功";
      }else{
            echo mysqli_error($conn);
      };

    //   查
    $sql_select ="SELECT username FROM gptest";
    if($result = mysqli_query($conn,$sql_select)){
        //查看存在多少条数据
        echo mysqli_query_num_rows($result);
        $row= mysqli_fetch_assoc($result);
        echo var_dump($row);

        //拿出每一条数据
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
        }
    }else{
        echo mysql_error($conn);
    };

?>