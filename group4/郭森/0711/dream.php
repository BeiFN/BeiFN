<?php
    header("Content-Type:text/html;charset=utf-8;");

    $url = @$_GET["url"];
    $id=@$_GET["id"];
    $q = @$_GET["q"];
    $appkey = "98bb4859e7685d675e1b5238d5f15b2b";
    if($id){
        $req_data = array( "id" => $id , "key" => $appkey);
    }else{
        $req_data = array( "q" => $q , "key" => $appkey);
    };
    function send_post($url, $post_data) {
          $postdata = http_build_query($post_data);
          $options = array(
              'http' => array(
                  'method' => 'POST',
                  'header' => 'Content-type:application/x-www-form-urlencoded',
                  'content' => $postdata,
                  'timeout' => 15 * 60 // 超时时间（单位:s）
              )
          );
          $context = stream_context_create($options);
          $result = file_get_contents($url, false, $context);
          return $result;
    }
    
    echo send_post($url, $req_data );
?>