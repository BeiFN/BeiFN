<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>测试</title>
</head>
<body>
  <!-- <?php
	for( $i = 0 ; $i < 15 ; $i++ ){
		echo "HEllO WORLD !";
	}	
  ?> -->
   <!-- <?php
      for($i = 0 ; $i < 10 ; $i++){
            echo "hello world</br>";
      }
    ?> -->
  
   <?php
        $username = $_GET["username"];
        $password = $_GET["password"];

        if($username === "yinyating" && $password === "123456"){
          echo "验证通过" ;
          echo "<script> location.href=\"https://www.baidu.com\";
          </script>";
        }else{
           echo "账号或者密码错误" ;
            echo "<script> 
            setTimeout(function(){
              history.go(-1);
            },2000)
          </script>";
        }
  ?>

  <?php
	     
  ?>
</body>
</html>