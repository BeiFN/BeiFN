<?php
header("Content-type:text/html;charset=utf-8;");
$users = @$_GET["username"];//[][][][][][][][][][][][][][][][]
$pasds = @$_GET["password"];//@ 飞空也可
$rename = @$_GET["rename"];
$repass = @$_GET["repass"];
$del=@$_GET["namex"];
$loo=@$_GET['loo'];
// if(!$users|| !$pasds||!$rename||!$repass ){
//     die("哈哈哈");
// }

$server = "localhost:3306";
$username = "root";
$password = "root";
$sqls = "gp12121";
$conn = mysqli_connect($server,$username,$password,$sqls);
if(!$conn){
    die("errorconn" . mysqli_connect_error());
};
      if($rename){$sql_update = "UPDATE USERTABLE SET password='$repass' WHERE username='$rename'";
      if(mysqli_query($conn,$sql_update)){
            echo "成功";
      }else{
            echo mysqli_error($conn);
      };};
    
      //

if($users){
$selecttab = "SELECT * FROM USERTABLE WHERE USERNAME='$users'";
$cl =mysqli_query($conn,$selecttab);
if($cl){
    if(mysqli_num_rows($cl) > 0){
        die("用户名重名");}
}else{      
    die("Error select userdata: " . mysqli_error($conn));
};
$insertsql = "INSERT INTO USERTABLE (
    username , password
)VALUES('$users','$pasds')
;";
if(mysqli_query($conn,$insertsql))
{
    echo "success";
}else{
    echo "filesure".mysqli_error($conn);

};
};
if($del){$sql_delete = "DELETE FROM USERTABLE WHERE username='$del'";
      if(mysqli_query($conn,$sql_delete)){
            echo "成功";
      }else{
            echo mysqli_error($conn);
      };};
      if($loo){
          $sql_select = "SELECT username FROM USERTABLE";
        if($result = mysqli_query($conn,$sql_select)){
            // 查看存在多少条数据;
            // echo mysqli_num_rows($result);

            // $row = mysqli_fetch_assoc($result);
            // $row = mysqli_fetch_assoc($result);
            // echo var_dump($row);

            // 拿出每一条数据;
            while($row = mysqli_fetch_assoc($result)){
                  echo json_encode($row);
            };

      }else{
            echo mysqli_error($conn);
      };
      }



// $sql_select = "SELECT username FROM gptest";

// if($result = mysqli_query($conn,$sql_select)){
//       // 查看存在多少条数据;
//       // echo mysqli_num_rows($result);

//       // $row = mysqli_fetch_assoc($result);
//       // $row = mysqli_fetch_assoc($result);
//       // echo var_dump($row);

//       // 拿出每一条数据;
//       while($row = mysqli_fetch_assoc($result)){
//             echo json_encode($row);
//       }

// }else{
//       echo mysqli_error($conn);
// };

mysqli_close($conn);
?>