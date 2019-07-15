let {
    ajax,
    $,
    on,
    ejs
} = Utils;

class Pagination {
    constructor({
        list = "",
        page = "",
        get_data = {
            url: "",
            data: {}
        },
        template = "",
        page_no = 1,
        show_no = 5
    } = {}) {
        this.list_wrapper = $(list);
        this.page_wrapper = $(page);
        this.page_no = page_no;
        this.show_no = show_no;
        this.url = get_data.url;
        this.data = get_data.data;
        this.template = template;
        this.init();
    }

    async init() {
        on(this.page_wrapper, "click", evt => {
            this.toIndex(evt.target.index());
            this.render();
            this.renderBtn();
        }, "span");
        this.res = await this.loadData();
        this.total = this.res.data.contents.length;
        this.render();
        this.renderBtn();
    }

    async loadData() {
        let res = await ajax(this.url, {
            data: this.data,
            dataType: "json"
        });
        return res;
    }

    render() {
        let data = this.res.data.contents;
        data = this.interceptData(data);
        var html = ejs.render(this.template, {
            data: data
        });
        this.list_wrapper.innerHTML = html;
    }

    interceptData(data) {
        let min = this.show_no * (this.page_no - 1);
        let max = this.show_no * this.page_no - 1;
        data = data.filter((item, index) => {
            return index >= min && index <= max;
        })
        return data;
    }

    renderBtn() {
        let total = Math.ceil(this.total / this.show_no);
        let btns = this.page_wrapper.children;
        if (btns.length === total) {
            Array.from(btns).forEach((btn, index) => {
                if (index + 1 === this.page_no) {
                    btn.className = "active";
                } else {
                    btn.className = "";
                }
            })
            return false;
        }
        let html = "";
        for (var i = 0; i < total; i++) {
            if (i + 1 === this.page_no) {
                html += `<span class=active>${i+1}</span>`;
            } else {
                html += `<span>${i+1}</span>`;
            }
        }
        this.page_wrapper.innerHTML = html;
    }

    toIndex(index) {
        this.page_no = index + 1;
    }
}