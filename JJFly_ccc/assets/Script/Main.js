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
        enemyGroup: {
            default: null,
            type: require('./EnemyGroup')
        },

        touchLayer: {
            default: null,
            type: require('./TouchLayer')
        },

        score: {
            default: null,
            type: cc.Label
        },

        bgMusic: cc.AudioSource,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        D.commonState.hit = false;    //是否击中了飞机
        D.commonState.score = 0;    //初始化得分
        D.commonState.pause = false;    //暂停状态
        this.enemyGroup.startAction();

        this.schedule(this.updateScore,1)

        if (cc.director.isPaused()) {
            cc.director.resume();
        }

        this.bgMusic.play();
    },

    updateScore: function () {
        D.commonState.score += 1;
        this.score.string = D.commonState.score.toString();
        if (D.commonState.hit) {
            this.unschedule(this.updateScore);
        }
    },

    pauseButtonOnClick: function () {
        if (D.commonState.pause) {
            cc.director.resume();
            this.touchLayer.offDrag();
            this.bgMusic.resume();
        }else{
            cc.director.pause();
            this.touchLayer.onDrag();
            this.bgMusic.pause();
        }

        D.commonState.pause = !D.commonState.pause;
    }

    // update (dt) {},
});
