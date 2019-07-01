var email =$("#email");
var username=$("#username");
var passward=$("#password");

function $(selector){
    var res =null;
    return (res =document.querySelectorAll(selector)).length===1?res[0]:res;

}

function validateEmail(){
     var value =this.value;

     var  reg =/^[0-9a-z]\w{5,19}@[a-z0-9]{2,10}\.(com|cn|net)$/i;


     if(reg.test(value)){
         this.style.borderColor="yellowgreen";

     }else{
         this.style.borderColor="red";
     }
}
     function validatePassword(){
         var value =this.value;
         var reg=/^[\!\@\#\$\%\^\&\*\(\)0-9a-z_\-]{6,}$/i;
         if(reg.test(value)){
             this.style.borderColor="green";
             var score=0;
             if(/\d/.test(value)){
                 score++;
             }
             if(/[a-z]/i.test(value)){
                 score++;
             }
             if(/[\!\@\#\$\%\^\&\*\(\)\_\-]/.test(value)){
                 score ++;
             }
             console.log(score);
             switch(score){
                 case 1:this.style.borderColor="red";
                 break;
                 case 2:this.style.borderColor="orange";
                 break;
                 case 3:this.style.borderColor="green";
                 break;
                 default:this.style.borderColor="red";
                 break;
             }
         }else{
             this.style.borderColor="red";
         }
     }
     function validateUsername(){
         var value =this.value;
         var reg =/^[\u4e00-\u9fa5a-z0-9_\-]{4,20}$/;
         if(reg.test(value)){
             if(/^\d+$/.test(value)||/\-$/.test(value)){
                 this.style.borderColor="red";
             }else{
                 this.style.borderColor="green";
             }
         }else{
             this.style.borderColor="red";
         }
     }
     email.addEventListener("blur",validateEmail);
     username.addEventListener("blur",validateUsername);
     password.addEventListener("blur",validatePassword);
