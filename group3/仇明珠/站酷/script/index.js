//logo
var logoList=document.querySelectorAll(".logoList");
for(var i=0;i<logoList.length;i++){
    logoList[i].addEventListener("mouseenter",startChange);
    logoList[i].addEventListener("mouseleave",endChange);
}
function startChange(){
    this.children[0].style.color="#ffe300";
    if(this.querySelector("ul")!=null){
        this.querySelector("ul").style.display="block";
    }
    this.style.background="black";
}
function endChange(){
    this.children[0].style.color="black";
    this.style.background="#ffe300";
    if(this.querySelector("ul")!=null){
        this.querySelector("ul").style.display="none";
    }
}
var search=document.getElementById("search");
search.addEventListener("click",nosearch);
function nosearch(){
    search.style.display="none";
}
//banner
var container=document.getElementById("container");
    banner_Container=document.getElementById("banner_Container"),
    next_btn=document.getElementById("next"),
    prev_btn=document.getElementById("prev"),
    bannerList=banner_Container.children,
    index=0,
    timer=null;
next_btn.addEventListener("click",toNext);
prev_btn.addEventListener("click",toPrev);
container.addEventListener("mouseenter",function(){
    clearInterval(timer);
    prev_btn.style.display="block";
    next_btn.style.display="block";
})

