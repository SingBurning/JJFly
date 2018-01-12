// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

let yArr = [200, 500, 700];
const bgchildG = cc.Class({
    name: 'bgchildG',
    properties:{
        sprite: cc.Node,
        run: false
    }
})

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

        spriteImg: {
            default: [],
            type: bgchildG
        }
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

        // this.intiBackground();
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
    },

    intiBackground: function () {
        for (let i = 0; i < this.spriteImg.length; i++) {
            let pos = this.randomPos(this.spriteImg[i].sprite)
            this.scheduleOnce(function () {
                this.spriteImg[i].sprite.setPosition(pos);
                this.spriteImg[i].sprite.rotation = 1 + (cc.randomMinus1To1() / 2);
                this.spriteImg[i].sprite.active = true;
                this.spriteImg[i].run = true
            }, 3)
        }
    },

    randomPos: function (node) {
        let maxX = this.node.parent.width / 2 + node.width / 2;
        let minX = -maxX;
        let posx = parseInt(Math.random() * (minX-maxX+1) + maxX);
        let index = parseInt(Math.random() * (-1-3+1) + 3);
        let posy = this.node.parent.height / 2 + (parseInt(Math.random() * 500));
        return cc.v2(posx, posy);
    },

    update (dt) {
        for (let i = 0; i < this.spriteImg.length; i++) {
            // if (this.spriteImg[i].run) {
                this.spriteImg[i].sprite.y -= 0.5;
                if (this.spriteImg[i].sprite.y < (-this.node.parent.height / 2 - this.spriteImg[i].sprite.height/2)) {
                    let newpos = this.randomPos(this.spriteImg[i].sprite);
                    console.log(newpos);
                    this.spriteImg[i].sprite.rotation = 1 + (cc.randomMinus1To1() / 2);
                    this.spriteImg[i].sprite.setPosition(newpos);
                }
            // }
            
        }
    },
});
