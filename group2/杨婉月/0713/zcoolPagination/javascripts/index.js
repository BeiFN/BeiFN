// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  1 ~ 6 
// 2.  7 ~ 12
// 3. 13 ~ 18
// 4. 19 ~ 24 
// n. 6(n - 1) + 1 ~ 6n


// 渲染 ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件 ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染 ; 
// ejs.render( template , data);
// 页码 ; 
// let {ajax, $} = Utils;
// class Pagination{
//     constructor(selector){
//         //按钮外包围
//         this.pagination_wrapper = $(".pagination");
//         //按钮
//         this.Pagination = this.pagination_wrapper.childern;
//         //当前页码
//         this.pageIndex = 0;
//         this.init();
//     }
//     init(){
//         //创建按钮
//         this.createBtn();
//         //渲染页面
//         this.render();
//         //绑定事件
//         this.pagination_wrapper.addEventListener("click", this.handlerClick.bind(this));
//     }
//     render(){
//         //显示当前页码的图片
//         ajax(url).then(res =>{
//             ejs.render(template, res);
//         })
//     }
//     //点击
//     handlerClick(){
//         //获取当前页码
//         //重新渲染
//         this.render();
//     }
//     //创建按钮
//     createBtn(){

//     }

// }

let {ajax, $, on, removeClassName} = Utils;
class Pagination{
    constructor(){

    }
    async init({img_list, getData={url, data, datatype}, ImageNo, PageNo, pageWapper}){
        //图片列表
        this.img_list = $(img_list);
        this.url = getData.url;
        this.data = getData.data;
        this.datatype = getData.datatype;
        //一页有几个图
        this.ImageNo = ImageNo;
        //共有几页
        this.PageNo = PageNo;
        //当前页数
        this.currentPage = 0;
        //按钮外包围
        this.pageWapper = $(pageWapper);
        //所有按钮
        this.btns = this.pageWapper.children;
        
        on(this.pageWapper, "click", (evt)=> {
            console.log(parseInt(evt.target.innerHTML));
            this.toIndex(parseInt(evt.target.innerHTML)-1);
            this.render(res);
            //按钮点击高亮显示
            this.BtnActive(parseInt(evt.target.innerHTML));
        } )

        let res = await this.loadData();
        // console.log(res);
        //渲染页面
        this.render(res);
        //图片总数
        this.total = res.data.contents.length;
        console.log(this.total);
        //渲染初始按钮
        this.renderBtn();

    }
    async loadData(){
        let res = await ajax(this.url, {data : this.data, dataType: this.datatype}, );
        return res;
    }
    renderBtn(){
        //图片总数/一个页面中图片数
        let num = Math.ceil(this.total/this.ImageNo);
        console.log(num);
        let html ="";
        for(let i = 0; i<num; i++){
            if(i===0){
                html += `<span class=active>${i+1}</span>`;
            }else{
                html += `<span>${i+1}</span>`;
            }
        }
        this.pageWapper.innerHTML = html;
    }
    cutData(res){
        //每个页面放入5个图片
        //分组 0-4   5-9    10-14   15-19  5(i-1)-5i-1
        //得到当前页数
        let min = this.currentPage * this.ImageNo;
       
        let max = (this.currentPage+1) * this.ImageNo -1; 
        
        console.log(min, max);
        // let data = res.filter((item, index)=>{
        //     return index >=min && index <=max;
        // })
        let data = res.filter( (item , index) => {
            return  index >= min && index <= max;
      })
        console.log(data);
        return data;
        
    }
    render(res){
        res = res.data.contents;
        //裁剪数据
        let data = this.cutData(res);
        //获取要拼接的字符串
        let template = document.getElementById("template").innerHTML;
        //获取数据
        //调用ejs的render方法来形成html形式
        let html = ejs.render(template, {data:data});  //render的第二个参数为对象！！！
        //将得到的html放入图片列表中
        this.img_list.innerHTML = html;
    }
    toIndex(index){
        this.currentPage = index;
    }
    BtnActive(index){
        // console.log(this.btns[index-1]);
        //清除所有按钮的active
        for(let i = 0, item; item = this.btns[i]; i++){
            removeClassName(item, "active");
        }
        for(let i = 0, item; item = this.btns[i]; i++){
            if(item === this.btns[index-1]){
                item.className += " active";
            }
        }
    }
}
