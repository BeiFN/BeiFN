
<?php
//声明变量
//连接数据库
//判断服务
//sql语句
//执行语句  

//总结一下
//变量要想当成字符串使用，也必须加上引号
//from表单发送的地址需要加上http协议
    header("Content-type:text/html;charset=utf-8");
    $root   = "localhost:3306";
    $user   = "root";
    $pwd    = "123";
    $dbbase = "daweige";

    $conn = mysqli_connect($root , $user , $pwd , $dbbase);

    if(!$conn){
        echo " mysqli is error ".mysqli_connect_error();
    }

    $username = $_GET["username"];
    $password = $_GET["password"];
    echo $username,$password;
    $sql_insert = "INSERT INTO ADMIN (username , password) VALUES('$username','$password')";

    if(mysqli_query($conn,$sql_insert)){
        echo "执行成功";
    }else{
        die(mysqli_error($sql_insert)) ;
    }
?>