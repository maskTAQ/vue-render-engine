const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '占位符'
    },
};
export default {
    input(h, node,mode) {
        const { props = DEFAULT_PROPS.INPUT } = node;
		const ismode = mode === 'menu'
		if(ismode){
		return (
			    <div class="field" data-engine-node={true} data-node-type="input">
			        <span class="label">{props.label || DEFAULT_PROPS.INPUT.label}</span>
			    </div>
			)
		}
		else{
        return (
            <div class="field" data-engine-node={true} data-node-type="input">
                <span class="label">{props.label || DEFAULT_PROPS.INPUT.label}</span>
                <input type="text" placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
            </div>
        )
		}
    }
}
