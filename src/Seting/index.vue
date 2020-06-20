<template>
  <div v-if="node" class="seting">
    <div>
      标题:<a-input :value="node.props.label" @input="onChange" />
    </div>
    <div>
      默认值:<a-input :value="node.props.placeholder" @input="onChangePlaceholder" />
    </div>
  </div>
</template>
<style>
.seting{
  
}
</style>
<script>
import Bridge from "@/Engine/utils/Bridge";
import Command from "@/Engine/utils/Command";

export default {
  name: "seting",
  props: {
    //通信桥
    bridge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ishow: false,
      label: "",
      point: {
        click: ""
      },
      pointval: {
        click: ""
      },
      node: null
    };
  },

  methods: {
    onChange(e) {
      this.bridge.execute({
        type: bridge.command.EVENTS.NODE_EDIT,
        data: { data: { props: { label: e.target.value } } }
      });
    },
    onChangePlaceholder(e) {
      this.bridge.execute({
        type: bridge.command.EVENTS.NODE_EDIT,
        data: { data: { props: {placeholder:e.target.value } } }
      });
    },
    onNodeChange() {
      //这个时候拿到的还是上一个状态的 我们把下一个状态的传进来
      const { nodes, point } = bridge.getEngineState();
      const selectNodeId = point.toJS().click;

      if (selectNodeId) {
        const selectNode = nodes.find(node => node.id === selectNodeId);
        this.node = selectNode;
        console.log("call onNo88adeChange", this.node);
      } else {
        this.node = null;
      }
    },
    watchNodes(e) {
      console.log(e, "watchNodes");
    },
    watchPoint({ now, old }) {
      //通过监听 来同步引擎内 的指针状态
      // console.log(now.toJS(), old.toJS(),'now, old')
      this.point = now.toJS();
      this.ishow = true;
    }
  },
  mounted() {
    //第一步监听改变
    this.bridge.addEventListener("point", this.onNodeChange, ["click"]);
    this.bridge.addEventListener("nodes", this.onNodeChange);
  },
  destroyed() {
    //卸载 移除句柄
    this.bridge.removeEventListener("point", this.onNodeChange);
    this.bridge.removeEventListener("nodes", this.onNodeChange);
  }
};
</script>