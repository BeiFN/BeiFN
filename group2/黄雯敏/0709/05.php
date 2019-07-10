<?php 
     //防止乱码
      header("Content-type:text/html;charset=utf-8;");
      
      //连接数据库
      $root = "localhost";
      $username = "root";
      $password = "root";
      $dbname   = "HAHA";
      //创建连接
      $conn = mysqli_connect($root, $username,$password,$dbname);
      //检测连接
      if(!$conn){
           die("Connection failed: " . mysqli_connect_error());
      }else{
          echo "连接成功";
      }

      //关闭连接
      //mysqli_close($conn);

      //创建表;
    //   $sql_create_table = "CREATE TABLE TEST (
    //         username varchar(255),
    //         id int(5) not null auto_increment,
    //         PRIMARY KEY (id)
    //   );";

    //   if(mysqli_query($conn,$sql_create_table)){
    //         echo "创建表成功";
    //   }else{
    //         echo mysqli_error($conn);
    //   };

      #增;

    //   $sql_insert = "INSERT INTO TEST(
    //         username 
    //   )  VALUES
    //   (
    //         'test'
    //   )
    //   ";

    //   if(mysqli_query($conn,$sql_insert)){
    //         echo "插入用户成功1";
    //   }else{
    //         echo mysqli_error($conn);
    //   };

    //   $sql_insert = "INSERT INTO TEST(
    //         username 
    //   )  VALUES
    //   (
    //      'test2'
    //   )
    //   ";

    //  if(mysqli_query($conn,$sql_insert)){
    //       echo "插入用户成功2";
    //  }else{
    //       echo mysqli_error($conn);
    //  };

      #删 ;

    //   $sql_delete = "DELETE FROM TEST WHERE username='test'";

    //   if(mysqli_query($conn,$sql_delete)){
    //         echo "删除用户成功";
    //   }else{
    //         echo mysqli_error($conn);
    //   };

      #改 ;

    //   $sql_update = "UPDATE TEST SET username='test3' WHERE username='test2'";

    //   if(mysqli_query($conn,$sql_update)){
    //         echo "修改用户信息成功";
    //   }else{
    //         echo mysqli_error($conn);
    //   };

      # 查 ;

      $sql_select = "SELECT username FROM TEST";

      if($result = mysqli_query($conn,$sql_select)){
            //查看存在多少条数据;
            echo mysqli_num_rows($result);

            $row = mysqli_fetch_assoc($result);
            $row = mysqli_fetch_assoc($result);
            echo var_dump($row);

            //拿出每一条数据;
            while($row = mysqli_fetch_assoc($result)){
                  echo json_encode($row);
            }

      }else{
            echo mysqli_error($conn);
      };
?>