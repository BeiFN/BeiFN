<?php
     header("Content-type: text/html;charset=utf-8");
     #将用户输入的数据放入到mySQL中;进行数据的存储;
     #php可以处理前端发送来的数据;

     #1.获取数据;
     #2.处理数据;
     #3.返回结果;

     #url路径上的 ? 后的数据是给php的;
     #php专门提供了获取数据的API;$_GET[""];$_POST[""];$_REQUEST[""];


     $username = $_GET["username"];
     $password = $_GET["password"];
     if($username === "大雄" && $password === "123456"){
         echo "<script>
                location.href = \"http://www.baidu.com\";
                </script>";
     }
     else{
         echo "账号或者密码有错误";
         echo "<script>
                setTimeout(function(){
                    history.go(-1);
                },2000)
                </script>";
     }
?>