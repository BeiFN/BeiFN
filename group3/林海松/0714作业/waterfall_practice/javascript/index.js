//1、 获取数据、渲染页面
//2、 分组  页面宽度
let {ajax , $ , on} = Utils;
class Sault{
    constructor(){
        this.init();
    }
    async init(){
        this.wrapper   = $(".wrapper");
        this.container = $(".container");
        this.timer     = null;
        // console.log(this.count);
        let count = this.onChangeWindowSize();
        on(window , "resize" , ()=>{
            clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                let count = this.onChangeWindowSize();
                this.splice(count);
                this.timer = null;
            },300);
        });
        this.res       = await new GetData().init();
        this.render();
        this.splice(count);
    }
    //改变窗口大小尺寸
    onChangeWindowSize(){
        let clientW = document.documentElement.clientWidth;
        let count  = parseInt(clientW / 250)//(parseInt(clientW / 250) > 4) ? 4 : parseInt(clientW / 250);
        this.container.style.width = count * 250 + "px";  
        return count ;
    }
    render(){//按比例大小排放
        let html     = "";
        for(var i = 0 , item ; item = this.res[i] ; i++){
            let proportionH = parseInt( 235 / item.photo.width * item.photo.height ); //固定的宽度
            html += `<div class="box">
                        <div class="box-img" style="height:${proportionH}px">
                            <img src="${item.photo.path}" alt="">
                            <u style="height:${proportionH}px"></u>
                        </div>
                        <div class="box-detail">
                            <div class="title">
                                ${item.msg}
                            </div>
                        </div>
                    </div>`
        }
        this.wrapper.innerHTML = html;
    }
    //拼接，将图片放到最短列中,实现效果
    splice(num){
        let children = this.wrapper.children;
        let HArray   = [];
        // console.log(this.count);
        Array.from(children).forEach( (box , index)=>{
            if(index  < num){
                // console.log("第一排",box);
                HArray.push(box.offsetHeight);
                //给第一排确定位置
                box.style.top = 0 ;
                box.style.left = index * 250 + "px" ;
            }
            else{
                let min = Math.min.apply(false,HArray);//获取数组中最小的值
                let min_index = HArray.indexOf(min);
                box.style.position = "absolute";
                box.style.left     = min_index * 250 + "px" ;
                box.style.top      = min + 20 + "px" ;
                HArray[min_index]  += box.offsetHeight + 20 ; 
            }
            let maxHeight = Math.max.apply(false,HArray);
            this.container.style.height = maxHeight + "px" ;
        })
    }
}
class GetData{
    constructor(){
        this.init();
    }
    async init(){
        let url = "http://localhost/dt";
        let data = {
            include_fields : "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
            filter_id      : "美食菜谱" ,
            start          : 0 ,
            _              :  Date.now() 
        }
        let res =await ajax( url , { data :data , dataType : "json"});
        return res.data.object_list ;
    }
}
new Sault();
// 去抖
// function debounce(fn) {
//     let timeout = null; // 创建一个标记用来存放定时器的返回值
//     return function () {
//       clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
//       timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
//         fn.apply(this, arguments);
//       }, 500);
//     };
//   }
// function sayHi() {
//     console.log('防抖成功');
// }
// var inp = document.getElementById('inp');
// inp.addEventListener('input', debounce(sayHi)); // 防抖