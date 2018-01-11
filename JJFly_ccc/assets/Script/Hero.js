//飞机的父类
cc.Class({
    extends: cc.Component,

    properties: {
        pass:{
            default: null,
            type: cc.Animation
        },

        scoreSound:cc.AudioClip,
    },

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.pass.node.active = false;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    //碰撞结束没有爆炸得分
    onCollisionExit: function (other, self) {
        if (!D.commonState.hit) {
            console.log("碰撞得分");
            D.commonState.score += 3;

            cc.audioEngine.play(this.scoreSound);

            this.pass.node.active = true;
            this.pass.play('Pass');
            this.pass.on('finished',function () {
                this.pass.node.active = false;
            }, this);
        }
    }

    // update (dt) {},
});
