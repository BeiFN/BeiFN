<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form action="./resgister.php">
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
    $usr = @$_GET["username"];  //@是屏蔽错误的作用
    $pwd = @$_GET["password"];

    if(!$usr || !$pwd){
        die("");
    }
    //链接数据库
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "gp12";
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    //选择数据
    //判断是否存在
    if(!$conn){
        die("Connection failed:" . mysqli_connect_error());
    }
    //去重
    $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr'";
    $col = mysqli_query($conn,$sql_select);//mysqli_query() 函数执行某个针对数据库的查询。
    if($col){
        echo "语法没错";
        if(mysqli_num_rows($col)>0){//mysqli_num_rows() 函数返回结果集中行的数量。
            die("用户名重名");
        }
    }else{
        die("Error select userdata: " . mysqli_error($conn));
    }

    //INSERT 插入数据
    $pwd = md5($pwd);//md5密文
    echo $pwd;
    $sql_insert = "INSERT INTO GPUSERLIST(
        username , password
        )VALUE(
            '$usr' , '$pwd'
        )";
    //判断是否插入（增）成功
    if(mysqli_query($conn,$sql_insert)){
        echo "用户注册成功";
    }else{
        echo "Error insert userdata: " . mysqli_error($conn);
    }

    mysqli_close($conn);//结束


?>