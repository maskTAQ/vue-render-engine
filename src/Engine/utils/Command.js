const EVENTS = {
    NODE_MOVE: 'NODE_MOVE',
    NODE_ADD: 'NODE_ADD',
    NODE_DEL:'NODE_DEL',
	NODE_EDIT:'NODE_EDIT',
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
//回退传参

//加入记录控制的事件触发源
const NEED_RECORD_TRIGGER_TYPE = [TRIGGER_TYPE.INTERACTION];
//加入记录控制的事件类型
const NEED_RECORD_EVENT = [EVENTS.NODE_ADD,EVENTS.NODE_DEL];
export default class Command {
    constructor(config) {
        const { store, getRecord } = config;
        Object.assign(this, { store, getRecord });
    }
	removeData(data,index){
		console.log(data,index,'走的到这里')
		data = data.remove(index)
		this.store.set({
		    key: 'nodes',
		    value: data
		});
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
					this.removeData(nodes,insertIndex);
                } else {
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
                    });
                }
                break;
            }
            case EVENTS.BACK: {
                return this.getRecord().back(data);
            }
            case EVENTS.FORWARD: {
                this.getRecord().forward(data);
            }
			// bridge.execute({type:bridge.command.EVENTS.NODE_DEL,data:{deleteIndex:0}})
			case EVENTS.NODE_DEL:
				{
				 const {deleteIndex} = data;
				 let nodes = store.nodes;
				  if (IS_BACK) {
					 // const record = this.getRecord();
					 // this.store.set({
					 //     key: 'nodes',
					 //     value: record.history
					 // });
					} else {
					let data = nodes.get(deleteIndex)
					this.getRecord().del(data);
				    console.log(data,'nodes.get(deleteIndex)')
					nodes = nodes.remove(deleteIndex)
					this.store.set({
						key: 'nodes',
						value: nodes
					})
					}
					break;
				}
			case EVENTS.NODE_EDIT:
			//bridge.execute({type:bridge.command.EVENTS.NODE_EDIT,data:{edit:{type:'input',i:1,label:'我是被修改后的'},editIndex:0}})
				{
					let nodes = store.nodes;
					const {
						edit,
						editIndex
					} = data;
					nodes = nodes.set(editIndex,edit)
					console.log(nodes,'nodes')
					this.store.set({
						key: 'nodes',
						value: nodes
					})
					break;
				}
        }
    }
}