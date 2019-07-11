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
            用户名：
            <input type="text" name="username">
        </p>
        <p>
            密码：
            <input type="text" name="password">
        </p>
        <button>登录</button>
    </form>
</body>
</html>
<?php
    $usr = @$_GET["username"];
    $psd = @$_GET["password"];

    if(!$usr || !$psd){
        die();
    }

    $root     = "localhost";
    $username = "root";
    $password = "root";
    $dbname   = "changhao";

    $conn = mysqli_connect($root,$username,$password,$dbname);
    if(!$conn){
        die("数据库连接失败");
    }

    // //查询用户名是否已经存在  存在再进行密码的比对
    // $select_usr = "SELECT username FROM CHTEST WHERE username = '$usr'";
    // $res_usr    = mysqli_query($conn,$select_usr);
    // if(!(mysqli_num_rows($res_usr)>0)){
    //     die("用户名未注册，请注册");
    // }

    // //用户名存在进行密码的比对
    // $select_psd = "SELECT username,passwords FROM CHTEST WHERE username='$usr'";
    // $res = mysqli_query($conn,$select_psd);
    // while($row = mysqli_fetch_assoc($res)){
    //     if($row["passwords"] == $psd){
    //         die("登录成功");
    //     }else{
    //         die("密码错误");
    //     }
    // }
    //思路有点小问题   直接一步就可以判断用户名是否存在再去判断密码是否正确
    $select_psd = "SELECT username,passwords FROM CHTEST WHERE username='$usr'";
    $res = mysqli_query($conn,$select_psd);
    if(mysqli_num_rows($res)<=0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res) ){
            if($row['passwords'] === $psd ){
                die("登录成功");
            } else{
                die("密码错误");
            }
        }
    }





?>