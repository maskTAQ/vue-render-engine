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
               <van-cell-group>
                <van-field  label={props.label || DEFAULT_PROPS.INPUT.label} placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
                </van-cell-group>
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
            <div class="line" data-engine-node={true} data-mode={mode} data-node-type="input">我是一根线</div>
        )
    }
}
