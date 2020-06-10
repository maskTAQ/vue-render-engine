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
export const EMPTY_LIST = List();