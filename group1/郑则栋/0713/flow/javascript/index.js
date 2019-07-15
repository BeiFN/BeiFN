
let { ajax } = untils
class flow {
    constructor() {


    }
    async init({
        wrap,
        data_ajax
    } = {}) {
        //get
        this.wrap = document.querySelector('.' + wrap);
        this.url = data_ajax.url;
        this.data = data_ajax.data;
        this.cWidth = document.body.clientWidth;
        this.res = await this.onload();
        //create
        this.ele_bool = true;
        this.timer = null;

        // function
        console.log(this.res);
        this.total = this.res.length;
        if (this.ele_bool) {
            this.etablishFlow();
        }
        window.addEventListener('resize', this.getWidth.bind(this));


    }
    async onload() {

        let res = await ajax(this.url, { data: this.data, dataType: 'json' });
        return res.data.object_list;
        // this.timer=null;


    }
    etablishFlow() {
        let html = '';
        for (let i = 0; i < this.total; i++) {
            let pre = (235 / this.res[i].photo.width);
            let height = parseInt(this.res[i].photo.height * pre);
            html += `  <div class="box">
            <div class="box-img" style='height:${height}px'>
                  <img  src="${this.res[i].photo.path}" alt="">
                  <u style='height:${height}px'></u>
            </div>
            <div class="box-detail">
                  <div class="title">
                        ${this.res[i].album.name}
                  </div>
            </div>
      </div>`;
        }
        this.ele_bool = false;
        this.wrap.innerHTML += html;
        this.getWidth();
    }

    getWidth() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.cWidth = document.documentElement.clientWidth;
            this.judgeTop();
        }, 100);
    }
    judgeTop() {
        let box = this.wrap.children;
        let count = parseInt(this.cWidth / 250);
        console.log(count)
        this.lineHeight = [];
        Array.from(box).forEach((item, index) => {
            if (index < count) {
                let cheight = item.offsetHeight;
                item.style.position = 'static';
                this.lineHeight.push(cheight);
                // console.log(this.lineHeight);
            }
            else {
                let min = Math.min.apply('', this.lineHeight);
                let min_index = this.lineHeight.indexOf(min);
                item.style.position = 'absolute';
                item.style.top = min + 20 + 'px';
                item.style.left = min_index * 250 + 'px';
                this.lineHeight[min_index] += item.offsetHeight + 20;

            }

        })
        let warp_height = Math.max.apply('', this.lineHeight);
        this.wrap.style.height = warp_height + 'px';
    }
}




