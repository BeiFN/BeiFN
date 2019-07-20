define([
    'jquery',
    './loadData'
], function($, loadData) {
    'use strict';
    function Render(){}
    $.extend(Render.prototype,{
        init:function(list,pageNum,showNum,type){
            this.pagination=$(".pagination");
            if(type=="img"){
                list=this.cutData(list,pageNum,showNum);
                return this.renderImg(list,pageNum,showNum);
            };
            if(type=="btn"){
                return this.renderBtn(list,pageNum,showNum);
            }
        },
        cutData:function(list,pageNum,showNum){
            var min=(pageNum-1)*5;
            var max=pageNum*5-1;
            list= list.filter(function(item,index){
                return index>=min&&index<=max;
            })
            return list;
        },
        renderImg:function(list,pageNum,showNum){
            var html='';
            $.each(list,function(index,item){
                html+=` 
                <div class="box">
                    <div class="img-box">
                        <img src="${item.cover}" alt="">
                    </div>
                    <div class="title-box">
                        <a href="">${item.title}</a>
                      <span class="fire"></span>
                    </div>
                </div>`
            });
            return html;
        },
        renderBtn:function(list,pageNum,showNum){
            this.count=Math.ceil(list.length/showNum);
            if(this.pagination.children.length===this.count){
                for(let i=0;i<this.count;i++){
                    if((i+1)===this.pageNum){
                        this.pagination.children[i].className="active";
                    }else{
                        this.pagination.children[i].className="";
                    }
                }
                return false;
            }else{
                var html=``;
                for(let i=0;i<this.count;i++){
                    if((i+1)===pageNum){
                        html+=`<span class="active">${i+1}</span>`
                    }else{
                        html+=`<span>${i+1}</span>`
                    }
                }
                return html;
            }
        }
    })
    return new Render();
});