//普通子弹

cc.Class({
    extends: cc.Component,

    properties: {
        speedYBase:0,
        speedXBase:0,
        bulletType: '',
        action: false,
        
    },


    onLoad () {
        
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // this.initSpeed();
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group == 'plane') {
            console.log("碰撞摧毁");
            this.enemyGroup.destroyBullet(this.node);
        }
    },

    initSpeed: function (heropos,startPos = cc.v2(10, 10)) {
        this.speedY = cc.random0To1() * this.speedYBase + this.speedYBase;
        this.speedX = cc.randomMinus1To1() * this.speedXBase;
        //子弹从下面发射的话，把速度方向置反
        if (startPos.y < 0) {
            this.speedY = -this.speedY;
        }

        if (this.bulletType == 'bomb') {
            var posSub = cc.v2(this.speedX, -this.speedY);
            let ang = cc.pToAngle(posSub) / Math.PI * 180;
            this.node.rotation = 90-ang;
            this.action = false;
        }
    },

    playAction: function () {
        this.action = true
        let rotateBy = cc.rotateBy(2, 360.0);
        let x = this.speedX;
        let y = this.speedY;
        this.node.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function () {
            this.speedX = 0
            this.speedY = 0
        }, this),
        rotateBy,
        cc.callFunc(function () {
            this.speedX = x
            this.speedY = y
        }, this)));
    },


    update (dt) {
        // if (this.bulletType == 'bullet') {
            this.node.x += this.speedX;
            this.node.y -= this.speedY;
        // }
        if (this.bulletType == 'bomb') {
            if (!this.action) {
                this.playAction();
            }
            
        }
        
        if (this.node.x < -this.node.parent.width|| this.node.x > this.node.parent.width || this.node.y < -this.node.parent.height / 2 - 40 || this.node.y > this.node.parent.height / 2 + 40) {
            // console.log("回收子弹");
            this.enemyGroup.destroyBullet(this.node);
        }
    },
});
