// 触摸层

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onDrag();
    },

    onDrag: function () {
        this.node.on('touchmove', this.dragMove, this);
        this.node.on('touchstart', this.touchStart, this);
    },

    offDrag: function () {
        this.node.off('touchmove', this.dragMove, this);
        this.node.off('touchstart', this.touchStart, this);
    },

    touchStart: function (event) {
        let startPosv = event.getLocation();
        let startPos = this.node.parent.convertToNodeSpaceAR(startPosv);

        this.startX = startPos.x;
        this.startY = startPos.y;
    },

    dragMove: function (event) {
        var locationv = event.getLocation();
        var location = this.hero.parent.convertToNodeSpaceAR(locationv);

        //飞机移动范围 
        var minX = -this.hero.parent.width/2+this.hero.width/2;
        var maxX = -minX;
        var minY = -this.hero.parent.height/2+this.hero.height/2;
        var maxY = -minY;

        //两次位置差
        var posX = location.x - this.startX;
        var posY = location.y - this.startY; 

        //飞机应该移动的位置
        let heroX = this.hero.x + posX;
        let heroY = this.hero.y + posY;

        if (heroX < minX) {
            heroX = minX;
        }else if (heroX > maxX) {
            heroX = maxX;
        }

        if (heroY < minY) {
            heroY = minY;
        }else if (heroY > maxY) {
            heroY = maxY;
        }

        // let ang = cc.pToAngle(cc.v2(posX, posY)) / Math.PI * 180;
        // this.hero.rotation = 90-ang

        this.hero.x = heroX;
        this.hero.y = heroY; 

        this.startX = location.x;
        this.startY = location.y;
    }

    // start () {

    // },

    // update (dt) {},
});
