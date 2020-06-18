const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '占位符'
    },
};
export default {
    input(h, node, mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        const isRenderByMenu = mode === 'menu';
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
                <span class="label">{props.label || DEFAULT_PROPS.INPUT.label}</span>
                <input type="text" placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
            </div>
        )
        // if(isRenderByMenu){
        // return (
        // 	    <div class="field" data-engine-node={true} data-node-type="input">
        // 	        <span class="label">{props.label || DEFAULT_PROPS.INPUT.label}</span>
        // 	    </div>
        // 	)
        // }
        // else{

        // }
    },
    line(h, node, mode = 'render') {
        return (
            <div data-engine-node={true} data-mode={mode} data-node-type="input">我是一根线</div>
        )
    }
}
