<?php
header("Content-type: text/html; charset=utf-8");
$user=$_GET["username"];
$pass=$_GET["password"];

echo $user,$pass,"如果漫画";
echo "<script>
    setInterval(()=>{
        history.go(-1);
    },2000)
</script>";
?>