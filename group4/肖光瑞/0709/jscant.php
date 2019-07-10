<?php
    header("Content-type:text/html; charset=utf-8");
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];

    if($usr === "guangruixiao" && $pwd === "123456"){
        echo   "<script>
                    location.href = \"http://www.baidu.com\";
                </script>";
    }else{
        echo    "账号或者密码错误";
        echo   "<script>
                    setTimeout( function(){
                        history.go(-1);
                    },2000)
                </script>";
    }

?>