
class Flow{
    constructor(){

    }
}

$.extend(Flow.prototype,{
    async init({
        wrap,
        data_ajax
    } = {}) {
        //get
        this.wrap = document.querySelector('.' + wrap);
        this.url = data_ajax.url;
        this.data = data_ajax.data;
        this.res = await this.onload();
        //create
        // ${this.res[i].photo.path}
        this.sum_start = 0;
        this.ele_bool = true;
        this.timer = null;
        this.timer1 = null;
        this.loading = true;
        this.load_url = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563172097821&di=5a91819ee43850fc70b858e143165238&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201505%2F23%2F20150523090235_fJUxr.gif";
        this.Win_height = document.documentElement.clientHeight || document.body.clientHeight;
        this.win_scroll = document.documentElement.scrollTop || document.body.scrollTop;
        // function
        this.total = this.res.length;
        if (this.ele_bool) {
            this.etablishFlow();
        }
        window.addEventListener('resize', this.getWidth.bind(this));


    },
    async onload() {

        let res = await $.ajax(this.url, { data: this.data, dataType: 'json' });
        return res.data.object_list;
        // this.timer=null;


    },
    etablishFlow() {
        let html = '';
        for (let i = 0; i < this.total; i++) {
            let pre = (235 / this.res[i].photo.width);
            let height = parseInt(this.res[i].photo.height * pre);
            html += `  <div class="box" data-img=${this.res[i].photo.path}>
            <div class="box-img" style='height:${height}px'>
                  <img  src="${this.load_url}" alt="">
                  <u style='height:${height}px'></u>
            </div>
            <div class="box-detail">
                  <div class="title">
                        ${this.res[i].msg}
                  </div>
            </div>
      </div>`;
        }
        this.ele_bool = false;
        this.wrap.innerHTML += html;
        this.getWidth();
        this.changeImg();
        $(window).on('scroll', async () => {
            this.changeImg();

        });
        // $(window).
    },

    getWidth() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.cWidth = document.documentElement.clientWidth;
            this.judgeTop();
        }, 100);
    },
    judgeTop() {
        let box = this.wrap.children;
        let count = parseInt(this.cWidth / 250);
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
        this.wrap_height = Math.max.apply('', this.lineHeight);
        this.wrap.style.height = this.wrap_height + 'px';
    },

    changeImg() {
        if (this.timer1 === null) {
            this.timer1 = setTimeout(() => {
                this.win_scroll = document.documentElement.scrollTop || document.body.scrollTop;
                this.loadStart();
                this.timer1 = null;
            }, 500);
        }

    },
    loadStart() {
        let box = this.wrap.children;
        this.lineHeight = [];
        Array.from(box).forEach(async item => {
            let pos = item.offsetTop ;
            let bound = this.Win_height + this.win_scroll;
            if (pos < bound + 300) {
                let img_url = item.getAttribute('data-img');
                item.children[0].children[0].src = img_url;
            }
            if (this.loading && bound + 500 > this.wrap_height) {
                this.loading = false;
                this.ele_bool = true;
                this.sum_start++;
                this.data.start = 24 * this.sum_start;
                this.res = await this.onload();
                if (this.ele_bool) {
                    this.etablishFlow();
                }

                window.addEventListener('resize', this.getWidth.bind(this));
                this.loading = true;
            }

        })
    }

})
