import h5 from './h5';

const MODE_MAP = {
	h5
};
const list = Object.keys(h5).filter(key => key !== 'form');
export default {
	get(h, { mode, node, readonly }) {
		const {
			type
		} = node;
		return MODE_MAP[mode][type](h, node, mode, readonly);
	},
	getForm(h, { mode, children, readonly }) {
		//会到这个函数 会找到MODE_MAP.h5.form 如果mode是pc就是 MODE_MAP.pc。form
		return MODE_MAP[mode].form(h, children, mode, readonly);
	},
	getList() {
		return list;
	}
}
