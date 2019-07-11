<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form > 
            <p>用户名: <input type="text" name="username"> </p>
            <p>密码 :  <input type="text" name="password"> </p>
            <button>登陆</button>
      </form>
</body>
</html>

<?php
      $user = @$_GET["username"];
      $pwd =  @$_GET["password"];
      if(!$user || !$pwd){
            die("");
      }
      echo $user;
      echo $pwd;

# 链接数据库 
      $servername = "localhost";
      $username = "root";
      $password = "root";
      $dbname   = "haha";

      $conn = mysqli_connect($servername, $username, $password, $dbname);

      if(!$conn) {

            die("Connection failed: " . mysqli_connect_error());
       }

# 判定数据库之中是否已经存在了;
      
      $sql_select = "SELECT username,password FROM user WHERE username='$user'";
     
      // 辨别查询结果之中有多少条数据


      $res = mysqli_query($conn,$sql_select);

      if(mysqli_num_rows($res) === 0 ) {
            die("用户名不存在");
      }else{

            while($row = mysqli_fetch_assoc($res)){

                  echo json_encode($row);
                  if($row["password"] == md5($pwd)){
                        die("登陆成功");
                  }
            }
            
            echo "密码错误";
      }
      //mysqli_fetch_assoc() 遍历出来的是数组数据
?>