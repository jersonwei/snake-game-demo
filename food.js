//所有关于食物的代码
(function (w) {
    // 声明一个list来存放食物
    let list = [];
    // 创建食物对象的构造函数
    function Food(width, height, bgColor, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || getRandomColor();
        this.x = x || 0;
        this.y = y || 0;
    }

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

    // 根据food构造函数创建的食物对象，要渲染到地图上
    // 这个方法写道圆形中
    Food.prototype.render = function (map) {
        // 在渲染新食物之前删除老食物
        remove(map);

        //随机给食物对象生成坐标
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
        this.bgColor = getRandomColor();
        //创建一个div让这个给div拥有所有食物对象的显示信息
        let div1 = document.createElement('div');
        div1.style.cssText = 'box-shadow: 0 0 10px #f56c6c inset;border-radious:10px'
        div1.style.width = this.width + 'px';
        div1.style.height = this.height + 'px';
        div1.style.backgroundColor = this.bgColor;
        div1.style.position = 'absolute';
        div1.style.left = this.x + 'px';
        div1.style.top = this.y + 'px';
        map.appendChild(div1)
        //把这个div追加到地图中

        // 把这个div存起来
        list.push(div1);
    }



    // 删除老食物的方法

    function remove(map) {
        for (let i = 0; i < list.length; i++) {
            map.removeChild(list[i])
        }
        list.length = 0;
    }


    // 传进去一个window参数把自执行函数暴露出去
    w.Food = Food;
}(window))