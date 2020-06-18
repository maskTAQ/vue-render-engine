import { List, Map } from 'immutable';

import { LoadingControl } from "@/utils";

window.immutable = { List }
export const DATA = {
    GET_CANVAS() {
        const { dataInject, params } = this;
        return LoadingControl({
            call: dataInject.getCanvas,
            params,
            change: ({ status }) => {
                this.status.canvas = status;
            }
        })
            .then(res => {
                this.nodes = List(res);
            })
    }
};
/**
*判断差异是否在范围之内
**/
export function isDiffInTheRange(diff, rang) {
    return !(diff > 0 ? diff - rang > 0 : diff + rang < 0);
}
export const MapUtils = {
    getKeys(map, keys, fullKey = false) {
        const result = {};
        keys.forEach(key => {
            const keyPath = key.split('@');
            if (fullKey) {
                result[key] = map.getIn(keyPath);
            } else {
                result[keyPath[keyPath.length - 1]] = map.getIn(keyPath);
            }

        });
        return result;
    },
    setKeys(map, keys) {
        let next = map;
        for (const key in keys) {
            const keyPath = key.split('@');
            if (keyPath.length === 1) {
                next = next.set(key, keys[key]);
            } else {
                next = next.setIn(keyPath, keys[key]);
            }
        }
        return next;
    },
    insertKeys(map, keys) {
        let next = map;
        for (const key in keys) {
            const keyPath = key.split('@');
            const { insertIndex, value } = keys[key];
            if (keyPath.length === 1) {
                let root = next.get(key);
                root = root.insert(insertIndex, value);
                next = next.set(key, root);
            } else {
                let root = next.getIn(keyPath);
                root = root.insert(insertIndex, value);
                next = next.setIn(keyPath, root)
            }
        }

        return next;
    },
    mergeKeys(map, keys) {
        let next = map;
        for (const key in keys) {
            const keyPath = key.split('@');
            next = next.mergeIn(keyPath, keys[key]);
            // if (keyPath.length === 1) {
            //     console.log(key,'key',next,next.get(key));
            //     next = next.get(key).merge(keys[key]);
            // } else {

            // }
        }
        return next;
    }
};
export class PX {
    constructor(container, config) {
        this.container = container;
        this.base = config.base;
        this.radio = 1;
        this.calculationRatio();
    }

    calculationRatio() {
        const w = this.container.offsetWidth;
        this.radio = w / this.base;
    }
    get(v) {
        return `${v * this.radio}px`;
    }
    getNumber(v) {
        return parseFloat(v) * this.radio;
    }
    conver(v) {
        return v;
    }
}
export function getInsertIndex({ px, nodes, offset }) {
    console.log(nodes.length, 'nodes')
    if (nodes.length) {
        //或者光标y轴的值
        const y = offset.y; //px.getNumber(offset.y);
        //如果节点数量为一个
        if (nodes.length === 1) {
            //如果y轴大于组件的高度 则在后插入 反之在前 组件的高度并不是真实渲染的高度 需要计算出真实渲染的高度
            return y > px.getNumber(nodes[0].size.height) ? 1 : 0;
        }
        let insertIndex = nodes.length;
        const nodeYList = nodes
            //map处理一下 返回每个组件的高度
            .map(node => px.getNumber(node.size.height))
            //reduce 遍历一下
            .reduce((n, p, i) => {
                //n为之前的所有高度 p为下一个组件的高度 i为下一个组件的下标
                switch (true) {
                    //如果y小于上一个组件的高度 则在上一个位置插入
                    case y <= n: {
                        insertIndex = i - 1;
                        break;
                    }
                    //如果y在上一个组件位置之下 下一个组件位置之上  则插入到下一个组件的位置
                    case y > n && y <= n + p: {
                        insertIndex = i;
                        break;
                    }
                    // //如果匹配到最后一个节点了 并且之前没有计算出插入的位置 则 在最后一项插入
                    // case i === nodes.length && insertIndex === undefined: {
                    //     insertIndex = i;
                    // }
                }
                return n + p;
            });
        //console.log(nodeYList,'nodeYList');
        return insertIndex;
        //console.log("插入", y, nodeYList);
    } else {
        return 0;
    }
}
export const EMPTY_LIST = List();
export const EMPTY_OBJECT = Map();