<?php
    header("content-type:text/html;charset=utf8;");

    $user       = @$_POST["username"];
    $pwd        = @$_POST["password"];
    $token      = @$_COOKIE["TOKEN"];

    if($token && !$pwd && !$user){
        die($token);
    }

    if(!$user || !$pwd){
        $result = array("state" => "error","stateCode"=>0);
        die(json_encode($result));
    }


    $host       = "localhost";
    $username   = "root";
    $password   = "root";
    $dbname     = "gp12";

    $conn       = mysqli_connect($host , $username , $password , $dbname);

    if(!$conn){
        $result = array("state" => "error" , "stateCode" => 2 ,"errorMsg" => mysqli_error($conn));
        die(json_encode($result));
    }

    $sql_select = "SELECT username , password FROM gpuserlist WHERE username='$user'";

    $res = mysqli_query($conn , $sql_select);

    if(mysqli_num_rows( $res ) === 0 ){
        $result = array("state" => "error" , "stateCode" => 3);
        die(json_encode($result));
    }else{
        while($row = mysqli_fetch_assoc($rec)){
            if($row["password"] == md5($pwd)){
                $result = array("state"=>"success" , "stateCode" => 1 , "username"=>$user,"password"=>$row["password"]);
                
                setcookie("TOKEN" , json_encode($tocken),time()+3600 * 24);
                die(json_encode($result));
            }
        }
        $result = array("state"=>"error" , "stateCode"=>4);
        die(json_encode($result));
    }
?>