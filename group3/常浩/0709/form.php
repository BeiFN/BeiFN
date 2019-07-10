<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="">
        <p>
            用户名：<input type="text" name="username">
        </p>
        <p>
            密码： <input type="text" name="password">
        </p>
        <button>提交</button>
    </form>
    
</body>
</html>
<?php
    $use = @$_GET["username"];
    $psw = @$_GET["password"];
    // echo $use,"  ",$psw;

    $root = "localhost";
    $username =  "root";
    $password =  "root";
    $dbname   ="changhao";

    $conn = mysqli_connect($root,$username,$password,$dbname);
    // if($conn){
    //     echo "链接成功";
    // }else{
    //     echo mysqli_connect_error();
    // };
    //添加数据
    // $insert = "INSERT INTO CHTEST(
    //     username,passwords
    // ) VALUES(
    //     '$use','$psw'
    // )";
    // if(mysqli_query($conn,$insert)){
    //     echo "添加成功";
    // }else{
    //     echo mysqli_error($conn);
    // };
    //查询是否有用户名重复的
    // 先判断是否有重复的  没有重复的再添加  有的话  不能添加并告知
    $select = "SELECT * FROM CHTEST WHERE username='$use'"; 
    $row    = mysqli_query($conn,$select);
    if(mysqli_num_rows($row)>0){
        echo "用户名已存在，请重新输入";
        echo mysqli_error($conn);
    } else if(!$use || !$psw){
        // 防止第一次进入提交空的用户名和密码  但是同时也防止了提交的时候有空的用户名或密码 此处没有办法写提示 写提示第一次也是会出现的
    }else{
        $insert = "INSERT INTO CHTEST(
            username,passwords
        )VALUES(
            '$use','$psw'
        )";
        if(mysqli_query($conn,$insert)){
            echo "用户注册成功";
        }else{
            echo mysqli_error($conn);
        }
    }
    echo var_dump(mysqli_close($conn)); //关闭先前打开的数据库连接
?>