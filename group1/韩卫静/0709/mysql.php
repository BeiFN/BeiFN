<?php
	
	header("Content-type:text/html;charset=utf-8;");
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "gp12";
	
	$conn = mysqli_connect($servername,$username,$password,$dbname);
	
	if(!$conn){
		die("Error in connection:" . mysqli_connect_error());
	}
	
	//创建一个表
	$sql_create_table = "CREATE TABLE TATEST (
		username varchar(255),
		id int(5) not null auto_increment,
		PRIMARY KEY(id)
	);";
	
	if(mysqli_query($conn,$sql_create_table)){
		echo "成功创建表格...<br>";
	}else{
		echo mysqli_error($conn);
	}
	
	//增加一项数据
	// $sql_insert = "INSERT INTO TATEST(
	// 	username
	// )VALUES(
	// 	'zhangsan'
	// )";
	// 
	// if(mysqli_query($conn,$sql_insert)){
	// 	echo "成功插入数据1...<br>";
	// }else{
	// 	echo mysqli_error($conn);
	// }
	// $sql_insert = "INSERT INTO TATEST(
	// 	username
	// )VALUES(
	// 	'lisi'
	// )";
	// 
	// if(mysqli_query($conn,$sql_insert)){
	// 	echo "成功插入数据2...<br>";
	// }else{
	// 	echo mysqli_error($conn);
	// }
	
	//修改表中的数据
	// $sql_update = "UPDATE TATEST SET username='wangwu' WHERE username = 'zhangsan'";
	// if(mysqli_query($conn,$sql_update)){
	// 	echo "成功更改一项数据...<br>";
	// }else{
	// 	echo mysqli_error($conn);
	// }
	
	//删除
	// $sql_delete = "DELETE FROM TATEST WHERE username='hello'";
	// if(mysqli_query($conn,$sql_delete)){
	// 	echo "成功删除...<br>";
	// }else{
	// 	echo mysqli_error($conn);
	// }
	
	//查询
	$sql_select = "SELECT username FROM TATEST";
	if($res = mysqli_query($conn,$sql_select)){
		while($row = mysqli_fetch_assoc($res)){
			echo json_encode($row);
		}
	}else{
		echo mysqli_error($conn);
	}



?>