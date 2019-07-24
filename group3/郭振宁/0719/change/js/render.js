class Render {
    render() {
        let data = this.res.data.contents;
        data = this.interceptData(data);
        console.log(data);


        let html = ejs.render(this.template , {data : data});
        // console.log(html);
        this.list_warpper.innerHTML = html;
    }
    interceptData(data) {
        let min = this.showNo * ( this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter(function(item , index) {
            return index >= min && index <= max;
        })

        return data;
    }
    renderBtns() {
        let total = Math.ceil(this.total / this.showNo);
        let btns = this.page_warpper.children;
        //如果不是第一次渲染，那么只需要改变classname来只指定按钮变色
        if(btns.length === total) {
            Array.from(btns).forEach((item , index) => {
                if(index + 1 === this.pageNo) {
                    item.className = "active";
                }else {
                    item.className = "";
                }
            })
            return false;
        }
        let html = "";
        for(var i=0; i<total; i++) {
            if(i+1 === this.pageNo) {
                html += `<span class="active">${i+1}</span>`;
            }else {
                html += `<span>${i+1}</span>`;
            }
        }
        this.page_warpper.innerHTML = html;
    }
    toIndex(index) {
        this.pageNo = index + 1;
    }
}