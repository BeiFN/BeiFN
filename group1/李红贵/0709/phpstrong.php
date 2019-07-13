
    <?php
    header("Content-type: text/html; charset=utf-8");
        // // echo "hello world";
        // oracle//收费
        // mongoDB//费空间

        // mySQL 表
        //     行号 => 主键，没一条数据的唯一标志
        //     表头 => 字段，每一个数据所代表的内容

        #将用户输入的数据存入数据库
        #php可以处理前端发送给我们的数据
        #获取到  处理  返回结果
        #url路径上的？后的数据是给php的数据
        #php专门提供了获取数据的API 
        // $_GET[""];
        // $_POST[""];
        // $_REQUEST[""];
        $username = $_GET["username"];
        $password =  $_GET["password"];

        // echo $_GET["username"];
        // echo $_GET["password"];

        if($username === "lisis" && $password === "111111"){
            echo "<script>location.href = \"http://www.baidu.com\";</script>";
            // echo "<script>
            //         location.href = \"http://www.baidu.com\";
            //     </script>";
        }else{
            echo "账户或者密码错误";
            echo "<script> setTimeout(function(){
                history.go(-1);
            },1000);</script>";
            // echo "账号或者密码错误 ";

            // echo "<script>
            //             setTimeout(function(){
            //                 history.go(-1);
            //             },2000)
            //     </script>";
        }

    ?>
