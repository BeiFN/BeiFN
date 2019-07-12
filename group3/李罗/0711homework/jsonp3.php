<?php
    $cbname = $_GET['callback'];
    $data ="hello world,i am mr.W";
    echo "$cbname('$data')";
?>