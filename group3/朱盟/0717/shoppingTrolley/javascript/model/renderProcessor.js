define([
    'jquery',
    "conf",
    "dao"
], function ($, conf, dao) {
    'use strict';
    class RenderEngine {
        constructor(data, type, template, remotedata) {
            this.template = conf.template[template];
            this.data = data;
            this.html = "";
            this.initailize(data, type);
            return this;
        }
        initailize(data, type) {
            if (type === "goodslist") {
                (this.html = this.renderGoodsList(data));
                return this.html
            }
            if (type === "cartslist") {
                (this.html = this.renderCartsList(data));
                return this.html;
            }
        }
        renderGoodsList(list) {
            var html = "";
            $.each(list, function (index, item) {
                // console.log(item);
                html += `  <div class="col-md-3 goods-box">
                                          <div class="goods-img">
                                                <img src="${item.thumb_url}" alt="">
                                          </div>
                                          <p>
                                          ${item.goods_name}
                                          </p>
                                          <div class="goods-detail">
                                                <span>￥${ (item.group_price/100).toFixed(2)}</span>
                                                <del>${ (item.market_price/100).toFixed(2)}￥</del>
                                                <em>${item.sales_tip}</em>
                                          </div>
                                          <div class="goods-btn">
                                                <button class="add-cart btn btn-danger"
                                                data-id=${item.goods_id}
                                                >加入购物车</button>
                                          </div>
                                    </div>`;
            })
            return html;
        }


        renderCartsList(list) {

            var la = dao.db("shopcart")

            list = list.filter(function (goods_item) {
                return la.some(function (carts_item) {
                    if (carts_item.id == goods_item.goods_id) {
                        goods_item.count = carts_item.count;
                        return true;
                    };
                })
            })
            var html = "";
            list.forEach(function (item) {
                html += `  <div class="col-md-12 carts-item">
                                    <div class="carts-img">
                                          <img src="${item.thumb_url}" alt="">
                                    </div>
                                    <p class="carts-title">
                                    ${item.goods_name}
                                    </p>
                                    <div class="carts-details" data-id="${item.goods_id}">
                                          <button class="btn btn-default btn-reduce">-</button>
                                          <span>${item.count}</span>
                                          <button class="btn btn-default btn-add">+</button>
                                    </div>
                                    <div class="carts-total-price">￥${ parseInt(item.count * item.group_price / 100)}</div>
                              </div>`
            })

            return html;
        }


        render() {

        }


        Parser(template, data) {
            var html = "";
            var regExe = /<%[^=](.*?)%>/g;
            var regVar = /<%=(.*?)%>/g;
            var outExe = template.replace(regExe, `\`);$1 print(\``);
            outExe = outExe.replace(regVar, `\`); print($1); print(\``);
            outExe = `print(\`${outExe}\`)`;
            eval(outExe);

            function print(str) {
                html += str;
            }
            return html;
        }

    }

    return function (data, type) {
        return new RenderEngine(data, type);
    };
});