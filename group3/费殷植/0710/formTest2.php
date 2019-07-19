<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>表单提交测试</title>
</head>

<body>
    <form action="">
        <p>
            用户名：<input type="text" name="username">
        </p>
        <p>
            密码 ： <input type="text" name="password">
        </p>
        <input type="submit" value="注册">
    </form>
</body>

</html>

<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$usr||!$pwd){
        die("");
    }

    // 操作数据库
    $servername = "localhost";
    $username = "root";
    $password = "123";
    $db = "phptest";
    $conn = mysqli_connect($servername,$username,$password,$db);

    $sql_select = "select * from gpuserlist where username = '$usr';";
    $res = mysqli_query($conn,$sql_select);

    // echo var_dump($res);
    // 判断语法和结果是否大于0 不管能否查询到都会进入到第一个
    if($res){
        //
        if(mysqli_num_rows($res)>0){
            die("重复的用户名");
        }
    }else{
        die("sql语法错误");
    }

    $pwd = md5($pwd);
    //插入的操作
    $sql_insert = "insert into gpuserlist(username,password) values('$usr','$pwd')";

    $insertRes = mysqli_query($conn,$sql_insert);
    if($insertRes){
        echo("插入成功");
    }else{
        die("插入语句的语法错误");
    }


    



    

?>