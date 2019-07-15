//仿swiper创建轮播结构的框架，用面向对象的方法实现
//首先应该创建构造函数
class Banner{
    constructor({selector = ".container"} = {}, {effect = "slide"} = {} ){
        //获取实现轮播图要用到的元素作为构造函数的属性
        let {$} = Utils;
        this.main = $(selector);
        this.wrapper = $(".wrapper");
        this.slides = $(".slide");
        this.button_next = $(".button-next");
        this.button_prev = $(".button-prev");
        this.nowIndex = 0;
        this.effect = effect;
        this.init(); 
        let {removeClassName} = Utils;
        this.removeClassName = removeClassName;    
    }
//创建init函数，在init函数中初始化变量的值
    init(){
    //在init函数中绑定事件
        this.button_next.addEventListener("click", this.handlerNextClick.bind(this));
        this.button_prev.addEventListener("click", this.handlerPreClick.bind(this));
        this.main.addEventListener("click", this.pageChange.bind(this));
        //因为事件的执行结果都在操作同一个变量，所以这两个之间存在执行的顺序问题，所以应该先绑定对下一个有影响的事件处理函数
        this.main.addEventListener("click", this.handlerPaginationClick.bind(this));
        this.main.addEventListener("click", this.paginationChange.bind(this));

        this.paginationLayout();
        this.animateLayout();
    }
    animateLayout(){
        switch(this.effect){
            case "slide":
                // 实现分页效果，当用户输入的有pagination属性时，即调用paginationLayout（）布局，然后进行添加监听事件，添加样式，
                // 分页器的点击事件，只能是点击到第几个children，nowIndex就为几         
                //滑动效果
                this.main.className += " container-slide";
                this.wrapper.style.width = (this.slides.length + 1)*this.main.offsetWidth + "px";
                var cloneNode = this.slides[0].cloneNode(true);
                this.wrapper.appendChild(cloneNode);

                //slides是在构造函数中获取到的，此时向wrapper中添加元素并不会改变slides中的值，所以应该在这里重新添加到slides伪数组中
                this.slides = [].slice.call(this.slides);
                this.slides.push(cloneNode); 
                console.log(this.slides)
                break;
            case "fade":
                this.main.className += " container-fade";
                break;
        }
    }
//绑定分页器点击事件的函数
    handlerPaginationClick(evt){
        let e = evt || window.event;
        let target = e.target||e.srcElement;
        for(let i = 0 ; i < this.pagination.children.length; i++){
            if(target == this.pagination.children[i]){
                this.nowIndex = i;
                break;
            this.removeClassName(this.pagination.children[i], "pagination-bullet-active")
        }
        }
    }
//处理分页的事件绑定到this.main变量上
    paginationChange(evt){
        // 当用户点击按钮即出发事件,操作nowIndex，设置slides中的第nowIndex个的背景颜色
        for(let i = 0; i < this.pagination.children.length; i++){
            this.removeClassName(this.pagination.children[i], "pagination-bullet-active")
        }
        this.pagination.children[(this.nowIndex )%5].className += " pagination-bullet-active"
    }

//实现分页布局的函数
    paginationLayout(){
        let str1 = '<div class="pagination-bullet pagination-bullet-active"></div>'
        let str = '<div class="pagination-bullet"></div>'
        this.pagination = document.querySelector(".pagination")
        for(let i = 0; i < this.slides.length; i++){
            if(i == 0){
                this.pagination.innerHTML += str1
            }else{
                this.pagination.innerHTML += str;
            }
        }
    }    

//如何实现第一帧渲染 1.初始值 2.transition
    pageChange(){
        switch(this.effect){
            case "fade":
                setTimeout(function(){
                    this.slides[this.nowIndex].style.transition = "opacity 1s";
                    this.slides[this.nowIndex].style.opacity = 1;
                }.bind(this), 0) 
                this.slides[this.nowIndex].className += " slide-active";        
                for(let i = 0; i < this.slides.length; i++){
                    this.slides[i].style.opacity = 0;
                }
                break;
            case "slide":
                this.main.className += " container-slide";
                this.wrapper.style.left = 0 + "px";
                switch(this.state){
                    case "normal":
                        this.wrapper.style.transition = "left 1s";
                        setTimeout(function(){
                            this.wrapper.style.left = -this.main.offsetWidth*this.nowIndex + "px";
                        }.bind(this), 0);
                        break;
                    case "changeFirst":
                        console.log(1)
                        this.wrapper.style.left = 0;
                        this.wrapper.style.transition = "top 1s";
                        this.nowIndex++;
                        setTimeout(function(){
                            this.wrapper.style.transition = "left 1s";
                            this.wrapper.style.left = -this.main.offsetWidth*this.nowIndex + "px";
                        }.bind(this), 0);
                        break;
                    case "changeLast":
                        this.wrapper.style.left = -this.main.offsetWidth*(this.slides.length - 1) +"px"
                        this.wrapper.style.transition = "top 1s";
                        this.nowIndex--;
                        setTimeout(function(){
                            this.wrapper.style.transition = "left 1s";
                            this.wrapper.style.left = -this.main.offsetWidth * this.nowIndex+"px";
                        }.bind(this), 0);
                        break;
                }
        }
    }
    //处理右边按钮事件点击的函数
    handlerNextClick(){
        if(this.nowIndex == this.slides.length - 1){
            this.nowIndex = 0;
            this.state = "changeFirst";
        }else{
            this.nowIndex++;
            this.state = "normal";
        }
    }
//处理左边按钮点击事件的函数
    handlerPreClick(){
        if(this.nowIndex == 0){
            this.state = "changeLast"
            this.nowIndex = this.slides.length - 1;
        }else{
            this.nowIndex--;
            this.state = "normal";
        }
    }
}
new Banner({selector:".container"});