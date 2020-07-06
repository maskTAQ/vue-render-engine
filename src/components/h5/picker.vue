<template>
  <div>picker</div>
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
//                                     data: { data: { id: id, props: { showPicker: true } } }
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
//                                     data: { data: { id: id, props: { value: v.label, showPicker: false } } }
//                                 });
//                             }}
//                             onCancel={v => {
//                                 bridge.execute({
//                                     type: bridge.command.EVENTS.NODE_EDIT,
//                                     data: { data: { id: id, props: { showPicker: false } } }
//                                 });
//                             }}
//                         />
//                     </van-popup>
//                 </div>
//             )
//         }
//     },
export default {
  name: "picker-h5"
};
</script>
<style lang="">
</style>

