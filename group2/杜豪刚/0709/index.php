<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的第一个PHP</title>
</head>
<body>
    <h1> 我是PHP </h1>

    <?php
    for( $i=0 ; $i<5 ; $i++ ){
        echo( "3分钟入门PHP<br/>" );
    }
    ?>

    <script>
        for( let i=1 ; i<5 ; i++ ){
            if( i===3 ){
                continue;
            }
            console.log(i);
        }
    </script>

</body>
</html>