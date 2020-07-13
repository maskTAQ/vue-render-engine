import bridge from '@/bridge';
import Picker from './picker.vue';
import { DEFAULT_PROPS } from '../../Engine';

export default {
    input(h, node, mode, scene) {
        const { readonly, props = DEFAULT_PROPS.input, nid } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            //当组件只读 或者 引擎场景为 查看的时候 禁止用户输入
            const r = readonly || scene === 'view';
            console.log(node,'props')
            return (
                <div class="field" >
                    <van-field
                        name={node.type +'-'+ nid}
                        maxlength={props.maxlength}
                        readonly={r}
                        value={props.value}
                        onInput={v => {
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: {
                                  nid: nid,
                                  path: "props.value",
                                  value:  v
                                }
                           });
                        }}
                        required={props.required}
                        rules={scene === 'edit' ?[{ required: props.required, message: '必填' + props.label }]:[]}
                        colon={true}
                        label={props.label}
                        placeholder={props.placeholder} />
                </div>
            )
        }
    },
    tel(h, node, mode, scene) {
        const { props = DEFAULT_PROPS.input, nid } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="field" >
                    <van-field
                        name={node.type +'-'+ nid}
                        type="tel"
                        readonly={scene === 'view' ? true : false}
                        value={props.value}
                        onInput={v => {
                            console.log(scene,'scene')
                           if(scene === 'edit'){
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: {
                                  nid: nid,
                                  path: "props.value",
                                  value:  v
                                }
                           });
                        }
                        }}
                        rules={scene === 'edit' ?[
                            { required: props.required, message: '请填写您的手机号码！' },
                            {   pattern: props.required ?/^1[3456789]\d{9}$/:'', message: '手机号码格式错误！'}
                           ]:[]
                           }
                         clearable
                        required={props.required }
                        colon={true}
                        label={props.label}
                        placeholder={props.placeholder} />
                </div>
            )
        }

    },
    rate(h, node, mode, scene) {
        const { props = DEFAULT_PROPS.input, nid } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="field" >
                    <van-field name={node.type +'-'+ nid}
                       rules={scene === 'edit' ?[{ required: props.required, message: '必填' + props.label }]:[]}
                        required={props.required}
                        label={props.label}>
                        <template slot="input">
                            <van-rate value={props.value}
                                onChange={v => {
                                    console.log(v, '编辑')
                                    bridge.execute({
                                        type: bridge.command.EVENTS.NODE_EDIT,
                                        data: {
                                          nid: nid,
                                          path: "props.value",
                                          value:  v
                                        }
                                   });
                                }}
                                

                                readonly={scene === 'view' ? true : false } />
                        </template>
                    </van-field>
                </div>
            )
        }
    },
    field(h, node, mode, scene) {
        const { props = DEFAULT_PROPS.input, nid } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="field" >
                    <van-field
                        name={node.type +'-'+ nid}
                        maxlength={props.maxlength}
                        required={props.required}
                        rows="2"
                        rules={scene === 'edit' ?[{ required: props.required, message: '必填' + props.label }]:[]}
                        value={props.value}
                        onInput={v => {
                            console.log(v, nid, '编辑')
                            bridge.execute({
                                type: bridge.command.EVENTS.NODE_EDIT,
                                data: {
                                  nid: id,
                                  path: "props.value",
                                  value:  v
                                }
                           });
                        }}
                        autosize
                        readonly={scene === 'view' ? true : false}
                        label={props.label}
                        type="textarea"
                        placeholder={props.placeholder}
                    />
                </div>
            )
        }
    },
    contacts(h, node, mode, scene) {
        const { props = DEFAULT_PROPS.input, nid } = node;
        if (scene === 'none') {
            return ''
        }
        else {
            return (
                <div class="contacts" >
                    <van-field
                        input-align="right"
                        name={node.type +'-'+  nid }
                        maxlength={props.maxlength}
                        readonly={true}
                        value={props.value}
                        onClick={v => {
                            if (scene === 'view' ? true : false) {

                            }
                            else {
                                window.location.href = "https://www.baidu.com";
                            }

                        }}
                        right-icon="arrow"
                        required={props.required}
                        rules={[{ required: props.required, message: '必填' + props.label || DEFAULT_PROPS.input.label }]}
                        colon={true}
                        label={props.label}
                        placeholder={props.placeholder} >
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
    picker(h, node, mode,scene) {
        return <Picker node={node} mode={mode} scene={scene}/>
    },
    // uploader(h, node, mode, scene) {
    //     const { props = DEFAULT_PROPS.uploader, id } = node;
    //     if (scene === 'none') {
    //         return ''
    //     }
    //     else {
    //         return (
    //             <div class="field" >
    //                 <van-field name={props.label + id }
    //                     required={props.required}
    //                     label={props.label}>
    //                     <template slot="input">
    //                         <van-uploader value={props.value} />
    //                     </template>
    //                 </van-field>

    //             </div>
    //         )
    //     }
    // },
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
