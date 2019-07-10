<?php
  header("Content-type:text/html;charset=utf-8;");
  // $a="abc";
  // echo '$a123'; # $a123
  // echo "$a123"; # 报错

  // 链接数据库
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "1";
  $connect = mysqli_connect($servername, $username, $password, $dbname);
  // var_dump($connect);
  // 创建一个表
  $sql_create_table = "CREATE TABLE a (
    a varchar(255),
    z int(5) not null auto_increment,
    PRIMARY KEY (z)
  );";
  if(mysqli_query($connect, $sql_create_table)){
    echo "成功";
  }else{
    echo mysqli_error($connect);
  };

  // 增
  // $sql_insert = "INSERT INTO TABLE1(
  //   username
  // ) VALUES
  // (
  //   'hello'
  // )";
  // if(mysqli_query($connect, $sql_insert)){
  //   echo "成功";
  // }else{
  //   echo "mysqli_error($connect)";
  // };

  // 删
  // $sql_delete = "DELETE FROM TABLE1 WHERE username='hello'";
  // if(mysqli_query($connect,$sql_delete)){
  //       echo "成功";
  // }else{
  //       echo mysqli_error($connect);
  // };

  // 改
  // $sql_update = "UPDATE TABLE1 SET username='a' WHERE username='hello'";
  // if(mysqli_query($connect,$sql_update)){
  //   echo "成功";
  // }else{
  //   echo mysqli_error($connect);
  // };

  // 查
  // $sql_select = "SELECT username FROM table1";
  // if($result = mysqli_query($connect, $sql_select)){
  //   // 查看存在多少条数据
  //   // echo mysqli_num_rows($result);
  //   // 拿出一条数据
  //   // $row = mysqli_fetch_assoc($result);
  //   // var_dump($row);
  //   // 遍历所有数据
  //   while($row = mysqli_fetch_assoc($result)){
  //     echo json_encode($row);
  //   }
  // }else{
  //   echo mysqli_error($connect);
  // }






















?>