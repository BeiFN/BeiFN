<?php
	header("Content-type:text/html; charset:utf-8");
	$username = $_GET["username"];
	$password = $_GET["password"];
	
	if($username == "123" && $password == "123"){
		echo "<script>
			location.href = \"http://baidu.com\"
		</script>";
	}else{
		echo "<script>
			document.write(\"用户名或密码不正确\")
			setTimeout(()=>{
				history.go(-1);
			};2000)
		</script>";
	}
	
?>


<?php
      header("Content-type: text/html; charset=utf-8");
      $username = $_GET["username"];
      $password = $_GET["password"];
      
      if($username === "123" && $password === "123"){
            echo "<script>
                        location.href = \"http://www.baidu.com\";
                  </script>";
      }else{
            echo "账号或者密码错误 ";
            echo "<script>
                        setTimeout(function(){
                              // history.go(-1);
                        },2000)
                  </script>";
      }
?>
