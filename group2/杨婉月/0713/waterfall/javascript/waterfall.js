let {ajax, $, on} = Utils;
class Waterfall{
    constructor(){
    }
    //初始化
    async init(getData={url,data, dataType}){
        //获取容器
        this.container = $(".container");
        this.wrapper = $(".wrapper");
        //获取url
        this.url = getData.url;
        //获取url参数
        this.data = getData.data;
        this.dataType = getData.dataType;
        //总列数
        this.count = 0;
        //获取窗口宽度
        this.changeContainerWidth();
        //创建一个数组用来存放每行图片的高度
        this.heightArray = [];
        //函数防抖
        let timer = null;
        on(window, "resize", ()=>{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.changeContainerWidth();
                timer = null;
            }, 500)
        });

        //获取数据
        let res = await this.loadData();
        let list = res.data.object_list;
        console.log(list);
        //渲染页面
        this.render(list);
        //图片位置排列
        this.sort();
    }
    changeContainerWidth(){
        //通过当前窗口宽度得当总列数
        let cWidth = document.documentElement.clientWidth;
        this.count = parseInt(cWidth/250);
        //将当前container的宽度设为总列数*（图片宽度+水平间隙）
        this.container.style.width = this.count * 250 + "px";
    }

    //获取数据
    async loadData(){
        let res = await ajax(this.url, {data: this.data, dataType : this.dataType});
        return res;
    }
    render(list){
        let data = list;
        let template = $("#template").innerHTML;
        let html = ejs.render(template, {data: data});
        console.log(html);
        this.wrapper.innerHTML = html; 
    }
    sort(){
        //获取到所有的图片
        let children = this.wrapper.children;
        //遍历所有的图片
        //分两种情况： 第一行
                    //其他
        Array.from(children).forEach( (box , index) => {
              //当前图片的下标小于总列数的便是第一行的
              if(index < this.count){
                    //将所有的图片高度放入之前创建的数组中
                    this.heightArray.push(box.offsetHeight);
              }else{
                    // 找到数组之中最小的那一个
                    //Math.min.apply(null, arr) => 可用来求一个数组中的最小值！！！！
                    let min = Math.min.apply(null, this.heightArray);
                    //求出当前数组中最小值的下标
                    let minIndex = this.heightArray.indexOf(min);
                    console.log(min, minIndex);
                    //将当前遍历到的图片放在最小上一行中最小高度图片的下方
                    box.style.position = "absolute";
                    //left值是上一行中最小高度图片的left：
                    box.style.left     = minIndex * 250 + "px";
                    //top值为上一行中最小高度图片的top+最小图片高度+垂直间隙
                    box.style.top      = min + 20 + "px";

                    this.heightArray[minIndex] += box.offsetHeight + 20;
              }
        })

        let maxHeight = Math.max.apply(null , this.heightArray);

        this.container.style.height = maxHeight + "px";
        console.log(this.heightArray);
  }
}

new Waterfall().init({url : "http://localhost/dt", data : {
    include_fields : "top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count",
    filter_id : "旅行",
    start: 0
}, dataType: "json"});