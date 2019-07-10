<?php
    header("Content-type: text/html; charset=utf-8");
    //获取参数
    $urm = $_GET["username"];
    $pwd = $_GET["password"];

    $servername = "localhost";
    $username = "root";
    $password = "miemie8389";
    $dbname = "gp12";

    if(!$urm||!$pwd){
        die("");
    }
    //建立连接
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    //去重
    $sql_select = "SELECT * FROM GPUSERLIST WHERE username = '$urm';";

    $col = mysqli_query($conn, $sql_select);

    if($col){
        if(mysqli_num_rows($col)>0){
            die("用户名重名");
        }
    }
    else{
        die("Error select userdata: ".mysqli_error($conn));
    }

    //密码加密
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO GPUSERLIST (username, password) values ('$urm', '$pwd');";
    if(mysqli_query($conn, $sql_insert)){
        echo("用户注册成功");
    }
    else{
        echo("Error insert userdata:".mysqli_error($conn));
    }

?>