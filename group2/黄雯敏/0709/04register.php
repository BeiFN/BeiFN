<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost/GP12coding/0709/04register.php">
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
    $user = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$user || $pwd) {
        die("");
    } 

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "HAHA";

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if(!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql_select = "SELECT * FROM haha where username='user'";
    $col = mysqli_query($conn,$sql_select);

    if($col){
        echo"语法正确";
        if(mysqli_num_rows($col) > 0){
            die("用户名有重");
        }else{
            die("Error select userdata: " . mysqli_error($conn));
        }
    }

    //用户注册 信息录入
    $pwd = mds($pwd);
    echo $pwd;
    $sql_insert = "INSERT INTO haha (
        username , password
    ) VALUES (
            '$user','pwd'
    );";
    if(mosqli_query($conn,$sql_insert)) {
        echo "用户注册成功";

    }else{
        echo "Error insert userdata:".mysqli_error($conn);
    }
    mysqli_close($conn);

    

?>