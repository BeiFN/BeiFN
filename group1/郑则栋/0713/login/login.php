<?php
    $username=$_GET['username'];
    $password=$_GET['password'];
    if(!$username||!$password){
        $arr=array('state'=>'0','static'=>'0');
        die(json_encode($arr));
    }

    $localhost='localhost';
    $username_sql='root';
    $password_sql='root';
    $conn=mysqli_connect($localhost,$username_sql,$password_sql);
    if(!$conn){
        $arr=array('state'=>'0','static'=>'1');
        die(json_encode($arr));
    }
    $query='use flower';
    mysqli_query($conn,$query);
    $query="select * from flowers where username='$username'";
    $res=mysqli_query($conn,$query);
    if(mysqli_num_rows($res)===0){
        $arr=array('state'=>'0','static'=>'2');
        die(json_encode($arr));
    }
    while($row=mysqli_fetch_array($res)){
        if($row['password']===$password){
            setcookie('username',$username,time()+3600);
            $arr=array('state'=>'1','static'=>'5');
            die(json_encode($arr));
        }
        else{
            $arr=array('state'=>'1','static'=>'3');
            die(json_encode($arr));
        }
    }






    $arr=array('state'=>'0','static'=>'4');
    die(json_encode($rarr));
?>