let { ajax, on } = untils;
class page {
    constructor() {
    }
    async init({
        list,
        page,
        getdate,
        pageNo = 1,
        showNo = 5,
        template
    } = {}) {
        this.list = document.querySelector('.' + list);
        this.page = document.querySelector('.' + page);
        this.url = getdate.url;
        this.data = getdate.data;
        this.pageNo = pageNo;
        this.showNo = showNo;
        this.template = template;
        this.bt = false;

        this.res = await this.onload();
        this.total = this.res.data.contents.length;
        on(this.page, 'click', (eve) => {
            let e = eve || event;
            let target = e.target;
            this.button(target);
            this.createelement();
        });
        this.createelement();
        this.button();
    }
    async onload() {
        let res = await ajax(this.url, { data: this.data, dataType: 'json' });
        return res;

    }
    createelement() {
        let script = document.getElementById('template').innerHTML;
        let num1=(this.pageNo-1)*5;
        let num2=this.pageNo*5;
        num2.>this.total?this.total:num2;
        let count=Array.from(this.res.data.contents).slice(num1,num2);
        let ele = ejs.render(script, { data: count });
        this.list.innerHTML = ele;

    }
    button(target) {
        if (this.bt) {
            for (let i = 0; i < this.page.children.length; i++) {
                if (target.nodeName=== 'SPAN') {
                    this.page.children[i].className = '';
                    if (this.page.children[i] === target) {
                        this.pageNo=i+1;
                        this.page.children[i].className = 'active';
                    }
                }
                
            }
            return 0;

        }
        this.total = Math.ceil(this.total / this.showNo);
        let html = '';
        // console.log(this.pageNo);
        for (let i = 0; i++ < this.total;) {
            if (i === this.pageNo) {
                html += `<span class='active'>${i}</span>`;
            } else {
                html += `<span>${i}</span>`
            }
        }
        this.page.innerHTML += html;
        this.bt = true;
    }







}