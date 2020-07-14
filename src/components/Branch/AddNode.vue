<template>
  <div class="node-wrap">
    <div class="node-wrap-box">{{addData.name}} <span
        class="del-node"
        @click="delNode"
      >-</span></div>
    <div class="add-node-btn-box">
      <div class="add-node-btn">
        <button @click="printData">+</button>
      </div>
    </div>
    <a-modal
      title="Title"
      :visible="visible"
    >
      <p>66</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "AddNode",
  inject: ["$bus"],
  props: {
    addData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data(){
    return{
      visible:false,
    }
  },
  methods: {
    printData() {
      const info = confirm("确定是添加审核节点，取消是添加条件节点 ");
      // this.visible = true
      this.$bus.$emit("treeChange", {
        type: "add",
        nodeType: info,
        nodeId: this.addData.nodeId
      });
    },
    delNode() {
      this.$bus.$emit("treeDelNode", {
        type: "add",
        currentNode: this.addData
      });
    }
  }
};
</script>