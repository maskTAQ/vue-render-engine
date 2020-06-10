//状态同步类 负责 同步 引擎和配置面板的数据通信
export default class Bridge {
    command = null;
    record = null;
    zIndexControl = null;
    //事件存储器
    eventStore = {
        statusPoint: [],
        store: [],
        editor: []
    };
    //添加时间句柄 enum{statusPoint,store}
    addEventListener = (key, func) => {
        const { eventStore } = this;
        if (eventStore[key] && !eventStore[key].includes(func)) {
            eventStore[key].push(func)
        }
    }
    removeEventListener = (key, func) => {
        const { eventStore } = this;
        if (eventStore[key]) {
            const i = eventStore[key].findIndex(item => item === func);
            eventStore[key].splice(i, 1);
        }
    }
    //获取引擎状态
    getEngineState = () => {
        return this.command.store.get();
    }
    //当 statusPoint 变化时 由引擎触发
    statusPointWatcher = (next, old) => {
        this.eventStore.statusPoint.forEach(call => {
            call(next, old);
        });
    };
    //当 store 变化时 由引擎触发
    storeWatcher = (next, old, change) => {
        this.eventStore.store.forEach(call => {
            call(next, old, change);
        });
    }
    //注册 命令对象 由引擎在适当的时机注入
    setCommand = command => {
        this.command = command;
    };
    //注册 记录实例 由引擎在适当的时机注入
    setRecord = record => {
        this.record = record;
    };
    setZIndexControl = zIndexControl => {
        this.zIndexControl = zIndexControl;
    }
    //执行命令
    execute(data) {
        //如果之前没有把命令模块注册进桥时
        if (!this.command) {
            return new Error('请先等待 setCommand 的执行');
        }
        //通过命令模块执行命令
        return this.command.execute(data);
    }
    //自定义命令的集合
    customCommands = [];
    //需要将入到回退机制的命令集合
    customNeedRecordCommands = [];
    //处理自定义命令的集合
    customCommandHandle = (state, type, data, trigger = 'interaction', recordCache, isBack) => {
        return '请先实现 customCommandHandle';
    }
    getDatasourceData(res) {
        return Promise.resolve(res)
    }
}