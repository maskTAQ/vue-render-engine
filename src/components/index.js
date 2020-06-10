import h5 from './h5';

const MODE_MAP = {
    h5
};
export default {
    get(h, mode, node) {
        const { type } = node;
        console.log
        return MODE_MAP[mode][type](h, node);
    }
}