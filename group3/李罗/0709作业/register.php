<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <form action="http://localhost/0709/register.php">
            <p>
                用户名 : <input type="text" name='username'>
            </p>
            <p>
                密码 : <input type="text" name='password'>
            </p>
            <button>注册</button>
      </form>
</body>
</html>
 
<?php
    $usr=@$_GET["username"];
    $pwd=@$_GET["password"];
    if(!$usr || !$pwd){
        die("");
    }

    // echo "$username $password";

    #注册
    // 要把用户输入的内容，通过php获取，然后放进数据库

    #php对数据库进行操作
    #1.首先链接数据库服务
    #2.选择数据库
    #3.操作表
    #4.清空缓存，清理链接

    $servername="localhost:3306";
    $username="root";
    $password="root";
    $dbname="gp12";

    #Resource 为资源类型
    $conn=mysqli_connect($servername,$username,$password,$dbname);
    //echo var_dump($conn);
    // echo var_dump($conn);
    if(!$conn){
        #die这个方法表示不会再继续执行代码了；
        die("Connection failed: ". mysqli_connect_error());
    }
    echo "链接成功";

    //去重
    $sql_select = "SELECT * FROM GPUSERLIST WHERE username='$usr'";

    $col=mysqli_query($conn,$sql_select);
    // echo var_dump($col);
    if($col){
        echo "语法没错";
        //判定一下这里有没有我想要的东西，判定查询结果是否存在0条以上，如果有同名的，就不执行了
        if(mysqli_num_rows($col)>0){
            die("用户名重名");
        }
    }else{
            die("Error select userdata: " . mysqli_error($conn));
        }

        //插入到数据库中INSERT
        $pwd = md5($pwd);
        echo $pwd;
        $sql_insert="INSERT INTO GPUSERLIST (
            username,password
        ) VALUE(
            '$usr' , '$pwd'
        );";
        if(mysqli_query($conn , $sql_insert)){
            echo "注册成功";
        }else{
            echo "Error insert userdata: " . mysqli_error($conn);
        }
    
    mysqli_close($conn);

?>