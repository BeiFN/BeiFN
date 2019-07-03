function getRandomColor(){
    var r = Math.round(255*Math.random()),
        g = Math.round(255*Math.random()),
        b = Math.round(255*Math.random())

    return "rgb("+r+","+g+","+b+")"
}