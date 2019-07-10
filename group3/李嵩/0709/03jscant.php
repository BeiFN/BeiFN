<?php
    header("Content-type: text/html; charset=utf-8");
    //获取数据的API; $_GET["名称"] ; $_POST["名称"] ; $_REQUEST["名称"];

    // 表单数据提交;
    $username = $_GET["username"];
    $password = $_GET["password"];

    if($username === "yanghuaizhi"&& $password === "123456"){
        echo"<script>
                location.href=\"http://www.baidu.com\";
             </script>";
    }else{
        echo"账号或密码输入错误";
        echo"<script>
                setTimeout(function(){
                    history.go(-1);
    },2000)
    </script>";
}
?>