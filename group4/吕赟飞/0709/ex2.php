<?php
    $usr = @$_GET["username"];
    $pwd = @$_GET["password"];

    if(!$usr || !$pwd){
        die("");
    }

    $servername = "localhost:3306";
    $username = "root";
    $password = "root";
    $dbname = "gp12";

    $conn = mysqli_connect($servername,$username,$password,$dbname);

    if(!$conn){
        die("Connection failed: " . mysqli_connect_error())
    }


    $sql_select = "SELECT * FROM GPUSERLIST WHERE username = '$usr'";

    $col = mysqli_query($conn , $sql_select);

    if($col){
        if(mysqli_num_rows($col)>0){
            die("has already existed")
        }
    }else{
        die("error select data:" . mysqli_connect_error());
    }


    $pwd  = md5($pwd);
    $sql_insert = "INSERT INTO GPUSERLIST(
        username , password
    ) VALUES (
        '$usr' , '$pwd'
    )";

    if(mysqli_query($conn , $sql_insert)){
        echo "success";
    }else{
        echo "Error insert data:". mysqli_connect_error();
    }

    mysqli_close($conn);
?>