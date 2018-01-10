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

    initSpeed: function () {
        this.speedY = cc.random0To1() * this.speedYBase + this.speedYBase;
        this.speedX = cc.randomMinus1To1() * this.speedXBase;
    },


    update (dt) {
        this.node.x += this.speedX;
        this.node.y -= this.speedY;

        if (this.node.x < -this.node.parent.width|| this.node.x > this.node.parent.width || this.node.y < -this.node.parent.height / 2 - 20) {
            console.log("回收子弹");
            this.enemyGroup.destroyBullet(this.node);
        }
    },
});
