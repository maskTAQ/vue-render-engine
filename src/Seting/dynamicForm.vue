<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      v-for="(k, index) in data.props.columns"
      :key="index"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? '选择器值' : ''"
      :required="false"
    >
      <a-input
        v-decorator="[
         `${k.id}`,
          {
            validateTrigger: ['change', 'blur'],
            initialValue:k.value,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '必填',
                maxLength:20
              },
            ],
          },
        ]"
        placeholder="请输入"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        v-if="data.props.columns.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="data.props.columns.length === 1"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button  v-if="data.props.columns.length < 10" type="dashed" style="width:100px;margin-right: 8px" @click="add">
        <a-icon type="plus" />增加
      </a-button>
      <a-button type="primary" style="width:100px" html-type="submit">保存</a-button>
    </a-form-item>
    
  </a-form>
</template>

<script>
let id = 0;
import { createId } from "@/Engine/utils/index.js";
import bridge from "@/bridge";
window.bridge = bridge;
export default {
  props: {
    //数据提供
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      ok: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "dynamic_form_item" });
    setTimeout(() => {
      this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
      this.ok = true;
    });
    console.log(this, "data.props.columns");
  },
  methods: {
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // We need at least one passenger
      if (this.data.props.columns.length === 1) {
        return;
      }
      console.log(k, this.data.props.columns.filter(key => key.id !== k.id) );
       this.data.props.columns = this.data.props.columns.filter(
        key => key.id !== k.id
       );
      // form.setFieldsValue({
      //   keys: keys.filter(key => key !== k),
      // });
    },

    add() {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      let dataColumns = this.data.props.columns;
      var ary2 = JSON.parse(JSON.stringify(dataColumns));
      ary2.push({
        id: createId(this.data.type + "-columns"),
        label: "选项" + this.data.props.columns.length,
        value: "选项" +  this.data.props.columns.length,
        component: []
      });
     
       bridge.execute({
            type: bridge.command.EVENTS.NODE_EDIT,
            data: {
              id: this.data.nid,
              path: "props.columns",
              value: ary2
            }
       });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const nextColumns = this.data.props.columns.map(column => {
            return {
              ...column,
              value: values[column.id]
            };
          });
          bridge.execute({
            type: bridge.command.EVENTS.NODE_EDIT,
            data: {
              id: this.data.nid,
              path: "props.columns",
              value: nextColumns
            }
          });
          console.log(nextColumns, "nextColumns");
        }
      });
    }
  }
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>