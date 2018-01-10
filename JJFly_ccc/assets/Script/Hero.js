//飞机的父类
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    //碰撞结束没有爆炸得分
    onCollisionExit: function (other, self) {
        console.log("碰撞得分");
    }

    // update (dt) {},
});
