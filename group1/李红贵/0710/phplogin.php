
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
            <button>登录</button>
        </form>
</body>
</html>


<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
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
        die("error" .mysqli_error());
    }

    $sql_select = "select username,password from lhguserlist where username=$usr";
    $res = mysqli_query($conn,$sql_select);

    if(mysqli_num_rows($res)===0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                echo("login success");
            }else{
                die("密码错误");
            }
        }    
    }

  

?>