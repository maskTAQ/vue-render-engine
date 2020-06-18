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
        return v * this.radio;
    }
    conver(v) {
        return v;
    }
}
export const EMPTY_LIST = List();
export const EMPTY_OBJECT = Map();