
<?php
    header("Content-type:text/html;charset=utf-8");
    // 获取username，password
    $usr = $_GET["username"];
    $pwd = $_GET["password"];
    // 判断输入的value值☞
    if($usr === "12306" ){
        echo "成功";
        echo "<script>
                location.href = \"https://www.baidu.com\"
              </script>";
    }else{
        echo "失败,正在跳转回原页面...";
        echo "<script>
                setTimeout(()=>{
                    history.go(-1)
                },1000)
              </script>";
    }

?>


