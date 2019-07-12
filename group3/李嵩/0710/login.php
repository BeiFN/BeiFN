<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form>
        <p>用户名:<input type ="text" name="username"></p>
        <p>密码:<input type ="text" name ="password"></p>
        <button>登录</button>
    </form>
</body>
</html>

<?php
#终止逻辑，如果没有用户提交的数据，那么终止代码;
    $usr  =@$_GET["username"];
    $pwd  =@$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }

#连接数据库

    $host   ="localhost:3306";
    $username ="root";
    $password = "";
    $dbname   ="gp12";

    $conn= mysqli_connect($host,$username,$password,$dbname);

    if(!$conn){
        die("数据库连接失败" .mysqli_error());
    }

#判定数据库之中是否已经存在了;

    $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
    //判别查询结果之中有多少条数据

    $res = mysqli_query($conn,$sql_select);

    if(mysqli_num_rows( $res )===0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                die("登陆成功");
            }
        }
        echo"密码错误";
    }
?>