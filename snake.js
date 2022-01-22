//所有关于蛇的代码
(function (w) {
    let score = document.getElementById('score')
    let champ = document.getElementById('champ')
    let now_sco = document.getElementById('now_score')
    let score1 = 0;
    let that = this;
    // 定义一个数组来保存渲染蛇创建的div
    let list = [];


    // 创建蛇对象

    function Snake(width, height, direction) {

        this.width = width || 20
        this.height = height || 20
        this.direction = direction  || 'right' //方向默认向右 

        //初始创建的蛇是三节身体，每一节的坐标方向都不一样
        //用数组来表示蛇身体，这样在吃到食物后就在数组末尾加入一个元素
        this.body = [{
                x: 3,
                y: 1,
                bgColor: 'greenyellow'
            },
            {
                x: 2,
                y: 1,
                bgColor: 'skyblue'
            },
            {
                x: 1,
                y: 1,
                bgColor: 'orange'
            }
        ]

    }
    // 把蛇渲染到地图上

    Snake.prototype.render = function (map) {
        //渲染新蛇之前删除老蛇
        remove(map);

        // 把蛇的每一节遍历出来就像渲染食物一样去渲染每一节

        for (let i = 0; i < this.body.length; i++) {
            //this.body[i]
            // 创建div
            let div1 = document.createElement('div')
            div1.style.width = this.width + 'px'
            div1.style.height = this.height + 'px'
            div1.style.backgroundColor = this.body[i].bgColor
            div1.style.position = 'absolute'
            div1.style.left = this.body[i].x * this.width + 'px'
            div1.style.top = this.body[i].y * this.height + 'px'

            map.appendChild(div1);
            //把div加入到list中

            list.push(div1);

            //数组在这里增长身体，新长出来的结构也会存储在这里面
            // 但是会在下面清空数组，所以判断蛇头和蛇身是否碰到
            // 应该在删除老蛇之前
            //console.log(list)
        }
    };


    //4 声明一个方法删除老蛇
    //就是从map地图中把list数组中存入的div删掉
    function remove(map) {
        // 遍历list
        for (let i = 0; i < list.length; i++) {
            map.removeChild(list[i])
        }

        //清空数组list
        list.length = 0;
        //console.log(list)
    };

    // 蛇移动的方法也写在原型里
    Snake.prototype.move = function (food, map) {

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //    蛇头移动后的坐标

        switch (this.direction) {
            case 'right':
                this.body[0].x++;
                break;
            case 'left':
                this.body[0].x--;
                break;
            case 'down':
                this.body[0].y++;
                break;
            case 'up':
                this.body[0].y--;
                break;
        }

        // 判断有没有吃到食物
        // this就是蛇  获取蛇头的坐标
        let snakeHeadx = this.body[0].x * this.width
        let snakeHeady = this.body[0].y * this.height

        // 获取食物的坐标

        let foodx = food.x //食物的x坐标
        let foody = food.y //食物的y坐标

        // 取出数组最后一项的数据来赋值
        let lastsnakeUnit = this.body[this.body.length - 1]
        //判断
        if (snakeHeadx == foodx && snakeHeady == foody) {
            //吃到了食物
            this.body.push({
                x: lastsnakeUnit.x,
                y: lastsnakeUnit.y,
                bgColor: this.body[this.body.length - 2].bgColor //getRandomColor()
            })

            for (let i = 0; i < this.body.length; i++) {
                if (foodx == this.body[i].x * this.width && foody == this.body[i].y * this.height) {
                    foodx = Math.floor(Math.random() * map.offsetWidth / food.width) * food.width;
                    foody = Math.floor(Math.random() * map.offsetHeight / food.height) * food.height;
                }
            }

            // 产生一个新的食物  让食物的坐标再随机生成一个坐标 
            food.render(map)
            // 判断刷新后的食物盒子是否会和蛇头或者蛇身重合，如果重合则重新渲染

            score1 += 10;
            if (score1 > 10000) {
                score.innerText = '最高分:' + score1
            }
            now_sco.innerText = '目前得分:' + score1
        }

    };


    // 获取十六进制的随机颜色
    function getRandomColor() {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'a', 'b', 'c', 'd', 'e', 'f'];
        let str = '#';
        for (let i = 0; i < 6; i++) {
            let num = Math.floor(Math.random() * 16);
            str += arr[num];
        }
        return str;
    }


    // 暴露出去
    w.Snake = Snake;

}(window))