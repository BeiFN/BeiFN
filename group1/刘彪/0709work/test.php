<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>php后缀的会被php引擎解析,解析之后返回一次</h2>
    <?php
     for($i = 0 ; $i < 100 ; $i++){
         echo "hello world </br>";
     }
    ?>
</body>
</html>