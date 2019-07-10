<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="./register_practice.php">
        <p>
            用户名：<input type="text" name="username">
        </p>
        <p>
            密 码：<input type="text" name="password">
        </p>
        <button>提交</button>
    </form>
</body>
</html>
<?php
    //获取用户输入的表单信息
    $userN = @$_GET["username"];
    $pwd   = @$_GET["password"];
    if( !$userN || !$pwd){
        die(" ");//die() 函数输出一条消息，并退出当前脚本。
    }
    //对数据库的操作分为四部分
    # 1. 链接数据库服务;  使用 mysqli_connect($servername, $username, $password,$dbname ); 创建链接
    # 2. 选数据库;          
    # 3. 操作表;
    # 4. 清空缓存,清理链接; mysqli_close($conn);


    //链接到数据库服务器
    //1、规定要连接的服务器，默认是 "localhost:3306"。 
    //2、规定登录所使用的用户名，(默认值是拥有服务器进程的用户的名称。)
    //3、规定登录所用的密码，默认是 ""。
    //4、规定所链接的数据库名

    $servername = "localhost:3306";
    $username   = "root";
    $password   = "root";
    $dbname     = "gp12";

    //在访问并处理数据库中的数据之前，必须创建到达数据库的连接。在 PHP 中，这个任务通过 mysql_connect() 函数完成。
    $conn       = mysqli_connect($servername,$username,$password,$dbname);//在变量 $con 存放了在脚本中供稍后使用的连接
    if( !$conn ){//判断是否链接成功，若成功则执行die()函数
        die('Error in connet mySQL :' .mysql_error());
    }
    //mysql_error(可选)函数返回上一个 MySQL 操作产生的文本错误信息,如果没有出错则返回 ''（空字符串）

    // $pwd        = md5($pwd);//使用 MD5() 函数对密码进行加密
    //去重
    // $sql_select =  "SELECT * FROM GP12LIST WHERE username= '$user' ";

    //mysql_query() 函数执行一条 MySQL 查询。
    //mysql_query(connection,query)
    //connection    必需。规定要使用的 MySQL 连接。
    //query         必需，规定查询字符串。
    // $col        = mysqli_query($conn,$sql_select);
    // if($col){
    //     echo "语法没错";
    //     if(mysqli_num_rows($col) > 0){
    //         die("用户名重名");
    //     }
    // }
    // else{
    //     die("Error select userdata :" .mysqli_error($conn));//没有查询到
    // }
    
    //创建 数据库表
    $sql_table = "CREATE TABLE BEIJING12 (
        -- username varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        -- password varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
        -- id integer(5) NOT NULL AUTO_INCREMENT,
        -- PRIMARY KEY(id)
        username varchar(255),
        id int(5) not null auto_increment,
        PRIMARY KEY (id)
    );";

    if(mysqli_query($conn,$sql_table)){
        echo "创建成功";
    }
    else{
        mysqli_error($conn);
    }

    //数据库 增
    // $sql_insert = "INSERT INtO GP12LIST (
    //     username , password
    // ) VALUES (
    //     '$userN' , '$pwd'
    // );" ;
    // if(mysqli_query($conn,$sql_insert)){//执行在连接中操作MySQL语句
    //     echo "用户注册成功";
    // }
    // else{
    //     die("Error insert userdata:" .mysqli_error($conn));
    // }
    // mysqli_close($conn);//关闭数据库

    //数据库 删
    // $sql_delete   = "DELETE FROM GP12LIST WHERE username='$userN'";
    // if(mysqli_query( $conn , $sql_delete )){
    //     echo "删除成功" ;
    // }
    // else{
    //     die("Error delete userdata:" .mysqli_error($conn));
    // }
    // mysqli_close($conn);//虽然删除了数据，但是数据的id值不变

    //数据库 改
    // $sql_update = "UPDATE GP12LIST SET username='213131' WHERE username='Ssss'";
    // if(mysqli_query($conn,$sql_update)){
    //     echo "修改成功";
    // }
    // else{
    //     die("Error update in userdata :" .mysqli_error($conn));
    // }
    // mysqli_close($conn);

    //数据库 查
    //1、计数(查看数据库存在多少条数据)
    //2、遍历，取出每一条数据
    // $sql_select = "SELECT * FROM GP12LIST";
    // if($result = mysqli_query($conn,$sql_select)){
    //     while($row = mysqli_fetch_assoc($result)){
    //         echo json_encode($row);
    //     }
    // }
    // else{
    //     die("Error in select userdate:" .mysqli_error($conn));
    // }
    // mysqli_close($conn);
?>