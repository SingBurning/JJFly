// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        hitAct: {
            default: null,
            type: cc.Node
        },
        touchLayer: {
            default: null,
            type: require('./TouchLayer')
        },
        hero: {
            default: null,
            type: cc.Node
        },

        hitSound: cc.AudioClip,
    },

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.hitAct.active = false;
    }, 

    onCollisionEnter: function (other,self) {
        if (!D.commonState.hit) {
            cc.audioEngine.play(this.hitSound);
            this.touchLayer.offDrag();
            D.commonState.hit = true;
            this.hitAct.setPosition(this.node.getPosition());
            this.hitAct.active = true;
            let anim = this.hitAct.getComponent(cc.Animation);
            anim.play('Hit');
            anim.on("finished",function () {
                this.hero.destroy();
                cc.director.loadScene('End');
            },this);
        }
    }
    // update (dt) {},
});
