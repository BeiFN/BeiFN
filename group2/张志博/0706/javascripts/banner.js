class Banner {
    constructor({ selector = ".container", options = {effect : "fade",fenye : ".pagination"}} = {}) {
        //获取continer
        this.main = document.querySelector(selector)
        //获取所有的图片
        this.slides = document.querySelectorAll(".slide")
        this.wrapper = document.querySelector(".wrapper")
        this.btn_prev = document.querySelector(".button-prev")
        this.btn_next = document.querySelector(".button-next")
     
        this.nowIndex = 0;

        this.options = options
        this.state = "normal"
        this.init();
    }
    init() {
        //给左右按钮绑定事件
        this.btn_prev.addEventListener("click", this.prevClick.bind(this))
        this.btn_next.addEventListener("click", this.nextClick.bind(this))
        //将动画放到同一个函数中进行操作
        this.main.addEventListener("click", this[this.options.effect].bind(this))
        //动画布局改变
        this.animationChange();
        //改变分页栏的布局       
        this.fyStyleChange();
        //2、分页栏跟着图片变化变化
        this.main.addEventListener("click", this.fenyeChange.bind(this))
        //3、分页栏点击事件
        this.fenye.addEventListener("click", this.fenyeClick.bind(this))
    }
    //分页的点击事件
    fenyeClick(evt) {
        let e = evt || event;
        let target = e.target || e.srcEvent;
        if (target !== this.fenye) {
            //点击的都是分页内的子元素
            let arr = [].slice.call(this.fenye.children)
            if (arr.indexOf(target) > -1) {
                this.toIndex(arr.indexOf(target))
            }
        }
    }

    //去到
    toIndex(index) {

        //获取元素引用在数组中的索引也就是slides的下标
        this.nowIndex = index;
        console.log(this.nowIndex)

        if (this.nowIndex == this.slides.length - 1) {
            this.state = "fenyeBug"
            // console.log("1111")
        }
    }
 
    fenyeChange() {
       
        for (let i = 0, fenyeEle; fenyeEle = this.fenye.children[i++];) {
            removeClassName(fenyeEle, "pagination-bullet-active");
        }
        let index = this.nowIndex;
        if (this.options.effect == "slide") {
       
            index = this.nowIndex === this.slides.length - 1 ? 0 : this.nowIndex;
            console.log(index, this.state)
            //bug问题 因为从后往前和从前往后  都会有这个this.slides.length-1
            if (index == 0 && this.state == "firstJian") {
                index = this.slides.length - 2
            }
            if (index == 0 && this.state == "lastJia") {
                index = 1
            }
        }
        this.fenye.children[index].className += " pagination-bullet-active"
    }


    //改变分页栏的布局
    fyStyleChange() {
        this.fenye = document.querySelector(this.options.fenye)
        if (this.fenye == null) { return false }
        //获取分页数
        this.fenyeCount = this.slides.length - (this.options.effect == "slide" ? 1 : 0)
        // console.log(this.fenyeCount)
        let html = ""
        for (let i = 0; i < this.fenyeCount; i++) {
            if (i == 0) {
                //默认首个元素为active的
                html += "<div class = 'pagination-bullet pagination-bullet-active'></div>"
            } else {
                html += "<div class = 'pagination-bullet'></div>"
            }
        }
        this.fenye.innerHTML = html

    }

    //动画布局改变
    animationChange() {
       
        switch (this.options.effect) {
            case "slide":
                this.slideStyleChange(); break;
            case "fade":
                this.main.className += " container-fade"
                break;
        }
    } 
    
    // 滑动的布局改变
    slideStyleChange() {
        //给container增加slide专属class  设置他为弹性盒
        this.main.className += " container-slide"
        //给wrapper添加元素
        let cloneNode = this.slides[0].cloneNode(true)
        this.wrapper.appendChild(cloneNode)
        //改变slides 方便nowIndex的修改
        this.slides = [].slice.call(this.slides)
        this.slides.push(cloneNode)
        //改变wrapper的长度  
        this.wrapper.style.width = this.main.offsetWidth * this.slides.length + "px"
    }
    //点击左边的图标让索引变化   当为0的时候 
    prevClick() {
        if (this.nowIndex == 0) {
            this.nowIndex = this.slides.length - 1
            this.state = "firstJian"
        } else {
            this.nowIndex--;
        }
      
    }
    //点击下一张
    nextClick() {
        if (this.nowIndex == this.slides.length - 1) {
            this.nowIndex = 0;
            this.state = "lastJia"
        } else {
            this.nowIndex++;
        }
    }

    //动画 淡入淡出的效果
    fade() {
 
        for (let i = 0, slide; slide = this.slides[i++];) {
            slide.style.opacity = 0;
            slide.style.transition = "all 1s"
        }
        this.slides[this.nowIndex].style.opacity = "1"
    }
    //动画 滑动效果
    slide() {
        // console.log(this.state)
        switch (this.state) {

            case "fenyeBug":
                this.wrapper.style.transition = "top 1s";
                this.wrapper.style.left = 0
              
                break;
            case "normal":
        
                this.wrapper.style.left = 0
                this.wrapper.style.transition = "left 1s";
                setTimeout(function () {
                    this.wrapper.style.left = -this.nowIndex * this.main.offsetWidth + "px";
                }.bind(this), 0)
                break;
            case "lastJia":
                this.wrapper.style.transition = "right 1s"
                this.wrapper.style.left = 0;
                setTimeout(function () {
                    this.nowIndex++;
                    this.state = "normal"
                    this.slide();
                }.bind(this), 0)
                break;
            case "firstJian":
                this.wrapper.style.transition = "top 1s"
                this.wrapper.style.left = -(this.slides.length - 1) * this.main.offsetWidth + "px";
                //放到异步中就会比上一个晚执行一些
                setTimeout(function () {
                    this.nowIndex--;
                    this.state = "normal"
                    this.slide();
                }.bind(this), 0)
                break;
        }
    }
    static removeClassName(dom, className) {
        let reg = new RegExp("\s?" + className, "g")
        return dom.className = dom.className.replace(reg, " ")
    }
}
let {removeClassName} = Banner