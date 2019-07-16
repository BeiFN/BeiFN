<?php
header("Content-type : text/html ; charset = utf-8");
$servername = "localhost";
$username   = "root";
$password   = "root";
$dbname     = "abraham";
$conn       = mysqli_connect($servername,$username,$password,$dbname);

if(!conn){die("error in connect mysql :".mysqli_connect_error)};
$sql_insert = "INSERT INTO GPTEST(username)VALUES('hello world')";
$sql_delete = "DELETE FROM GPTEST WHERE username = 'hello world'";
$sql_update = "UPDATA GPTEST SET username = 'lowha' WHERE username = 'hello world'";
mysqli_close($conn);

?>