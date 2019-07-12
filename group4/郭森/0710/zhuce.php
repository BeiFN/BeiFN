<?php
header("Content-type:text/html;charset=utf-8");
$usr=@$_GET["username"];
$pwd=@$_GET["password"];
if(!$usr||!$pwd){
    die("请输入账号密码");
};
$pwd=md5($pwd);

$db_servername = "localhost";
$db_username = "root";
$db_password = "root";
$db_dbname="1000";
$db_tablename="userlist";
 
// 创建连接
$conn = mysqli_connect($db_servername, $db_username, $db_password,$db_dbname);
// 检测连接
if (!$conn) {
    die("连接数据库失败 " . mysqli_connect_error());
}
echo "连接成功";
$sql_insert="INSERT INTO $db_tablename ( username,password ) VALUES ( '$usr','$pwd')";
$sql_select="SELECT * FROM $db_tablename WHERE username='$usr'" ;
if($selectRes=mysqli_query($conn,$sql_select)){
    if(mysqli_num_rows($selectRes)>0){
        die("用户名已被注册");
    }else{
        if($insertRes=mysqli_query($conn,$sql_insert)){
            echo "success" ;
        }else{
            die("用户名注册失败");
        }; 
    }
}else{
    die( "用户名查找失败".mysqli_error($conn));
};

mysqli_close($conn);

// if($usernema==="guosen"&&$password==="hahaha"){
//     echo "<script>
//             location.href=\"http://www.baidu.com\"
//           </script>";
// }else{
//     echo "账号密码错误";
//     echo "<script>
//             setTimeout(()=>{
//                 history.go(-1);
//             },2000)
//         </script>";
// };
?>