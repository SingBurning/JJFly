//

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        D.common = this;
    },

    //批量处理对象池
    batchInitNodePool: function (that, objArray) {
        for (let i = 0; i < objArray.length; i++) {
            let objInfo = objArray[i];
            this.initNodePool(that, objInfo);
        }        
    },

    //初始化对象池
    initNodePool: function (that, objInfo) {
        let name = objInfo.name;
        let poolName = name + 'Pool';

        that[poolName] = new cc.NodePool();
        //创建对象，放入对象池中
        for (let i = 0; i < objInfo.poolAument; i++) {
            let newNode = cc.instantiate(objInfo.prefab);
            that[poolName].put(newNode);
        }
    },

    //根据对象池，生成相应节点，添加到响应父类,并返回该节点
    genNewNode: function (pool, prefab, nodeParent) {
        let newNode = null;
        if (pool.size() > 0) {
            newNode = pool.get();
        }else{
            newNode = cc.instantiate(prefab);
        }
        nodeParent.addChild(newNode);
        return newNode;
    },

    //回收节点
    putBackPool: function (that, node) {
        let poolName = node.name + 'Pool';
        that[poolName].put(node);
    }

    // update (dt) {},
});
