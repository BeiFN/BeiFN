
	// * 
    // 根据输入的数字，返回星期几
    var date = 18;
    var day = 18 % 7;
    if(day===0){
        console.log(date+"是星期日");
    }else{
        console.log(date+"日是星期"+day)
    }

    //     * 
    // 根据输入月份，输出每月天数
    var mounth = 5;
    var year = 9012;
    if( mounth===1 || mounth===3 || mounth===5 || mounth===7 || mounth===8 || mounth===10 || mounth===12){
        console.log(mounth + "月有31天");
    }
    if( mounth===4 || mounth===6 || mounth===9 || mounth===11){
        console.log(mounth + "月有30天");
    }
    if(mounth===2){
        if(year%400===0 || year%4===0&&year%100!=0){
            console.log(year + "2月有29天");
        }else{
            console.log(year + "2月有28天");
        }
    }


    //     * 
    // 判断一个整数是偶数还是奇数，并输出判断结果
    var num =19;
    if(!(num%2)){
        console.log(num+"是偶数");
    }else{
        console.log(num+"是奇数");
    }


    //     * 
    // 开发一款软件，根据公式（身高-108）*2=体重，可以有10斤左右的浮动。来观察测试者体重是否合适
    var weight = 150;
    var height = 173;
    var stant = (height-108)*2;
    if(weight>=stant-10 && weight<=stant+10){
        console.log("标准体重");
    }else{
        console.log("非标准体重");
    }
    
    
    
    
    //     * 
    // 根据一个数字日期，判断这个日期是这一年的第几天
    
    
    //             例如： "20160211"，计算后结果为42

    var date = "20160211";
    var year1 = date/10000;
    var day1 = date%100;
    var mouth1 = parseInt(date%10000 / 100);
    console.log(year1,mouth1,day1);
    if(year1%400===0 || year1%4===0&&year1%100!=0){
        
    }
    
    
    
    
    
    
    
    // var x = 2;
    // switch(x){
    //      case 1 : console.log(1);
    //      case 2 : console.log(2);
    //      default : break;
    //      case 3 : console.log(3);
    // }
    // 这段小程序的输出结果是2
    
    
    
    
    
    
    //     * 
    // 计算器案例
    
    
    
    
    //     * 
    // 编写一个页面表单，使用JS判断输入内容是否合法
    