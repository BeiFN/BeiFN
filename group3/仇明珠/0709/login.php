<?php
    header("Content-type:text/html;charset=utf-8;");
    $usr=$_GET["username"];
    $psd=$_GET["password"];
    if(!$usr||!$psd){
        die("用户名或密码不能为空!");
    }
    $servername="localhost";
    $username="root";
    $password="root";
    $dbname="GP12";
    $coon=mysqli_connect($servername,$username,$password,$dbname);
    if(!$coon){
        die("数据库连接失败".mysqli_error());
    }else{
        $sql_select="SELECT * FROM GPUSERLIST WHERE username='$usr'";
        $col=mysqli_query($coon,$sql_select);
        if(!$col){
            die("查询失败".mysqli_error());
        }else{
            if(mysqli_num_rows($col)>0){
                echo "用户名重复";
            }else{
                $sql_insert="INSERT INTO GPUSERLIST (username,password) VaLUES('$usr','$psd')";
                if(mysqli_query($coon,$sql_insert)){
                    echo "注册成功!";
                }else{
                    die("注册失败".mysqli_error);
                }
            }
        }
    }


?>  