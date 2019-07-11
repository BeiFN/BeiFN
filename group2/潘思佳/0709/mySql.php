<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <form action="./mySql.php">
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
    header("Content-type:text/html;charset=utf-8;");
    $root = "localhost:3306";
    $username = "root";
    $password = "root";
    $bdname = "gp12";

    $tab_username = $_GET["username"];
    $tab_password = $_GET["password"];

    $conn = mysqli_connect($root,$username,$password,$bdname);

    if(!$conn)  die("error in connect mysql" + mysqli_connect_error());


    //建表
    $sql_create_table = "CREATE TABLE GPTEST(
        username varchar(255),
        password varchar(255),
        id int(5) not null auto_increment,
        PRIMARY KEY (id)
        );";

    if(mysqli_query($conn,$sql_create_table))   echo "成功";
    else    echo mysqli_error($conn);

    //添加
    $sql_insert = "INSERT INTO GPTEST(
            username,
            password
        ) VALUES
        (
            '$tab_username',
            '$tab_password'
        )";

    if(mysqli_query($conn,$sql_insert))  echo "成功";
    else echo mysqli_error($conn);

    //删除
    $sql_delete = "DELETE FROM GPTEST WHERE username = 'yanghuaizhi'";

    if(mysqli_query($conn,$sql_delete)) echo "成功";
    else echo sqli_error($conn);


    //修改
    $sql_insert = "UPDATE GPTEST SET username='666' WHERE username='yanghuaizhi'";

    if(mysqli_query($conn,$sql_insert)) echo"成功";
    else    echo mysqli_error($conn);

    //查找
    $sql_select = "SELECT username FROM gptest";

    if($result = $mysqli_query($conn,$sql_select)){
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
        }
    }else echo mysqli_error($conn);

?>