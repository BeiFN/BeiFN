<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<form>
			<p>
				<input type="text" name="username"/>
			</p>
			<p>
				<input type="text" name="password"/>
			</p>
			<input type="submit" name="submit" />
		</form>
	</body>
</html>


<?php
	$un = $_GET["username"];
	$pw = $_GET["password"];
	
	# -判断终止逻辑
	if($un ==='' || $pw === ''){
		die("字段不能为空");
	}
		
	# -连接数据库
	$server = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "gp12";
	
	$conn = mysqli_connect($server,$username,$password,$dbname);
	if(!$conn){
		die("连接失败" . mysqli_error($conn));
	}
	
	# -判断数据库中是否已存在数据
	$sql_select = "SELECT username FROM gpuserlist WHERE username='$un'";
	$res = mysqli_query($conn,$sql_select);
	// $res = mysqli_fetch_assoc($res);
	// echo json_encode($res);
	if(mysqli_num_rows($res)>0){
		die("用户名已存在");
	}
	
	
	# -插入数据
	$pw = md5($pw);
	$sql_insert = "INSERT INTO gpuserlist(
		username , password
	)VALUES(
		'$un' , '$pw'
	)";
	if(mysqli_query($conn,$sql_insert)){
		echo "注册成功";
	}else{
		echo "注册失败 Error ：" . mysqli_error($conn);
	}
	
?>