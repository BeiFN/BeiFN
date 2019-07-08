class Magnifier {
      constructor() {
            this.small_wrapper = $(".small-img");
            this.small_img = $(".small-img img");
            this.small_cube = $(".cube");
            // console.log(this.small_cube);
            //获得图片按钮
            this.img_btn_wrapper = $(".img-btn");
            this.img_btnList = this.img_btn_wrapper.children;
            // console.log(this.img_btnList);

            // 大图部分;
            this.big_wrapper = $(".big-img");
            this.big_img = $(".big-img img");
            this.init();
      }
      init() {
            this.changeStyle = [{
                        smallUrl: "https://upload-images.jianshu.io/upload_images/16960494-32836970433a5d75.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                        bigUrl: "https://upload-images.jianshu.io/upload_images/16960494-927c81e490e2e3ea.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                  },
                  {
                        smallUrl: "https://upload-images.jianshu.io/upload_images/12728563-076c6600d9ed6366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                        bigUrl: "https://upload-images.jianshu.io/upload_images/12728563-076c6600d9ed6366.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                  }
            ]


            this.small_wrapper.addEventListener("mouseenter", this.show.bind(this));
            this.small_wrapper.addEventListener("mouseleave", this.hide.bind(this));
            this.small_wrapper.addEventListener("mousemove", this.handlerMove.bind(this));
            // this.img_btn_wrapper.addEventListener("click",this.changePic.bind(this) );
            for (var i = 0, btn; btn = this.img_btnList[i++];) {
                  //btn.
                  var index = i - 1;
                  btn.addEventListener("click", this.changePic.bind(this, index))
                  // var  img = this.changeStyle[index];
            }
      }
      handlerMove(evt) {
            var e = evt || window.event;
            //小图片长度  宽度
            this.width = this.small_cube.offsetWidth;
            this.height = this.small_cube.offsetHeight;

            this.x = e.offsetX - this.width / 2;
            this.y = e.offsetY - this.height / 2;
            var cube_position = this.boundary(this.x, this.y);
            this.small_cube.style.left = cube_position.x + "px";
            this.small_cube.style.top = cube_position.y + "px";
            this.small_cube.style.backgroundPosition = -cube_position.x + "px " + -cube_position.y + "px";
            var big_position = this.BigPosition(cube_position.x, cube_position.y);
            this.big_img.style.left = -big_position.x + "px";
            this.big_img.style.top = -big_position.y + "px";

      }
      BigPosition(x, y) {
            this.bigWrapper = getSize(this.big_wrapper);
            //大图片
            this.bigImg = getSize(this.big_img);
            //小图边框
            this.smallImg = getSize(this.small_wrapper);
            var width = x * (this.bigImg.width - this.bigWrapper.width) / (this.smallImg.width - this.width);
            var height = y * (this.bigImg.height - this.bigWrapper.height) / (this.smallImg.width - this.width);
            return {
                  x: width,
                  y: height
            }
      }
      boundary(x, y) {
            x = x < 0 ? 0 : x;
            var swapper = getSize(this.small_wrapper);
            // console.log(swapper)
            // console.log(this.width)

            var max_x = swapper.width - this.width;
            x = x > max_x ? max_x : x;
            // console.log(x);

            y = y < 0 ? 0 : y;
            // var swapper = getSize(this.this.small_wrapper)
            var max_y = swapper.height - this.height
            y = y > max_y ? max_y : y;
            // console.log(y);
            return {
                  x: x,
                  y: y
            }
      }
      show() {
            this.small_cube.style.display = "block";
            this.big_wrapper.style.display = "block";
            this.small_img.style.opacity = 0.3
      }
      hide() {
            this.small_cube.style.display = "none";
            this.big_wrapper.style.display = "none";
            this.small_img.style.opacity = 1
      }
      changePic(i, evt) {
            var e = evt || window.event;
            var target = e.start || e.srcElement;

            var urls = this.changeStyle[i];
            //获取图片链接
            // urls.smallUrl
            // console.log(urls)
            // console.log(this.small_img);
            // console.log(this.big_img);
            this.small_img.src = urls.smallUrl;
            this.big_img.src = urls.bigUrl;

            // this.small_cube.style.backgroundImage = "url(urls.smallUrl)";
            this.small_cube.style.backgroundImage = 'url("' + urls.smallUrl + '")';

      }
}
new Magnifier();

function $(selector) {
      var ele = null;
      return (ele = document.querySelectorAll(selector)).length === 1 ? ele[0] : ele;
}

//获取元素尺寸
function getSize(dom) {
      return {
            width: parseInt(getComputedStyle(dom)["width"]),
            height: parseInt(getComputedStyle(dom)["height"]),
      }
}