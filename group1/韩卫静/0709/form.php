<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<form action="http://10.9.10.163/hwj/0709/form.php" >
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
	
	if($un ==='aaa' && $pw === '111'){
		echo "通过";
	}else{
		echo "账号密码不匹配";
	}
	
?>