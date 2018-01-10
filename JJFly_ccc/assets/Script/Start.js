//开始界面
cc.Class({
    extends: cc.Component,

    properties: {
        // startBtn: {
        //     default: null,
        //     type: cc.Button
        // },

        buttonSound: cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('Game');
    },

    startButtonOnClick: function () {
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('Game');
    }

    // update (dt) {},
});
