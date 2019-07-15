<?php
    header("content-type:text/html;charset=utf8;");
    $user   = @$_POST["username"];
    $pwd    = @$_POST["password"];

    if( !$user || !$pwd){
        // die("缺少参数");填入状态
        $result= array("state"=>"error","stateCode"=>0);
        // array_push($result,$state);//array_push() 函数向第一个参数的数组尾部添加一个或多个元素
        die(json_encode($result));
    }
    $localhost = "localhost";
    $username  = "root";
    $password  = "root";
    $dbname    = "gp12";
    $conn      = mysqli_connect( $localhost , $username , $password ,$dbname);
    if(!$conn){
        // die("数据库链接失败".mysqli_error());
        $result= array("state"=>"error","stateCode"=>2,"errorMsg"=>mysqli_error());
        die(json_encode($result)); 
    }
    $sql_login = "SELECT username,password FROM GP12LIST WHERE username='$user' ";
    $res       = mysqli_query($conn , $sql_login);//执行sql语句后的结果
    if(mysqli_num_rows($res) === 0){//结果的数量
        // die("该用户不存在") ;
        $result= array("state"=>"error","stateCode"=>3);
        die( json_encode($result) );
    }
    else{//进行验证，遍历查询到的结果
        while($row = mysqli_fetch_assoc($res)){//遍历表
            if($row["password"] === $pwd){//数组中的password得值
                // die("登录成功");
                $result = array("state"=>"succes","stateCode"=>"1","user"=>$user ,"pwd"=>$row["password"]);
                die( json_encode($result) );
                //php自带cookieAPI
                setcookie("test","LHS");

            }
        } 
        // echo "登录失败";
        $result = array("state"=>"error","stateCode"=>"4");
        die(json_encode($result));
    }

?>