container.addEventListener("mouseleave",function(){
    clearInterval(timer);
    timer=setInterval(toNext,2000);  
    prev_btn.style.display="none";
    next_btn.style.display="none";
})
timer=setInterval(toNext,2000);
function toNext(){
    if(index==bannerList.length-1){
        banner_Container.style.left=0;
        index=1;
    }else{
        index++;
    }
    animate();
}
function toPrev(){
    if(index==0){
        banner_Container.style.left=-((bannerList.length-1)*1130)+"px";
        index=bannerList.length-2;
    }else{
        index--;
    }
    animate();
}
function animate(){
    move(banner_Container,-1130 * index,"left");
}
function init(){
  banner_Container.style.width = 100 * bannerList.length + "%";
}
init();
var json=[
    {img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
     title:"杂拍",
     type:"摄影-风光",
     look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
     look_count:"4641",
     comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
     comment_count:"11",
     good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
     good_count:"369",
     author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
     author_name:"xiaodupi",
     time:"1天前"
    },
    {img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
     title:"MBYTE 福特野马 宽体套件 从设计到实车",
     type:"工业/产品-交通工具",
     look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
     look_count:"1.2万",
     comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
     comment_count:"61",
     good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
     good_count:"293",
     author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
     author_name:"Richardl1",
     time:"29天前"
    },
    {img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
     title:"武术",
     type:"纯艺术-速写",
     look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
     look_count:"4",
     comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
     comment_count:"494",
     good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
     good_count:"53",
     author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
     author_name:"MY蚂蚁",
     time:"1天前"
    },
    {img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
     title:"小人物，小世界",
     type:"插画-插画习作",
     look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
     look_count:"9220",
     comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
     comment_count:"66",
     good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
     good_count:"1132",
     author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
     author_name:"鱼雨桐",
     time:"2天前"
    },
    {img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
    title:"不一样的'西游记'",
    type:"动漫-短篇/四格漫画",
    look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
    look_count:"1.8万",
    comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
    comment_count:"81",
    good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
    good_count:"1004",
    author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
    author_name:"草木虫",
    time:"2天前"
   },
   {img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
   title:"杂拍",
   type:"摄影-风光",
   look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
   look_count:"4641",
   comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
   comment_count:"11",
   good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
   good_count:"369",
   author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
   author_name:"xiaodupi",
   time:"1天前"
  },
  {img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
   title:"MBYTE 福特野马 宽体套件 从设计到实车",
   type:"工业/产品-交通工具",
   look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
   look_count:"1.2万",
   comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
   comment_count:"61",
   good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
   good_count:"293",
   author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
   author_name:"Richardl1",
   time:"29天前"
  },
  {img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
   title:"武术",
   type:"纯艺术-速写",
   look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
   look_count:"4",
   comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
   comment_count:"494",
   good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
   good_count:"53",
   author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
   author_name:"MY蚂蚁",
   time:"1天前"
  },
  {img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
   title:"小人物，小世界",
   type:"插画-插画习作",
   look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
   look_count:"9220",
   comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
   comment_count:"66",
   good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
   good_count:"1132",
   author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
   author_name:"鱼雨桐",
   time:"2天前"
  },
  {img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
  title:"不一样的'西游记'",
  type:"动漫-短篇/四格漫画",
  look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
  look_count:"1.8万",
  comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
  comment_count:"81",
  good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
  good_count:"1004",
  author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
  author_name:"草木虫",
  time:"2天前"
 },
 {img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
 title:"杂拍",
 type:"摄影-风光",
 look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
 look_count:"4641",
 comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
 comment_count:"11",
 good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
 good_count:"369",
 author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
 author_name:"xiaodupi",
 time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
 title:"MBYTE 福特野马 宽体套件 从设计到实车",
 type:"工业/产品-交通工具",
 look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
 look_count:"1.2万",
 comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
 comment_count:"61",
 good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
 good_count:"293",
 author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
 author_name:"Richardl1",
 time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
 title:"武术",
 type:"纯艺术-速写",
 look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
 look_count:"4",
 comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
 comment_count:"494",
 good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
 good_count:"53",
 author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
 author_name:"MY蚂蚁",
 time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
 title:"小人物，小世界",
 type:"插画-插画习作",
 look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
 look_count:"9220",
 comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
 comment_count:"66",
 good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
 good_count:"1132",
 author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
 author_name:"鱼雨桐",
 time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"杂拍",
type:"摄影-风光",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4641",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"11",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"369",
author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"xiaodupi",
time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"MBYTE 福特野马 宽体套件 从设计到实车",
type:"工业/产品-交通工具",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.2万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"61",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"293",
author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"Richardl1",
time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"武术",
type:"纯艺术-速写",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"494",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"53",
author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"MY蚂蚁",
time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"小人物，小世界",
type:"插画-插画习作",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"9220",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"66",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1132",
author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"鱼雨桐",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"杂拍",
type:"摄影-风光",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4641",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"11",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"369",
author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"xiaodupi",
time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"MBYTE 福特野马 宽体套件 从设计到实车",
type:"工业/产品-交通工具",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.2万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"61",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"293",
author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"Richardl1",
time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"武术",
type:"纯艺术-速写",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"494",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"53",
author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"MY蚂蚁",
time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"小人物，小世界",
type:"插画-插画习作",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"9220",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"66",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1132",
author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"鱼雨桐",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"杂拍",
type:"摄影-风光",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4641",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"11",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"369",
author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"xiaodupi",
time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"MBYTE 福特野马 宽体套件 从设计到实车",
type:"工业/产品-交通工具",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.2万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"61",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"293",
author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"Richardl1",
time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"武术",
type:"纯艺术-速写",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"494",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"53",
author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"MY蚂蚁",
time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"小人物，小世界",
type:"插画-插画习作",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"9220",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"66",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1132",
author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"鱼雨桐",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"杂拍",
type:"摄影-风光",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4641",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"11",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"369",
author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"xiaodupi",
time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"MBYTE 福特野马 宽体套件 从设计到实车",
type:"工业/产品-交通工具",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.2万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"61",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"293",
author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"Richardl1",
time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"武术",
type:"纯艺术-速写",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"494",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"53",
author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"MY蚂蚁",
time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"小人物，小世界",
type:"插画-插画习作",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"9220",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"66",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1132",
author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"鱼雨桐",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0174025ca5d01da8012141685bf1d9.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"杂拍",
type:"摄影-风光",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4641",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"11",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"369",
author_img:"https://img.zcool.cn/community/04253658ccc2d1a801219c77021d16.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"xiaodupi",
time:"1天前"
},
{img:"https://img.zcool.cn/community/015dda5c81d8a1a80120af9ac44a45.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"MBYTE 福特野马 宽体套件 从设计到实车",
type:"工业/产品-交通工具",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.2万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"61",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"293",
author_img:"https://img.zcool.cn/community/031eaec5bfad739a801209252928ca6.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"Richardl1",
time:"29天前"
},
{img:"https://img.zcool.cn/community/01f3205ca89f22a801214168a5e2af.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"武术",
type:"纯艺术-速写",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"4",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"494",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"53",
author_img:"https://img.zcool.cn/community/00d4b45afa5c6ba801207ab40b9177.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"MY蚂蚁",
time:"1天前"
},
{img:"https://img.zcool.cn/community/017b525ca5cbc3a801208f8b701d3c.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"小人物，小世界",
type:"插画-插画习作",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"9220",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"66",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1132",
author_img:"https://img.zcool.cn/community/041abf56359219000001272076be14.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"鱼雨桐",
time:"2天前"
},
{img:"https://img.zcool.cn/community/0197015ca58070a801214168c46474.jpg@260w_195h_1c_1e_1o_100sh.jpg",
title:"不一样的'西游记'",
type:"动漫-短篇/四格漫画",
look:"https://static.zcool.cn/git_z/build/images/svg/card-liulan.svg?v=1",
look_count:"1.8万",
comment:"https://static.zcool.cn/git_z/build/images/svg/card-pinglun.svg?v=1",
comment_count:"81",
good:"https://static.zcool.cn/git_z/build/images/svg/card-zan.svg?v=1",
good_count:"1004",
author_img:"https://img.zcool.cn/community/04d2eb56cfa98a000001608eab32d2.jpg@80w_80h_1c_1e_1o_100sh.jpg",
author_name:"草木虫",
time:"2天前"
}
]
var str = "";
var count=0;
var worklist=document.getElementById("worklist");
for(var i = 0 ; i < json.length ; i ++){
    count++;
    if(count%5==0){
        str += '<div class="box" id="box">'+
                  '<img src="'+ json[i].img +'" alt="">'+
                  '<a class="title" href="#">' + json[i].title + '</a>'+
                  '<p>' + json[i].type + '</p>'+
                  '<p id="view"><span class="view"><img class="look"src="'+json[i].look+'" alt="">'+json[i].look_count+
                  '</span><span class="view"><img class="comment"src="'+json[i].comment+'" alt="">'+json[i].comment_count+'</span><span class="view"><img class="comment"src="'+json[i].good+'" alt="">'+json[i].good_count+'</p>'
                  +'<p id="author"><a href="#"><img class="author" src="'+json[i].author_img+'"alt=""><span id="authorName">'+json[i].author_name+'</span></a><span id="time">'+json[i].time+'</span></p>'
                  +'</div>'

    }else{
        str += '<div class="box">'+
        '<img src="'+ json[i].img +'" alt="">'+
        '<a class="title" href="#">' + json[i].title + '</a>'+
        '<p>' + json[i].type + '</p>'+
        '<p id="view"><span class="view"><img class="look"src="'+json[i].look+'" alt="">'+json[i].look_count+
        '</span><span class="view"><img class="comment"src="'+json[i].comment+'" alt="">'+json[i].comment_count+'</span><span class="view"><img class="comment"src="'+json[i].good+'" alt="">'+json[i].good_count+'</p>'
        +'<p id="author"><a href="#"><img class="author" src="'+json[i].author_img+'"alt=""><span id="authorName">'+json[i].author_name+'</span></a><span id="time">'+json[i].time+'</span></p>'
        +'</div>'
    }
       
}
worklist.innerHTML = str;
var select=document.getElementById("select");
var selectlist=select.querySelectorAll("a");
var first=document.getElementById("first");
var end=document.querySelector(".end");
var last=document.getElementById("last");
var on=document.getElementById("on");
for(var i=1;i<selectlist.length-1;i++){
    selectlist[i].addEventListener("mouseenter",changecolor);
    selectlist[i].addEventListener("mouseleave",recolor);
    selectlist[i].addEventListener("click", remaincolor);   
}
function changecolor(){
    this.style.background="#ffe300";
    this.style.color="#333";
}
function recolor(){
    this.style.background="white";
    this.style.color="#999";   
}
function remaincolor(){
    for(var i=1;i<selectlist.length-1;i++){
       selectlist[i].className="";
    }
    this.className="active";
    if(this.getAttribute("data-index")==1){
        last.style.display="none";
        on.style.display="block";
    }
    if(this.getAttribute("data-index")==9){
        last.style.display="block";
        on.style.display="none";
    }
    if(this.getAttribute("data-index")!=1&&this.getAttribute("data-index")!=9){
        last.style.display="block";
        on.style.display="block";
    };
}
var like=document.querySelector(".like");
var aList1=document.querySelectorAll(".apic");
var alist2=document.querySelectorAll(".like div p a");
for(var i=0;i<aList1.length;i++){
  aList1[i].addEventListener("mouseenter",getOpa);   
  aList1[i].addEventListener("mouseleave",appOpa)
}
function getOpa(){
   this.style.opacity="0.8";
}
function appOpa(){
    this.style.opacity="1";
}
for(var i=0;i<alist2.length;i++){
    alist2[i].addEventListener("mouseenter",getcolor);
    alist2[i].addEventListener("mouseleave",discolor);
}
function getcolor(){
    this.style.color="#d36f16"
}
function discolor(){
    this.style.color="#282828";
}
var box_left=document.getElementById("footer_wrapper_top_left");

var box_leftList=box_left.querySelectorAll("a");
console.log(box_leftList);
for(var i=1;i<box_leftList.length;i++){
    box_leftList[i].addEventListener("mouseenter",appearco);
    box_leftList[i].addEventListener("mouseleave",disappearco);
}
box_leftList[0].addEventListener("mouseenter",jump);
box_leftList[0].addEventListener("mouseleave",nojump);
var p=box_left.querySelector("p");
function jump(){
   this.style.color="#999";
   p.style.display="block";
}
function nojump(){
    this.style.color="#666";
    p.style.display="none";
 }
function appearco(){
    this.style.color="#999";
}
function disappearco(){
    this.style.color="#666";
}