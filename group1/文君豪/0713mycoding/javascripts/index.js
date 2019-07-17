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

let { ajax , $ , on , ejs} = Utils;


class Pagination{
      constructor() {
            
      }
      //用await函数必须用async
      //async+函数=》会让函数变成一个异步函数，该类异步函数的会自动返回一个promise类型
     //如果函数内部有返回一个promise，那么会返回这个你手动生成的函数，结果是promise
     //生成的resolve 或者reject
     //awit + promise （await必须跟async一起使用 所以一定会与promise在一起使用）=> 进行一个计算，计算的结果就是resolve的参数
     //
      async init(){
          this.list_wrapper = $(".image-list")
        this.res = await this.loadData();
        this.render();
      }
      async loadData(){
        let url = "http://localhost/zc";
        let data = {
            pageSize:5,
            contentId : "5948279_3",
            day : new Date().toISOString().slice(0,10),
        }
        let res = await ajax (url,{data,dataType:"json"});
     //   console.log(res)
        return res;
      }
      render(){
            let  data = this.res.data.contents;
            let template = `
                        <%  for(var i = 0 , item ; item = data[i]; i++) {%>
                              <div class="box">
                                    <div class="box-img">
                                          <img src="<%= item.cover %>" alt="">
                                    </div>
                                    <div class="box-title">
                                          <a href="">
                                                <%= item.title %>
                                          </a>
                                          <span class="fire"></span>
                                    </div>
                              </div>
                        <% } %>
                        `;
        var html = ejs.render(this.template , {data : data})
        this.list_wrapper.innerHTML = html;
      }
}

