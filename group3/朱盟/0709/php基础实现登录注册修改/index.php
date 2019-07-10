<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>完成后将跳转，请稍等... 世界上最好的语言(PHP)正在艰难的尝试对你无敌炫酷de信息输入 进行超级复杂的验证... </title>
</head>

<body>

    <?php
   

        $name=@$_GET["name"];
        $pw=@$_GET["pw"];
        $type=@$_GET["type"];

        if(!$name||!$pw||!$type){
            backPage("不能提交空的表单给我哦！！");
        };

        switch($type){
            case "login":
            login($name, $pw);
            break;
            case "register":
            register($name, $pw);
            break;
            case "updata":
            updata($name, $pw);
            break;
        }


     function login ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
        // 创建连接
        $conn = mysqli_connect($servername, $username, $password,$dbName);
        // 检测连接
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql_select="SELECT * FROM userlist WHERE userName='$name' and passWord='$pw'";
        $result=mysqli_query($conn,$sql_select);
        if(mysqli_num_rows($result)>0){
            while($row=mysqli_fetch_assoc($result)){
                backPage(" 尊敬的". $row["userName"]." ，欢迎您来到这里，~~弹出！ 记住您的登录ID 为:".$row["id"]);
                break;
            }
        }
        else{
            backPage("验证失败，离开这里吧，骚年，这里不属于你！");
        }
        mysqli_close($conn);
     }

     function register ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
          // 创建连接
        $conn = mysqli_connect($servername, $username, $password,$dbName);
        // 检测连接
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $sql_select="SELECT * FROM userlist WHERE userName='$name'";
        $result=mysqli_query($conn,$sql_select);
        if(mysqli_num_rows($result)>0){
            backPage(" 你想和谁心灵相通？名字：". $name." ，已经被使用！ 请您换个更酷的名字吧！");
        }
        else{
            $sql_insert=" INSERT INTO userlist(userName ,passWord)  VALUES('$name','$pw')";
            if(mysqli_query($conn,$sql_insert)){
                backPage("注册成功 ，请稍等...正在离开荒芜人烟的星球!");
            }else{
                backPage("注册错误:".mysqli_error($conn));
            }
        }
        mysqli_close($conn);
     }
     function updata ($name,$pw){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbName="testzm" ;
    
            // 创建连接
            $conn = mysqli_connect($servername, $username, $password,$dbName);
            // 检测连接
            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }
            $sql_select="SELECT * FROM userlist WHERE userName='$name'";
            $result=mysqli_query($conn,$sql_select);
            if(mysqli_num_rows($result)>0){
                $sql_update="UPDATE userlist SET passWord='$pw' WHERE userName='$name' ";
                if(mysqli_query($conn,$sql_update)){
                    backPage("密码修改成功 ，请稍等...正在离开荒芜人烟的星球!");
                }else{
                    backPage("密码修改错误:".mysqli_error($conn));
                }

            }
            else{
                backPage(" 用户名". $name." ，不存在！ 您是不是想修改别人的账户啊？ 那可不中！");
            }
            mysqli_close($conn);
     }
     function backPage($tip){
         echo $tip;
         echo "<script>
                     setTimeout(function(){
                           history.go(-1);
                     },2600);
               </script>";
     }


      // for($i=0;$i<100;$i++)
    // {
    //     echo " <h1>hello world!!!!</h1>";
    // }

   // echo $name."</br>";

    // echo $pw;

    // name=&pw=&type=login

 
    //SQL 插入数据
    //  $uname="baobao";
    //  $upw="123";
    //  $sql_insert="
    //  INSERT INTO TESTTABLE(NAME ,PASSWORD)
    //  VALUES('$uname','$upw')
    //  ";
    //  $sql_update="
    //  UPDATE TESTTABLE 
    //  SET NAME='zm'
    //  WHERE ID='1'
    //  ";
    //  $sql_select="
    //  SELECT * FROM TESTTABLE
    //  ";
    //  $result=mysqli_query($conn,$sql_select);
    

    // 使用 sql 创建数据表
    // $sql_create_table= "CREATE TABLE TESTTABLE (
    //     ID INT(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    //     NAME VARCHAR(30) NOT NULL,
    //     PASSWORD VARCHAR(255) NOT NULL 
    //     )";
   
      
    //  if(mysqli_num_rows($result)>0){
    //     while($row=mysqli_fetch_assoc($result)){
    //        echo "id: " . $row["ID"]. " - Name: " . $row["NAME"]. " " . $row["PASSWORD"]. "<br>";
    //     }
    // }
     
    //  if(mysqli_query($conn,$sql_select)){
    //     echo "成功";
    //  }else{
    //      echo "错误".mysqli_error($conn);
    //  }
    
    ?>
</body>

</html>