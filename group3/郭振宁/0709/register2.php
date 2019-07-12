<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost/0709/register2.php">
        <input type="text" name="username">
        <input type="text" name="password">
        <button>提交</button>
    </form>


    <?php
        // for($i = 0; $i < 100; $i++) {
        //     echo "php是世界上最好的语言</br>";
        // }
        // function writeMsg() {
        //     print "hello world";
        // }
        // writeMsg();
        $user = $_GET["username"];
        $pass = $_GET["password"];

        if(!$user || !$pass) {
            die("");
        }
        $severname = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "GP12";
        


        $conn = mysqli_connect($severname , $username , $password , $dbname);
        
        if(!$conn) {
            die("连接失败：".$conn->connect_error);
        }
        echo "连接成功";
        // $sql_select = "SELECT * FROM GPUSERLIST WHERE username = '$user'";
        // $col = mysqli_query($conn , $sql_select);

        // if($col) {
        //     echo "语法没错";
        //     if(mysqli_num_rows($col) > 0) {
        //         die("用户名重名");
        //     }
        // }else {
        //     die("Error select userdate:" . mysqli_error($conn));
        // }

        // $pass = md5($pass);
        
        // $sql_insert = "INSERT INTO GPUSERLIST (username , password) VALUES ('$user' , '$pass')";

        $sql_select = "SELECT username FROM GPUSERLIST";

        if($result = mysqli_query($conn , $sql_select)) {
            echo "hahah";
            while($row = mysqli_fetch_assoc($result)) {
                echo json_encode($row);
            }
        }else {
            mysqli_error($conn);
        }
        // if(mysqli_query($conn , $sql_insert)){
        //     echo "用户注册成功";
        // }else {
        //     echo "Error insert userdate:".mysqli_error($conn);
        // }

        mysqli_close($conn);
        // if (mysqli_query($conn, $sql_insert)) {
        //     echo "用户注册成功";
        // } else {
        //         echo "Error insert userdata: " . mysqli_error($conn);
        // }
        // $user = $_GET["username"];
        // $pass = $_GET["password"];

        // $severname = "localhost";
        // $username = "root";
        // $password = "root";
        // $dbname = "GP12";
        // echo $_GET["username"] , $_GET["password"];

        // $conn = mysqli_connect($severname,$username,$password,$dbname);

        // // $sql = "insert into GPUSERLIST values($user,$pass)";
        // // $conn->query($sql);
        // // echo var_dump($conn);
        // if ($conn->connect_error) {
        //     die("连接失败: " . $conn->connect_error);
        // } 
        // echo "连接成功";

        // // $sql = "INSERT INTO GPUSERLIST (username , password)VALUES('$user' , '$pass')";
        // $sql = "SELECT * FROM GPUSERLIST";
        // // if (mysqli_query($conn, $sql)) {
        // //     echo "新记录插入成功";
        // // } else {
        // //     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        // // }

        // echo var_dump(mysqli_query($conn , $sql));
        
    ?>
</body>
</html>
