<script>
export default {
  name: "BranchWrap",
  inject: ["$bus"],
  props: {
    branchWrapData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    parentBranchWrapData: {
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
  beforeCreate: function() {
    this.$options.components.ColBox = require("./ColBox.vue").default;
    this.$options.components.AddNodebtnBox = require("./AddNodebtnBox.vue").default;
    // this.$options.components.EndNode = require("./EndNode.vue").default;
  },
  methods: {
    addBranch(data) {
      this.$bus.$emit("treeChange", {
        type: "conditionNode",
        nodeType: false,
        nodeId: data.nodeId
      });
    }
  },
  render(createElement) {
    let domList = [
      createElement(
        "button",
        {
          attrs: {
            class: "add-branch"
          },
          on: {
            click: () => {
              this.addBranch(this.parentBranchWrapData);
            }
          }
        },
        "添加条件"
      )
    ];
    this.branchWrapData.forEach((item, index) => {
      domList = domList.concat([
        createElement("ColBox", {
          props: {
            isRight: index === this.branchWrapData.length - 1,
            isLeft: index === 0,
            colBoxData: item,
            colBoxParentData: this.parentBranchWrapData
          },
          key: item.name
        })
      ]);
    });
    return createElement(
      "div",
      {
        attrs: {
          class: "branch-wrap"
        }
      },
      [
        createElement(
          "div",
          {
            attrs: {
              class: "branch-box-wrap"
            }
          },
          [
            createElement(
              "div",
              {
                attrs: {
                  class: "branch-box"
                }
              },
              domList
            ),
            createElement("AddNodebtnBox", {
              props: {
                addNodebtnBoxData: this.branchWrapData,
                parentAddNodebtnBoxData: this.parentBranchWrapData
              }
            })
          ]
        )
      ]
    );
  }
};
</script>