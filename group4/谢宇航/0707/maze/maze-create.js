//数据结构
class Structure {
    constructor() {
        this.structure = [];
    }
    push(pos) {
        if (Math.random() < Structure.patternLast)
            this.structure.push(pos);
        else
            this.structure.unshift(pos);
    }
    pop() {
        if (Math.random() < Structure.patternFirst)
            return this.structure.pop();
        else
            return this.structure.shift();
    }
    empty() {
        return !this.structure.length;
    }
    static patternLast = 0.5;
    static patternFirst = 0.5;
}
//迷宫生成
class Maze {
    // row, col, 迷宫的行数 列数
    // paintProgressTime, 开启可视化展示时的间隔
    // width = 500, height = 500 迷宫的宽高 默认500px

    // 此demo所实现的迷宫为固定出口，固定入口， 解有且只有一个，行与列均为奇数
    // demo中所有坐标相关的变量均代表的是第几行 第几列 从0开始
    constructor(row, col, paintProgressTime = 100, morePath = 0.05, width = 500, height = 500) {
        // Maze行列
        this.row = row;
        this.col = col;
        // 迷宫的长宽
        this.width = width;
        this.height = height;
        // 设置路与墙
        this.road = ' ';
        this.wall = '#';
        // 入口坐标（1, 0）
        this.entryX = 1;
        this.entryY = 0;
        // 出口坐标（倒数第二行， 最后一列）
        this.outX = row - 2;
        this.outY = col - 1;
        // 迷宫数据
        this.maze = [];
        // 各节点的遍历情况
        this.visited = [];
        // 设置上下左右的偏移坐标值（上右下左）
        this.offset = [[-1, 0], [0, 1], [1, 0], [0, -1]];
        // 可视化展示间隔
        this.paintProgressTime = paintProgressTime;
        this.i = 0;  // 可视化展示索引
        // 多解
        this.morePath = morePath;
    }

    //初始化迷宫数据
    initData(maze) {
        for (let i = 0; i < this.row; i++) {
            maze[i] = new Array(this.col).fill(this.wall);  // 初始化二维数组
            this.visited[i] = new Array(this.col).fill(false);  // 初始化访问状态为false
            for (let j = 0; j < this.col; j++) {
                // 横纵坐标均为奇数是路
                if (i % 2 === 1 && j % 2 === 1) {
                    maze[i][j] = this.road;
                }
            }
        }
        //入口出口也是路
        maze[this.entryX][this.entryY] = this.road;
        maze[this.outX][this.outY] = this.road;

        return maze;
    }

    //初始化迷宫DOM
    initDOM(maze) {
        let mazeDiv = document.createElement("div");
        Object.assign(mazeDiv.style, {
            width: this.width + "px",
            height: this.height + "px",
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "20px",
            margin: "50px auto 20px"
        })
        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                let mazeSpan = document.createElement("span");
                mazeSpan.dataset.index = i + '-' + j;
                Object.assign(mazeSpan.style, {
                    width: (this.width / this.col).toFixed(2) + "px",
                    height: (this.height / this.row).toFixed(2) + "px",
                    background: maze[i][j] === this.wall ? "yellowgreen" : "#fff"
                })
                mazeDiv.appendChild(mazeSpan);
            }
        }
        document.body.appendChild(mazeDiv);
    }

    // 初始化迷宫
    initMaze() {
        // 迷宫数据
        let maze = this.initData(this.maze);
        // 初始化迷宫DOM
        this.initDOM(maze);
    }

    //是否打开可视化
    resetMazeShow(x, y, type) {
        //不需要则正常渲染
        if (!this.paintProgressTime) {
            this.resetMaze(x, y, type);
            return false;
        }
        this.i++;  //可视化
        //利用异步队列特性来实现可视化
        setTimeout(() => {
            this.resetMaze(x, y, type);
            // console.log(2);
        }, this.i * this.paintProgressTime)
    }

    // 重新渲染迷宫 改变的格子坐标为（i, j）
    resetMaze(x, y, type) {
        // 只有不越界才做处理
        if (this.isArea(x, y)) {
            //改变maze中的type
            this.maze[x][y] = type;
            // 改变dom节点的颜色
            let changeSpan = document.querySelector(`span[data-index="${x}-${y}"]`);
            changeSpan.style.background = type === this.wall ? yellowgreen : "#fff";
        }
    }

    // 判断是否越界
    isArea(x, y) {
        return x > 0 && x < this.row - 1 && y > 0 && y < this.col - 1 || x == this.entryX && y == this.entryY || x == this.outX && y == this.outY;
    }

    // 渲染迷宫
    paintMaze() {
        //初始化
        this.initMaze();

        let queue = new Structure();  // 生成一个随机队列
        // 起点是入口右侧的点
        queue.push({
            x: this.entryX,
            y: this.entryY + 1
        })
        //visited置为true
        this.visited[this.entryX][this.entryY + 1] = true;
        // 通过遍历目前的白色方块，然后按照某种方法连通两个方块 即把两者之间的蓝色方块变成白色
        while (!queue.empty()) {
            let currentPos = queue.pop();
            for (let i = 0; i < 4; i++) {
                let newX = currentPos.x + this.offset[i][0] * 2;  //两步
                let newY = currentPos.y + this.offset[i][1] * 2;
                // 坐标没有越界 而且 没有被访问过
                if (this.isArea(newX, newY)) {
                    if (!this.visited[newX][newY]) {
                        this.resetMazeShow((newX + currentPos.x) / 2, (newY + currentPos.y) / 2, this.road);
                        queue.push({
                            x: newX,
                            y: newY
                        })
                        this.visited[newX][newY] = true;
                    }
                    else if (Math.random() < this.morePath) {
                        this.resetMazeShow((newX + currentPos.x) / 2, (newY + currentPos.y) / 2, this.road);
                    }
                }
            }
        }
        return this;
    }
}

//迷宫数据结构模式
class Pattern {
    // 模式选择：
    // fitst: 1, last: 1 模拟栈的数据结构     对应DFS
    // fitst: 0/1, last: 1/0 模拟队列的数据结构   对应BFS
    // fitst: 0.5, last: 0.5 模拟随机        默   认  
    constructor(first, last) {
        Structure.patternFirst = first;
        Structure.patternLast = last;
    }
}



let pattern = new Pattern(0.5, 0.5);
let maze = new Maze(49, 49, 100, 0, 600, 600).paintMaze();   // 初始化迷宫

