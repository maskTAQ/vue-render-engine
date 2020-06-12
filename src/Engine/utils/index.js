import { List } from 'immutable';

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
export const EMPTY_LIST = List();