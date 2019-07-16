// - 渲染页面;
// - 获取数据;
// - 拼接页面;

let { ajax , $ , on } = Utils;

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
        // res 为列表
        let res = await new Load().init();
        // 确定一行有几张图片
        this.changeWidth();
        // 设置一个定时器
        let timer = null;
        on(window,"resize",()=>{
            // this.changeWidth();
            // 触发频率太高，函数防抖，只会执行一次
            // console.log(1);
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.changeWidth();
                timer = null;       //结束后把定时器清空
                // console.log(1);
            },300);
        });
        // console.log(res);
        // 渲染页面
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
        this.container.style.width = this.count * 250 + "px";
    }
    // 对图片进行排序
    sort(){
        // 获取wrapper下的子元素
        let temp = this.wrapper.children;
        // console.log(temp)
        // 变成真数组，遍历
        Array.from(temp).forEach((item,index)=>{
            // console.log(item,index)
            if(index < this.count){
                // 获取当前的一行的个数,高度
                // console.log("one",item,index);
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
            // 求出当前数组的最大值,并设置最大宽度
            let max = Math.max.apply(false,this.newArr);
            this.container.style.height = max + "px";
        });
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
        this.wrapper.innerHTML = html;
    }
}

// Load类
class Load{
    constructor(){
        this.init();
    }
    async init(){
        // await 为一个表达式，后面为async的返回值
        let url  = "http://localhost/dt";
        let data = {
            // 字段
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            // 家居生活 - 美食菜谱 - 手工DIY - 时尚搭配 - 美妆造型 - 婚纱婚礼 - 文字句子 - 插画绘画 - 影音书籍 - 人物明星 - 搞笑萌宠 - 古风 - 壁纸 - 旅行 - 头像
            filter_id      : "家居生活",
            start          : 10,
            _              : Date.now(),
        }
        // 返回一个列表
        let res = await ajax(url,{data : data,dataType : "json"});
        // this.title = data.filter_id;
        // console.log(res.data.object_list);
        return res.data.object_list;
        // return console.log(res);
        // ajax(url,{data : data}).then(res=>{console.log(res)});
    }
}

new WaterFall();
