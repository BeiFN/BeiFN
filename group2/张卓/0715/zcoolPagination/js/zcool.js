// 对班级进行分组 ;
// 6 人一组编号;
// 共 55 人有多少组; 
// 55 / 6 = 9 余 1 
// 如果有余数就多加一组;
// 10 组;

// 1.  0 ~ 4 
// 2.  5 ~ 9
// 3. 10 ~ 14
// 4. 15 ~ 19 
// n.  5 * (n-1) ~ 5n - 1;

// 渲染         ;   box , 按钮;   ejs;  
// ejs.render( template , data);
// // 事件      ;   事件委托;
// 数据根据页码不同 => 页码影响数据;
// // 重新渲染  ; 
// ejs.render( template , data);
// 页码         ; 

let { ajax, $, on ,ejs } = Utils;

class Pagination {
      constructor({

            //图片列表
            imgList = ".image-list",
            //分页栏
            page_wrapper = ".pagination",
            //通过ajax访问获取数据 有路径和data需要拼接的参数
            bigData = {
                  url: "http://localhost/zc",
                  data: {
                        pageSize: 100,
                        contentId: ("" + Date.now()).slice(6) + "_3",
                        day: new Date().toISOString().slice(0, 10)
                  }
            },
            //模板引擎 通过ejs.render(tamplate,data)
            template = $("#template").innerHTML,
            //设置当前页
            pageNow = 1,
            //设置一页显示几个
            pageSize = 10
      } = {}) {
            //将所有传进来的参数让全局可以访问
            this.imgList = $(imgList);
            this.page_wrapper = $(page_wrapper)
            this.url = bigData.url
            this.data = bigData.data;
            this.template = template;
            this.pageNow = pageNow
            this.pageSize = pageSize;
            this.init();
      }
      //整合将所有可能变化的参数变成这里的参数传进来
      async init() {
            // 以数据加载开始;
            // 2. 事件委托;+
            on(this.page_wrapper, "click", (evt) => {
                  //这个回调函数来整合所有的事件
                  let e = evt || event;
                  let target = e.target || e.srcElement
                  this.target = target;
                  //toIndex函数改变索引
                  this.toIndex(this.target.index())
                  //render渲染图片
                  this.render()
                  //渲染按钮
                  this.renderBtn()
            }, "span")
            //加载数据比较慢 我们放到异步的程序中执行
            this.res = await this.loadData();

            // console.log(res);
            //获取数据中所有数组的长度
            //渲染页面
            this.render();
            //渲染按钮
            this.renderBtn();

      }
      // 加载数据;
      async loadData() {
            //设置ajax请求
            let res = await ajax(this.url, { data: this.data, dataType: "json" })
            // console.log(res+"-----"+res.data)
            //返回await之后的结果 
            return res
      }
      // 渲染页面;
      render() {
            //获取请求的数据中的有用的data.contents信息
            this.arr = this.res.data.contents ? this.res.data.contents : ""
            // 处理data;  裁剪数据 需要其中的一部分数据
            this.data = this.interceptData(this.arr)
            //将裁剪的数据通过模板引擎进行拼接
            let html = ejs.render(this.template, {data:this.data})
            //放置到页面中
            this.imgList.innerHTML = html;
      }
      //裁剪数据的;
      interceptData(data) {
            // 计算当前页的最小值
            let min = this.pageSize * (this.pageNow - 1)
            // 计算当前页的最大值
            let max = this.pageSize * this.pageNow - 1
            // 根据返回值是true还false判断是否留下该值
            data = data.filter((item, index) => {
                  return index >= min && index <= max
            })
            return data
      }
      // 渲染按钮;
      renderBtn() {
            //计算总共有多少页
            this.total = Math.ceil(this.arr.length / this.pageSize)
            //获取page_wrapper下的所有按钮
            let btns = this.page_wrapper.children
            if (btns.length == this.total) {
                  // 不用重新渲染按钮，只需要切换active就可以了;

                  for (var i = 0; i < Array.from(btns).length; i++) {
                        //如果是当前页
                        if (i + 1 === this.pageNow) {
                              //说明已经渲染过了 现在只要重新给点击的元素赋值就好
                              btns[i].className = "active"
                        } else {
                              btns[i].className = ""
                        }
                  }
                  return false;
            }
            // 渲染按钮;
            let html = ""
            for (var i = 0; i < this.total; i++) {
                  if (i == 0) {
                        html += `<span class=active>${i + 1}</span>`
                  } else {
                        html += `<span>${i + 1}</span>`
                  }
            }

            //将生成的页码放入wrapper中
            this.page_wrapper.innerHTML = html
      }
      // 切换页码;
      toIndex(index) {
            this.pageNow = index + 1
      }
}

new Pagination()