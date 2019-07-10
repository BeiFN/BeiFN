<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <form action="./jsRegistercopy.php">
            <!-- <form action="http://10.9.10.118//register.php"> -->
            <!-- <form action="phpstrong.php"> -->
            
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

    $servername = "localhost";//创建服务器所用主机名或者服务器IP
    $username = "root";//创建服务器所用用户名
    $password = "root";//密码
    $dbname = "lhgservertest";//目标数据库名

    // //和数据库建立连接
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if(!$conn){
        die("Connection failed:" .mysqli_connect_error());//结束程序运行
        # die这个方法表示不会继续执行代码了;
    }else{
        echo "连接成功";
    }

    #获取输入值    
    $usen = @$_GET["username"];
    $pasw =  @$_GET["password"];
    echo "$usen $pasw";
    if(!$usen || !$pasw){
        die("");
    }else{
        echo "非空判断合法";
    }

    // 插入数据库之前，判断用户是否存在，去重
    // 选择获取要判断的数据，从数据表LHGUSERLIST中选择数据选择
    $sql_select = "SELECT * FROM LHGUSERLIST WHERE username = '$usen'";
    echo "$sql_select";

    // 【匹配判断连接数据库conn中的sql_select 字段数据,针对某个数据进行查询
    $col = mysqli_query($conn, $sql_select);
    
    // 判断结果
    if($col){
        echo "匹配结果";
        if(mysqli_num_rows($col) > 0){
            echo "用户名已存在";
            die("");

        }else{
            echo "用户名不存在";
        }
    }else{
        echo "匹配失败";
        die("Error select userdata: " . mysqli_error($conn));
    }

    $pwd = md5($pasw);
    echo $pwd;
    $sql_insert = "INSERT INTO lhguserlist (
        username, password ) VALUES (
            '$usen' , '$pwd'
    );";

    if(mysqli_query($conn,$sql_insert)){
        echo ("插入成功");
    }else{
        echo "error insert userdate:" . mysqli_error($conn);
    }
    // 关闭数据库连接
    mysqli_close($conn);
?>