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
        <P>用户 : <input type="text" name="username"> </p>
        <P>密码 : <input type="text" name="password"> </p>
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

    #链接数据库
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";
    $conn = mysqli_connect($host,$username,$password,$dbname);
    if(!$conn){
        die("error in connect mysql " + mysqli_connect_error());
    }
    #判断是否存在
    $sql_select = "SELECT username FROM gpuserlist WHERE username='$usr'";
    $res = mysqli_query($conn,$sql_select);//mysqli_query() 函数执行某个针对数据库的查询
    if(mysqli_num_rows( $res ) > 0 ) {
        die("用户名重名");
    }
    //插入数据
    $pwd = md5($pwd);
    $sql_insert = "insert into gpuserlist(username ,password ) VALUE('$usr''$pwd')";
    if(mysqli_query($conn,$sql_insert)){
        echo "注册成功";
    }else{
        echo "注册失败";
    }




?>