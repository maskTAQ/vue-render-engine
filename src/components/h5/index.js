import bridge from '@/bridge';
import DEFAULT from '@/utils/com.js';


console.log('bridge in h5.js', DEFAULT);
export default {
    input(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.input, id } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
                    <van-field
                        name={props.label +id || DEFAULT.DEFAULT_PROPS.input.label +id}
                        maxlength={props.maxlength || DEFAULT.DEFAULT_PROPS.field.maxlength}
                        readonly={scene === 'view' ? true : false || DEFAULT.DEFAULT_PROPS.input.scene}
                        value={props.value}
                        onInput={v => {
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: { data: { id: id, props: { value: v } } }
                            });
                        }}
                        required={props.required || DEFAULT.DEFAULT_PROPS.input.required}
                        rules={[{ required: props.required || DEFAULT.DEFAULT_PROPS.input.required, message: '必填' + props.label || DEFAULT.DEFAULT_PROPS.input.label }]}
                        colon={true}
                        label={props.label || DEFAULT.DEFAULT_PROPS.input.label}
                        placeholder={props.placeholder || DEFAULT.DEFAULT_PROPS.input.placeholder} />
                </div>
            )
        }

    },
    tel(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.input, id } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">
                    <van-field
                        name={props.label + id || DEFAULT.DEFAULT_PROPS.tel.label  + id }
                        type="tel"
                        readonly={scene === 'view' ? true : false || DEFAULT.DEFAULT_PROPS.input.scene}
                        value={props.value}
                        onInput={v => {
                            console.log(v, '编辑')
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: { data: { id: id, props: { value: v } } }
                            });
                        }}
                        required={props.required || DEFAULT.DEFAULT_PROPS.input.required}
                        colon={true}
                        label={props.label || DEFAULT.DEFAULT_PROPS.input.label}
                        placeholder={props.placeholder || DEFAULT.DEFAULT_PROPS.input.placeholder} />
                </div>
            )
        }

    },
    rate(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.input, id } = node;
        if(scene === 'none')
        {
            return '' 
        }
        else{
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="rate">
                <van-field  name={props.label +id || DEFAULT.DEFAULT_PROPS.rate.label +id}
                    required={props.required || DEFAULT.DEFAULT_PROPS.input.required}
                    label={props.label || DEFAULT.DEFAULT_PROPS.rate.label}>
                    <template slot="input">
                        <van-rate value={props.value || DEFAULT.DEFAULT_PROPS.rate.value}
                        onChange={v => {
                            console.log(v, '编辑')
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: { data: { id: id, props: { value: v } } }
                            });
                        }}
                            readonly={scene === 'view' ? true : false || DEFAULT.DEFAULT_PROPS.field.scene} />
                    </template>
                </van-field>
            </div>
        )}
    },
    field(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.input, id } = node;
        if(scene === 'none')
        {
            return '' 
        }
        else{
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="field">
                <van-field
                    name={props.label +id || DEFAULT.DEFAULT_PROPS.field.label +id}
                    maxlength={props.maxlength || DEFAULT.DEFAULT_PROPS.field.maxlength}
                    required={props.required || DEFAULT.DEFAULT_PROPS.input.required}
                    rows="2"
                    value={props.value}
                    onInput={v => {
                        console.log(v,id, '编辑')
                        bridge.execute({
                            type: bridge.command.EVENTS.NODE_EDIT,
                            data: { data: { id: id, props: { value: v } } }
                        });
                    }}
                    autosize
                    readonly={scene === 'view' ? true : false || DEFAULT.DEFAULT_PROPS.field.scene}
                    label={props.label || DEFAULT.DEFAULT_PROPS.field.label}
                    type="textarea"
                    placeholder={props.placeholder || DEFAULT.DEFAULT_PROPS.field.placeholder}
                />
            </div>
        )}
    },
    contacts(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.input, id } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="contacts" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="input">   
                <van-field
                        input-align="right"
                        name={props.label +id || DEFAULT.DEFAULT_PROPS.contacts.label +id}
                        maxlength={props.maxlength || DEFAULT.DEFAULT_PROPS.input.maxlength}
                        readonly={true}
                        value={props.value}
                        onClick={v => {
                            if(scene === 'view' ? true : false || DEFAULT.DEFAULT_PROPS.input.scene){

                            }
                            else{
                                window.location.href="https://www.baidu.com";
                            }
                           
                        }}
                        right-icon="arrow"
                        required={props.required || DEFAULT.DEFAULT_PROPS.contacts.required}
                        rules={[{ required: props.required || DEFAULT.DEFAULT_PROPS.contacts.required, message: '必填' + props.label || DEFAULT.DEFAULT_PROPS.input.label }]}
                        colon={true}
                        label={props.label || DEFAULT.DEFAULT_PROPS.contacts.label}
                        placeholder={props.placeholder || DEFAULT.DEFAULT_PROPS.contacts.placeholder} >
                        </van-field>
                </div>
            )
        }

    },
    line(h, node, mode) {
        return (
            <div class="line-box flex-row center" data-engine-node={true} data-mode={mode} data-node-type="input">
                <div class="line"></div>
            </div>
        )
    },
    uploader(h, node, mode, scene) {
        const { props = DEFAULT.DEFAULT_PROPS.uploader, id } = node;
        if(scene === 'none')
        {
            return '' 
        }
        else{
        return (
            <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="uploader">
                <van-field  name={props.label +id || DEFAULT.DEFAULT_PROPS.uploader.label +id}
                    required={props.required || DEFAULT.DEFAULT_PROPS.uploader.required}
                    label={props.label || DEFAULT.DEFAULT_PROPS.uploader.label}>
                    <template slot="input">
                        <van-uploader value={props.value || DEFAULT.DEFAULT_PROPS.uploader.label} />
                    </template>
                </van-field>
               
            </div>
        )}
    },
    form(h, children, mode, scene, onSubmit) {
        return (
            <van-form onSubmit={onSubmit} className="form">
                {children}
                <div style="margin: 16px;">
                    {scene !== 'view' && (
                        <van-button round block type="info" native-type="submit">
                            提交
                        </van-button>
                    )}

                </div>
            </van-form>
        )
    }
}
