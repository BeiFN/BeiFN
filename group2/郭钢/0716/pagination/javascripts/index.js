/**
 * 1.加载页面时渲染页面
 * 2.根据数据渲染分页器
 * 3.点击分页器时利用ajax渲染要更改的内容
 * 
 * 
 * 
 * 
 * 
 * 
 *  */




let {
    ejs,
    $:$$
} = Utils;
class Pagination {
    // 参数默认值
    constructor(url, {
        showNo = 5,
        pageNo = 2,
        template = "",
        data = {},
    } = {}) {
        this.url = url;
        this.init(data);
        this.wrapper = $$(".wrapper");
        this.pagination = $$(".pagination");
        this.showNo = showNo;
        this.pageNo = pageNo;
        this.template = template; //搜索引擎模板
    }
    async init(data) {
        this.loadData(data).done($.proxy(function(res){
            this.res = res;
            this.data = this.res.data.contents;
            this.render(); //渲染页面
            this.renderBtn(); //渲染按钮
            on(this.pagination, "click", (evt) => {
            let e = evt || event;
            let target = e.target || e.srcElement;

            // 把页码跟当前点击的第几页对应起来
            this.pageNo = Array.from(this.pagination.children).indexOf(target) + 1;

            // 渲染要更改的内容
            this.render();

            //渲染按钮
            this.renderBtn();
        }, "span")
        },this) )
        // this.render(); //渲染页面
        // this.renderBtn(); //渲染按钮

        console.log(this.data); //找到所有数据的集合对象

        //点击分页的时候触发事件，利用了事件委托，传入四个参数
        
    }

    //渲染页面
    render() {
        let data = this.data;

        //数据拼接
        data = this.spliceBox(data);
        this.html = ejs.render(this.template, {
            data
        }); //{data:data}为什么要这样写
        this.wrapper.innerHTML = this.html;
    }

    // 数据拼接
    spliceBox(data) {

        // 公式为:(n-1)*showNo ~ n*showNo -1
        // 每页显示的最小值为(n-1)*showNo,最大值为n*showNo -1
        let min = this.showNo * (this.pageNo - 1);
        let max = this.showNo * this.pageNo - 1;
        data = data.filter((item, index) => {
            return index >= min && index <= max; //把所有index(索引)满足条件的元素(item)放进一个新对象返回出去
        });
        return data;

    }


    //渲染按钮
    renderBtn() {

        //总页数为总数据数量/每页显示的数量 ，向上取整
        this.pageCount = Math.ceil(Array.from(this.data).length / this.showNo);
        let html = "";
        // 把分页器显示在页面中
        for (var i = 0; i < this.pageCount; i++) {

            //对当前点击也active
            if (i + 1 === this.pageNo) {
                html += `<span class=active>${i+1}</span>`
            } else {
                html += `<span>${i+1}</span>`
            }
        }
        this.pagination.innerHTML = html;
    }

    // 加载数据
    loadData(data) {
    return $.ajax(this.url, data)
    
        //加载数据，返回结果是一个promise对象

    }

    static on(dom, evetType, callback, selector) {
        if (dom.addEventListener) {
            if (arguments.length === 4 && typeof arguments[3] === "string") {
                dom.addEventListener(evetType, Pagination.delegation(callback, selector));
            } else {
                dom.addEventListener(evetType, callback);
            }
        } else if (dom.attachEvent) {
            dom.attachEvent("on" + eventType, callback);
        } else {
            dom["on" + eventType] = callback;
        }
    }

    // 事件委托;
    static delegation(handlerClick, selector) {
        return function (evt) {
            var e = evt || window.event;
            var target = e.target || e.srcElement;
            var eleList = this.querySelectorAll(selector);
            var targetFamily = [];
            var _tempTarget = target;
            var count = 0;
            while (true && count++ < 100) {
                if (_tempTarget === this || _tempTarget === null) {
                    break;
                }
                targetFamily.push(_tempTarget);
                _tempTarget = _tempTarget.parentNode;
            }
            for (var i = 0, ele; ele = eleList[i++];) {
                if (targetFamily.length === 1 ? ele === targetFamily[0] : targetFamily.indexOf(ele) !== -1) {
                    handlerClick.call(ele, e);
                    break;
                }
            }
        }
    }
}

let {
    on,
    delegation
} = Pagination;
new Pagination("http://localhost/zc", {
    showNo: 5,
    pageNo: 2,
    template: $$("#template").innerHTML,
    data: {
        data: {
            pageSize: 50,
            contentId: ("" + Date.now()).slice(5),
            day: new Date().toString().slice(0, 10),
        },
        dataType: "json"
    }
});