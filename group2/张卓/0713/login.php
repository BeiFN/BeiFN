<?php
      header("content-type:text/html;charset=utf8;");
      $usr    = @$_POST["username"];
      $pwd    = @$_POST["password"];
      $tocken = @$_COOKIE["TOCKEN"];
      $close  = @$_POST["close"];  //退出模块
      if($tocken && !$pwd && !$usr){
            //如果有tocken并且没有pwd没有usr就不继续执行了
            die($tocken);
      }

      if(!$usr || !$pwd ) {
            $result = array( "state" => "error" , "stateCode" => 0);
            die( json_encode($result) );
      }


      // 链接数据库
      $host     = "localhost";
      $username = "root";
      $password = "123";
      $dbname   = "phptest";

      $conn = mysqli_connect($host,$username,$password,$dbname);

      if(!$conn){
            // die("数据库连接失败" . mysqli_error());   array也是PHP的API  关联数组的语法：array(key=>value,key=>value,key=>value);
            $result = array( "state" => "error" , "stateCode" => 2 , "errorMsg" => mysqli_error($conn));
            die( json_encode($result));
      }

      $sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
      // 辨别查询结果之中有多少条数据
      $res = mysqli_query($conn,$sql_select);
      //$res查询结果的数量
      if(mysqli_num_rows( $res ) === 0 ) {
            $result = array( "state" => "error" , "stateCode" => 3 );
            die( json_encode($result) );
      }else{
            while($row = mysqli_fetch_assoc($res)){
                  if($row["password"] == md5($pwd)){
                        $result = array( "state" => "success" , "stateCode" => 1 , "username" => $usr , "password" => $row["password"]);
                        // 设置一个tocken;
                        $tocken = array( "username" => $usr , "password" => $row["password"]);
                        //php的API
                        setcookie("TOCKEN",json_encode($tocken),time()+3600 * 24);
                        die( json_encode($result) );
                  }
            }
            $result = array( "state" => "error" , "stateCode" => 4 );
            die( json_encode($result) );
      }


      //如果close存在
      // //退出模块
      // if($close){
      //       echo "执行到了这里";
      //       setcookie("TOCKEN","",time() - 3600);
      // }
