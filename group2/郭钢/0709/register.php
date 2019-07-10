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
            请输入用户名:
            <input type="text" name="username">
        </p>
        <p>
            请输入密码:
            <input type="text" name="password">
        </p>
        <button>提交</button>
    </form>
</body>
</html>


<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];


    if(!$usr || !$pwd){
        die();
    }
    $servername = "localhost:3306";
    $username   = "root";
    $password   = "root";
    $dbname     = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$dbname);




    if(!$conn){
        die ("连接失败" .mysqli_connect_error());
    }

    $sql_select = "SELECT * FROM GPUSERLIST WHERE username = '$usr'";
    $col = mysqli_query($conn,$sql_select);

    echo (mysqli_num_rows($col));

    
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO GPUSERLIST(
        username,password
    ) VALUES(
        '$usr','$pwd'
    )";
    if(mysqli_query($conn,$sql_insert)){
        echo "用户注册成功";
    }else{
        echo "Error insert userdata: " . mysql_error($conn);
    }
?>