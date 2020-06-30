const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '请输入',
        readonly: false,
        required: false,
        maxlength:"100",
    },
    RATE: {
        label: '评分',
        value: 0,
        readonly: false,
    },
    field:{
        label: '多行输入框',
        placeholder: '请输入',
        readonly: false,
    }
};
import Bridge from "@/Engine/utils/Bridge";
import Command from "@/Engine/utils/Command";
export default {
    input(h, node, readonly,mode = 'render') {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        const isRenderByMenu = mode === 'menu';
        const username = ''
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
                <van-field maxlength={props.maxlength || DEFAULT_PROPS.INPUT.maxlength} 
                value={props.value || DEFAULT_PROPS.INPUT.label}
                onInput={v=>{
                    this.bridge.execute({
                        type: bridge.command.EVENTS.NODE_EDIT,
                        data: { data: { id: id, props: { [value]: v} } }
                      });
                 }}
                required={props.required || DEFAULT_PROPS.INPUT.required} 
                rules={[{ required: props.required || DEFAULT_PROPS.INPUT.required, message: '必填' + props.label || DEFAULT_PROPS.INPUT.label }]} 
                readonly={readonly || DEFAULT_PROPS.INPUT.readonly} 
                colon={true} 
                label={props.label || DEFAULT_PROPS.INPUT.label} 
                placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
            </div>
        )
    },
    rate(h, node, mode = 'render',readonly) {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field name="rate" 
                required={props.required || DEFAULT_PROPS.INPUT.required}
                label={props.label || DEFAULT_PROPS.RATE.label}>
                    <template slot="input">
                        <van-rate value={props.value || DEFAULT_PROPS.RATE.value} 
                        readonly={readonly || DEFAULT_PROPS.INPUT.readonly} />
                    </template>
                </van-field>
            </div>
        )
    },
    field(h, node,readonly, mode = 'render') {
        console.log(readonly,'readonly2')
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field
                required={props.required || DEFAULT_PROPS.INPUT.required}
                    rows="2"
                    autosize
                    readonly={readonly || DEFAULT_PROPS.field.readonly}
                    label={props.label || DEFAULT_PROPS.field.label}
                    type="textarea"
                    placeholder={props.placeholder || DEFAULT_PROPS.field.placeholder}
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
