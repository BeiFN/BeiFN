/**** WaterFall View 瀑布流布局
 *       瀑布流的实现不应该关心数据的获取。
 *     
 *       给出基本的数据 WFV 应关心瀑布流的逻辑处理
 *      
 *   实现： 等宽型 瀑布流的实现原理
 *        1. 在页面上我们应该知道基本的盒子的宽度 baseBoxWidth
 *        2. 获取可视窗口的宽度，进行动态的计算   clienWidth
 *        3. 根据可视宽度来计算在可视宽度下 基本盒子可以在一行显示几列 colCount
 *        4. 根据第一行动态生成记录每一列已经多高的数据 columnHeightArray(column)
 *        5. 每次在最低的列上依靠定位添加元素
 *        -------------------------------------
 *   
 *          
 *   堆糖:实例
 *     url:  https://www.duitang.com/napi/blog/list/by_filter_id/
 * 
 * 
 */


//  加载图片

// https: //upload-images.jianshu.io/upload_images/9395769-831e87a5809ea63d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

// // 远程数据的获取 Read Data
/**远程数据的获取类
 *
 *
 * @class RemoteData
 * 
 * 
 *  @return 返回远程数据 await Promise 需要异步函数接收
 */
class RemoteData {
    /**
     * 
     * @param {远程连接url*string} url 
     * @param {数据配置* data：提交参数 ，dataType：" json" 回传数据类型,dataPath = []渲染的数据路径层层递进 } param1 
     */
    constructor(url = "", {
        data = {},
        dataType = "json",
        dataPath = []
    } = {}) {
        if (url.length < 1) {
            return this.getDta;
        }

        this.url = url;
        this.data = data;
        this.dataType = dataType;
        this.dataPath = dataPath;
        return ajax(url, {
            dataType,
            data,
            success: false
        }).then(res => {
            this.sourceData = res;
            dataPath.forEach(attr => {
                res = res[attr] ? res[attr] : res;
                this.res = res;
            })
            return this;
        });


    }


    getData({
        data = {},
        url = this.url,
        dataPath = this.dataPath,
        dataType = this.dataType
    } = {}) {
        let dataOdd = JSON.parse(JSON.stringify(this.data));
        data = Object.assign(dataOdd, data);
        let set = {
            data,
            dataType,
            dataPath,
        }
        return new RemoteData(url, set);
    }

}





/**
 * @class WFV 瀑布流布局 插件
 *  用户自定义数据优先
 *  支持远程数据接口  RemoteData
 */
class WFV {
    constructor({
        container = ".container",
        wrapper = ".wrapper",
        data = {},
        boxSize = 250,
        remoteData = false
    } = {}) {
        this.container = $(container);
        this.wrapper = $(wrapper);
        this.template = "";
        this.data = {};
        this.colCount = 0;
        this.baseBoxWidth = boxSize;
        this.columnHeightArray = [];
        this.ini(data, remoteData);
        this.cWidth = document.documentElement.clientWidth;
        this.cHeight = document.documentElement.clientHeight;
        this.startNext = 0;
    }
    //初始化WFV
    async ini(data, remoteData) {
        if (typeof data === "object" && Object.keys(data).length > 0) {
            this.data = data //当前本地数据 或用户自定数据接口
        } else if (remoteData) {
            this.remoteRequest = remoteData;
            let remoteRequest = (await this.remoteData(remoteData));
            this.data = remoteRequest.res; // 获取远程数据
            this.startNext = remoteRequest.sourceData.next_start;
        } else {
            throw Error("数据为空 无法渲染哦！");
        }
        this.viewUpdate(); //视图更新
        window.on("scroll", async (ev) => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //  console.log(scrollTop + this.cWidth);
            let min = this.columnHeightArray.min(true);
            this.showImg(scrollTop);
            // console.log();
            if (scrollTop + this.cHeight >= min - 200) {

                let dataAll = await (await this.remoteRequest).getData({
                    data: {
                        start: this.startNext
                    }
                });
                this.startNext = dataAll.sourceData.data.next_start;
                this.data = dataAll.res;
                this.viewUpdate();

                console.log("该加载新数据了昂！");
                console.log(this.startNext);



            }

        });

