const EVENTS = {
	NODE_MOVE: 'NODE_MOVE',
	NODE_ADD: 'NODE_ADD',
	DELETE_NODE: 'DELETE_NODE',
	NODE_EDIT: 'NODE_EDIT',
	BACK: 'BACK',
	FORWARD: 'FORWARD'
};

function or() {};
//命令结构说明
const STRUCTURE = {
	NODE_ADD: {
		insertIndex: 0,
		insert: or({
			type: 'input'
		}, [{
			type: 'input'
		}])
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
const NEED_RECORD_EVENT = [EVENTS.NODE_ADD, EVENTS.DELETE_NODE];

const RESULT = {
	RESOLVE(v) {

		return Promise.resolve(v);
	},
	REJECT(e) {
		return Promise.reject(e);
	},
};
const delList = []
export default class Command {
	constructor(config) {
		const {
			store,
			getRecord
		} = config;
		Object.assign(this, {
			store,
			getRecord
		});
	}
	//事件列表
	EVENTS = EVENTS
	//事件触发来源
	TRIGGER_TYPE = TRIGGER_TYPE
	execute = datasource => {


		//事件类型 数据 触发命令的来源 record:历史数据（如果触发来源是回退时此项有数据）
		const {
			type,
			data,
			trigger = this.TRIGGER_TYPE.INTERACTION,
			record:cache
		} = datasource;
		//是否是回退命令触发的事件
		const IS_BACK = trigger === TRIGGER_TYPE.RECORD_MANAGE_BACK;
		//命令执行后需要储存的数据
		let record = null;

		//命令的执行结果
		let commandResult;
		const store = this.store.get();
		switch (type) {
			case EVENTS.NODE_MOVE:
				{
					console.log(store.nodes, this.store, '我是处理 EVENTS.NODE_MOVE 命令的逻辑');
					break;
				}
			// bridge.execute({type:bridge.command.EVENTS.NODE_ADD,data:{insert:[{type:'input',i:1,label:'dsdfs',id:'0002'},{type:'input',i:1,label:'dsdfs',id:'00026'}],insertIndex:0}})
			case EVENTS.NODE_ADD:
				{
					let nodes = store.nodes;
					const {
						insert,
						insertIndex
					} = data;
					if (IS_BACK) {
						// this.removeData(nodes,insertIndex)
						if (Array.isArray(insert)) {
							nodes = nodes.splice(insertIndex, insert.length);
						} else {
							nodes = nodes.delete(insertIndex);
						}
						console.log(insert, nodes, insertIndex)
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
			case EVENTS.BACK:
				{
				  commandResult = this.getRecord().back(data);
				  break;
				}
				// {
				// 	this.getRecord().forward(data);
				// 	commandResult = this.getRecord().back(data);
				// 	break;
				// }
			case EVENTS.FORWARD:
				{
					commandResult = this.getRecord().forward(data);
					break;
				}
				// bridge.execute({type:bridge.command.EVENTS.DELETE_NODE,data:['input']});//删多个
				// bridge.execute({type:bridge.command.EVENTS.DELETE_NODE,data:'input'})//删一个
			case EVENTS.DELETE_NODE:
				{
					const {
						id
					} = data;
					let nodes = store.nodes;
					if (IS_BACK) {
						console.log(cache, '这是执行删除时存档的数据')
						//恢复之后需要把oldIndex删掉
						cache.forEach(node=>{
							const {oldIndex,...n}=node;
							nodes = nodes.insert(oldIndex,n);
						})
						this.store.set({
							key: 'nodes',
							value: nodes
						})
					} else {
						const deleteNodeList = [];
						
						nodes = nodes.filter((node,index) => {
							const {
								id
							} = node;
							const isDelete = Array.isArray(data) ? data.includes(id) : id === data;
							node.oldIndex = index;
							deleteNodeList.push(node);
							record =deleteNodeList;
							return !isDelete; //如果不被删除则返回
						})
					}
					this.store.set({
						key: 'nodes',
						value: nodes
					})
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
					nodes = nodes.set(editIndex, edit)
					console.log(nodes, 'nodes')
					this.store.set({
						key: 'nodes',
						value: nodes
					})
					break;
				}
		}
		//如果此触发源的命令需要添加进记录
		if (NEED_RECORD_TRIGGER_TYPE.includes(trigger) && NEED_RECORD_EVENT.includes(type)) {
			this.getRecord().add({ ...datasource,
				record
			});
		}
		return commandResult;
	}
}
