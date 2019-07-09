<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>连接数据库</title>
    <style>
        form{
            width: 300px;
            height: 100px;
            margin:100px auto;
            text-align: center;
        }
        input{
            width: 150px;
            height: 25px;
            border-radius:5px;
        }
        button{
            width: 100px;
            height: 30px;
            border-radius:5px;
        }
    </style>
</head>
<body>
    <form action="mySQL.php">
        <p>
            账号
            <input type="text" name="username" id="user">
        </p>
        <p>
            密码
            <input type="password" name="password" id="pwd">
        </p>
        <button>提交</button>
    </form>
    <script></script>
</body>
</html>

<?php
    header("Content-type:text/html;charset=utf-8");

    // 获取用户名和密码 + 上@，值为空时不会报错
    $user = @$_GET["username"];
    $pwd  = @$_GET["password"];
    // echo "$user $pwd";
    if(!$user || !$pwd){
        // 只要看见了 die 这个方法，后面的就不会执行了
        die("");
    }
    
    // 获取连接的服务器名称，用户名，密码，需要连接的数据库
    $servername = "localhost";
    $username   = "root";
    $password   = "root";
    $db         = "GP12";

    // 创建连接,把获取连接的服务器名称，用户名，密码，需要连接的数据库
    $conn = mysqli_connect($servername,$username,$password,$db);
    // var_dump() 函数显示关于一个或多个表达式的结构信息，包括表达式的类型与值
    // echo var_dump($conn);

    // 检测连接
    if(!$conn){
        die("连接失败" . mysqli_connect_error($conn));
    }
    // echo "连接成功";

    // 创建表 - 📕
    $sql_create = "CREATE TABLE 0709table(
        username varchar(255) not null,
        passwoed varchar(255) not null,
        id       int(5)       not null auto_increment,
        PRIMARY KEY (id)
    )";
    if(mysqli_query($conn,$sql_create)){
        echo "创建成功";
    }else{
        echo "创建失败";
    }

    // 增加数据 - 📕
    // INSERT INTO 语句通常用于向 MySQL 表添加新的记录
    // md5对密码加密
    $pwd = md5($pwd);
    $sql_insert = "INSERT INTO GP12LIST(
        username , password
    )VALUES (
        '$user','$pwd'
    )";
    // mysqli_query() 函数执行某个针对数据库的查询
    if(mysqli_query($conn,$sql_insert)){
        echo "添加成功";
    }else{
        echo "添加失败" . mysqli_error($conn);
    }

    // 删除数据 - 📕
    // DELETE FROM 语句用于从数据库表中删除记录
    // $sql_delete = "DELETE FROM GP12LIST WHERE username='$user' ";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "删除成功";
    // }else{
    //     echo "删除失败" .mysqli_error($conn);
    // }

    // 修改数据 - 📕
    // UPDATE 语句用于 更新 / 修改 数据库表中已存在的记录(💗新 更新 旧)
    // $sql_update = "UPDATE GP12LIST SET username='$user' WHERE username='TheShy' ";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "修改成功";
    // }else{
    //     echo "修改失败" .mysqli.error($conn);
    // }

    // 查询某条数据 - 📕
    // SELECT 语句用于从数据表中读取数据:
    $sql_select = "SELECT username,id,password FROM gp12list";
    $result = mysqli_query($conn,$sql_select);
    // mysqli_num_rows返回结果集中行的数量
    if(mysqli_num_rows($result) > 0 ){
        //如果查询的行数大于0，则输出
        // mysqli_fetch_assoc 从结果集中取得一行作为关联数组
        while($row = mysqli_fetch_assoc($result)){
            // echo json_encode($row);
            echo "id:" .$row["id"]. "-username:" .$row["username"]. "-password" . $row["password"]. "<br><br>";
        };
    }else{
        echo "查询结果为 0 查询失败！";
    };
    
    //   // 去重;
    //   $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr'";
    //   $col = mysqli_query($conn,$sql_select);
    //   // echo var_dump($col);
    //   if($col){
    //         echo "语法没错";
    //         // 判定这里有没有我想要的东西;
    //         // 判定查询结果是否存在0条以上, 如果有同名的，就不执行了;
    //         if(mysqli_num_rows($col) > 0){
    //               die("用户名重名");
    //         }       
    //         // $count = 0;
    //         // while($row = mysqli_fetch_assoc($col)){
    //         //       echo json_encode($row);
    //         //       $count ++;
    //         // }
    //         // if($count > 0){
    //         //       die("重复的用户名");
    //         // }
    //   }else{      
    //         die("Error select userdata: " . mysqli_error($conn));
    //   }
?>