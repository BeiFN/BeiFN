<?php
    header("content-type:text/html ; charset = utf8;");
    $usr    = @$_POST["username"];
    $pwd    = @$_POST["password"];
    $tocken = @$_COOKIE["TOCKEN"];
    
    if($tocken && !$pwd && !$usr){
        die($tocken);//die() 函数输出一条消息，并退出当前脚本。
    }

    if(!$usr || !$pwd){
        $result = array("state" => "error" , "stateCode" => 0);
        die(json_encode($result) );
    }

    //连接数据库
    $host       = "localhost";
    $username   = "root";
    $password   = "root";
    $dbname     = "gp12";

    $coon = mysali_connect($host , $username , $password , $daname);

    if(!conn){
        //die("数据库连接失败". mysqli_error());
        $result = array("state" => "error" , "stateCode" => 2 , "errorMsg" => mysqli_error());
        die( json_encode($result) );
    }

    $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
    $res = mysqli_query($conn , $sql_select);
    //mysqli_num_rows取出集中行
    if(mysqli_num_rows( $res) === 0){
        //创建数组
        $result = array("state" => "error" , "stateCode" => 3);
        die( json_encode($result) );

    }else{
        //mysqli_fetch_assoc从结果集中取得一行作为关联数组：
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                $result = array( "state" => "success" , "stateCode" => 1 , "username" => $usr , "password" => $row["password"]); 
                //token的意思是“令牌”，是服务端生成的一串字符串，作为客户端进行请求的一个标识。
                $tocken = array( "username" => $usr , "password" => $row["password"]);

                setcookie("TOCKEN" , json_encode($tocken), time() +3600 * 24);
                die( json_encode($result) );
            }
        }
        
        $result = array("state" => "error" , "stateCode" => 4);
        die( json_encode($result) ); 
    }
?>