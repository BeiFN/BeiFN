<!-- <?php
     echo "foo('hello world i\'m php')";
?> -->

<!-- <?php
      $data = "hello world";
      echo "callback('$data')";
?> -->

<?php
      $cbname = $_GET['gfname'];
      $data = "hello world";
      echo "$cbname('$data')";
?>