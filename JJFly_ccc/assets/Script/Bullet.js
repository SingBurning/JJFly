//普通子弹

cc.Class({
    extends: cc.Component,

    properties: {
        speedYBase:0,
        speedXBase:0,
    },


    onLoad () {
        
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.initSpeed();
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group == 'plane') {
            console.log("碰撞摧毁");
            this.enemyGroup.destroyBullet(this.node);
        }
    },

    initSpeed: function (posY = 10) {
        this.speedY = cc.random0To1() * this.speedYBase + this.speedYBase;
        //子弹从下面发射的话，把速度方向置反
        if (posY < 0) {
            this.speedY = -this.speedY
        }
        this.speedX = cc.randomMinus1To1() * this.speedXBase;
    },


    update (dt) {
        this.node.x += this.speedX;
        this.node.y -= this.speedY;

        if (this.node.x < -this.node.parent.width|| this.node.x > this.node.parent.width || this.node.y < -this.node.parent.height / 2 - 40 || this.node.y > this.node.parent.height / 2 + 40) {
            console.log("回收子弹");
            this.enemyGroup.destroyBullet(this.node);
        }
    },
});
