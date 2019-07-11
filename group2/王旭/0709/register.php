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
            用户名 ：<input type="text" name="username">
        </p>
        <p>
            密码 ：<input type="text" name="password">
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
    //echo "$username $password";
    #注册
    #1.链接数据库服务
    #2.选数据库
    #3.操作表
    #4.清空缓存，清理链接

    $servername = "localhost:3306";
    $username   = "root";
    $password   = "root";
    $dbname     ="gp12";

    $conn = mysqli_connect($servername,$username,$password,$dbname);

    //echo var_dump($conn);
    if(!$conn){
        die("Connection failed:".mysqli_connect_error());
    }
    echo "链接成功";

    //去重
    $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr'";
    $col = mysqli_query($conn,$sql_select);

    // if($col){
    //     echo "语法没错";
    //     //判定结果是否存在0条以上，如果有同名的，就不执行
    //     if(mysqli_num_rows($col) > 0){
    //         die("用户名去重");
    //     }else{
    //         die("Error select userdata:".mysqli_error($conn));
    //     }
    // }


    //加密
    // $pwd = md5($pwd);
    // echo $pwd;
    //加入
    $sql_insert = "INSERT INTO GPUSERLIST(
        username,password
    )VALUES(
        '$usr' , '$pwd'
    )";
    if(mysqli_query($conn,$sql_insert)){
        echo "用户注册成功";
    }else{
        echo "Error insert userdata: ".mysqli_error($conn);
    }
    mysqli_close($conn);
    
?>