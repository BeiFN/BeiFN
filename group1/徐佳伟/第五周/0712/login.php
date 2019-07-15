<?php
    header("content-type:text/html;charset=utf8;");
    $user = @$_POST['username'];
    $pwd  = @$_POST['password'];

    //数据库连接
    $host = "localhost";
    $username = "root";
    $password = "123";
    $dbname   = "daweige";

    $conn = mysqli_connect($host,$username,$password,$dbname);

    if(!$conn){
        
        die("error".mysqli_error($conn));
    }

    $sql_select = "SELECT username,password from ADMIN where username = '$user'";

    $res = mysqli_query($conn,$sql_select);
    if(mysqli_num_rows($res) === 0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){
            //可以对密码进行加密
            if($row['password'] == $pwd){
                die("登录成功");
            }
        }
        echo("密码错误");
    }
?>