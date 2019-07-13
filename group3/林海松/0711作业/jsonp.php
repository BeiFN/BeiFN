<?php
    $cbName = $_GET["jsonpCallback"];
    $data = "hello world";
    echo "$cbName('$data')";
    // echo "111";
?>