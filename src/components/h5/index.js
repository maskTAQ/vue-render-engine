import bridge from '@/bridge';
const DEFAULT_PROPS = {
    INPUT: {
        label: '输入框',
        placeholder: '请输入',
        scene: false,
        required: false,
        maxlength: "100",
    },
    RATE: {
        label: '评分',
        value: 0,
        scene: false,
    },
    field: {
        label: '多行输入框',
        placeholder: '请输入',
        scene: false,
    }
};

console.log('bridge in h5.js',bridge);
export default {
    input(h, node, mode,scene) {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        if(scene === 'none')
        {
            return '' 
        }
        else{
            return (
                <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
                    <van-field maxlength={props.maxlength || DEFAULT_PROPS.INPUT.maxlength} 
                    readonly={scene === 'view' ? true:false || DEFAULT_PROPS.INPUT.scene}
                        value={props.value}
                        onInput={v => {
                            console.log(v,'编辑')
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: { data: { id: id, props: { value: v} } }
                              });
                        }}
                        required={props.required || DEFAULT_PROPS.INPUT.required}
                        rules={[{ required: props.required || DEFAULT_PROPS.INPUT.required, message: '必填' + props.label || DEFAULT_PROPS.INPUT.label }]}
                        
                        colon={true}
                        label={props.label || DEFAULT_PROPS.INPUT.label}
                        placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
                </div>
            )
        }
       
    },
    rate(h, node, mode, scene) {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field name="rate"
                    required={props.required || DEFAULT_PROPS.INPUT.required}
                    label={props.label || DEFAULT_PROPS.RATE.label}>
                    <template slot="input">
                        <van-rate value={props.value || DEFAULT_PROPS.RATE.value}
                        readonly={scene === 'view' ? true:false || DEFAULT_PROPS.field.scene} />
                    </template>
                </van-field>
            </div>
        )
    },
    field(h, node,mode,scene) {
        const { props = DEFAULT_PROPS.INPUT, id } = node;
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="field">
                <van-field
                    required={props.required || DEFAULT_PROPS.INPUT.required}
                    rows="2"
                    autosize
                    readonly={scene === 'view' ? true:false || DEFAULT_PROPS.field.scene}
                    label={props.label || DEFAULT_PROPS.field.label}
                    type="textarea"
                    placeholder={props.placeholder || DEFAULT_PROPS.field.placeholder}
                />
            </div>
        )
    },
    line(h, node, mode) {
        return (
            <div class="line-box flex-row center" data-engine-node={true} data-mode={mode} data-node-type="input">
                <div class="line"></div>
            </div>
        )
    },
    form(h, children, mode, scene) {
        return (
            <van-form className="form" 
             submit={v => {
                console.log(v,'')
               }}>
                {children}
                <div style="margin: 16px;">
                    {scene !== 'view' && (<van-button round block type="info" native-type="submit">
                        提交
                 </van-button>)}

                </div>
            </van-form>
        )
    }
}
