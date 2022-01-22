//游戏控制器
(function (w) {
    // 声明一个that变量保存游戏控制器变量
    let that = null;
    let sudu = null;
    //1.声明一个创建游戏控制器的构造函数

    // 想让游戏开始，那这个游戏控制器就应该有食物蛇和地图
    function Game(map) {

        // 这个食物是通过调用食物的构造函数调用出来的
        this.food = new Food();

        //同理
        this.snake = new Snake();

        // 游戏控制器里面的地图是外面获取传进来的
        this.map = map;

        that = this;
    };

    // 2.有一个游戏开始的方法，写在原型里方便调用

    Game.prototype.start = function (arr) {
        // 2.1开始游戏要渲染食物和蛇    同样也要调用
        
        this.food.render(this.map)

        this.snake.render(this.map)

        // 给简单模式按钮绑定事件  速度不写死 根据按钮选择的模式来调整速度
        arr[0].onclick = function() {
            
            sudu = 400
            snakeAutoMove(sudu)
            arr[0].onclick = null;
        }
        arr[1].onclick = function(){
            sudu = 250
            snakeAutoMove(sudu)
            arr[1].onclick = null;
        }
        arr[2].onclick = function(){
            sudu = 90
            snakeAutoMove(sudu)
            arr[2].onclick = null;
        }
        arr[3].onclick = function(){
            location.reload(true)
        }
        // //2.2 让蛇动一下
        // this.snake.move()
        // // 蛇移动后坐标改变但是需要用新的坐标重新渲染
        // this.snake.render(this.map)
        snakeAutoMove(sudu,arr);

        bindkey();
    };
    


    //2.3 写一个方法让蛇不停的动起来  
    // 写一个计时器



    function snakeAutoMove(sudu) {

        sudu = sudu || 100;
        // console.log(this)//指向window
        
        let timerId = setInterval(function () {
            //2.2 让蛇动一下
            this.snake.move(this.food, this.map)
            // 蛇移动后坐标改变但是需要用新的坐标重新渲染

            // 蛇出界后不再渲染
            // this.snake.render(this.map)
            
            //判断蛇移动后的新坐标是否出界  出界死亡！！
            let snakeHeadx = this.snake.body[0].x * this.snake.width;
            let snakeHeady = this.snake.body[0].y * this.snake.height;

            if (snakeHeadx < 0 || snakeHeady < 0 || snakeHeadx >= this.map.offsetWidth || snakeHeady >= this.map.offsetHeight) {
                alert('菜逼，你又死了!! 就这？？？？？');
                clearInterval(timerId);
                if(confirm("菜鸡，还来嘛？")){
                    location.reload()
                }
                return;
            }

            // 判断蛇头是否咬到了自己的身体，如果咬到了则游戏结束
            for (let i = 2; i < this.snake.body.length; i++) {
                if (snakeHeadx == this.snake.body[i].x * this.snake.width && snakeHeady == this.snake.body[i].y * this.snake.height) {
                    alert("憨批，你咬到自己了，真的菜啊");
                    clearInterval(timerId);
                    if(confirm("菜鸡，还来嘛？")){
                        location.reload()
                    }
                    return;
                }
            }
            
            // 写到后面就不会出现蛇死亡后继续渲染

            this.snake.render(this.map)

            // 此时的this指向为window
            // 需要采用bind方法来改变此时this的指向，将其变为游戏控制器对象
            // 而且bind方法不会执行函数，只会生成另一个一样的函数

        }.bind(that), sudu)

    };


    //4 写一个方法让蛇跟着键盘按键移动

    function bindkey() {
        // 给页面设置键盘事件 获取按键判断修改方向
        document.onkeydown = function (e) {
            e = e || window.event;
            // console.log(e.key)
            switch (e.keyCode) {
                case 37:
                    if (this.snake.direction != 'right') {
                        this.snake.direction = 'left'
                    }
                    break;
                case 38:
                    if (this.snake.direction != 'down') {
                        this.snake.direction = 'up'
                    }
                    break;
                case 39:
                    if (this.snake.direction != 'left') {
                        this.snake.direction = 'right'
                    }
                    break;
                case 40:
                    if (this.snake.direction != 'up') {
                        this.snake.direction = 'down'
                    }
                    break;
            };
        }.bind(that);
    }

    w.Game = Game;
}(window))