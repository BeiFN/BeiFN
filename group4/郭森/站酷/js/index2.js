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
// 创建内容************************************************************
+ function () {
    // 大盒子
    var divList = document.querySelector('.list');
    // 数据
    var data = [//图片 标题 类型 浏览 评论 赞 作者头像 作者名 时间 
        {
            img: 'images/list01.jpg',
            h5: '三国群英绘',
            h6: '插画-插画习作',
            zan1: '1.2万',
            zan2: '100',
            zan3: '700',
            authorImg: 'images/author01.jpg',
            authorId: '夜行人',
            timer: '5天前',
        },
        {
            img: 'images/list02.jpg',
            h5: '以风为舞',
            h6: '摄影-人像',
            zan1: '3774',
            zan2: '13',
            zan3: '201',
            authorImg: 'images/author02.jpg',
            authorId: '无限TX',
            timer: '1天前',
        },
        {
            img: 'images/list03.jpg',
            h5: '不一样的“西游记”',
            h6: '动漫-短篇/四格漫画',
            zan1: '2.0万',
            zan2: '86',
            zan3: '1061',
            authorImg: 'images/author03.jpg',
            authorId: '草木虫',
            timer: '3天前',
        },
        {
            img: 'images/list04.jpg',
            h5: '北极有多美？',
            h6: '摄影-风光',
            zan1: '8112',
            zan2: '40',
            zan3: '596',
            authorImg: 'images/author04.jpg',
            authorId: 'thomas看看世界',
            timer: '3天前',
        },
        {
            img: 'images/list05.jpg',
            h5: '实验绘本《窗》',
            h6: '插画-绘本',
            zan1: '8592',
            zan2: '35',
            zan3: '467',
            authorImg: 'images/author05.jpg',
            authorId: '刘昆昆',
            timer: '4天前',
        },
        {
            img: 'images/list06.jpg',
            h5: '皇室战争-高校邀请赛KV&赛事LOGO',
            h6: '平面-宣传品',
            zan1: '1.2万',
            zan2: '31',
            zan3: '455',
            authorImg: 'images/author06.jpg',
            authorId: '伟培',
            timer: '4天前',
        },
        {
            img: 'images/list07.jpg',
            h5: '波普土酷版《乡村爱情11》预告片',
            h6: '影视-宣传片',
            zan1: '3.7万',
            zan2: '122',
            zan3: '1457',
            authorImg: 'images/author07.jpg',
            authorId: '青芥制作蟹老板',
            timer: '10天前',
        },
    ];
    //创造div
    for (var i = 0; i < 40; i++) {
        var box = document.createElement('div');
        i % 5 === 4 ? box.className = 'last' : '';
        +function () {//创造div中元素
            var index = i < data.length ? i : i % 7;
            box.appendChild(creatImg(index, data));
            box.appendChild(creatCtt(index, data));
            box.appendChild(creatAth(index, data));
            divList.appendChild(box);
        }()
    }
    // 创造图片
    function creatImg(index, data) {
        var images = document.createElement('div'),
            a = document.createElement('a'),
            img = document.createElement('img');
        img.src = data[index].img;
        a.href = '#';
        images.className = 'images';
        a.appendChild(img);
        images.appendChild(a);
        return images;
    }
    // 创造内容
    function creatCtt(index, data) {
        var content = document.createElement('div');
        h5 = document.createElement('h5'),
            a = document.createElement('a'),
            h6 = document.createElement('h6'),
            first = document.createElement('span'),
            second = document.createElement('span'),
            last = document.createElement('span');
        a.innerHTML = data[index].h5;
        h6.innerHTML = data[index].h6;
        first.innerHTML = data[index].zan1;
        second.innerHTML = data[index].zan2;
        last.innerHTML = data[index].zan3;
        a.href = '#';
        content.className = 'content';
        first.className = 'first';
        second.className = 'second';
        last.className = 'last';
        h5.appendChild(a);
        content.append(h5);
        content.append(h6);
        content.append(first);
        content.append(second);
        content.append(last);
        return content;
    }
    // 创造作者
    function creatAth(index, data) {
        var author = document.createElement('div');
        a = document.createElement('a'),
            img = document.createElement('img'),
            em = document.createElement('em'),
            span = document.createElement('span');
        em.innerHTML = data[index].authorId;
        span.innerHTML = data[index].timer;
        img.src = data[index].authorImg;
        a.href = '#';
        author.className = 'author';
        a.appendChild(img);
        a.appendChild(em);
        author.appendChild(a);
        author.appendChild(span);
        return author;
    }
}();