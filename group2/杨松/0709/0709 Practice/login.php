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
       $root     = "localhost";
       $username = "root";
       $password = "root";
       $dbname   ="test";
       $conn =mysqli_connect($root,$username,$password,$dbname);
      if($conn){
          echo " ";
      }else{
        die("Connection failed: " . mysqli_connect_error());
      }

      $user = $_GET["username"];
      $pwd  = $_GET["password"];
      $email= $_GET["email"];

      if($user === "songsong" && $pwd ==="123456" && $email ==="1601149683@qq.com"){
          echo 
          "<script>
                location.href = \'http://songsong920.cn\';
          </script>";
      }else{
          echo "输入有误,请重新输入";
          echo "<script>
                setTimeout(function(){
                    history.go(-1);
                },2000)
          </script>";
      }

    ?>
</body>
</html>