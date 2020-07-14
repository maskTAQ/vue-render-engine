<script>
import BranchWrap from "./BranchWrap";
import AddNode from "./AddNode";
import EndNode from "./EndNode";
import {
  MultiwayTree,
  ConditionNode as ConditionNodeClass,
  AddNode as AddNodeClass
} from "./MultiwayTree.js";
import Vue from "vue";

class Format {
  constructor(data) {
    this.data = data;
    const line = [data];
    this.lines = [line];

    this.recursive({
      node: data,
      lines: this.lines,
      line,
      set() {}
    });
  }
  recursive({ node, lines, line, set }) {
    const { childNode, nodeId } = node;
    switch (true) {
      case childNode instanceof ConditionNodeClass: {
        //线段遇到分支了 先把这根线段移除
        const oldLineIndex = lines.findIndex(item => item === line);
        lines.splice(oldLineIndex, 1);
        childNode.conditionNodes.forEach(childNode => {
          //已被移除的线段为起始新的线段
          const lineBranch = [...line];
          //将新线段添加到线段的集合中
          lines.push(lineBranch);
          //为子节点添加父级
          childNode.parent = node;
          //将子节点添加到线段中
          lineBranch.push(childNode);
          //继续添加子节点中的子节点到本线段中
          this.recursive({ node: childNode, lines, line: lineBranch, set });
          // pathAppend.push(lineAppend);
          // set(pathAppend);
        });

        break;
      }
      case childNode instanceof AddNodeClass: {
        //为子节点添加父级
        childNode.parent = node;
        //把node的子节点添加到线条中
        line.push(childNode);
        //继续添加子节点中的子节点到本线段中
        this.recursive({ node: childNode, lines, line, set });
        break;
      }
    }
  }
  get() {
    return this.lines;
  }
}
export default {
  name: "BranchIndex",
  data() {
    return {
      bus: new Vue(),
      nodeTree: null,
      no: ""
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
      const format = new Format(newTree._root);
      console.log(newTree._root, format.get(), "_root");
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
      console.log(newTree._root);
    });
  },

  methods: {
    format(data) {}
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
      if (nodeData.type === "condition") {
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
      if (!nodeData.childNode) {
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