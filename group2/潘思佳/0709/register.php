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
    $usr = $_GET["username"];
    $pwd = $_GET["password"];

    if(!$usr || !$pwd)  die("");

    $servername = "localhost:3307";
    $username = "root";
    $password = "root";
    $bdname = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$bdname);

    if(!$conn){
        die("Connection failed: ".mysqli_connect_error());
    }

    $sql_select = "SELECT * FROM GPTEST WHERE username='$usr'";

    $col = mysqli_query($conn,$sql_select);

    //去重

    // if($col){
    //     echo "成功";

    //     if(mysqli_num_rows($col) > 0){
    //         die("用户名重复");
    //     }

    //     else    die("Error select userdata: " . mysqli_error($conn));
    // }

    $pwd = md5($pwd);
    echo $pwd;
    $sql_insert = "INSERT INTO GPUSERLIST(
        username ,password
        ) VALUES(
            '$usr','$pwd'
        );";

    if(mysqli_query($conn,$sql_insert)) echo "成功";
    else echo "Error insert userdata:" . mysqli_error($conn);

    mysqli_close($conn);
?>