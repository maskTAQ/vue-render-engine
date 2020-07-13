import { MapUtils, getInsertIndex, createdNodeData } from './index';
import { TYPE as LayerType } from "../Layer.vue";

const EVENTS = {
    NODE_MOVE: 'NODE_MOVE',
    NODE_ADD: 'NODE_ADD',
    DELETE_NODE: 'DELETE_NODE',
    NODE_EDIT: 'NODE_EDIT',
    BACK: 'BACK',
    FORWARD: 'FORWARD',

    NODE_SORT: 'NODE_SORT',

    DOUBLECLICK_CANVAS: 'DOUBLECLICK_CANVAS',
    DOUBLECLICK_NODE: 'DOUBLECLICK_NODE',
    RESIZE: 'RESIZE',
    NODE_START_MOVE: 'NODE_START_MOVE',
    NODE_MOVEING: 'NODE_MOVEING',
    NODE_MOVE_COMPLETE: 'NODE_MOVE_COMPLETE',
    CLICK_NODE: 'CLICK_NODE',
    CLICK_CANVAS: 'CLICK_CANVAS'
};
const TYPENAME = {
    'input': "输入框",
    'rate': '评分',
    'field': '多行输入框',
    'contacts': '联系人',
};
function or() { };
function sortNumber(a, b) {
    return a - b;
}
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
            record: cache
        } = datasource;
        //是否是回退命令触发的事件
        const IS_BACK = trigger === TRIGGER_TYPE.RECORD_MANAGE_BACK;
        //命令执行后需要储存的数据
        let record = null;

        //命令的执行结果
        let commandResult;
        const store = this.store.get();
        switch (type) {
            case EVENTS.CLICK_NODE: {
                const { mode, nid } = data.node;
                const { point } = store;
                //只有点击渲染在引擎内的组件才会触发点击
                if (!!mode) {
                    this.store.set({
                        key: 'point',
                        value: point.set('click', nid),
                        fields: 'click'
                    });
                }

                break;
            }
            case EVENTS.NODE_MOVE:
                {
                    // console.log(store.nodes, this.store, '我是处理 EVENTS.NODE_MOVE 命令的逻辑');
                    break;
                }
            // brnidge.execute({type:brnidge.command.EVENTS.NODE_ADD,data:{insert:[{type:'input',i:1,label:'dsdfs',nid:'0002'},{type:'input',i:1,label:'dsdfs',nid:'00026'}],insertIndex:0}})
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
                        value: nodes,
                        fields: 'node'
                    });
                    break;
                }
            case EVENTS.NODE_START_MOVE: {
                const { layer } = store;
                this.store.set({
                    key: 'layer',
                    value: MapUtils.setKeys(layer, {
                        type: LayerType.NODE_START_MOVE,
                        data
                    }),
                    fields: ['type', 'data']
                })
                break;
            }
            case EVENTS.NODE_MOVEING: {
                const { layer } = store;
                this.store.set({
                    key: 'layer',
                    value: MapUtils.setKeys(layer, {
                        type: LayerType.NODE_MOVEING,
                        data
                    }),
                    fields: ['type', 'data']
                });
                break;
            }
            case EVENTS.NODE_MOVE_COMPLETE: {
                const { layer, px, nodes } = store;
                this.store.set({
                    key: 'layer',
                    value: MapUtils.setKeys(layer, {
                        type: LayerType.NODE_MOVE_COMPLETE,
                        data
                    }),
                    fields: ['type', 'data']
                });
                const nodeIndex = getInsertIndex({
                    px,
                    nodes: nodes.toJS(),
                    offset: data.offset
                });
                if (datasource.data.isCursorInEngine && data.node.mode === 'menu') {
                    console.log(data.node.type)
                    this.execute({
                        type: EVENTS.NODE_ADD,
                        data: {
                            insert: createdNodeData(data.node.type),
                            insertIndex: nodeIndex
                        }
                    })
                }
                //上面是处理从左侧菜单拖进引擎中的处理 参考这个实现一个更改组件位置的实现
                if (datasource.data.isCursorInEngine && data.node.mode !== 'menu') {

                    const oldIndex = nodes.findIndex(node => node.nid === data.node.nid);
                    //如果拖动前后的所有相差不超过1 则是在组件附近拖动 没有改变组件的位置
                    const isIndexChange = oldIndex >= nodeIndex + 1 || nodeIndex > oldIndex + 1;
                    console.log('实现引擎内组件移动', isIndexChange)
                    if (isIndexChange) {
                        this.execute({
                            type: EVENTS.NODE_SORT,
                            data: {
                                nid: data.node.nid,
                                oldIndex,
                                index: nodeIndex
                            }
                        })
                    }

                }
                break;
            }
            case EVENTS.NODE_SORT: {
                let nodes = store.nodes;
                function getNodeIndex(nodes, node, change) {
                    //获取node所在的索引排序
                    console.log(change, 'change')
                    const index = nodes.indexOf(node);

                    if (index === change.oldIndex) {
                        return change.index
                    }
                    return index >= change.index ? index + 1 : index - 1
                }
                let node = nodes.sort((n, p) => {
                    const nIndex = getNodeIndex(nodes, n, data), pIndex = getNodeIndex(nodes, p, data);
                    return nIndex > pIndex ? 1 : -1;
                })
                console.log(nodes.toJS(), '移动后的列表')
                this.store.set({
                    key: 'nodes',
                    value: node,
                    fields: 'node'
                })
                break;
            }
            case EVENTS.BACK:
                {
                    commandResult = this.getRecord().back(data);
                    break;
                }
            case EVENTS.FORWARD:
                {
                    commandResult = this.getRecord().forward(data);
                    break;
                }
            // brnidge.execute({type:brnidge.command.EVENTS.DELETE_NODE,data:['input']});//删多个
            case EVENTS.DELETE_NODE:
                {
                    const {
                        nid
                    } = data;
                    let nodes = store.nodes;
                    if (IS_BACK) {
                        console.log(cache, '这是执行删除时存档的数据')
                        //恢复之后需要把oldIndex删掉
                        cache.forEach(node => {
                            const { oldIndex, ...n } = node;
                            nodes = nodes.insert(oldIndex, n);
                        })
                        this.store.set({
                            key: 'nodes',
                            value: nodes,
                            fields: 'node'
                        })
                    } else {
                        const deleteNodeList = [];
                        nodes = nodes.filter((node, index) => {
                            const {
                                nid
                            } = node;
                            const isDelete = Array.isArray(data) ? data.includes(nid) : nid === data;
                            node.oldIndex = index;
                            deleteNodeList.push(node);
                            record = deleteNodeList;
                            return !isDelete; //如果不被删除则返回
                        })
                        console.log(nodes.toJS())
                    }
                    this.store.set({
                        key: 'nodes',
                        value: nodes,
                        fields: 'node'
                    })
                    break;
                }
            case EVENTS.NODE_EDIT: {
                if (IS_BACK) {
                // 去除需要修改的值 存起来
                // 拿到之前修改的值覆盖 
                // console.log()
                }
                else {
                    const { nodes, point } = store;
                    const {
                        nid = point.get('click'),
                        path,
                        value
                    } = data;
                    const index = nodes.findIndex(node => node.nid === nid);
                    if (index > -1) {
                        this.store.set({
                            key: 'nodes',
                            value: nodes.setIn([index,...path.split('.')],value),
                            fields: 'node'
                        })
                        commandResult = RESULT.RESOLVE('编辑成功');
                    } else {
                        commandResult = RESULT.REJECT(`找不到nid为:${nid}的节点`);
                    }
                    break;
                }
            }

        }
        //如果此触发源的命令需要添加进记录
        if (NEED_RECORD_TRIGGER_TYPE.includes(trigger) && NEED_RECORD_EVENT.includes(type)) {
            this.getRecord().add({
                ...datasource,
                record
            });
        }
        return commandResult;
    }
}