        window.addEventListener("resize", this.viewUpdate.bind(this)); //重新渲染视图更新
        this.showImg(0);
    }



    viewUpdate() {
        this.render(this.data); //数据渲染
        this.columnHeightArray = []; //清除列高数组
        // 获取容器宽度
        let contentWidth = this.container.offsetWidth ? this.container.offsetWidth : this.cWidth;
        // 计算列数
        this.colCount = Math.floor(contentWidth / this.baseBoxWidth);
        this.wrapper.style.width = this.colCount * this.baseBoxWidth + "px";
        this.columnHeightArray = this.sortView();

        console.log("view updata");
    }

    // 数据渲染
    render(list) {
        let loadimg = "https://upload-images.jianshu.io/upload_images/9395769-831e87a5809ea63d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
        let html = "";
        for (var i = 0; i < list.length; i++) {
            let scaleHeight = parseInt(235 / list[i].photo.width * list[i].photo.height);
            html += `<div class="box">
                          <div class="box-img" style="height:${scaleHeight}px">
                                <img src="${loadimg}" data-src="${list[i].photo.path}" alt="">
                                <u style="height:${scaleHeight}px"></u>
                          </div>
                          <div class="box-detail">
                                <div class="title">
                                      ${list[i].album.name}
                                </div>
                          </div>
                    </div>`
        }
        this.wrapper.innerHTML += html;
    }

    // 视图瀑布流排列
    sortView() {
        let heightArray = [];
        let boxList = Array.from(this.wrapper.children);
        boxList.forEach((e, index) => {
            if (index < this.colCount) {
                heightArray.push(Math.ceil(e.offsetHeight))
            } else {
                let min = Math.min.apply(false, heightArray),
                    minIndex = heightArray.indexOf(min);
                e.style.position = "absolute";
                e.style.left = minIndex * this.baseBoxWidth + "px";
                e.style.top = min + 20 + "px";
                e.style.marginLeft =
                    heightArray[minIndex] += (e.offsetHeight + 20);
            };
        });

        this.wrapper.style.height = Math.max.apply(false, heightArray) + 60 + "px";

        return heightArray;
    }

    // 显示图片
    showImg(scrollTop) {
        Array.from(this.wrapper.children).forEach(box => {
            let img = box.$(".box-img img");
            let imgTop = img.style.top;
            // console.log(img.style.top)
            if (scrollTop + this.cHeight >= imgTop - 300) {
                let src = img.getAttribute("data-src");
                // console.log(img);
                img.src = src;
            }
        });

    }

    // 远程数据请求
    async remoteData(remoteData) {
        if (remoteData instanceof Promise) {
            return remoteData;
        } else if (remoteData instanceof Object) {
            return new RemoteData(remoteData.url, remoteData);
        } else if (typeof remoteData === "string") {
            return new RemoteData(remoteData);
        } else {
            throw TypeError("请设定正确远程数据类型 Promise 或 URL 字符串");
        }
    }
}

let remoteData = new RemoteData("http://localhost/duitang", {
    data: {
        include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
        filter_id: "插画绘画",
        start: 24,
        _: Date.now()
    },
    dataPath: ["data", "object_list"]
});

new WFV({
    remoteData: remoteData
});





// 加载模拟本地处理数据
// console.log(dtData.data.object_list);

// let localData = dtData.data.object_list;

// new WFV({remoteData:remoteData});

// new WFV({
//     data: localData
// });
// new WFV({
//     data: localData,
//     remoteData: remoteData
// });
/**
"http://localhost/duitang"
    data: {
    include_fields: "top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count",
    filter_id: "插画绘画",
    start: ,
    _: Date.now()
    }
 */