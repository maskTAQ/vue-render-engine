import h5 from './h5';

const MODE_MAP = {
	h5
};
const list = Object.values(h5);
console.log(Object.keys(h5).map((key) => {
	console.log(h5[key].name); // 获取到属性对应的值，做一些处理
}), 'h5', h5)
export default {
	get(h, mode, node) {
		const {
			type
		} = node;
		return MODE_MAP[mode][type](h, node);
	},
	getList() {
		return list;
	}
}
