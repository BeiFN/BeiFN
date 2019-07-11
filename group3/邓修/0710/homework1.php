<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="javascript:void(0);">
        <p>用户名:<input id="usr" type="text" name="username"></p>
        <p>密码:<input id="pwd" type="text" name="password"></p>
        <button id="login">登录</button><button id="register">注册</button></br></br>
    </form>
    <script>
        let usr=document.getElementById("usr");
        let pwd=document.getElementById("pwd");
        let login=document.getElementById("login");
        let register=document.getElementById("register");
        login.onclick=function(){
            location.href=`?username=${usr.value}&password=${pwd.value}&type=login`;
        }
        register.onclick=function(){
            location.href=`?username=${usr.value}&password=${pwd.value}&type=register`;
        }
    </script>
</body>
</html>

<?php
    $usr=@$_GET["username"];
    $pwd=@$_GET["password"];
    $type=@$_GET["type"];
    // echo $type;
    // echo $usr;
    // echo $pwd;
    if(!$usr || !$pwd){
        die("");//用户名或密码有一个为空就停止执行
    }
    #链接数据库
    $host="localhost";
    $username="root";
    $password="root";
    $dbname="gp12";
    $conn=mysqli_connect($host,$username,$password,$dbname);
    if(!$conn){
        die("数据库链接失败，请重新链接");
    }

    #注册功能
    if($type==="register"){
        #判断输入的用户名是否重名了
        $sql_register="SELECT username FROM GPUSERLIST WHERE username='$usr'";
        #辨别查询到的结果中有多少条数据
        $res_register=mysqli_query($conn,$sql_register);
        if(mysqli_num_rows($res_register)>0){
            die("用户名重名");
        }
        #将输入的用户名和密码插入数据中
        $pwd=md5($pwd);
        $sql_register_insert="INSERT INTO GPUSERLIST (username,password) VALUES('$usr','$pwd');";
        if(mysqli_query($conn,$sql_register_insert)){
            echo "注册成功";
        }
        else{
            die("注册失败");
        }
    }
    #注册功能

    #登录功能
    else{
        #查询数据库中是否存在输入的用户名
        $sql_login="SELECT username,password FROM GPUSERLIST WHERE username='$usr'";
        $res_login=mysqli_query($conn,$sql_login);
        #用户名不存在
        if(mysqli_num_rows($res_login)===0){
            die("用户名不存在");
        }
        else{
            while($row=mysqli_fetch_assoc($res_login)){
                // echo var_dump($row);
                if($row["password"]===md5($pwd)){
                    die("登录成功");
                }
            }
            echo "密码错误";
        }
    }
    #登录功能

    mysqli_close($conn);
?>