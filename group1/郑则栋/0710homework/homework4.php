<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>login</title>
</head>

<body>
    <form>
        <label for="">username</label> <input type="text" name="username" id="username"><br>
        <label for="">password</label> <input type="password" name="password" id="password"><br>
        <button>login</button>

    </form>


    <?php
    $username = @$_GET['username'];
    $password = @$_GET['password'];
    $localhost = 'localhost';
    $usernamesql = 'root';
    $passwordaql = '';
    $conn = mysqli_connect($localhost, $usernamesql, $passwordaql);
    $query = 'use flower';
    mysqli_query($conn, $query);
    $query = 'select * from flowers';
    $res = mysqli_query($conn, $query);
    while ($row = mysqli_fetch_array($res)) {
        if ($row['username'] == $username) {
            if ($row['password'] === $password) {
               die( 'login in !!');
            } else {
                die ('your password is not true,please try again');
            }
        } 
       

    }
    mysqli_close($conn);



    ?>
</body>

</html>