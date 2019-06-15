var gt=document.querySelector(".gt");
var img=document.querySelectorAll(".img");
var i=0;
gt.onclick=function(){
    
    img[i].style="display:block;";
    if(i++<img.length-1){
        // img[i].style="display:block;";
        for(var j=0; j<img.length;j++){
            img[j].style="display:none;"
            
            // console.log(img.length);
        }
        img[i].style="display:block;";
        
    }
    else{
        i=0;
        for(var k=0; k<img.length;k++){
            img[k].style="display:none;"
            
            // console.log(img.length);
        }
        img[0].style="display:block;";
    }
    console.log(i,j);
    
    
}