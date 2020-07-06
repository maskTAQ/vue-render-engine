<template>

  <div v-if="node" class="seting">
    <div>
      标题:
      <a-input :value="node.props.label" @input="e=>onChange(e,'label')" />
    </div>
    <div>
      默认值:
      <a-input :value="node.props.placeholder" @input="e=>onChange(e,'placeholder')" />
    </div>
    <div>
      限制字数:
      <a-input
        :value="node.props.maxlength"
        :maxLength="10"
        type="number"
        @input="e=>onChange(e,'maxlength')"
      />
    </div>
    <div>
      <a-checkbox @change="e=>onChangeScene(e,'scene')">隐藏</a-checkbox>
    </div>
    <div>
      <a-checkbox :checked="node.props.required" @change="e=>onChange(e,'required')">必填</a-checkbox>
    </div>
    <div v-if="node.type === 'picker'">
      <p>选项最多200项，每项最多50个字</p>
      <div>
        <DynamicForm :data="node"></DynamicForm>
      </div>
      <p>选项关联(已设置)</p>
    </div>
  </div>
</template>
<style>
.seting {
}
</style>
<script>
import Bridge from "@/Engine/utils/Bridge";
import Command from "@/Engine/utils/Command";
import DynamicForm from "./dynamicForm.vue"
export default {
  name: "seting",
  props: {
    //通信桥
    bridge: {
      type: Object,
      required: true
    }
  },
  components: {
    DynamicForm
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
    onChangeScene(e, key){
       this.bridge.execute({
          type: bridge.command.EVENTS.NODE_EDIT,
          data: { data: { props: { [key]: 'none'} } }
    });
    },
    onChange(e, key) {
      if (key === "required") {
        this.bridge.execute({
          type: bridge.command.EVENTS.NODE_EDIT,
          data: { data: {props: { [key]: e.target.checked } } }
        });
      } else {
        this.bridge.execute({
          type: bridge.command.EVENTS.NODE_EDIT,
          data: { data: { props: { [key]: e.target.value } } }
        });
      }
    },
    onNodeChange() {
      //这个时候拿到的还是上一个状态的 我们把下一个状态的传进来
      const { nodes, point } = bridge.getEngineState();
      const selectNodeId = point.toJS().click;

      if (selectNodeId) {
        const selectNode = nodes.find(node => node.id === selectNodeId);
        this.node = selectNode;
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