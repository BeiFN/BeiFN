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
			<input type="submit" name="submit" value="登录"/>
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
	$sql_select = "SELECT username,password FROM gpuserlist WHERE username='$un'";
	$res = mysqli_query($conn,$sql_select);
	// $res = mysqli_fetch_assoc($res);
	// echo json_encode($res);
	if(mysqli_num_rows($res)===0){
		die("用户名不存在");
	}else{
		while($row = mysqli_fetch_assoc($res)){
			if($row["password"] === md5($pw)){
				die( "登录成功");
			}
		}
		echo "密码错误";
	}
	
	
	
	
?>