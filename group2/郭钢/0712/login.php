<?php
header("content-type:text/html;charset=utf8");


# 终止逻辑 , 如果没有用户提交的数据，那么终止代码;
$usr = @$_POST["username"];
$pwd = @$_POST["password"];
if (!$usr || !$pwd) {
    $result = array("state" => "error", "stateCode" => 0);
    die(json_encode($result));
}

# 链接数据库 
$host     = "localhost:3306";
$username = "root";
$password = "root";
$dbname   = "gp12";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    $result = array("state" => "error", "stateCode" => 1,"errorMsg" => mysqli_error());
    die(json_encode($result));
}

# 判定数据库之中是否已经存在了;

$sql_select = "SELECT username,password FROM gpuserlist WHERE username='$usr'";
// 辨别查询结果之中有多少条数据


$res = mysqli_query($conn, $sql_select);

if (mysqli_num_rows($res) === 0) {
    $result = array("state" => "error", "stateCode" => 2);
    die(json_encode($result));
} else {
    while ($row = mysqli_fetch_assoc($res)) {
        if ($row["password"] == md5($pwd)) {
            $result = array("state" => "success","stateCode" => 3,"username" =>$username,"password"=>$row["password"]);
            die(json_encode($result));
        }
    }
    $result = array("state" => "error", "stateCode" => 4);
    die (json_encode($result));
}
