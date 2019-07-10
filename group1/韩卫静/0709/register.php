<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<form action="http://10.9.10.163/hwj/0709/register.php" >
			<p>
				<input type="text" name="username" value="han" />
			</p>
			<p>
				<input type="text" name="password" value="123" />
			</p>
			<input type="submit" name="submit" value="注册"/>
		</form>
	</body>
</html>


<?php
	$un = $_GET["username"];
	$pw = $_GET["password"];
	
	if(!$un || !$pw){
		die("");
	}
	
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "gp12";
	
	$conn = mysqli_connect($servername,$username,$password,$dbname);
	
	if(!$conn){
		die("connection failed :" . mysqli_connect_error());
	}
	// echo "连接成功";
	
	$sql_select = "SELECT  * FROM gpuserlist WHERE username='$un'";
	$col = mysqli_query($conn,$sql_select);
	
	if($col){
		echo "语法没错";
		if(mysqli_num_rows($col) > 0){
			die("用户名已存在");
		}
	}else{
		die("Error select userdata:" . mysqli_error($conn));
	}
	
	$sql_insert = "INSERT INTO gpuserlist(
		username,password
	)VALUES(
		'$un','$pw'
	)";
	
	if(mysqli_query($conn,$sql_insert)){
		echo "注册成功";
	}else{
		echo "Error insert userdata :" . mysqli_error($conn) ;
	}
	
?>