<?php
  $cbname = $_GET['callback'];
  $data = "hello world";
  echo "$cbname('$data')";
?>