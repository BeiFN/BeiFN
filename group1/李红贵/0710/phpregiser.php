
<!-- 
    业务流程概率
    登录
        用户输入用户名和密码
        提交表单  数据从前台（浏览器）提交到后台（服务器）
        php捕获数据，进行数据库操作，判断

    注册
        用户输入
        提交表单
        php捕获数据，数据库查重，存储

 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>注册</title>
</head>
<body>
    <form>

            
        <p>
            用户名：
            <input type="text" name="username">
        </p>
    
        <p>
            密码：
            <input type="text" name="password">
        </p>
            <button>注册</button>
        </form>
</body>
</html>


<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    echo "45--$usr $pwd \n";
    if(!$usr || !$pwd){//如果输入为空，终止代码
        die("");
    }

    #
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "lhgservertest";


    $conn = mysqli_connect($host, $username,$password,$dbname);
    if(!$conn){
        die("58--error" .mysqli_error());
    }

    // $sql_select = "SELECT * FROM LHGUSERLIST WHERE username = '$usr'";
    $sql_select = "SELECT username FROM lhguserlist WHERE username='$usr'";
    // $sql_select = "select username from lhggp12test1 where username='$usr'";
   
    $res = mysqli_query($conn, $sql_select);
    if($res){
        echo "匹配成功\n";
    }else{
        echo "匹配失败\n";

    }
    // echo "63--$res";
    if( mysqli_num_rows( $res) >0 ){
        die("用户名已存在");
    }else{
        echo "用户不存在";
    }

    // $sql_delete = "delete from lhguserlist where username='3333'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "success--81\n";
    // }else{
    //     echo mysqli_error($conn);
    // }

    $pwd = md5($pwd);
    echo "69--$pwd\n";
    // 插入数据
    $sql_insert = "insert into lhguserlist(
        username, password
    ) values (
        '$usr','$pwd'
    )";



    if(mysqli_query($conn, $sql_insert)){
        echo "sucess";
        echo "<script>location.href = \"http://10.9.10.118/phplogin.php\";</script>";
    }else{
        echo "error";
    }

?>