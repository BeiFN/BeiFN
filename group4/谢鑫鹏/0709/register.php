<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <form action="./register.php">
    <p>
      用户名 : 
      <input type="text" name="username">
    </p>
    <p>
      密码 :
      <input type="text" name="password">
    </p>
    <button>注册</button>
  </form>
</body>
</html>

<?php
  // 获取值
  $iptusr = @$_GET["username"];
  $iptpwd = @$_GET["password"];
  // 链接数据库
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "1";
  $connect = mysqli_connect($servername, $username, $password, $dbname);
  // var_dump($connect);
  // 判断数据库是否链接成功
  if(!$connect){
    die("Connect failed: ".mysqli_connect_error());
  }
  // echo "链接成功";
  // 去重
  $sql_select = "SELECT * FROM TABLE1 WHERE username='$iptusr'";
  $col = mysqli_query($connect,$sql_select);
  // echo var_dump($col);
  if($col){
    echo  "语法没错 ";
    if(mysqli_num_rows($col) > 0){
      die("用户名重名");
    }
  }else{
    die("Error select userdata: ".mysqli_error($connect));
  }
  // 插入
  $iptpwd = md5($iptpwd);
  // echo $iptpwd;
  $sql_insert = "INSERT INTO TABLE1(
    username, password
  )VALUES(
    '$iptusr', '$iptpwd'
  )";
  if(mysqli_query($connect, $sql_insert)){
    echo "用户注册成功";
  }else{
    echo "Error insert userdata: ".mysqli_error($connect);
  }
  mysqli_close($connect);
?>