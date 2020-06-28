const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '请输入',
        readonly: false,
        required: false,
    },
    RATE: {
        label: '评分',
        value: 0,
        readonly: false,
    },
};
export default {
    input(h, node, mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        const isRenderByMenu = mode === 'menu';
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">

                <van-field rules={[{ required: props.required || DEFAULT_PROPS.INPUT.required, message: '必填' + props.label || DEFAULT_PROPS.INPUT.label }]} readonly={props.readonly || DEFAULT_PROPS.INPUT.readonly} colon={true} label={props.label || DEFAULT_PROPS.INPUT.label} placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />

            </div>
        )
    },
    rate(h, node, mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field name="rate" label={props.label || DEFAULT_PROPS.RATE.label}>
                    <template slot="input">
                        <van-rate value={props.value || DEFAULT_PROPS.RATE.value} readonly={props.readonly || DEFAULT_PROPS.RATE.readonly} />
                    </template>
                </van-field>
            </div>
        )
    },
    field(h, node, mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field
                    value={props.value || DEFAULT_PROPS.RATE.value}
                    rows="2"
                    autosize
                    label={props.label || DEFAULT_PROPS.RATE.label}
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
                />
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
