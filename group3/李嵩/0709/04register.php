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
    $usr=@$_GET["username"];
    $pwd=@$_GET["password"];

    if(!$usr||!$pwd){//如果用户名或密码为空 ，不再继续执行
        die("");
    }

    $servername = "localhost:3306";
    $username   = "root";
    $password   = "";
    $dbname     = "gp12";

    $conn = mysqli_connect($servername, $username, $password,$dbname );//链接数据库

    if(!$conn){
        #die这个方法表示不会再继续执行代码了；
        die("Connection failed: " . mysqli_connect_error());// 如果链接返回值为空那么则认为链接失败，报出错误便于排查。
    }

    //去重；
    $sql_select = "SELECT * FROM GPuserlist WHERE username='$usr'";
    $col = mysqli_query($conn,$sql_select);

    if($col){
        echo"语法没错";
        if(mysqli_num_rows($col) > 0){
            die("用户名重名");
      }
    }else{      
        die("Error select userdata: " . mysqli_error($conn));
  }
  //INSERT
  $pwd = md5($pwd);//加密
      echo $pwd;
      $sql_insert = "INSERT INTO GPuserlist(
            username , password 
      ) VALUES (
            '$usr' , '$pwd'
      );";

      if (mysqli_query($conn, $sql_insert)) {
            echo "用户注册成功";
      } else {
            echo "Error insert userdata: " . mysqli_error($conn);
      }
   
      mysqli_close($conn);
?>