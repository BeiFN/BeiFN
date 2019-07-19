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
if (!$usr || !$pwd) {
    die(""); //终止程序
}
// echo "$usr $pwd";

// if($usr=="zhangsan"&&$pwd==="123"){
//     echo "<script>alert('1')</script>";
// }
//获取到数据后进行连接数据库并写入的操作
$servername = "localhost";
$username = "root";
$password = "123";
$db = "phptest";
$conn = mysqli_connect($servername, $username, $password, $db);
// echo var_dump($conn);
if (!$conn) {
    die("Connect Error" . mysqli_connect_errno());
}
$sql_select = "select * from gpuserlist";
$res = mysqli_query($conn, $sql_select);
// 如果没有报错
// echo var_dump($res);
if ($res) {
    if (mysqli_num_rows($res) > 0) {
        die("用户名重名");
    }
} else {
    die("sql语句语法错误");
}

//插入数据
$sql_insert = "insert into gpuserlist(username,password) values('$usr','$pwd')";

$insert = mysqli_query($conn, $sql_insert);
echo var_dump($insert);
if ($insert) {
        echo "注册成功";
} else {
    die("插入语句的语法错误");
}




?>