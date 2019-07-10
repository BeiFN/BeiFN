var gs = getComputedStyle;
// top广告top
+function () {
    let cls = document.getElementById('top_topClose');
    let close = () => {
        move(cls.parentElement.parentElement, 0, 'opacity', 6);
        setTimeout(function () {
            cls.parentElement.style.display = 'none';
        }, 300);
    }
    cls.addEventListener('click', close);
}();
// top搜索
+function () {
    let box = document.getElementById('top_search');
    window.addEventListener('scroll', biu);
    function biu() {
        let scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (scroll > 650) {
            move(box, 0, 'top', 2)
        } else {
            clearInterval(box.timer);
            box.style.top = '-50px';
        }
    }
}();
// 右侧菜单
+function () {
    let list = document.querySelectorAll('.rttantan');
    Array.from(list).forEach(itm => {
        itm.parentElement.addEventListener('mouseenter', show(itm));
        itm.parentElement.addEventListener('mouseleave', hiden(itm));
    })
    function show(itm) {
        return () => {
            move(itm, -60, 'left', 1);
            itm.style.background = '#c81623';
        }
    }
    function hiden(itm) {
        return () => {
            move(itm, 35, 'left', 1);
            itm.style.background = '#7a6e6e';
        }
    }
}();
// logo动图
+function () {
    let box = document.getElementById('logoGif'),
        txt = box.lastElementChild;
    let timer = null,
        mous = 0
    box.parentElement.addEventListener('mouseenter', show);
    box.parentElement.addEventListener('mouseleave', hiden);
    function show() {
        mous++;
        if (box.style.display == 'block') {
            return '';
        }
        let img = document.createElement('img');
        img.src = `./img/logo.gif?${Date.now()}`;
        Array.from(box.children).indexOf(img) === -1 ? '' : box.removeChild(img);
        box.appendChild(img);
        box.style.display = 'block';
        box.previousElementSibling.style.display = 'none';
        setTimeout(() => {
            txt.style.opacity = '1';
        }, 2500)
        box.addEventListener('mouse', function () {
        });
        timer = setTimeout(hiden(), 5000);
    }
    function hiden() {
        mous--;
        return () => {
            if (mous <= 0) {
                box.style.display = 'none';
                box.previousElementSibling.style.display = 'block';
                txt.style.opacity = '0';
            } else {
                box.addEventListener('mouseleave', function () {
                    box.style.display = 'none';
                    box.previousElementSibling.style.display = 'block';
                    txt.style.opacity = '0';
                });
            }


            // box.style.display = 'none';
            // box.previousElementSibling.style.display = 'block';
            // txt.style.opacity = '0';
            // if(e)  
        }
    }




    // <img src="./img/logo.gif" alt="">
    // <div id="logoTxt">
    //     <span class="logo_txt">省心家务工具</span>
    //     <span class="logo_see">去看看></span>
    // </div>




}();
// 左侧广告
+function () {
    let box = document.getElementById('ltbox'),
        img = box.lastElementChild;
    box.addEventListener('mouseenter', show);
    box.addEventListener('mouseleave', hiden);
    function show() {
        move(img, 790, 'width', 6);
    }
    function hiden() {
        move(img, 0, 'width', 6);
    }
}();
// 左侧导航菜单效果
+function () {
    let box = document.querySelector('.navLeft'),//大盒子
        listBox = box.lastElementChild,//内容盒子
        li = box.firstElementChild.children,//遥控器列表
        list = listBox.children;//内容列表

    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener('mouseenter', show(i));//鼠标在遥控器中时显示
        li[i].addEventListener('mouseleave', hiden(i));//离开
        list[i].addEventListener('mouseenter', show(i));//鼠标在内容中时显示
        list[i].addEventListener('mouseleave', hiden(i));//离开
    }
    function show(i) {//显示函数
        return function () {
            listBox.style.display = 'block';
            list[i].style.display = 'block';
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop -= parseInt(box.parentElement.offsetTop);//滚动条的值 -父级距离body的top值=>终点值
            scrollTop > 0 ? move(listBox, scrollTop, 'top', 1) : move(listBox, 0, 'top', 1);//运动
        }
    }
    function hiden(i) {//隐藏函数
        return function () {
            listBox.style.display = 'none';
            list[i].style.display = 'none';
        }
    }
}();
// 轮播图
+function () {
    const
        box = document.querySelector('.rotationChart'),
        btn = document.querySelector('.btn').children,//按钮列表
        imgList = document.querySelector('.imgList').children,//图片列表
        indexList = document.getElementById('indexList').children;//下标列表
    let index = 0,
        time = 3000,
        timer = null;
    timer = setInterval(nextPage, time);
    box.addEventListener('mouseenter', stop);
    box.addEventListener('mouseleave', start);
    btn[1].addEventListener('click', nextPage);
    btn[0].addEventListener('click', prevPage);
    let arr = [].slice.call(indexList);
    arr.forEach(function (ele, i) {
        ele.addEventListener('mouseenter', biuPage(i));
    });
    //停止播放
    function stop() {
        clearInterval(timer);
    }
    //开始播放
    function start() {
        timer = setInterval(nextPage, time);
    }
    // 下一张
    function nextPage() {
        indexList[index].className = '';
        move(imgList[index++], 0, 'opacity', 10);
        if (index === imgList.length) {
            index = 0
        }
        indexList[index].className = 'active';
        move(imgList[index], 100, 'opacity', 10);
    };
    // 上一张
    function prevPage() {
        indexList[index].className = '';
        move(imgList[index--], 0, 'opacity', 10);
        if (index === -1) {
            index = imgList.length - 1;
        }
        indexList[index].className = 'active';
        move(imgList[index], 100, 'opacity', 10);
    };
    // 坐标换图
    function biuPage(i) {
        return function () {
            move(imgList[index], 0, 'opacity', 10);
            indexList[index].className = '';
            index = i;
            indexList[index].className = 'active';
            move(imgList[index], 100, 'opacity', 10);
        }
    };
}();
// 倒计时
+function () {
    const mscdHr = document.getElementById('mscdHr'),//时span
        mscdMt = document.getElementById('mscdMt'),//分span
        mscdSd = document.getElementById('mscdSd');//秒span
    let time = new Date(2019, 7, 10, 12);
    showTime();
    setInterval(() => {
        showTime()
    }, 1000);
    function showTime() {
        let timeObj = countdown(time);
        mscdHr.innerHTML = timeObj.hour;
        mscdMt.innerHTML = timeObj.minute;
        mscdSd.innerHTML = timeObj.second;
    }
    function countdown(endtime) {
        if (!endtime) endtime = 0;
        if (typeof endtime === "object") endtime = endtime.getTime();
        var nowtime = Date.now();
        var remaining = Math.abs(endtime - nowtime) / 1000;
        var day = parseInt(remaining / 86400),
            hour = parseInt(remaining / 3600 % 24),
            minute = parseInt(remaining / 60 % 60),
            second = parseInt(remaining % 60);
        day = day < 10 ? "0" + day : "" + day;
        hour = hour < 10 ? "0" + hour : "" + hour;
        minute = minute < 10 ? "0" + minute : "" + minute;
        second = second < 10 ? "0" + second : "" + second;
        if (day < 0) {
            return { hour, minute, second }
        } else {
            return { day, hour, minute, second }
        }
    }


}();
// main_top banner轮播图
+function () {
    let box = document.getElementById('msbnImgList'),
        indexBox = document.getElementById('msbnIndexList'),
        indexList = Array.from(indexBox.children),
        imgList = box.children,
        index = 1,
        timer = setInterval(nextPage, 2000);

    indexList.forEach((itm, i) => {
        itm.addEventListener('mouseenter', indexPage(itm, i));
    })
    // 下一张
    function nextPage() {
        index++;
        if (index === imgList.length) {
            box.style.left = 0;
            index = 1;
        }
        indexList.forEach(itm => {
            itm.className = '';
        });
        indexList[index - 1].className = 'active';

        move(box, index * -180, 'left', 3);
    }
    // 坐标翻页
    function indexPage(itm, i) {
        return function () {
            clearInterval(timer);
            timer = setInterval(nextPage, 2000);
            index = i + 1;
            indexList.forEach(itm => {
                itm.className = '';
            });
            indexList[i].className = 'active';
            move(box, index * -180, 'left', 3);
        }
    }
    box.style.width = imgList.length * 100 + '%';


}();