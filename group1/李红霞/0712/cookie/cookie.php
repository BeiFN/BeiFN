<?php
      header("content-type:text/html;charset=utf8;");
      $usr    = @$_POST["username"];
      $pwd    = @$_POST["password"];
      $tocken = @$_COOKIE["TOCKEN"];
      
      if($tocken && !$pwd && !$usr){
            die($tocken);
      }

      if(!$usr || !$pwd ) {
            $result = array( "state" => "error" , "stateCode" => 0);
            die( json_encode($result) );
      }

      // 链接数据库
      $host     = "localhost";
      $username = "root";
      $password = "root";
      $dbname   = "gp12";

      $conn = mysqli_connect($host,$username,$password,$dbname);

      if(!$conn){
            $result = array( "state" => "error" , "stateCode" => 2 , "errorMsg" => mysqli_error());
            die( json_encode($result) );
      }

      $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
      $res = mysqli_query($conn,$sql_select);

      if(mysqli_num_rows( $res ) === 0 ) {
            $result = array( "state" => "error" , "stateCode" => 3 );
            die( json_encode($result) );
      }else{
            while($row = mysqli_fetch_assoc($res)){
                  if($row["password"] == md5($pwd)){

                        $result = array( "state" => "success" , "stateCode" => 1 , "username" => $usr , "password" => $row["password"]);
                        $tocken = array( "username" => $usr , "password" => $row["password"]);

                        setcookie("TOCKEN",json_encode($tocken),time()+3600 * 24);
                        die( json_encode($result) );
                        // 设置一个tocken;
                        
                  }
            }
            $result = array( "state" => "error" , "stateCode" => 4 );
            die( json_encode($result) );
      }
?>