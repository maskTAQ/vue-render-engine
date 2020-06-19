//状态同步类 负责 同步 引擎和配置面板的数据通信
function includes(list, v) {
    //判断list里有没有a数组的项
    return list.some(item => v.includes(v));
}
export default class Bridge {
    command = null;
    record = null;
    zIndexControl = null;
    //事件存储器
    eventStore = {
        point: [
            // {
            //     fields:'',
            //     call:function(){}
            // }
        ]//数组每一项都是函数
    };
    findEvent(key, fun) {
        const list = this.eventStore[key] || [];
        return list.find(item => item.call === fun);
    }
    //添加时间句柄 enum{point}
    addEventListener = (key, func, fields) => {
        const { eventStore } = this;
        //如果eventStore[key]存在 并且之前没有注册过这个函数 避免同一个函数多次注册
        if (eventStore[key] && !this.findEvent(func)) {
            eventStore[key].push({
                call: func,
                fields
            })
        }
    }
    //移除
    removeEventListener = (key, func) => {
        const { eventStore } = this;
        if (eventStore[key]) {
            const i = eventStore[key].findIndex(item => item.call === func);
            eventStore[key].splice(i, 1);
        }
    }
    
    emit=({ key, fields, old, now })=> {
        const list = this.eventStore[key]
        if (list) {
            const callList = list.filter(({ call,fields: condition }) => {
                return Array.isArray(fields) ? includes(condition, fields) : condition.includes(fields);
            });
            callList.forEach(item => {
                item.call({ now, old })
            });
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