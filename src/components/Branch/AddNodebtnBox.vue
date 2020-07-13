<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <button @click="printData">+</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddNodebtnBox",
  inject: ["$bus"],
  props: {
    parentNode: {
      type: [Object, Array]
    },
    addNodebtnBoxData: {
      type: [Object, Array]
    },
    parentAddNodebtnBoxData: {
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
        nodeId: this.parentAddNodebtnBoxData.nodeId
      });
    }
  }
};
</script>