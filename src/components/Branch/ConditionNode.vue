<template>
  <div class="condition-node">
    <div class="condition-node-box">
      <div class="auto-judge">{{conditionNodeData.name}}<span
          class="del-node"
          @click="delNode"
        >-</span></div>
      <div class="add-node-btn">
        <button @click="printData">+</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConditionNode",
  inject: ["$bus"],
  props: {
    conditionNodeData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentNode: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    printData() {
      const info = confirm("确定是添加审核节点，取消是添加条件节点");
      this.$bus.$emit("treeChange", {
        type: "add",
        nodeType: info,
        nodeId: this.conditionNodeData.nodeId
      });
    },
    delNode() {
      this.$bus.$emit("treeDelNode", {
        type: "add",
        currentNode: this.conditionNodeData,
      });
    }
  }
};
</script>