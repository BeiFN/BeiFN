      export default {
            init : function(){
                  return $.ajax("./data/data.json",{dataType:"json"});
            }
      }