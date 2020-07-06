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
        this.root = window.document.documentElement;
        this.calculationRatio();
    }

    calculationRatio() {
        const w = this.container.offsetWidth;
        this.radio = w / this.base;
        this.setRootFontSize();
    }
    setRootFontSize() {
        const fs = `${this.radio * 100}px`;
        this.root.style.fontSize = fs;
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
    if (nodes.length) {
        //或者光标y轴的值
        const y = offset.y; //px.getNumber(offset.y);
        const h = nodes
            //map处理一下 返回每个组件的高度
            .map(node => px.getNumber(node.size.height));
        //将 [40,40,40]=>处理成[40,80,120]; 
        h.forEach((v, i) => {
            h[i] = !i ? h[i] : v + h[i - 1];
        })
        //找比y小的索引 没有就是最后一项
        const i = h.findIndex(v => y <= v);
        return i > -1 ? i : nodes.length;
    } else {
        return 0;
    }
}
export function createId(type = "") {
    return (
        type +
        "-" +
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random()
            .toString()
            .substr(2, 5)
    );
}
const DEFAULT_PROPS = {
    input: {
        label: '单行输入框',
        placeholder: '请输入',
        scene: false,
        required: false,
        maxlength: "100",
    },
    rate: {
        label: '评分',
        value: 0,
        scene: false,
    },
    picker: {
        label: '选择器',
        scene: false,
        value: '',
        columns: [{
            id: '1',
            label: '选项1',
            value: '1',
            component: [],
        },
        {
            id: '2',
            label: '选项2',
            value: '2',
            component: [],
        },
        {
            id: '3',
            label: '选项3',
            value: '3',
            component: [],
        }
        ],
        showPicker: false,
    },
    uploader: {
        label: '文件上传',
        value: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
        scene: false,
    },
    field: {
        label: '多行输入框',
        placeholder: '请输入',
        scene: false,
        maxlength: "100",
    },
    contacts: {
        type: "contacts",
        label: '联系人',
        placeholder: '请输入',
        scene: false,
    },
    tel: {
        label: '手机号',
        placeholder: '请输入',
        scene: false,
        required: false,
    }
};
export function createdNodeData(type) {
    return {
        id: createId(type),
        type,
        size: {
            height: 44,
        },
        props: DEFAULT_PROPS[type],
        readonly: false
    }
}
export const EMPTY_LIST = List();
export const EMPTY_OBJECT = Map();