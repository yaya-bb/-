class Snake {
    constructor() {
        // 获取所有的div，querySelector只取一个
        // 断言的方式：变量 as 类型 或者 <类型>变量
        this.element = document.getElementById('snake');
        this.head = document.querySelector('#snake > div');
        this.bodies = this.element.getElementsByTagName('div');
    }
    //获取蛇的坐标(蛇头坐标)
    get X() {
        return this.head.offsetLeft;
    }
    // 获取蛇的Y轴坐标
    get Y() {
        return this.head.offsetTop;
    }
    // 设置蛇头的坐标
    set X(value) {
        // 如果新值和旧值相同，则直接返回不再修改
        if (this.X === value) {
            return;
        }
        // X的值的合法返回0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("蛇撞墙了");
        }
        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if (this.bodies[1] && this.bodies[1].offsetLeft === value) {
            console.log("水平方向发生了掉头");
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇向左走
                value = this.X - 10;
            }
            else {
                // 向左走
                value = this.X + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }
    // 设置蛇头Y坐标
    set Y(value) {
        // 如果新值和旧值相同，则直接返回不再修改
        if (this.Y === value) {
            return;
        }
        // Y的值的合法返回0-290之间
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙了
            throw new Error("蛇撞墙了");
        }
        if (this.bodies[1] && this.bodies[1].offsetTop === value) {
            console.log("水平方向发生了掉头");
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.Y) {
                // 如果新值value大于旧值Y，则说明蛇在向右走，此时发生掉头，应该使蛇向下走
                value = this.Y - 10;
            }
            else {
                // 向上走
                value = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }
    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }
    // 添加一个蛇身体移动的方法
    moveBody() {
        // 将后面的身体设置为前边身体的位置
        /*
        * 第4节 = 第3节的位置
        * 第3节 = 第2节的位置
        * 第2节 =蛇头的位置
        */
        // 便林立获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            // 做一个断言，证明bodies就是一个HTMLElement
            let X = this.bodies[i - 1].offsetLeft;
            let Y = this.bodies[i - 1].offsetTop;
            // 将值设置到当前身体上
            this.bodies[i].style.left = X + 'px';
            this.bodies[i].style.top = Y + 'px';
        }
    }
    // 检查蛇头是否撞到身体
    checkHeadBody() {
        // 获取所有的身体，检查是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i];
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error("撞到自己");
            }
        }
    }
}
export default Snake;
