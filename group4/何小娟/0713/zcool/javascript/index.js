
let { ajax,$,on,ejs} = Utils
// 分页
class Pagination{
    constructor(){
    }

    // 初始化
    async init({
        list = "",
        page = "",
        getData = {
            url:"",
            data :{}
        },
        template = "",
        pageNo = 1,
        showNo = 5
    }={}){
        // 这里的$是引入的$函数
        this.list_warpper = $(list)
        this.page_warpper = $(page)
        this.pageNo = pageNo
        this.showNo = showNo
        this.url = getData.url
        this.data = getData.data
        this.template = template

        // 数据加载开始，时间委托；
        // on是引入的函数on
        on(this.page_warpper, "click",(evt) =>{
            // 点击之后切换页、重新渲染页面、重新渲染按钮
            this.toIndex(evt.target.index())
            this.render()
            this.renderBtn()
        },"span")
        this.res  = await this.loadData()

        this.total = this.res.data.contents.length

    }

    // 加载数据
    async loadData(){
        let res = await ajax(this.url,{data:this.data,dataType:"json"})
        return res
    }

    // 渲染页面
    render(){
        let data = this.res.data.contents
        // 裁剪数据
        data = this.interceptData(data)

        var html = ejs.render(this.template,{
            data:data
        })

        this.list_warpper.innerHTML = html
    }

    // 裁剪数据
    interceptData(data){
        let min = this.showNo * (this.pageNo - 1)
        let max = this.showNo * (this.pageNo - 1)

        data = data.filter((item ,index) => {
            return index >= min && index <= max
        })

        return data
    }

    // 渲染按钮
    renderBtn(){
        let total = Math.ceil(this.total / this.showNo)
        let btns = this.page_warpper.children
        if(btns.length === total){
            Array.from(btns).forEach((btn,index) => {
              if(index + 1 === this.pageNo){
                    btn.className = "active"
              }else{
                btn.className = ""
              }
            })

            return false
        }

        let html = ""
        for(var i = 0;i <total;i++){
            if(i +1 === this.pageNo){
                html += `<span class=active>${i+1}</span>`
            }else{
                html += `<span></span>`
            }
        }
        this.page_warpper.innerHTML = html
    }

    // 切换页码
    toIndex(index){
        this.pageNo = index +1
    }
}