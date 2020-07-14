<script>
import BranchWrap from "./BranchWrap";
import AddNode from "./AddNode";
import EndNode from "./EndNode";
import { MultiwayTree } from "./MultiwayTree.js";
import Vue from "vue";

export default {
  name: "BranchIndex",
  data() {
    return {
      bus: new Vue(),
      nodeTree: null,
      no:'',
    };
  },
  provide() {
    return {
      $bus: this.bus
    };
  },
  props: {
    branchData: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    AddNode,
    EndNode
  },
  beforeCreate: function() {
    this.$options.components.BranchWrap = require("./BranchWrap.vue").default;
  },
  created() {
    this.nodeTree = new MultiwayTree(this.branchData, this);
    this.bus.$on("treeChange", data => {
      const newTree = this.nodeTree.add(
        {
          nodeId: new Date().toLocaleTimeString(),
          data: data
        },
        data.nodeId,
        this.nodeTree.traverseBF
      );
      console.log(JSON.stringify(newTree._root),'_root')
      this.$emit("update:branchData", newTree._root);
    });
    this.bus.$on("treeDelNode", data => {
      // console.log({
      //   nodeId: data.currentNode.nodeId,
      //   prevId: data.currentNode.prevId
      // });
      // console.log(data.currentNode)
      const newTree = this.nodeTree.remove(
        data.currentNode.nodeId,
        data.currentNode.prevId,
        this.nodeTree.traverseBF
      );
      console.log(newTree._root)
    });
  },
  render(createElement) {
    function getDom(nodeData, parentNode) {
      let domLoopList = [];
      var that = this;
      if (nodeData.type === "start" || nodeData.type === "approver") {
        domLoopList = domLoopList.concat([
          createElement("AddNode", {
            props: {
              addData: nodeData
            }
          })
        ]);
      }
      if (nodeData.type === "condition"){
        domLoopList = domLoopList.concat([
          createElement("ConditionNode", {
            props: {
              conditionNodeData: nodeData,
              parentNode
            }
          })
        ]);
      }
      if (nodeData.type === "route") {
        domLoopList = domLoopList.concat([
          createElement("BranchWrap", {
            props: {
              branchWrapData: nodeData.conditionNodes,
              parentBranchWrapData: nodeData
            },
            key: nodeData.name
          })
        ]);
      }
      if (nodeData.childNode) {
        domLoopList = domLoopList.concat(getDom(nodeData.childNode, nodeData));
      }
      if(!nodeData.childNode){
      domLoopList = domLoopList.concat([
          createElement("EndNode", {
            props: {
              // addData: nodeData
            }
          })
        ]);
      }
      return domLoopList;
    }
    const domList = getDom(this.branchData);
    return createElement(
      "div",
      {
        attrs: {
          class: "box-scale"
        }
      },
      domList
    );
  }
};
</script>