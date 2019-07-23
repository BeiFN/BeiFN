
    <!-- foo("hello world"); -->
    <?php
        // echo "foo('hello world')";
        // $cbname = $_GET['callback'];
    //     $cbname = $_GET['callback'];
    //     // 这里的cbname不就是callback的value ssss吗 我搁那迷啥了
    //     $data   = 'hello world';
    //    echo "$cbname('$data')"
            //获取函数名
            $cbname = $_GET['callback'];
            //进行数据操作
            $data = "尼玛炸了";
            //将得到的结果返回
            echo "$cbname('$data')" ;
    ?>
