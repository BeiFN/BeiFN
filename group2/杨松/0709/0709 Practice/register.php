<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        $username = $_GET["username"];
        $password = $_GET["password"];

        if($username === "yangsong" && $password === "123456"){
            echo "<script>location.href = \"http://www.baidu.com\"</script>";
        }else{
            echo "用户名或密码错误";
        }
    ?>
</body>
</html>