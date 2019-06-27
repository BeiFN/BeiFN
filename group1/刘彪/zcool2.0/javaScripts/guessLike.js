var json =[
        {
            image:"https://img.zcool.cn/community/015c965ce22f27a801214168942445.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            text:"距离上次收到小纸条有多长时间了？"       
        },
        {
            image:"https://img.zcool.cn/community/01bb385d0064a6a801205e4b66558d.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            text:"距离上次收到小纸条有多长时间了？"       
        },
        {
            image:"https://img.zcool.cn/community/01408a5bfba6a1a80120925247d1f3.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            text:"距离上次收到小纸条有多长时间了？"       
        },
        {
            image:"https://img.zcool.cn/community/0189255cf9f321a801213ec2741ab6.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            text:"距离上次收到小纸条有多长时间了？"       
        },
        {
            image:"https://img.zcool.cn/community/0122165cf7d447a801205e4b9db9fe.jpg@260w_195h_1c_1e_1o_100sh.jpg",
            text:"距离上次收到小纸条有多长时间了？"       
        }
]
{/* <div class="likebox">
<a href="" class="pho"> <img
        src="https://img.zcool.cn/community/015c965ce22f27a801214168942445.jpg@260w_195h_1c_1e_1o_100sh.jpg"
        alt=""></a>
<h4><a href=""> 距离上次收到小纸条有多长时间了？</a></h4>
</div> */}
var str = "";
var divStr = "";
var guess = document.getElementsByClassName("guess")[0];
for(var i = 0;i<json.length;i ++){
    if(i === json.length-1){
        divStr = '<div class="likebox last">'
    }
    else{
        divStr = '<div class="likebox">'
    }
    str =  divStr+
           '<a href="" class="pho"> <img src="'+json[i].image+
           '"alt=""></a><h4><a href="">'+json[i].text+'</a></h4></div>'

 guess.innerHTML +=str;
}



