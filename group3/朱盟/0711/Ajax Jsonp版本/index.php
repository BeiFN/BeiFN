<?php
    header('Access-Control-Allow-Origin:*'); 
    $p=@$_REQUEST["test"];
    $name=@$_REQUEST["name"];
    $pw=@$_REQUEST["pw"];
    echo  $p."  name:".$name."  pw:".$pw;
?>
