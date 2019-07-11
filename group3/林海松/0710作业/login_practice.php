<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登陆界面</title>
</head>
<body>
    <form action="./login_practice.php">
        <p>
            用户名:<input type="text" name="username">
        </p>
        <p>
            密 码:<input type="text" name="password">
        </p>
        <button>用户登录</button>
    </form>
</body>
<?php
    $user = @$_GET["username"];
    $pwd  = @$_GET["password"];
    if( !$user || !$pwd){
        die("");
    }
    $localhost = "localhost";
    $username  = "root";
    $password  = "root";
    $dbname    = "gp12";
    $conn      = mysqli_connect( $localhost , $username , $password ,$dbname);
    if(!$conn){
        die("");
    }
    $sql_login = "SELECT username,password FROM GP12LIST WHERE username='$user' ";
    $res       = mysqli_query($conn , $sql_login);//执行sql语句后的结果
    if(mysqli_num_rows($res) === 0){//结果的数量
        die("该用户不存在") ;
    }
    else{//进行验证，遍历查询到的结果
        while($row = mysqli_fetch_assoc($res)){//遍历表
            if($row["password"] === $pwd){//数组中的password得值
                die("登录成功");
            }
        } 
        echo "登录失败";
    }
    mysqli_close($conn);

?>
</html>