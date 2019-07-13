<?php

header("Content-Type:text/html;charset=utf-8;");

$url = "http://apis.juhe.cn/simpleWeather/query";
$city = $_GET["city"];
$appkey = "57f2239d4708ecdc903dd518c0262076";

$req_data = array( "city" => $city , "key" => $appkey);

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