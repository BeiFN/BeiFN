<?php
    header("Content-type:text/html;charset=utf-8");
    // $username=@$_GET["username"];
    // $password=@$_GET["password"];
    // if($username==="dengxiu" && $password==="980703"){
    //     echo "<script>
    //         location.href=\"https://www.baidu.com\";
    //     </script>";
    // }
    // else{
    //     echo "账号或密码错误";
    //     echo "<script>
    //         setTimeout(function(){
    //             history.go(-1);
    //         },2000);
    //     </script>";
    // }

    // $usr=@$_GET["username"];
    // $pwd=@$_GET["password"];
    // if(!$usr||!$pwd){
    //     die("");
    // }
    // $servername="localhost";
    // $username="root";
    // $password="root";
    // $dbname="gp12";
    // $conn=mysqli_connect($servername,$username,$password,$dbname);
    // if(!$conn){
    //     #停止执行代码
    //     die("Connection failed: ".mysqli_connect_error());
    // }
    // // else    echo "链接成功";
    // $sql_select="SELECT * FROM GPUSERLIST WHERE username='$usr'";
    // $col=mysqli_query($conn,$sql_select);
    // if($col){
    //     echo "语法正确</br>";
    //     // if(mysqli_num_rows($col)>0){
    //     //     die("用户名重名</br>");
    //     // }

    //     $count=0;
    //     while($row=mysqli_fetch_assoc($col)){
    //         echo json_encode($row)."</br>";
    //         // echo var_dump($row);
    //         // echo $row["username"]."</br>";
    //         $count++;
    //     }
    //     if($count>0){
    //         die("用户名重名</br>");
    //     }
    // }
    // else{
    //     die("Error select userdata: ".mysqli_error($conn));
    // }
    // $pwd=md5($pwd);
    // $sql_insert="INSERT INTO GPUSERLIST(username,password) VALUES('$usr','$pwd');";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "用户注册成功";
    // }
    // else{
    //     echo "Error insert userdata: ".mysqli_error($conn);
    // }

    // 创建一个表;
    // $sql_create_table = "CREATE TABLE GPTEST (
    //     username varchar(255) not null,
    //     id int(5) not null auto_increment,
    //     PRIMARY KEY (id)
    // );";
    // if(mysqli_query($conn,$sql_create_table)){
    //     echo "成功";
    // }
    // else{
    //     echo mysqli_error($conn);
    // }

    //增;
    // $sql_insert = "INSERT INTO GPTEST(
    //     username 
    // )  VALUES
    // (
    //     'hello world'
    // );
    // ";
    // if(mysqli_query($conn,$sql_insert)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    //删除 ;
    // $sql_delete = "DELETE FROM GPTEST WHERE username='hello world'";
    // if(mysqli_query($conn,$sql_delete)){
    //     echo "成功";
    // }else{
    //     echo mysqli_error($conn);
    // };

    // $sql_select = "SELECT username FROM gptest";
    // if($result = mysqli_query($conn,$sql_select)){
    //     // 查看存在多少条数据;
    //     // 拿出每一条数据;
    //     while($row = mysqli_fetch_assoc($result)){
    //         echo json_encode($row)."</br>";
    //     }
    // }else{
    //     echo mysqli_error($conn);
    // };

    // mysqli_close($conn);
?>