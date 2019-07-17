// 面向对象实现瀑布流 布局
// 1.OOA 1.获取数据 2.渲染页面 3.获取获取高度并计算高度  4.重新渲染页面
class WaterFall{
      constructor(){
            this.start = 0;
            this.data = null;
            let {$} = Utils;
            this.container = $(".container");
            this.init();
            this.box = $("box");
            this.count = 6;
            this.timer = null;
      }
      init(){
            window.onresize = function(){
                  // 去抖
                  clearTimeout(this.timer);
                  this.timer = setTimeout(() => {
                        let clientWidth = document.documentElement.clientWidth;
                        this.count = parseInt(clientWidth/250);
                        this.container.style.width = this.count * 250 + "px";
                        // console.log(this.count)
                        this.setPosition();
                  }, 500);
            }.bind(this);
            this.getData();
      }
      getData(){
            let {ajax} = Utils;
            let url = "http://localhost/dt";
            let data = {
                  include_fields:"top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
                  filter_id: "手工DIY",
                  start : this.start
            };
            let res = ajax(url, {
                  data:data,
                  dataType:"json"
            })
            .then(res=>{
                  this.data = Array.from(res.data.object_list);
                  //获取到data数组后渲染到界面
                  this.render(this.data);
                  // 计算高度，每个box的宽度确定，高度根据当前的图片的缩放比例计算
                  //将所有的元素分组，获取到当前最高的元素， 从第一组开始标记，将所有的元素进行定位显示
                  this.setPosition();
      })
      }
      setPosition(){
            // console.log(this.count);
            let heightArr = [];
            for(let i = 0; i < this.count; i++){
                  var boxs = Array.from(this.container.children);
                  heightArr.push(boxs[i].offsetHeight);
            }
            for(let i = 0; i < boxs.length; i++){
                  boxs[i].style.position = "static";
            }
            // console.log(heightArr)
            // 获取到数组中最小的值和最小值的下标
            let min = Math.min.apply(false, heightArr);
            let minIndex = heightArr.indexOf(min);
            
            for(let i = this.count; i < boxs.length; i++){
                  boxs[i].style.position = "absolute";
                  boxs[i].style.top = heightArr[minIndex] +  "px";
                  boxs[i].style.left = 250*(i%(this.count)) + "px";
                  heightArr[minIndex] = heightArr[minIndex] + boxs[i].offsetHeight;
                  min = Math.min.apply(false, heightArr);
                  minIndex = heightArr.indexOf(min);      
            }
      }
      
      render(data){
            let str = "";
            let cHeight = 0;
            for(let i = 0, item; item = data[i++]; ){
                  cHeight = parseInt(item.photo.height*235/item.photo.width);
                  str += `<div class="box">
                              <div class="box-img" style = "height:${cHeight}px">
                                    <img src="${item.photo.path}">
                                    <u  style = "height:${cHeight}px"></u>
                              </div>
                              <div class="box-detail">
                                    <div class="title">
                                          ${item.msg}
                                    </div>
                              </div>
                        </div>`
           }
            this.container.innerHTML = str;
      }
}
new WaterFall()