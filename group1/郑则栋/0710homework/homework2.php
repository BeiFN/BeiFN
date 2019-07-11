<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>regsiter</title>
</head>
<body>
    <form >
        <label for="">username</label> <input type="text" name="username" id="username"><br>
        <label for="">password</label>  <input type="password" name="password" id="password"><br>
        <button>login</button>
            
    </form> 
    <?php
    $username=@$_GET['username'];
    $password=@$_GET['password'];
    $localhost="localhost";
    $usernamesql='root';
    $passwordsql='';
    $conn=mysqli_connect($localhost,$usernamesql,$passwordsql);
    $query='use flower';
    mysqli_query($conn,$query);
    $query="select * from flowers where username='$username'";
    $res=mysqli_query($conn,$query);
    if(mysqli_num_rows($res)>0){
        die('your username is been used');
    }
    $query="insert into flowers (username,password) VALUES ('$username','$password')";
    mysqli_query($conn,$query);
    // mysqli_close($conn);

    



    
    ?>



</body>
</html>