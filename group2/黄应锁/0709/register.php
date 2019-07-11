<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost/practice/register.php">
        <p>
            用户名：
            <input type="text" name="username"> 
        </p>
        <p>
            密码：
            <input type="text" name="password">
        </p>
        <button>注册</button>
    </form>
</body>
</html>
<?php
    header("Content-type: text/html; charset=utf-8");
    $user = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$user|| !$pwd ){
        die("");
    }

    $servername = "localhost"; 
    $username  = "root";
    $password = "root";
    $db  = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$db);
    if(!$conn){
        die("Connect Error:".mysqli_connect_error($conn)) ;
    }
    
    $select = "SELECT * FROM gpuserlist WHERE username='$user'";
    $col = mysqli_query($conn,$select);
    if(mysqli_num_rows($col) > 0){
        die("用户重名");
    }

    $insert = "INSERT INTO gpuserlist(
        username,password
    )VALUES(
        '$user','$pwd'
    )";
    if(mysqli_query($conn,$insert)){
        echo "成功";
    }else{
        echo "insert Error".mysqli_error($conn);
    }
    mysqli_close($conn);

?>