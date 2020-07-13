<template>
  <div
    class="field"
  >
    <van-field
      readonly
      clickable
      :name="node.type +'-'+ node.nid"
      :value="value"
      :label="node.props.label"
      placeholder="点击选择城市"
      @click="scene=== 'edit' ? showPicker = true : showPicker = false"
      :required="node.props.required"
      :rules="[{ required: node.props.required, message: '必填' + node.props.label }]"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="value"
        :columns="node.props.columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
// picker(h, node, mode, scene) {
//         const { props = DEFAULT_PROPS.picker, id } = node;
//         const { showPicker, columns } = DEFAULT_PROPS.picker

//         if (scene === 'none') {
//             return ''
//         }
//         else {
//             return (
//                 <div class="field" data-engine-node={true} data-mode={mode} data-node-id={id} data-node-type="picker">
//                     <van-field
//                         readonly
//                         clickable
//                         name="picker"
//                         value={props.value || ""}
//                         label={props.label || DEFAULT_PROPS.picker.label}
//                         placeholder="点击选择城市"
//                         onClick={v => {
//                             if (scene === 'edit') {
//                                 console.log('edit')
//                                 bridge.execute({
//                                     type: bridge.command.EVENTS.NODE_EDIT,
//                                     data: { data: { nid: id, props: { showPicker: true } } }
//                                 });
//                             }
//                         }}
//                     />
//                     <van-popup value={props.showPicker || showPicker} position="bottom">
//                         <van-picker
//                             show-toolbar
//                             columns={props.columns || columns}
//                             value-key="label"
//                             onConfirm={v => {
//                                 bridge.execute({
//                                     type: bridge.command.EVENTS.NODE_EDIT,
//                                     data: { data: { nid: id, props: { value: v.label, showPicker: false } } }
//                                 });
//                             }}
//                             onCancel={v => {
//                                 bridge.execute({
//                                     type: bridge.command.EVENTS.NODE_EDIT,
//                                     data: { data: { nid: id, props: { showPicker: false } } }
//                                 });
//                             }}
//                         />
//                     </van-popup>
//                 </div>
//             )
//         }
//     },
import bridge from "@/bridge";
export default {
  name: "picker-h5",
  props: {
    node: {
      type: Object
    },
    mode: {
      type: String
    },
    scene: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false
    };
  },
  methods: {
    onConfirm(v) {
      this.value = v.value;
      bridge.execute({
            type: bridge.command.EVENTS.NODE_EDIT,
            data: {
              nid: this.node.nid,
              path: "props.value",
              value:  v.value
            }
       });
      this.showPicker = false;
    }
  }
};
</script>
<style lang="">
</style>

