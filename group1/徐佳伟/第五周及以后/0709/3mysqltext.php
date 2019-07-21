<?php
    header("Content-type :text/html; charset=utf-8;");
    //写一下流程
    //首先创建连接mysql所需的属性
    //1、本机地址，端口号 
    //2、mysql用户名
    //3、mysql密码
    //4、操作的数据库

    //然后进行数据库的连接
    //连接完成在做一下关于连接的判断

    //确认连接成功后开始编写sql语句
    //通过mysqli_query(连接名,sql语句)对数据库进行相应的操作

    //添加inset into 表名 (字段1，字段2..) values(值1，值2...);
    //删除delete from 表名 where 字段 = 值 ;
    //修改update 表名 set 字段1 = 值1 , 字段2 = 值2... where 字段 = 值;
    //查询select 字段 from 表名 where 字段 = 值;


    //采坑
    //sql语句的字段不用加引号
    //mysqli_error的参数不能老调用conn吧
    $root = "localhost:3306";
    $username = "root";
    $password = "123";
    $dbbase   = "daweige";

    $conn = mysqli_connect( $root , $username , $password ,$dbbase );

    if(!$conn){
        echo mysqli_error($conn);
    }

    $sql_insert = "INSERT INTO ADMIN(username,password) VALUES ('daweige','123456')";
    $sql_delete = "DELETE FROM ADMIN WHERE id = ";
    $sql_update = "UPDATE ADMIN set username = 'daweige' where username = 'weigege'";
    $sql_select = "SELECT * FROM ADMIN WHERE username = 'daweige'";

    function Sql($conn,$sqlType,$sql_select){
        if(mysqli_query($conn,$sqlType)){
            echo "操作成功";

            if($sqlType == $sql_select){
                $result = mysqli_query($conn,$sqlType);
                while($row = mysqli_fetch_assoc($result)){
                    echo json_encode($row);
                }
            }

        }
        else{
            echo mysqli_error($sqlType);
            // echo mysqli_error($conn);
        }
    }
    Sql($conn,$sql_delete,$sql_select);

//     $root = "localhost:3306";
//     $username = "root";
//     $password = "123";
//     $dbbase   = "daweige";

//     $conn = mysqli_connect($root,$username,$password,$dbbase);

//     if(!$conn){
//         //如果连接不存在，返回错误信息
//         // die("error in connect mysql " + mysqli_connect_error());
//         die("error in connect mysql" + mysqli_connect_error());
//     }
//     //编写sql语句时，字段名不能加引号s
//     // $sql_insert = "INSERT INTO ADMIN ( username , password) VALUES ('daweige' ,'123456')";

//     // if(mysqli_query($conn,$sql_insert)){
//     //     echo "成功";
//     // }else{
//     //     echo "失败";
//     //     mysqli_error($conn);
//     // }

//     // $sql_delete = "DELETE FROM ADMIN WHERE password = '123456'";
//     // if(mysqli_query($conn,$sql_delete)){
//     //     echo "删除成功";
//     // }else{
//     //     mysqli_error($conn);
//     // }

//     // $sql_update = "UPDATE ADMIN set username = 'weigege'  where id = 1";
//     // if(mysqli_query($conn,$sql_update)){
//     //     echo "修改成功";
//     // }else{
//     //     mysqli_error($sql_update);
//     // }

//     $sql_select = "SELECT * FROM ADMIN WHERE username = 'weigege'";
//     if($result = mysqli_query($conn,$sql_select)){
//         //不知道输出点啥
//         // echo json_encode($result);
//         //返回受影响的行数
//         // echo mysqli_num_rows($result);
//         $row = mysqli_fetch_assoc($result);

//         echo var_dump($row);
//         //array(3) { ["username"]=> string(7) "weigege" ["password"]=> string(3) "123" ["id"]=> string(1) "1" }

//         // while($wei = mysqli_fetch_assoc($result)){
//         //     //这样仿写莫得灵魂
//         //     echo json_encode($wei);
//         // }
//     }
//     else{
//         mysqli_error($sql_select);
//     }
    
// ?>