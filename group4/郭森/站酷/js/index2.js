// 轮播图************************************************************
+function () {
    //bigBox        大div  
    //box           ul列表   
    //left right    按钮
    //li            图片
    var bigBox = document.querySelector('.rotationChart');
    var box = document.getElementById('box');
    var left = document.getElementById('PageTurningl');
    var right = document.getElementById('PageTurningr');
    var li = box.children,
        timer = null,
        index = 0;
    box.style.width = li.length * 100 + '%';//ul宽度    
    start();//自动播放
    
    // 鼠标进入轮播图特效
    bigBox.addEventListener('mouseover', show);
    bigBox.addEventListener('mouseout', hidden);
    bigBox.addEventListener('mouseover', stop);
    bigBox.addEventListener('mouseout', start);
    //按钮特效 
    left.addEventListener('mouseover', yellow);
    right.addEventListener('mouseover', yellow);
    left.addEventListener('mouseout', white);
    right.addEventListener('mouseout', white);
    //按钮翻页功能
    left.addEventListener('click', prevPage);
    right.addEventListener('click', nextPage);
     //停止播放
     function stop(){
        clearInterval(timer);
    }
     //开始播放
     function start(){
        timer = setInterval(nextPage, 2500);
    }
    //下一页
    function nextPage() {
        if (index === li.length - 1) {
            index = 0;
            box.style.left = 0;
        }
        index++;
        move(box,{ 'left':-index * 1130, });
    }
    //上一页
    function prevPage() {
        if (index === 0) {
            index = li.length - 1;
            box.style.left = -index * 1130 + 'px';
        }
        index--;
        move(box, { 'left':-index * 1130, });
    }
    //字体变黄
    function yellow() {
        this.style.color = '#cc0';
    }
    //字体变白
    function white() {
        this.style.color = '#fff';
    }
    //隐藏翻页按钮
    function hidden() {
        left.style.display = 'none';
        right.style.display = 'none';
    }
    //显示翻页按钮
    function show() {
        left.style.display = 'block';
        right.style.display = 'block';
    }
}();
