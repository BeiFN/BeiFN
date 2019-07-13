<?php
    header("content-type:text/html;charset=utf8;");
    $usr=@$_POST["username"];
    $pwd=@$_POST["password"];
    $type=@$_GET["whichBtn"];
    $token=@$_COOKIE["token"];
    // echo $type;
    // echo $usr;
    // echo $pwd;
    if($token&&(!$usr||!$pwd)){
        die($token);
    }
    if(!$usr || !$pwd){
        $result=array("state"=>"error","stateCode"=>0);
        die(json_encode($result));//用户名或密码有一个为空就停止执行并报错,stateCode为0表示用户名或密码为空
    }
    #链接数据库
    $host="localhost";
    $username="root";
    $password="root";
    $dbname="gp12";
    $conn=mysqli_connect($host,$username,$password,$dbname);
    if(!$conn){
        $result=array("state"=>"error","stateCode"=>2,"errorMsg"=>mysqli_error());
        die(json_encode($result));//数据库链接失败报错,stateCode为2表示数据库链接失败
    }

    #注册功能
    if($type==="register"){
        #判断输入的用户名是否重名了
        $sql_register="SELECT username FROM GPUSERLIST WHERE username='$usr'";
        #辨别查询到的结果中有多少条数据
        $res_register=mysqli_query($conn,$sql_register);
        if(mysqli_num_rows($res_register)>0){
            $result=array("state"=>"error","stateCode"=>5);
            die(json_encode($result));//注册用户名重名,stateCode为5表示用户名重名
        }
        #将输入的用户名和密码插入数据中
        $pwd=md5($pwd);
        $sql_register_insert="INSERT INTO GPUSERLIST (username,password) VALUES('$usr','$pwd');";
        if(mysqli_query($conn,$sql_register_insert)){
            $result=array("state"=>"success","stateCode"=>7,"username"=>$usr,"password"=>$pwd);
            die(json_encode($result));//注册成功
        }
        else{
            $result=array("state"=>"error","stateCode"=>6);
            die(json_encode($result));//注册数据插入数据库失败,stateCode为6表示数据插入数据库失败
        }
    }
    #注册功能

    #登录功能
    else{
        #查询数据库中是否存在输入的用户名
        $sql_login="SELECT username,password FROM GPUSERLIST WHERE username='$usr'";
        $res_login=mysqli_query($conn,$sql_login);
        #用户名不存在
        if(mysqli_num_rows($res_login)===0){
            $result=array("state"=>"error","stateCode"=>3);
            die(json_encode($result));//用户名不存在,stateCode为3表示用户名不存在
        }
        else{
            while($row=mysqli_fetch_assoc($res_login)){
                // echo var_dump($row);
                if($row["password"]===md5($pwd)){
                    $result=array("state"=>"success","stateCode"=>1,"username"=>$usr,"password"=>$row["password"]);
                    $token=array("username"=>$usr,"password"=>$row["password"]);
                    setcookie("token",json_encode($token),time()+3600*24);//设置一个cookie
                    die(json_encode($result));//登录成功
                }
            }
            $result=array("state"=>"error","stateCode"=>4);
            die(json_encode($result));
        }
    }
    #登录功能

    mysqli_close($conn);
?>