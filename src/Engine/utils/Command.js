const EVENTS = {
    NODE_MOVE: 'NODE_MOVE',
    NODE_ADD: 'NODE_ADD'
};
function or() { };
//命令结构说明
const STRUCTURE = {
    NODE_ADD: {
        insertIndex: 0,
        insert: or({
            type: 'input'
        }, [
            { type: 'input' }
        ])
    }
};
const TRIGGER_TYPE = {
    //此类型为命令产生的副作用命令 比如 新增页面后 带来的副作用是切换页面
    EFFECTS: 'effects',
    //用户交互产生的
    INTERACTION: 'interaction',
    //记录管理器 回退产生的
    RECORD_MANAGE_BACK: 'RecordManage.back',
    //记录管理器 前进产生的
    RECORD_MANAGE_FORWARD: 'RecordManage.forward'
};
export default class Command {
    constructor(store) {
        this.store = store;
    }
    //事件列表
    EVENTS = EVENTS
    //事件触发来源
    TRIGGER_TYPE = TRIGGER_TYPE
    execute = datasource => {
        //事件类型 数据 触发命令的来源 历史数据（如果触发来源是回退时此项有数据）
        const { type, data, trigger = this.TRIGGER_TYPE.INTERACTION, record } = datasource;
        const store = this.store.get();
        switch (type) {
            case EVENTS.NODE_MOVE: {
                console.log(store.nodes, this.store, '我是处理 EVENTS.NODE_MOVE 命令的逻辑');
                break;
            }
            case EVENTS.NODE_ADD: {
                let nodes = store.nodes;
                const { insert, insertIndex } = data;
                if (Array.isArray(insert)) {
                    insert.forEach((node, i) => {
                        nodes = nodes.insert(insertIndex + i, node);
                    })
                } else {
                    nodes = nodes.insert(insertIndex, insert);
                }
                this.store.set({
                    key: 'nodes',
                    value: nodes
                })
            }
        }
    }
}