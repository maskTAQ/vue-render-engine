<script>
import { Map } from "immutable";

import { DATA, EMPTY_LIST, EMPTY_OBJECT } from "./utils";
import Command from "./utils/Command";
import CommandCollect from "./utils/CommandCollect";
import Record from "./utils/Record";
import Layout from "./Layout";
import Layer from "./Layer";

import bj from "../assets/bj.png";
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
      nodes: EMPTY_LIST,
      layer: Map({
        isShowMoveNodeGlobal: false,
        moveData: {}
      })
    };
  },
  created() {
    //初始化命令模块
    this.command = new Command({
      store: {
        //命令模块参数的数据变更都由 get set函数包装一下 方便后期溯源
        get: () => this,
        set: ({ key, value }) => {
          this.$set(this, key, value);
        }
      },
      getRecord: () => this.bridge.record
    });

    //初始化记录模块
    this.record = new Record(this.command);
    //注册命令模块到 桥
    this.bridge.setCommand(this.command);
    //注册记录模块到 桥
    this.bridge.setRecord(this.record);
    //引擎挂载时请求数据
    DATA.GET_CANVAS.call(this);
  },
  mounted() {
    //初始化命令收集器
    this.commandCollect = new CommandCollect(
      {
        engineContainer: this.$refs.engine
      },
      this.command
    );
  },
  render() {
    //引擎渲染入口 拆分为不同的场景 比如 移动浮层渲染层 组件渲染层
    const { nodeInject, status, nodes, mode, layer } = this;
    return (
      <div class="engine" ref="engine">
        <Layout nodeInject={nodeInject} nodes={nodes} mode={mode} />
        <Layer data={layer} />
      </div>
    );
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;

  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.engine {
  position: relative;
  margin: 69px 10px;
  width: 300px;
  height: 500px;
  border: 1px solid pink;
}
</style>