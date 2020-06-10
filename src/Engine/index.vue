<script>
import { DATA, EMPTY_LIST } from "./utils";
import Command from "./utils/Command";
import Layout from "./Layout";

export default {
  name: "engine",
  props: {
    dataInject: {
      type: Object,
      required: true
    },
    //通信桥
    bridge: {
      type: Object,
      required: true
    },
    nodeInject: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: "auto",
      validator(v) {
        return ["auto", "h5", "pc", "wxminiapp"].includes(v);
      }
    }
  },
  data() {
    return {
      status: {
        canvas: "init"
      },
      nodes: EMPTY_LIST
    };
  },
  created() {
    //初始化命令模块
    this.command = new Command({
      //命令模块参数的数据变更都由 get set函数包装一下 方便后期溯源
      get: () => this,
      set: ({ key, value }) => {
        this.$set(this, key, value);
      }
    });
    //注册命令模块到 桥
    this.bridge.setCommand(this.command);
    //引擎挂载时请求数据
    DATA.GET_CANVAS.call(this);
  },
  render() {
    //引擎渲染入口 拆分为不同的场景 比如 移动浮层渲染层 组件渲染层
    const { nodeInject, status, nodes, mode } = this;
    console.log(nodes, "nodes", nodes.toJS());
    return (
      <div class="engine">
        <Layout nodeInject={nodeInject} nodes={nodes} mode={mode} />
        {JSON.stringify(status)}
      </div>
    );
  }
};
</script>