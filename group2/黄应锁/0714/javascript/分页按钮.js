
let {ajax,$,on} = Utils;
class Paganition{
    constructor({
        list ="",
        template = "",
        pagination = "",
        showNum = 5,
        pageNum = 1,
        getData = {
            url : "",
            data : {},
        }
    }={}){
        this.main = $(list);
        this.template = $(template).innerHTML;
        this.pagination = $(pagination);
        this.showNum = showNum;
        this.pageNum = pageNum;
        this.url = getData.url;
        this.data = getData.data;
        this.init();
    }
    async init(){
        this.res = await new LoadData().init(this.url,this.data);
        this.render();
        this.renderBtn();
        on(this.pagination,"click",(evt,index)=>{
            this.toIndex(index);
            this.render();
            this.renderBtn();
        },"span");
    }
    //渲染页面
    render(){
        // let data = this.res.data.contents;
        let data = this.res.goods_list;
        data = this.interceptData(data);
        let html = ejs.render(this.template, {data : data});
        this.main.innerHTML = html;
    }
    //截取数据
    interceptData(data){
        let min =this.showNum * (this.pageNum - 1); 
        let max =this.showNum *(this.pageNum - 1) + this.showNum- 1  ; 
        data = data.filter((item,index )=> {
            return index >= min && index <= max;
        });
        return data;
    }
    //生成或者重新渲染按钮;
    renderBtn(){
        // let total = Math.ceil(this.res.data.contents.length/this.showNum);
        let total = Math.ceil(this.res.goods_list.length/this.showNum);
        let btns = this.pagination.children;
        if(btns.length === total){
            // for(let i = 0, btn; btn = btns[i++]; ){
            //     btn.className = "";
            // }
            // btns[this.pageNum - 1].className = "active";
            Array.from(btns).forEach((btn,index)=>{
                if(index + 1 === this.pageNum){
                    btn.className = "active";
                }else{
                    btn.className = "";
                }
            });
            return false;
        }
        let html = "";

        for(let i = 0 ;i < total ; i++){
            if( i === this.pageNum - 1){
                html += `<span class=active>${this.pageNum}</span>`;
            }else{
                html += `<span>${i + 1}</span>`;
            }
        }
        this.pagination.innerHTML = html;
    }
    toIndex(index){
        this.pageNum = index +1 ;
    }
}
//获取数据
class LoadData{
    constructor(){
    }
    async init(url,data){
        // let url = "http://localhost/zc";
        // //https://www.zcool.com.cn/recommend/contentRecommend?pageSize=5&contentId=9350440_3&day=2018-12-04
        // let data = {
        //     pageSize : 100,
        //     contentId : (""+Date.now()).slice(6) + "_3",
        //     day : new Date().toISOString().slice(0,10)
        // }
          
        let res = await ajax(url,{
            data:data,
            dataType: "json",
        })

        return res;
    }
}
// new Paganition({
//     list:".hot",
//     template: "#template",
//     pagination : ".pagination",
//         showNum : 5,
//         pageNum : 1,
//         getData : {
//             url : "http://localhost/zc",
//             data : {
//                 pageSize : 100,
//                 contentId : (""+Date.now()).slice(6) + "_3",
//                 day : new Date().toISOString().slice(0,10)
//             },
//         }
// });