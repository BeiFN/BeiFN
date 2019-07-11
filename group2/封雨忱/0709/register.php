<?php
// echo "1";
header("Content-type:text/html;charset=utf-8");
$root="localhost";
$username="root";
$password="root";
$dbname="gp12";
$coon=mysqli_connect($root,$username,$password,$dbname);
// echo var_dump($coon);
$urn=@$_GET["username"];
$paw=@$_GET["password"];
// echo "$urn $paw";
if(!$urn||!$paw){
    die("");
}
if(!$coon){
    die("Connection failed:" . mysqli_connect_error());
};
//去重
$sql_selector="SELECT * FROM gpuserlist WHERE username='$urn'";
$col=mysqli_query($coon,$sql_selector);
if($col){
    echo "语法没错";
    if(mysqli_num_rows($col)>0){
        die("用户名重复");
    }
}else{
    die("Error select userdata: " . mysqli_error($coon));
}

//INSERT
$paw=md5($paw);
$sql_insert="INSERT INTO gpuserlist(
    username,password
) VALUES(
    '$urn','$paw'
);";
if(mysqli_query($coon,$sql_insert)){
    echo "注册成功";
}else{
    echo "Error insert userdata: " . mysqli_error($coon);
};
mysqli_close($coon);
?>