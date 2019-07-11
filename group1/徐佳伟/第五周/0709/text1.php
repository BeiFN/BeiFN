<?php
    header("Content-type:text/html;charset=utf-8;");
    $username = @$_GET["username"];
    $password = @$_GET["password"];

    if($username === "daweige" && $password === "123456"){
        echo "<script>
        
            location.href = \"http://www.baidu.com\";
        </script>";
    }else{
        if($username =="" || $password ==""){
            echo "请输入用户名与密码";
            echo "<script>
                setTimeout(()=>{
                    history.go(-1);
                },2000)
            </script>";
        }else{
            echo "输入错误";
        }
    }
    echo "<script>
        //location转发地址需要注意一下加协议
        //@可以保证获取的变量为空值
        //\$加变量可以在字符串中直接用，不会当成字符串被引用
        //大致的函数 、语法与js类似可以大胆使用
    </script>"
?>









