// - 渲染页面;
// - 获取数据;
// - 拼接页面;

// 家居生活 - 美食菜谱 - 手工DIY - 时尚搭配 - 美妆造型 - 婚纱婚礼 - 文字句子 - 插画绘画 - 影音书籍 - 人物明星 - 搞笑萌宠 - 古风 - 壁纸 - 旅行 - 头像
let str = prompt("请输入图片加载风格：家居生活 - 美食菜谱 - 手工DIY - 时尚搭配 - 美妆造型 - 婚纱婚礼 - 文字句子 - 插画绘画 - 影音书籍 - 人物明星","古风");
// console.log(str);

// WaterFall类
class WaterFall{
    constructor(){
        this.init();
    }
    async init(){
        this.wrapper   = $(".wrapper");
        this.container = $(".container");
        // 一个新数组newArr
        this.newArr    = [];
        // 一排可以放几张图片
        this.count     = 0;
        // 确定一行有几张图片
        this.changeWidth();
        // 设置一个定时器
        let timer = null;
        // 当页面发生改变的时候
        $(window).on("resize",()=>{
            // this.changeWidth();
            // 触发频率太高，函数防抖，只会执行一次
            // console.log(1);
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.changeWidth();
                this.sort();
                timer = null;       //结束后把定时器清空
                // console.log(1);
            },300);
        });
        // 标识变量flag 默认为false;
        this.flag = false;
        // 获取当前body的高度
        this.cHeight   = document.documentElement.clientHeight;
        // 当页面发生滚动的时候
        $(window).on("scroll",async ()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(scrollTop);
            if(!this.flag && scrollTop + this.cHeight > this.minHeight - 500 ){
                // console.log(scrollTop,this.cHeight,this.minHeight);
                // 开始加载
                this.flag = true;
                let res = await new Load().init(this.next_start);
                this.next_start = Load.nextStart;
                // console.log(this.next_start);
                // this.changeWidth();
                this.render(res);
                this.sort();
                // console.log(res);
                // 加载结束时
                this.flag = false;
            }
        })
        // 当发生滚动时，加载页面
        // console.log(res);
        // 渲染页面
        // res 为列表
        let res = await new Load().init(0);
        this.next_start = Load.nextStart;
        // console.log(this.next_start);
        this.render(res);
        // 对图片进行排序
        this.sort();
    }
    // 确定一行中有几张图片
    changeWidth(){
        // 获取当前窗口的宽度
        let width = document.documentElement.clientWidth;
        // console.log(width);
        // 一行有多少张图片
        this.count = parseInt(width / 250);
        // 设置当前窗口的宽度
        // console.log(this.container[0]);
        this.container[0].style.width = this.count * 250 + "px";
    }
    // 对图片进行排序
    sort(){
        // 获取wrapper下的子元素
        let temp = this.wrapper[0].children;
        // console.log(temp)
        // 变成真数组，遍历
        Array.from(temp).forEach((item,index)=>{
            // console.log(item,index)
            if(index < this.count){
                // 获取当前的一行的个数,高度
                // console.log("one",item,index);
                // 初始状态，默认没有定位
                // item.style.position = "static";
                // console.log(item);
                this.newArr.push(item.offsetHeight);
            }else{
                // 获取当前数组的最小的高度以及下标
                let min = Math.min.apply(false,this.newArr);
                let minNum = this.newArr.indexOf(min);
                // console.log(min,minNum)
                // 设置div的位置，并且改变newArr的最小高度
                item.style.position = "absolute";
                item.style.left     = minNum * 250 + "px";
                item.style.top      = min + 15 + "px";
                this.newArr[minNum] += item.offsetHeight + 15;
            }
        });
            // 求出当前数组的最大值,并设置最大宽度
            let max = Math.max.apply(false,this.newArr);
            let min = Math.min.apply(false,this.newArr);
            // 当前数组的最小高度 = min
            this.minHeight = min;
            // console.log(min);
            this.container[0].style.height = max + "px";
            // 每次结束后，把数组清空
            this.newArr.length = 0;
        
    };
    // 渲染页面
    render (res){
        let html = "";
        // let tiele = Load.title;console.log(title)
        for (let i = 0; i < res.length; i++) {
            // 获取每一个的高度height
            let height = parseInt((235/res[i].photo.width) * res[i].photo.height);
            // console.log(height);
            html += `
                    <div class="box">
                        <div class="box-img" style=height:${height}px>
                            <img src="${res[i].photo.path}"alt=""> 
                            <u style=height:${height}px></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">${res[i].msg}</div>
                        </div>
                    </div>
                        `
        };
        // console.log(html);
        this.wrapper[0].innerHTML += html;
    }
}

// Load类
class Load{
    constructor(){
        // this.init();
    }
    async init(start){
        // await 为一个表达式，后面为async的返回值
        let url  = "http://localhost/dt";
        let data = {
            // 字段
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            // 家居生活 - 美食菜谱 - 手工DIY - 时尚搭配 - 美妆造型 - 婚纱婚礼 - 文字句子 - 插画绘画 - 影音书籍 - 人物明星 - 搞笑萌宠 - 古风 - 壁纸 - 旅行 - 头像
            filter_id      : str ? str : "古风",
            start          : start,
            _              : Date.now(),
        }
        // 返回一个列表
        let res = await $.ajax(url,{data : data,dataType : "json"});
        // this.title = data.filter_id;
        // console.log(res.data.object_list);
        Load.nextStart = res.data.next_start;
        // Load.nextStart = res.data.next_start;
        return res.data.object_list;
        // return console.log(res);
        // ajax(url,{data : data}).then(res=>{console.log(res)});
    }
    // 下一次开始加载的下标
    static nextStart = 0;
}

new WaterFall();
