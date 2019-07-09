<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form action="http://localhost/register.php">
            <p>
                  用户名:
                  <input type="text" name = "username" id = "username" placeholder = "请输入用户名">
            </p>
            <p>
                  密码：
                  <input type="text" name = "password" id = "password" placeholder = "请输入密码">
            </p>
            <button type = "submit">提交</button>
      </form>
      <!-- 用户注册输入的信息在php中接受处理后添加到数据库中，包括对数据库的增删改查 -->
</body>
</html>
<?php
      //引入头部信息，在头部信息中指定编码的格式，防止中文出现乱码
      header("Content-type:text/html charset; charset: utf-8");
      //获取用户注册时输入的信息
      $username = @$_GET["username"];
      $password = @$_GET["password"];
      //判断用户的输入是否为空，如果为空不再继续向下执行
      if(!$username || !$password){
            die("");
      }
      //连接数据库的代码
      $servername = "localhost:3306";
      $usn = "root";
      $pwd = "root";
      $dbname = "gp12";
      $conn = mysqli_connect($servername, $usn, $pwd, $dbname);
      //连接之后，判断是否连接成功
      if(!$conn){
            die("connect error in mysql");
      }
      // echo var_dump($conn);

      // //在数据库中创建一个新的表
      // $sql_create = "CREATE TABLE GPTEST (
      //       id int(5) not null auto_increment,
      //       username varchar(255),
      //       password varchar(255),
      //       PRIMARY KEY(id)
      // );";
      // //判断是否创建成功
      // if(mysqli_query($conn,$sql_create)){
      //       echo "create success！";
      // }else{
      //       die("fail to create table");
      // };

      // //表中添加数据
      // $sql_insert= "INSERT INTO GPTEST(username, password) 
      // VALUES('hello', 'hello')";
      // if(mysqli_query($conn, $sql_insert)){
      //       echo "insert success!";
      // }else{
      //       echo "insert fail!";
      // };
      // //删除表中的数据
      // $sql_delete = "DELETE FROM GPTEST WHERE username = \"hello\";";
      // if(mysqli_query($conn, $sql_delete)){
      //       echo "delete success!";
      // }else{
      //       echo "delete fail!";
      // };
      // //修改表中的数据
      // $sql_update = "UPDATE GPTEST SET username = \"world\" WHERE username = \"hello\";";
      // if(mysqli_query($conn, $sql_update)){
      //       echo "update success!";
      // }else{
      //       echo "update fail!";
      // };
      // //查询表中的数据
      // $sql_query = "SELECT USERNAME FROM GPTEST WHERE ID = 3;";
      // if( $result = mysqli_query($conn, $sql_query)){
      //       echo "select success!";
      //       //查看一共查询到多少行
      //       echo mysqli_num_rows($result);
      //       //获得查询的数据
      //       $row = mysqli_fetch_assoc($result);
      //       echo var_dump($row);
      // }else{
      //       echo "select fail!";
      // };  
?>

