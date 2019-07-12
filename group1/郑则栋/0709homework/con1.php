<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="con1.php">
        <label for="">用户名</label> <input type="text" name="username">
        <label for="">密码</label> <input type="password" name="password">
        <button>gogogo</button>
    </form>
</body>
</html>


<?php
    $user=@$_GET["username"];
    $pass=@$_GET["password"];

    //con
    $localhost = 'localhost';
    $username = 'root';
    $password='';
    // echo $localhost,$username,$password;
    $conn=  mysqli_connect($localhost,$username,$password);
    $query="use donkey";
    mysqli_query($conn,$query);
    // $query="insert into flower (username,passname) values ('$user','$pass')";
    // mysqli_query($conn,$query);
    $query="select * from hotel";
    $res=mysqli_query($conn,$query);
    while($row=mysqli_fetch_array($res)){
        echo $row['hotelname'];
    }

?>