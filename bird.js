(function(window) {
    function Bird(options) {
        this.x = options.x;
        this.y = options.y;
        this.img = options.img;
        this.width = this.img.width / 3;
        this.height = this.img.height;
        this.picIndex = 0;
        this.ctx = options.ctx;
        this.speed = 0;
        this.acc = options.acc || 0.0005;
        this.maxAngle = options.maxAngle || 45;
        this.maxSpeed = options.maxSpeed || 0.3;
    }

    Bird.prototype = {
        constructor: Bird,
        draw: function(deltaTime) {
            //计算小鸟y坐标
            //计算的是y的变化量
            //S = v0 * t + a * t * t / 2
            var deltaY = this.speed * deltaTime + this.acc * deltaTime *deltaTime / 2;
            //v = v0 + a * t;
            //计算当前的速度
            this.speed = this.speed + this.acc * deltaTime;

            this.y += deltaY;

            //计算需要旋转的角度
            //当前角度 = 最大角度 * 当前速度 /　最大速度
            var currentAngle = this.maxAngle * this.speed / this.maxSpeed;
            //处理最大角度
            if(currentAngle > this.maxAngle){
                currentAngle = this.maxAngle;
            }

            //保存正常的画布状态
            this.ctx.save();

            //1. 平移画布
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

            //2. 旋转画布
            this.ctx.rotate(this.getRadian(currentAngle));

            //3. 绘制小鸟
            this.ctx.drawImage(this.img, this.picIndex * this.width, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);

            this.picIndex ++;
            this.picIndex %= 3;

            //将之前保存好的画布状态恢复回去！
            this.ctx.restore();
        },
        getRadian: function(angle){
            return angle / 180 * Math.PI;
        }
    };

    window.Bird = Bird;
})(window)