<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form action="./04register.php">
            <p>
                用户名 : <input type="text" name='username'>
            </p>
            <p>
                密码 : <input type="text" name='password'>
            </p>
            <button>注册</button>
      </form>
</body>
</html>

<?php
      $usr = @$_GET["username"];
      $pwd = @$_GET["password"];

      if(!$usr || !$pwd){
            die("");
      }

      # 注册 
      // 把用户输入的内容，通过php获取，然后放进数据库。

      # php对数据库进行操作;
      # 1. 链接数据库服务;
      # 2. 选数据库;
      # 3. 操作表;
      # 4. 清空缓存,清理链接;

      $servername = "localhost:3306";
      $username   = "root";
      $password   = "root";
      $dbname     = "gp12";

      # Resource 资源类型;
      $con = mysqli_connect($servername, $username, $password, $dbname);

      if (!$con) {
            # die这个方法表示不会继续执行代码了;
            die("Could not connect:" . mysqli_connect_error());
      }

      // 去重;
      $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr'";

      $col = mysqli_query($con, $sql_select);

      if($col){
            // 判定这里有没有我想要的东西;
            // 判定查询结果是否存在0条以上, 如果有同名的，就不执行了;
            if(mysqli_num_rows($col) > 0){
                  die("用户名已存在");
            }
            
            // $count = 0;
            // while($row = mysqli_fetch_assoc($col)){
            //       echo json_encode($row);
            //       $count ++;
            // }
            // if($count > 0){
            //       die("重复的用户名");
            // }
      }else{      
            die("Error: " . $sql_select . "<br>" . mysqli_error($con));
      }

      // 插入; 
      $pwd = md5($pwd);
      $sql_insert = "INSERT INTO GPUSERLIST (username , password ) VALUES ('$usr' , '$pwd')";

      if (mysqli_query($con, $sql_insert)) {
            echo "用户注册成功" . "<br>";
      } else {
            echo "Error: " . $sql_insert . "<br>" . mysqli_error($con);
      }
   
      mysqli_close($con);
?>