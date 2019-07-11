<?php
    $caname = $_GET['callback'];
    $data = "hello world";
    echo "$caname('$data')";
?> 