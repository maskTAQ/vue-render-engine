const DEFAULT_PROPS = {
    input: {
        label: '输入框',
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
    contacts:{
        type:"contacts",
        label: '联系人',
        placeholder: '请输入',
        scene: false,
    },
    tel:{
        label: '手机号',
        placeholder: '请输入',
        scene: false,
        required: false,
    }
};
export default {
    DEFAULT_PROPS,
  }