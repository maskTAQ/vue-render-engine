const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '请输入',
        readonly:false,
    },
    RATE: {
        label: '评分',
        value:2.5,
        readonly:false,
    },
};
export default {
    input(h, node, mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        const isRenderByMenu = mode === 'menu';
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
              
                    <van-field readonly={props.readonly || DEFAULT_PROPS.INPUT.readonly} colon={true} label={props.label || DEFAULT_PROPS.INPUT.label} placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
               
            </div>
        )
    },
    rate(h, node, mode = 'render'){
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
           <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
           <van-field name="rate" label="评分">
           <template slot="input">
           <van-rate  value={props.value || DEFAULT_PROPS.RATE.value} readonly={props.readonly || DEFAULT_PROPS.RATE.readonly} />
           </template>
            </van-field>
           </div>
        )
    },
    line(h, node, mode = 'render') {
        return (
            <div class="line-box flex-row center" data-engine-node={true} data-mode={mode} data-node-type="input">
                <div class="line"></div>
            </div>
        )
    }
}
