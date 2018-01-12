//子弹集合

const enemyG = cc.Class({
    name: 'enemyG',
    properties:{
        name: '',
        prefab: cc.Prefab,
        freq: 0,    //间隔
        poolAmount: 0,
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        enemyGroup: {
            default: [],
            type: enemyG
        },

        hero: {
            default: null,
            type: cc.Node
        },

        bulletSound: cc.AudioClip,
    },


    onLoad () {
        D.common.batchInitNodePool(this, this.enemyGroup);
    },

    //生成子弹
    startAction: function () {
        //根据子弹类型的间隔，生成子弹，并发射
        for (let i = 0; i < this.enemyGroup.length; i++) {
            let groupName = this.enemyGroup[i].name;
            let freq = this.enemyGroup[i].freq;
            this[groupName] = function (k) {
                this.genNewBullet(this.enemyGroup[k]);
                // cc.audioEngine.play(this.bulletSound)
            }.bind(this, i);
            this.schedule(this[groupName], freq);
        }
    },

    genNewBullet: function (bulletInfo) {
        let poolName = bulletInfo.name + 'Pool';
        let newNode = D.common.genNewNode(this[poolName], bulletInfo.prefab, this.node);
        let pos = this.getNewBulletPosition(newNode);
        newNode.setPosition(pos);
        newNode.getComponent('Bullet').enemyGroup = this;
        let heroPos = this.hero.getPosition();
        newNode.getComponent('Bullet').initSpeed(heroPos, pos);
    },

    //随机生成位置
    getNewBulletPosition: function (bulletNode) {
        let randX = cc.randomMinus1To1() * this.node.parent.width;
        let randY = this.node.parent.height / 2 + 20;
        //随机从上下发射子弹
        let randArr = new Array(-1,1);
        let index = Math.floor(Math.random() *2);
        randY = randY * randArr[index];

        return cc.v2(randX, randY);
    },

    //回收
    destroyBullet: function (node) {
        D.common.putBackPool(this, node)
    }

    // update (dt) {},
});
