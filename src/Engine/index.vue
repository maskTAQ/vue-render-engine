<script>
import { Map } from "immutable";

import { PX, DATA, EMPTY_LIST, EMPTY_OBJECT } from "./utils";
import Command from "./utils/Command";
import CommandCollect from "./utils/CommandCollect";
import Record from "./utils/Record";
import Layout from "./Layout";
import Layer, { TYPE as LayerType } from "./Layer";

import bj from "../assets/bj.png";

export { DEFAULT_PROPS } from "./utils/index";
export default {
  name: "engine",
  props: {
    //数据提供
    dataInject: {
      type: Object,
      required: true
    },
    //通信桥
    bridge: {
      type: Object,
      required: true
    },
    //节点提供
    nodeInject: {
      type: Object,
      required: true
    },
    params:{},
    //引擎渲染面试
    mode: {
      type: String,
      default: "auto",
      validator(v) {
        return ["auto", "h5", "pc", "wxminiapp"].includes(v);
      }
    },
    scene: {
      type: String,
      default: "view"
    }
  },
  data() {
    return {
      status: {
        canvas: "init"
      },
      nodes: EMPTY_LIST,
      layer: Map({
        type: "",
        data: null
      }),
      point: Map({
        click: "",
        doubleClick: ""
      }),
      //px计算对象
      px: null
    };
  },
  created() {
    //初始化命令模块
    this.command = new Command({
      store: {
        //命令模块参数的数据变更都由 get set函数包装一下 方便后期溯源
        get: () => this,
        set: ({ key, value, fields }) => {
          this.$set(this, key, value);
          this.$nextTick(() => {
            this.bridge.emit({
              key,
              fields,
              now: value,
              old: this[key]
            });
          });
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
    this.px = new PX(this.$refs.engine, {
      base: 375
    });
    //初始化命令收集器
    this.commandCollect = new CommandCollect(
      {
        engineContainer: this.$refs.engine,
        px: this.px
      },
      this.command
    );
  },
  destroyed() {
    this.commandCollect.destroy();
  },
  render() {
    //引擎渲染入口 拆分为不同的场景 比如 移动浮层渲染层 组件渲染层
    const { nodeInject, status, nodes, mode, scene, layer, px } = this;
    return (
      <div class="engine" ref="engine">
        {px && [
          <Layout
            nodeInject={nodeInject}
            nodes={nodes}
            mode={mode}
            px={px}
            layer={layer}
            scene={scene}
            key="layout"
            bridge={bridge}
            onSubmit={this.onSubmit}
          />,
          <Layer data={layer} key="layer" />
        ]}
      </div>
    );
  },
  methods: {
    onSubmit(v) {
      this.$emit("submit", v);
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.contacts {
  position: relative;
}
.contacts-arrow {
  position: absolute;
  top: 11px;
  right: 0px;
}
</style>