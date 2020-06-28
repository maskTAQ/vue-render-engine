import h5 from './h5';

const MODE_MAP = {
	h5
};
console.log(h5, 'h5')
const list = Object.keys(h5);
export default {
	get(h, { mode, node, readonly }) {
		console.log(readonly,'readonly')
		const {
			type
		} = node;
		return MODE_MAP[mode][type](h, node);
	},
	getList() {
		return list;
	}
}
