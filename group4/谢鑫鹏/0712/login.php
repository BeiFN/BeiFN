<?php
	header("content-type:text/html;charset=utf8;");
	$usr = @$_POST["username"];
	$pwd = @$_POST["password"];
	// 获取cookie
	// $tocken = @$_COOKIE["text"];
	// echo $tocken;
	$tocken = @$_COOKIE["TOCKEN"];
	// 如果tocken存在，用户名和密码都不存在，结束
	if($tocken && !$pwd && !$usr){
		die($tocken);
	}
	// 如果用户名或者密码有一个为空，结束
	if(!$usr || !$pwd ) {
	    $result = array( "state" => "error" , "stateCode" => 0);
	    die( json_encode($result) );
	}
	// 链接数据库 
	$host     = "localhost";
	$username = "root";
	$password = "root";
	$dbname   = "1";
	$conn = mysqli_connect($host,$username,$password,$dbname);
	if(!$conn){
		// die("数据库连接失败".mysqli_error());
	    $result = array("state" => "eror", "stateCode" => 2, "errorMsg" => myspli_error());
    	die(json_encode($result));
	}
	// 判定数据库之中是否已经存在了;
	$sql_select = "SELECT username,password FROM TABLE1 WHERE username='$usr'";
	// 辨别查询结果之中有多少条数据
	$res = mysqli_query($conn,$sql_select);
	if(mysqli_num_rows( $res ) === 0 ) {
	    // die("用户名不存在");
		$result = array( "state" => "error" , "stateCode" => 3 );
        die( json_encode($result) );
	}else{
	    while($row = mysqli_fetch_assoc($res)){
          	if($row["password"] == md5($pwd)){
                // die("登陆成功");并将用户名和密码传出
                $result = array( "state" => "success" , "stateCode" => 1 , "username" => $usr , "password" => $row["password"]);
                $tocken = array( "username" => $usr , "password" => $row["password"]);
                // 设置一个tocken
                // setcookie("text","1111");
                setcookie("TOCKEN",json_encode($tocken),time()+3600 * 24);
                die(json_encode(($result)));
          	}
	    }
	    // echo "密码错误";
	    $result = array( "state" => "error" , "stateCode" => 4 );
        die( json_encode($result) );
	}

?>