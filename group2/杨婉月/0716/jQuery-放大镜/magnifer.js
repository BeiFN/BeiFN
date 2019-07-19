function Magnifier(){
    // 获取属性
        //小图片外包围
        this.small_img_wrapper = $(".small-img");
        //小图片
        this.small_img = $(".small-img img");
        //移动块
        this.small_cube = $(".cube");
        //大图片外包围
        this.big_img_wrapper = $(".big-img");
        //大图片
        this.big_img = $(".big-img img");
        //图片按钮外包围
        this.img_btn_wrapper = $(".img-btn-wrapper");
        //所有图片按钮
        this.img_btns = this.img_btn_wrapper.children();
        //左按钮
        this.btn_pro = $(".btn-left");
        //右按钮
        this.btn_next = $(".btn-right");
        this.ball = $(".ball");
        //图片地址
        this.img_src_list = ["https://sku-images.obs.cn-south-1.myhuaweicloud.com/upload/goods20160625/11633956/116339560001/ori1.jpg",
        "https://sku-images.obs.cn-south-1.myhuaweicloud.com/upload/goods20160625/11633956/116339560001/ori2.jpg",
        "https://sku-images.obs.cn-south-1.myhuaweicloud.com/upload/goods20160625/11633956/116339560001/ori3.jpg",
        "https://sku-images.obs.cn-south-1.myhuaweicloud.com/upload/goods20160625/11633956/116339560001/ori4.jpg",
        "https://sku-images.obs.cn-south-1.myhuaweicloud.com/upload/goods20160625/11633956/116339560001/ori5.jpg"
        ]

        // console.log(this.img_src_list[0].small_img_src);

        // //移动块size
        // this.cube_size = getSize(this.small_cube);
        // this.small_wrapper_size = getSize(this.small_img_wrapper);
        // this.big_wrapper_size = getSize(this.big_img_wrapper);
        // this.big_img_size = getSize(this.big_img);
}
$.extend(Magnifier.prototype, {
    init : function(){
        //移入显示大图片外包围和移动块
        this.small_img_wrapper.on("mouseenter", $.proxy(function(){
            this.show();
        }, this))
        // this.small_img_wrapper.addEventListener("mouseenter", this.show.bind(this));
        //移出隐藏
        // this.small_img_wrapper.addEventListener("mouseleave", this.hide.bind(this));
        this.small_img_wrapper.on("mouseleave", $.proxy(function(){
            this.hide();
        }, this))
        //操作cube
        // this.small_cube.addEventListener("mousemove", this.hanlderMousemove.bind(this));
        this.small_cube.on("mousemove", $.proxy(function(){
            this.hanlderMousemove();
        }, this))
        //移入图片按钮切换图片
        // this.img_btn_wrapper.addEventListener("mousemove", delegation(this.changeImg.bind(this), ".img-box"));

        this.img_btn_wrapper.on("click", $(".img-box"), $.proxy(function(evt){
            let target = evt.target;
            console.log($(target).index());
            this.changeImg().call(this, $(target).index());
        }, this))
        //点击左按钮
        // this.btn_pro.addEventListener("click", this.toPro.bind(this));
        this.btn_pro.on("click", $.proxy(function(){
            this.toPro();
        }, this))
        //点击右按钮
        // this.btn_next.addEventListener("click", this.toNext.bind(this));
        this.btn_next.on("click", $.proxy(function(){
            this.toNext();
        }, this))
    },
    show : function(){
        // this.small_cube.style.display = "block";
        this.small_cube.css({
            "display" : "block"
        })
        // this.big_img_wrapper.style.display = "block";
        this.big_img_wrapper.css({
            "display" : "block"
        })
        // this.small_img.style.opacity = 0.3;
        this.small_img.css({
            "opacity" : "0.3"
        })
    },
    hide : function(){
        // this.small_cube.style.display = "none";
        this.small_cube.css({
            "display" : "none"
        })
        // this.big_img_wrapper.style.display = "none";
        this.big_img_wrapper.css({
            "display" : "none"
        })
        // this.small_img.style.opacity = 1;
        this.small_img.css({
            "opacity" : "1"
        })
    },
    hanlderMousemove : function(e){
        var e = e || window.event;
        //cube坐标（要减去小图片外包围的绝对坐标，为了使鼠标处于cube的中点，要减去cube宽高的一半）
        var x = e.pageX - this.small_img_wrapper.offset().left - this.small_cube.width()/2;
        var y = e.pageY - this.small_img_wrapper.offset().top - this.small_cube.height()/2;
        //限定cube的边界cube
        var cub_pos = this.boundary(x, y);
        //大图片坐标
        var big_img_pos = this.bigImgPos(cub_pos.x, cub_pos.y);
        //cube移动 大图片移动
        this.move(cub_pos, big_img_pos);
    },
    move : function(cub_pos, big_img_pos){
        //cube的坐标
        // this.small_cube.style.left = cub_pos.x +"px";
        this.small_cube.css({
            "left" : cub_pos.x +"px"
        })
        // this.small_cube.style.top = cub_pos.y + "px";
        this.small_cube.css({
            "top" : cub_pos.y +"px"
        })
        //大图片的坐标
        // this.big_img.style.left = -big_img_pos.big_pos_x + "px";
        this.big_img.css({
            "left" : -big_img_pos.big_pos_x +"px"
        })
        // this.big_img.style.top = -big_img_pos.big_pos_y + "px";
        this.big_img.css({
            "top" : -big_img_pos.big_pos_y +"px"
        })
        //cube背景移动
        // this.small_cube.style.backgroundPosition = -cub_pos.x +"px "+ -cub_pos.y + "px";
        this.small_cube.css({
            "background-position" : -cub_pos.x +"px "+ -cub_pos.y + "px"
        })
        },
    boundary : function(x, y){
        x = x<=0 ? 0: x;
        var maxX = this.small_img_wrapper.width() - this.small_cube.width();
        x = x>=maxX ?  maxX : x;

        y = y<=0 ? 0: y;
        var maxY = this.small_img_wrapper.height() - this.small_cube.height();
        y = y>=maxY ? maxY : y ;

        return {
            x,y
        }
    },
    bigImgPos : function(x, y){
        var xx = x/(this.small_img_wrapper.width()-this.small_cube.width());
        var big_pos_x = xx*(this.big_img.width()-this.big_img_wrapper.width());
        var yy = y/(this.small_img_wrapper.height()-this.small_cube.height());
        var big_pos_y = yy*(this.big_img.height()-this.big_img_wrapper.height());
        return {
            big_pos_x,
            big_pos_y
        }
    },
    changeImg: function(index){
        console.log(index);
        this.img_src_list[index].addClass("active")
        .siblings.removeClass("active");
        this.small_img.src = this.img_src_list[index];
        this.big_img.src = this.img_src_list[index];
        // this.small_cube.style.backgroundImage = "url("+ this.img_src_list[index] +")";
        this.small_cube.css({
            "background-image" : "url("+ this.img_src_list[index] +")"
        })
    },
    getIndex: function(ele){
        for(var i=0, btn; btn = this.img_btns[i++]; ){
            if(ele == btn){
                return i;
            }
        }
    },
    toPro: function(){
        this.img_btn_wrapper.animate({left: 0});
    },
    toNext: function(){
        // console.log("next");
        this.img_btn_wrapper.animate({left: -108});
    }

})

let magnifier = new Magnifier();
magnifier.init();