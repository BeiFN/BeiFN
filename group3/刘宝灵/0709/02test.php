<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action = "./02test.php">
        <p>
            用户名:<input type="text" name="username">
        </p>
        <p>
            密码: <input type="text" name="password">
        </p>
        <button>注册</button>
    </form>
</body>
</html>

<?php
    header("Content-type:text/html;charset=utf-8;");
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }
    #注册
    //把用户输入的内容,通过php获取,然后放进数据库.
    #php对数据库进行操作;
    # 1. 链接数据库服务;
    # 2. 选数据库;
    # 3. 操作表;
    # 4. 清空缓存,清理链接;

    $servername = "localhost";
    $username   = "root";
    $password   = "123456";
    $dbname     = "gp12";

    # Resource 资源类型;
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if(!$conn){
        die("Connection failed :" . mysqli_connect_error());
    }
    // echo "链接成功";
    $sql_select = "SELECT * FROM jkl WHERE username='$usr'";
    $col = mysqli_query($conn,$sql_select);
    // echo var_dump($col);
    if($col){
        echo "语法没错";
        if(mysqli_num_rows($col) > 0){
            die("用户名重名");
        }
    }else{      
        die("Error select userdata: " . mysqli_error($conn));
  }
    // INSERT
    $pwd = md5($pwd);
    echo $pwd;
    $sql_insert = "INSERT INTO jkl (username,password)
    VALUES ('$usr' , '$pwd');";
    if(mysqli_query($conn, $sql_insert)){
        echo "用户注册成功";
    } else {
        echo "Error insert userdata: " . mysqli_error($conn);
  }
    mysqli_close($conn);
?>