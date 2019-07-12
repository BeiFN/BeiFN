<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form>
            <p>用户名: <input type="text" name="username"> </p>
            <p>密码  :<input type="text" name="password"> </p>
            <button>提交用户名</button>
      </form>
</body>
</html>

<?php
// 注册流程
// 1.用户输入用户名和密码
// 2.提交表单
// 3.php进行捕获，和数据库里面的进行对比去重，存入数据库

#终止逻辑，如果用户没有提交数据，那么终止
    $usrn=@$_GET["username"];
    $pwd=@$_GET["password"];
    if(!$usrn || !$pwd){
        die("");
    }

    #链接数据库
    $host="localhost:3306";
    $username="root";
    $password="root";
    $dbname="gp12";
    
    $conn=mysqli_connect($host,$username,$password,$dbname);
    if(!$conn){
        die("数据库链接失败" . mysqli_error());
    }
    //判断数据库中是否存在
    $sql_select="SELECT username FROM GPUSERLIST WHERE username='$usrn'";
    //辨别一下查询的结果中有多少条数据
    $res=mysqli_query($conn,$sql_select);
    if(mysqli_num_rows($res)>0){
        die("用户名重名");
    }
    //插入数据
    $pwd=md5($pwd);
    $sqli_insert="INSERT INTO 
    GPUSERLIST(
        username,password
        ) VALUES(
            '$usrn','pwd'
        )";
    if(mysqli_query($conn,$sqli_insert)){
        echo "注册成功";
    }else{
        die("注册失败");
    }






?>