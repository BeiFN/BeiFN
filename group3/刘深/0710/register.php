<?php
    header("Content-type: text/html; charset=utf-8");
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];

    if(!$usr || !$pwd){
        die("");
    }
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname   = "gp12";

    $conn = mysqli_connect($servername , $username, $password, $dbname);
    if(!$conn){
        //die表示不会再继续执行代码了;
        die("Connection failed: " . mysqli_connect_error());
    }
    $pwd = md5($pwd);
    echo $pwd;
    $sql_insert = "INSERT INTO GPUSERLIST (
        username , password
    ) VALUES (
        '$usr' , '$pwd'
    );";

    if(mysqli_query($conn , $sql_insert)){
        echo "用户注册成功";
    }else{
        echo "Error insert userdata: " . mysqli_error($conn);
    }
?>