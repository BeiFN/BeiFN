+function () {
    //bigBox 大div  
    //box  ul列表   
    //left right 按钮
    //innerLi
    var bigBox = document.querySelector('.rotationChart');
    var box = document.getElementById('box');
    var left = document.getElementById('PageTurningl');
    var right = document.getElementById('PageTurningr');
    var li = box.children,
        timer = null,
        index = 0;
    box.style.width = li.length * 100 + '%';//ul宽度    
    timer = setInterval(next, 2500);
    //按钮特效 
    bigBox.addEventListener('mouseover', show);
    bigBox.addEventListener('mouseout', hidden);
    left.addEventListener('mouseover', yellow);
    right.addEventListener('mouseover', yellow);
    left.addEventListener('mouseout', white);
    right.addEventListener('mouseout', white);
    //按钮功能
    left.addEventListener('click', prevPage);
    right.addEventListener('click', nextPage);
    //手动下一页
    function nextPage() {
        clearInterval(timer);
        timer = setInterval(nextPage, 2500);
        if (index === li.length - 1) {
            index = 0;
            box.style.left = 0;
        }
        index++;
        move(box, -index * 1130, 'left');
    }
    //手动上一页
    function prevPage() {
        clearInterval(timer);
        timer = setInterval(nextPage, 2500);
        if (index === 0) {
            index = li.length - 1;
            box.style.left = -index * 1130 + 'px';
        }
        index--;
        move(box, -index * 1130, 'left');
    }
    //自动下一页
    function next() {
        if (index === li.length - 1) {
            index = 0;
            box.style.left = 0;
        }
        index++;
        move(box, -index * 1130, 'left');
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
}()
+function () {
        var divList = document.querySelector('.list');
        var data = [
            {
                img: 'https://img.zcool.cn/community/031b7a45cfa9083a801205e4b676fcc.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/0163445cff9572a801205e4b36e196.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/01bb445cf47581a801213ec27ba950.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/0100f45cf21531a801205e4bd4c8a8.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/016a3d5cee37eda801209aa0cd8bc0.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/01ce2b5ceb488ea80121a47094e21e.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/01237e5ce26088a8012141688adcb9.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '绽影像之《轻叹》',
                h6: '摄影-静物',
                zan1: '204',
                zan2: '4',
                zan3: '20',
                authorImg: 'images/author01.jpg',
                authorId: '陈绽',
                timer: '1天前',
            },
            {
                img: 'https://img.zcool.cn/community/0118265cff997ca801205e4b32565b.jpg@260w_195h_1c_1e_1o_100sh.jpg',
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
                img: 'https://img.zcool.cn/community/01ea6f5d006e11a801205e4b95f38c.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: 'Apsaras Orchestra',
                h6: '插画-概念设定',
                zan1: '2.0万',
                zan2: '86',
                zan3: '1061',
                authorImg: 'images/author03.jpg',
                authorId: '草木虫',
                timer: '3天前',
            },
            {
                img: 'https://img.zcool.cn/community/01cd515cfbb30ea801213ec2829d9d.jpg@260w_195h_1c_1e_1o_100sh.jpg',
                h5: '少年锦时二',
                h6: '插画-商业插画',
                zan1: '98',
                zan2: '4',
                zan3: '19',
                authorImg: 'images/author04.jpg',
                authorId: '阳月',
                timer: '6小时前',
            },
        ];

        //div
        for (var i = 0; i < 40; i++) {
            var box = document.createElement('div');
            i % 5 === 4 ? box.className = 'last' : '';
            +function () {
                var index = i>data.length-1?0:i;
                box.appendChild(creatImg(index,data));
                box.appendChild(creatCtt(index,data));
                box.appendChild(creatAth(index,data));
                divList.appendChild(box);
            }()
        }
        // 图片
        function creatImg(index,data) {
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
        // 内容
        function creatCtt(index,data) {
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
            second.innerHTML =data[index].zan2;
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
        // 作者
        function creatAth(index,data) {
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
    }()