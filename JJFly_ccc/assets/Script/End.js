//结束界面
cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        buttonSound: cc.AudioClip,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.score.string = D.commonState.score.toString();
    },

    restart: function () {
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('Game');
    }

    // update (dt) {},
});
