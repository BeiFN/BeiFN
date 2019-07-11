<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>注册</title>
</head>
<body>
    <form action="http://localhost/yyt/0709/register1.php">
        <p>用户名：<input type="username" name="username"></p>
        <p>密码  ：<input type="password" name="password"></p>
       <button>注册</button>
    </form>
</body>
</html>

<?php
    
    $usr  = @$_GET["username"];
    $pwd  = @$_GET["password"];
    if(!$usr|| !$pwd){
        die("");
    }

    #注册
    $servername = "localhost:3306";
    $username   = "root";
    $password   = "root";
    $dbname     = "ting";  

    # Resource 资源类型
    $conn = mysqli_connect($servername,$username,$password,$dbname);

    if(!$conn){
        die("Connection failed:" .mysqli_connect_error());
    }
    // echo "链接成功";

    
    #去重
    $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr';";
    $col = mysqli_query($conn,$sql_select);
    //echo var_dump($col);

    # 测试有没有重复的用户名
    if ($col) {
       echo "语法没错";
       if (mysqli_num_rows($col)>0) {
           die("用户名重名");
       }
    }else {
        die("Error select userdata:" .mysqli_error($conn));
    }

    # 测试有没有重复的用户名
    // $count = 0;
    // while($row = mysqli_fetch_assoc($col)){
    //       echo json_encode($row);
    //       $count ++;
    //       echo $count;
    // }

    // if($count > 0){
    //       die("是重复的用户名");
    // }

    # 插入
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO GPUSERLIST(username,password)VALUES('$usr','$pwd');";
    #验证是否插入成功
    if (mysqli_query($conn,$sql_insert)) {
        echo "注册成功";
    }else{
        echo "Insert Error Data:" .mysqli_error($conn);
    }

    mysqli_close($conn);
    echo "清空缓存，清空链接";
?>