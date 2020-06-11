const EVENTS = {
    NODE_MOVE: 'NODE_MOVE',
    NODE_ADD: 'NODE_ADD',

    BACK: 'BACK',
    FORWARD: 'FORWARD'
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
//加入记录控制的事件触发源
const NEED_RECORD_TRIGGER_TYPE = [TRIGGER_TYPE.INTERACTION];
//加入记录控制的事件类型
const NEED_RECORD_EVENT = [EVENTS.NODE_ADD];

const RESULT = {
    RESOLVE(v) {
        return Promise.resolve(v);
    },
    REJECT(e) {
        return Promise.reject(e);
    },
};
export default class Command {
    constructor(config) {
        const { store, getRecord } = config;
        Object.assign(this, { store, getRecord });
    }
    //事件列表
    EVENTS = EVENTS
    //事件触发来源
    TRIGGER_TYPE = TRIGGER_TYPE
    execute = datasource => {

        //事件类型 数据 触发命令的来源 历史数据（如果触发来源是回退时此项有数据）
        const { type, data, trigger = this.TRIGGER_TYPE.INTERACTION, record } = datasource;
        //是否是回退命令触发的事件
        const IS_BACK = trigger === TRIGGER_TYPE.RECORD_MANAGE_BACK;
        //如果此触发源的命令需要添加进记录
        if (NEED_RECORD_TRIGGER_TYPE.includes(trigger) && NEED_RECORD_EVENT.includes(type)) {
            const record = this.getRecord();
            record.add(datasource);
        }
        //命令的执行结果
        let commandResult;
        const store = this.store.get();
        switch (type) {
            case EVENTS.NODE_MOVE: {
                console.log(store.nodes, this.store, '我是处理 EVENTS.NODE_MOVE 命令的逻辑');
                break;
            }
            case EVENTS.NODE_ADD: {
                let nodes = store.nodes;
                const { insert, insertIndex } = data;
                if (IS_BACK) {
                    if (Array.isArray(insert)) {
                        nodes = nodes.splice(insertIndex, insert.length);
                    } else {
                        nodes = nodes.delete(insertIndex);
                    }
                    commandResult = RESULT.RESOLVE('撤退(添加)成功');
                } else {
                    if (Array.isArray(insert)) {
                        insert.forEach((node, i) => {
                            nodes = nodes.insert(insertIndex + i, node);
                        })
                    } else {
                        nodes = nodes.insert(insertIndex, insert);
                    }
                    commandResult = RESULT.RESOLVE('添加成功');
                }
                this.store.set({
                    key: 'nodes',
                    value: nodes
                });

                break;
            }
            case EVENTS.BACK: {
                commandResult = this.getRecord().back(data);
                break;
            }
            case EVENTS.FORWARD: {
                commandResult = this.getRecord().forward(data);
                break;
            }
        }
        return commandResult;
    }
}