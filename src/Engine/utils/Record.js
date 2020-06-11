import { List } from 'immutable';

export default class Record {
    constructor(command) {
        this.command = command;
    }
    //操作历史
    history = List();
    //当前页面状态指针位置
    point = -1;
	
    add = (record) => {
        const { point } = this;
        //删除指针之后的记录
        this.history = this.history.slice(0, point + 1);
        //添加新的记录
        this.history = this.history.push(record);
        //更新指针 执行操作队列最后一刻
        this.point = this.history.size - 1;
        console.log({
            history: this.history,
            historyJs: this.history.toJS(),
            point: this.point
        })
    }
    back(step = 1) {
        const { history, point, command } = this;
        const nextPoint = point - step;
        console.log('call back')
        if (nextPoint >= -1 && nextPoint < history.size) {
            //获取记录区间 step步之内的记录:
            history.slice(nextPoint + 1, point + 1).forEach(record => {
                command.execute({
                    ...record,
                    trigger: command.TRIGGER_TYPE.RECORD_MANAGE_BACK
                });
            });
            this.point = nextPoint;
            return Promise.resolve();
        } else {
            return Promise.reject('超出记录范围');
        }
    }
    forward(step = 1) {
        const { history, point, command } = this;
        const nextPoint = point + step;
        if (nextPoint >= -1 && nextPoint < history.size) {
            //获取记录区间 step步之内的记录:
            history.slice(point + 1, nextPoint + 1).forEach(record => {
                command.execute({
                    ...record,
                    trigger: command.TRIGGER_TYPE.RECORD_MANAGE_FORWARD
                });
            });
            this.point = nextPoint;
            return Promise.resolve();
        } else {
            return Promise.reject('超出记录范围');
        }
    }
}