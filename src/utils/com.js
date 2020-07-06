const DEFAULT_PROPS = {
    input: {
        label: '单行输入框',
        placeholder: '请输入',
        scene: false,
        required: false,
        maxlength: "100",
    },
    rate: {
        label: '评分',
        value: 0,
        scene: false,
    },
    picker: {
        label: '选择器',
        scene: false,
        value: '',
        columns: [{
            id:'1',
            label: '选项1',
            value: '1',
            component: [],
        },
        {
            id:'2',
            label: '选项2',
            value: '2',
            component: [],
        },
        {
            id:'3',
            label: '选项3',
            value: '3',
            component: [],
        }
        ],
        showPicker: false,
    },
    uploader: {
        label: '文件上传',
        value: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
        scene: false,
    },
    field: {
        label: '多行输入框',
        placeholder: '请输入',
        scene: false,
        maxlength: "100",
    },
    contacts: {
        type: "contacts",
        label: '联系人',
        placeholder: '请输入',
        scene: false,
    },
    tel: {
        label: '手机号',
        placeholder: '请输入',
        scene: false,
        required: false,
    }
};

export default {
    DEFAULT_PROPS

}