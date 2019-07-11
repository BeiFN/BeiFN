<?php
header("Content-type:text/html;charset=utf-8");
$usr=@$_GET["username"];
$pwd=@$_GET["password"];
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
echo "连接数据库成功<br>";

$sql_insert="INSERT INTO $db_tablename ( username,password ) VALUES ( '$usr','$pwd')";
$sql_select="SELECT * FROM $db_tablename WHERE username='$usr'&&password='$pwd'";
if($selectRes=mysqli_query($conn,$sql_select)){
    echo "用户名查找成功<br>" ;
    if(mysqli_num_rows($selectRes)>0){
        echo "认证成功,欢迎登陆,5秒钟后跳转用户页面";
        echo "<script>
                setTimeout(()=>{
                    location.href='http://localhost/1000/daily/0709/user.html';
                },5000)
            </script>";
    }else{
        echo "用户名或密码错误,5秒钟后返回登陆页面";
        echo "<script>
                setTimeout(()=>{
                    history.go(-1);
                },5000)
            </script>";
    }
}else{
    echo mysqli_error($conn);
    echo "用户名查找失败<br>";
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