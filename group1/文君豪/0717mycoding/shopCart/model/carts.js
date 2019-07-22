define(['jquery'],
    function (require, factory) {
        function Carts(){};
        $.extend(Carts.prototype,{
            init: function(){
                this.main =$(".goods-list");
                this.main.on("click" , ".add-cart" ,$.proxy(this.addCart , this) )
              
            },
            addCart : function(evt){
                var e = evt || event;
                var target = e.target || e.srcElement;
                var id = $(target).attr("data-id")
                this.saveCart(id);
            },
            saveCart:function (id){
                // var arr = [{
                //     id : id,
                //     count : 1
                // }]

                // localStorage.setItem("carts",JSON.stringify(arr));
                // console.log(localStorage)
                var s = localStorage.getItem("carts")
                if (s == null) {
                    var arr = [{
                        id: id,
                        count: 1
                    }]

                    localStorage.setItem("carts", JSON.stringify(arr));
                } else {
                    var la = JSON.parse(s);
                    var has_same_id = false;
                    
                    $.each(la, function (index, item) {
                        if (item.id === id) {
                            console.log(1)
                            item.count++;
                            has_same_id = true;
                            
                        }
                    })
                   if(!has_same_id){
                       la.push({
                           id:id,
                           count :1
                       })
                   }
                   localStorage.setItem("carts",JSON.stringify(la))
                   console.log(la)
                }
            }
        })
        return new Carts();

    });