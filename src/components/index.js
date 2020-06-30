import h5 from './h5';

const MODE_MAP = {
	h5
};
console.log(h5, 'h5')
const list = Object.keys(h5);
export default {
	get(h, { mode, node, readonly }) {
		const {
			type
		} = node;
		return MODE_MAP[mode][type](h, node, mode, readonly);
	},
	getForm(h, { mode, children }) {
		return MODE_MAP[mode].form(h, children);
	},
	getList() {
		return list;
	}
}
