//轮播图rotationChart
//翻页Page turning
// PageTurning
//innerLi

+function () {
    var bigBox = document.querySelector('.rotationChart');
    var box = document.getElementById('box');
    var left = document.getElementById('PageTurningl');
    var right = document.getElementById('PageTurningr');
    var li = box.children,
        timer = null,
        index = 0;

    timer = setInterval(play, 3000);
    bigBox.addEventListener('mouseover', show);
    bigBox.addEventListener('mouseout', hidden);
    left.addEventListener ('mouseover',yellow);
    left.addEventListener ('mouseout',white);
    right.addEventListener ('mouseover',yellow);
    right.addEventListener ('mouseout',white);
    left.addEventListener('click',PageTurningl);
    right.addEventListener('click',PageTurningr);
    
    //向左翻页
    function PageTurningl(){
        clearInterval(timer);
        for (var i = 0; i < li.length; i++) {
            li[i].className = '';
        }
        index<=0?index=li.length:'';
        li[--index].className = 'innerLi';
        timer = setInterval(play, 3000);
    }
    //向右翻页
    function PageTurningr(){
        clearInterval(timer);
        for (var i = 0; i < li.length; i++) {
            li[i].className = '';
        }
        index>=li.length-1?index=-1:'';
        li[++index].className = 'innerLi';
        timer = setInterval(play, 3000);
    }
    //字体变黄
    function yellow(){
        this.style.color='#cc0';
    }
    //字体变白
    function white(){
        this.style.color='#fff';
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
    //轮播图滚动播放
    function play() {
        for (var i = 0; i < li.length; i++) {
            li[i].className = '';
        }
        index>=li.length-1? index = -1: '';
        li[++index].className = 'innerLi';
    }
}()
