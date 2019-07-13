<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="">
        <p>用户名: <input type="text" name="username"></p>
        <p>密码: <input type="text" name="password"></p>
        <button>提交</button>
    </form>
</body>
</html>
<?php
     //  ## 业务流程
     
     // - 登陆 
     //       * 用户输入用户名和密码
     //       * 提交表单  (数据从浏览器 提交到 服务器逻辑语言上)
     //       * php捕获数据 ,  通过数据库进行比对;


     //获取数据,判断非空
        $usr = @$_GET["username"];
        $pwd = @$_GET["password"];
        if(!$usr || !$pwd){
            die("内容不能为空");
        }
        echo "链接数据库成功";

     //链接数据库
        $host = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "gp12";

        $conn = mysqli_connect($host,$username,$password,$dbname);
        if(!$conn){
            die("数据库链接失败".mysqli_error());
        }

     //判断数据库之中是否已经存在;
         $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
         $res = mysqli_query($conn,$sql_select);

         if(mysqli_num_rows($res)===0){
             die("用户不存在");
         }else{
             while ($row = mysqli_fetch_assoc($res)) {
                 if($row["password"]==md5($pwd))
                 die("登录成功");
                
             }
             echo "密码错误";
         }

    //显示登录状态

?>