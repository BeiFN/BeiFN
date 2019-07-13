


<?php
    header("content-type:text/html;charset=utf8");
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];
    $result = array();
    
    if(!$usr || !$pwd){//如果输入为空，终止代码
        $state  = array("state" =>"error", "stateCode"=>0,);


        die(json_encode($result));
    }

    #
    $host = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "lhgservertest";

    $conn = mysqli_connect($host, $username,$password,$dbname);
    if(!$conn){
        die("error" .mysqli_error());
    }

    $sql_select = "select username,password from lhguserlist where username=$usr";
    $res = mysqli_query($conn,$sql_select);

    if(mysqli_num_rows($res)===0){
        die("用户名不存在");
    }else{
        while($row = mysqli_fetch_assoc($res)){
            if($row["password"] == md5($pwd)){
                // echo("login success");
                setcookie("text","1111");
            }else{
                die("密码错误");
            }
        }    
    }

  

?>